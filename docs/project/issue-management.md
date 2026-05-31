# Project Issue Management

How we organize issues in the **Web/Design** GitHub Project, how to create a new
issue so it's correctly tied to an epic, and how to audit the whole project to
confirm nothing is orphaned.

## How the project is organized

Issues live in the org-level GitHub Project **Web/Design**:

| Property        | Value                  |
| --------------- | ---------------------- |
| Owner           | `rocky-linux`          |
| Project number  | `13`                   |
| Project node ID | `PVT_kwDOBINKa84BU6jy` |

**Epics** are themselves issues, distinguished two ways:

1. The `epic` label on the issue.
2. The project's **Status** single-select field set to **Epics**.

| Field                   | Node ID                          | Notes                    |
| ----------------------- | -------------------------------- | ------------------------ |
| Status                  | `PVTSSF_lADOBINKa84BU6jyzhKOjZA` | Single-select            |
| Status → "Epics" option | `9720c8b6`                       | Marks an item as an epic |

Every non-epic issue should be a **sub-issue** of exactly one epic. We use
GitHub's native sub-issue relationship (surfaced in the project as the **Parent
issue** field and **Sub-issues progress**), _not_ a label or a custom field.

> **Why GraphQL?** The `gh project item-list` command does **not** return the
> Parent issue relationship, so parent/child links must be read and written
> through the GraphQL API (`addSubIssue` / `removeSubIssue` and the issue's
> `parent` / `subIssues` fields). The recipes below use it throughout.

## Creating a new issue tied to an epic

The rule: **no issue is "done" being filed until it has a parent epic.** Do it
in the same sitting so it never becomes an orphan.

### 1. Create the issue and add it to the project

```bash
gh issue create --repo rocky-linux/rockylinux.org \
  --title "Short, specific title" \
  --body-file /tmp/body.md \
  --project "Web/Design"
```

Note the new issue number from the returned URL (e.g. `#340`).

### 2. Pick the parent epic

List the current epics (see [Auditing](#auditing-the-project) for the full
query). Choose the one whose scope the work belongs to. If nothing fits, that's
a signal to discuss a **new epic** with the Web Team lead before filing —
don't force-fit, and don't leave it parentless.

### 3. Link it as a sub-issue

`addSubIssue` takes **node IDs**, not issue numbers. Resolve them first:

```bash
# Helper: issue number -> node ID
node_id() {
  gh api graphql -f query='query($n:Int!){repository(owner:"rocky-linux",name:"rockylinux.org"){issue(number:$n){id}}}' \
    -F n="$1" --jq '.data.repository.issue.id'
}

PARENT=$(node_id 308)   # the epic
CHILD=$(node_id 340)    # the new issue

gh api graphql -f query='mutation($p:ID!,$c:ID!){addSubIssue(input:{issueId:$p,subIssueId:$c}){subIssue{number}}}' \
  -F p="$PARENT" -F c="$CHILD" --jq '.data.addSubIssue.subIssue.number'
```

To **move** an issue to a different epic, remove it from the old parent first,
then add it to the new one:

```bash
gh api graphql -f query='mutation($p:ID!,$c:ID!){removeSubIssue(input:{issueId:$p,subIssueId:$c}){subIssue{number}}}' \
  -F p="$OLD_PARENT" -F c="$CHILD"
gh api graphql -f query='mutation($p:ID!,$c:ID!){addSubIssue(input:{issueId:$p,subIssueId:$c}){subIssue{number}}}' \
  -F p="$NEW_PARENT" -F c="$CHILD"
```

### Creating a new epic

When a genuinely new theme is needed (approval from the Web Team lead first):

```bash
gh issue create --repo rocky-linux/rockylinux.org \
  --title "Epic Title" --body-file /tmp/epic.md \
  --label epic --project "Web/Design"
```

Write the body as **descriptive prose** matching the existing epics (a paragraph
of intent plus a short scope list), not a terse one-liner. Then set its project
Status to **Epics** so it's filtered correctly. This needs the item's _project
item ID_ (distinct from the issue node ID):

```bash
ITEM=$(gh project item-list 13 --owner rocky-linux --format json --limit 100 \
  | python3 -c 'import sys,json; n=341;
print(next(i["id"] for i in json.load(sys.stdin)["items"] if i.get("content",{}).get("number")==n))')

gh project item-edit --id "$ITEM" \
  --project-id PVT_kwDOBINKa84BU6jy \
  --field-id PVTSSF_lADOBINKa84BU6jyzhKOjZA \
  --single-select-option-id 9720c8b6
```

## Auditing the project

Run this to list every issue's parent and flag any that lack an epic. Keep the
`EPICS` set in sync with the issues whose Status is "Epics".

```bash
# 1. Fetch parent + sub-issue data for every item (foreground; see Gotchas).
> /tmp/audit.jsonl
for n in $(gh project item-list 13 --owner rocky-linux --format json --limit 100 \
            | python3 -c 'import sys,json;[print(i["content"]["number"]) for i in json.load(sys.stdin)["items"] if i.get("content",{}).get("number")]'); do
  gh api graphql -f query='query($n:Int!){repository(owner:"rocky-linux",name:"rockylinux.org"){issue(number:$n){number title state parent{number} subIssues(first:50){totalCount nodes{number}}}}}' \
    -F n=$n --jq '.data.repository.issue' 2>/dev/null >> /tmp/audit.jsonl
done

# 2. Report epics, parented issues, and orphans.
python3 <<'PY'
import json
rows=[json.loads(l) for l in open("/tmp/audit.jsonl") if l.strip()]
epics={r["number"] for r in rows if (r.get("subIssues") or {}).get("totalCount",0)>=0
       and r["number"] in {305,306,307,308,309,310,313,338,339}}  # Status=Epics
orphans=[]
for r in sorted(rows,key=lambda x:x["number"]):
    if r["number"] in epics: continue
    if not r.get("parent"): orphans.append(r["number"])
print("Orphans (no epic):", orphans or "NONE — every issue has an epic")
PY
```

A clean audit prints `NONE — every issue has an epic`. Anything listed needs a
parent assigned via the linking step above.

> **Note:** the `EPICS` set is hand-maintained because Status lives on the
> _project item_, not the issue. To rebuild it from scratch, read the Status
> field per item with `gh project item-list ... --format json` and keep the
> numbers whose status is `Epics`.

## Shell gotchas (learned the hard way)

- **zsh does not word-split unquoted parameters.** A loop like
  `for l in "${arr[@]}"; do set -- $l; ...; done` puts the _entire_ line into
  `$1` under zsh (unlike bash). Either define a function with named positional
  args and call it explicitly per item, or use `${=l}` to force splitting.
- **`gh api graphql` pretty-prints multi-line JSON by default.** Reading its
  output line-by-line breaks `json.loads`. Always pass `--jq` to get one compact
  object per call, then append to a `.jsonl` file.
- **Run the fetch loop in the foreground with an explicit timeout.** Long
  multi-`gh` loops can get auto-detached to the background and silently write
  nothing. Keep fetch and parse as separate steps so each completes cleanly.

---

Last updated: 2026-05-31
