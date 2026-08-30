---
paths: ['frontend/src/**']
---

# Code quality

- No `any` (including `as any`) — the codebase currently has zero occurrences across `src/`; a new `any` is a regression, not a shortcut.
- No magic strings/numbers for things that recur or mean something domain-specific (a category id, a route path, an animation duration used in more than one place) — use a named constant in the slice's `model/constants.ts` or `shared/config/`. A one-off literal used exactly once (a specific pixel offset, a single Tailwind arbitrary value) doesn't need to be extracted.
- Route paths always come from `ROUTES` (`shared/config/routes.ts`) — never a hardcoded `"/exploring"` string.
- Don't duplicate a query/mutation pattern across 3+ hooks — extract the shared shape into the entity's own hook or a `shared/lib` helper.
- A pure, framework-free helper tied to one slice (error→message mapping, a formatter, a reducer) gets its own `model/<name>.ts` file named for the job — don't leave it inline in a `model/useX.ts` hook once it's more than a few lines. It's slice-internal, so keep it out of `index.ts`. (`lib/` is `shared/`-only; slices have no `lib/` segment.)
- Don't introduce an abstraction (a generic wrapper, a config-driven factory) for a single current use case — three near-identical blocks are fine; wait for a real third or fourth repetition before generalizing.
- Dead code (unused imports/exports/constants) gets deleted, not commented out or left "just in case."
