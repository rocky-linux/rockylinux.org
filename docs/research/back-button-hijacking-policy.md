# Google "Back Button Hijacking" Spam Policy — research

Research captured 2026-05-30.

**Conclusion: our downloads page is not affected and no change is required.**

This doc exists to record why the downloads page's use of `window.history.pushState`
is _not_ a violation of Google's "back button hijacking" spam policy (enforced
June 15, 2026), so the question doesn't have to be re-litigated the next time
someone reads `TabsClient.tsx` and worries about it.

## Question

Does Google's June 15, 2026 enforcement against "back button hijacking" apply to
this site — specifically the downloads page, which updates the URL via the
History API when a user switches CPU architecture?

## Findings

### The policy, from the primary source

Google Search Central, "Introducing a new spam policy for 'back button hijacking'"
(April 13, 2026, Chris Nelson / Search Quality team):

- **Not a new rule** — it's explicit enforcement of the existing **"malicious
  practices"** spam policy: _"Malicious practices create a mismatch between user
  expectations and the actual outcome, leading to a negative and deceptive user
  experience…"_
- **Definition (verbatim):** it _"occurs when a site interferes with a user's
  browser navigation and prevents them from using their back button to immediately
  get back to the page they came from. Instead, users might be sent to pages they
  never visited before, be presented with unsolicited recommendations or ads, or
  are otherwise just prevented from normally browsing the web."_
- **What must be removed:** _"any script or technique that inserts or replaces
  **deceptive or manipulative pages** into a user's browser history that prevents
  them from… get[ting] back to the page they came from."_
- **Enforcement:** _"manual spam actions or automated demotions"_ → lower Search
  ranking. Manual actions can be cleared via a reconsideration request in Search
  Console once fixed.
- **Third-party code is your responsibility:** Google explicitly notes hijacking
  _"may originate from the site's included libraries or advertising platform"_ and
  expects owners to audit their imports/configs.
- **Dates:** published April 13, 2026; enforced **June 15, 2026** (two-month grace).

### The key nuance: defined by outcome, not by API

**The official policy names no JavaScript API.** There is no mention of
`pushState`, `replaceState`, `popstate`, or "excessive history entries." The test
Google applies is behavioral: _does pressing back return the user to the page they
came from, or are they trapped / shown a phantom page?_

Several SEO blogs claim Google's crawler "flags excessive pushState calls and
popstate interceptors." **This is not in any primary source** — Search Engine Land's
coverage confirms the policy is framed purely by user-experience outcome with no
code specifics. Treat the "pushState count" detection claim as third-party
speculation, not Google policy. Google does not publish its actual detection
mechanics either.

### Why the downloads page is fine

The only History API usage is in
`app/[locale]/download/components/TabsClient.tsx` (`updateArchitecture`):

```ts
window.history.pushState(null, "", newUrl); // newUrl = ?arch=<selected>
```

| Google's violation criteria                           | Downloads page                                     |
| ----------------------------------------------------- | -------------------------------------------------- |
| Inserts **deceptive/manipulative** pages into history | No — only a real, shareable `?arch=` state         |
| Triggered on load / without user intent               | No — fires only on explicit tab clicks             |
| Back **fails to return** the user to the prior page   | No — back walks selections and then exits normally |
| Shows phantom feeds / ads / recommendations on back   | No                                                 |

A sweep of the codebase found no `popstate` interceptors, no `beforeunload`
dialogs, no redirect chains, and no history entries injected on page load. The
page reflects legitimate user-initiated state in the URL — exactly the navigation
Google's outcome-based test is designed _not_ to catch. No change needed.

## Sources

- [Introducing a new spam policy for "back button hijacking" — Google Search Central Blog](https://developers.google.com/search/blog/2026/04/back-button-hijacking) (primary)
- [Google Search to penalize back button hijacking schemes — Search Engine Land](https://searchengineland.com/google-search-to-penalize-back-button-hijacking-schemes-474167)
- [Google Search to classify 'back button hijacking' as spam — 9to5Google](https://9to5google.com/2026/04/13/google-search-back-button-hijacking/)
- [New Google Spam Policy Targets Back Button Hijacking — Search Engine Journal](https://www.searchenginejournal.com/new-google-spam-policy-targets-back-button-hijacking/571859/)

---

_Last updated: 2026-05-30_
