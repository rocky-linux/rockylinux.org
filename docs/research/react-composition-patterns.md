# React Composition Patterns — research

Research captured 2026-10-29. **Decision: pages compose structure via `children`; client state shared with nested children uses a compound component (context + custom hook); internal rendering ("chaining") is allowed only for the exceptions below.**

Feeds the component conventions in `docs/development/pages-and-navigation.md`.

## Question

Pages in this repo are server components that lay out their structure with `children` instead of chaining components (a parent internally rendering a child, which internally renders a grandchild, drilling props down). A top-level client component owns state and effects; nested "dumb" children share that state.

1. How should deeply nested dumb children read state owned by a client parent — context + custom hook, `cloneElement`, render props, or something else? What are the tradeoffs?
2. When is it acceptable for a component to render its own children internally instead of accepting them as `children`?

Constraints: Next.js 16 App Router, React 19, **no React Compiler** (see `docs/known-issues.md`), Radix/shadcn UI primitives, SonarQube.

## Findings

### 1. Sharing client state with nested children

**Use a compound component: a provider that owns state and effects, and a custom hook children call to read it.** This is the pattern Radix uses and that Vercel's composition guidance recommends.

| Approach                        | Verdict                                  | Why                                                                                                                                                                                                                  |
| ------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Context + custom hook           | **Use**                                  | Children can sit at any depth and still share state, with no prop drilling. Children passed from a server component stay server-rendered.                                                                            |
| Render props                    | Only for per-item data                   | More explicit than `cloneElement`; appropriate when the parent must hand each child data (e.g. list rows).                                                                                                           |
| `cloneElement` / `Children.map` | **Avoid**                                | React docs: "uncommon and can lead to fragile code" and "makes it harder to trace the data flow". Only reaches immediate children. Radix's `asChild` uses it internally — fine inside a library, don't hand-roll it. |
| Plain props                     | Use when the data is already at the page | React docs rank plain props first, then passing JSX as `children`, then context. Translations and JSON data the page already has go in as props/`children`, not context.                                             |

Implementation details:

- **React 19 APIs:** render the provider as `<MyContext value={…}>` (`<Context.Provider>` is slated for deprecation) and read it with `use(MyContext)` inside the hook. `use()` can be called after early returns; `useContext()` cannot.
- **Fail fast:** the hook throws if the context is missing, so misuse surfaces as a clear error instead of an `undefined` crash.
- **Keep the context object private to its module group:** consumers import the hook, never the context.
- **Memoize the value:** a new value object re-renders every consumer, and `memo` cannot prevent it. Without React Compiler, wrap the value in `useMemo` and handlers in `useCallback` (state setters are already stable).
- **Provider placement:** render providers as deep in the tree as possible so more of the page stays static.
- **Server/client boundary:** `"use client"` pulls a file's imports and directly rendered components into the client bundle, but **not** server components passed in as `children` or other props — those are rendered on the server and passed through as output. When the provider's state changes, unchanged `children` are not re-rendered (Dan Abramov's "lift content up").

### 2. When internal rendering ("chaining") is acceptable

| Exception                                     | Example                                                                       | Support                                                                                                       |
| --------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Parent supplies per-item data                 | `downloads.map((d) => <DownloadCard … />)`; a list passing `item` to each row | Vercel composition patterns (render props only when the parent supplies data); React docs render-prop example |
| Primitive with fixed internal markup          | A shadcn `DialogContent` rendering its own close button                       | Judgment: the structure is an implementation detail no page would vary                                        |
| Wrapper around a third-party client component | A `"use client"` re-export of a library component                             | Judgment, following the Next.js third-party wrapper pattern                                                   |

Rule: a component may render its own children only when the structure is fixed or driven by data — never when it is a page-level layout decision. Short prop passing (one or two levels, where the intermediate component uses the data) is ordinary props, not chaining.

Only the first exception is stated explicitly by a primary source. The other two are reasoned extensions, accepted for this repo.

## Sources

- [React: cloneElement](https://react.dev/reference/react/cloneElement)
- [React: Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [React: useContext](https://react.dev/reference/react/useContext)
- [React 19 release post](https://react.dev/blog/2024/12/05/react-19)
- [Next.js: Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Kent C. Dodds: How to use React Context effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively)
- [Dan Abramov: Before You memo()](https://overreacted.io/before-you-memo/)
- [Vercel composition-patterns skill](https://github.com/vercel-labs/agent-skills/tree/main/skills/composition-patterns)
- [Scrimba: compound components](https://docs.scrimba.com/react/compound-components) (secondary)
- [Sparkbox: composing flexible React components](https://sparkbox.com/foundry/techniques_for_composing_flexible_react_components_children_component_instances_render_props) (secondary)

Last updated: 2026-10-29
