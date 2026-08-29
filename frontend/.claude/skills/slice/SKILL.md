---
name: slice
description: Scaffold a new Feature-Sliced Design slice (entity, feature, or widget) under frontend/src with this project's standard folder layout and barrel export. Use when adding a new domain entity, a new user-facing feature/action, or a new widget (page-section composition) to the frontend — not for one-off components inside an existing slice.
---

# New FSD slice

This project's `frontend/src` is Feature-Sliced Design: `app → widgets → features → entities → shared`, enforced by `eslint-plugin-boundaries`. Read `frontend/AGENTS.md` first if it's not already in context, and check `frontend/.claude/doc-mapping.json` for the specific `rules`/`docs` file matching the layer you're scaffolding into — this skill only covers the shape; the per-layer file has the enforceable details.

## 1. Determine the layer

Ask (or infer from the request) which layer the new slice belongs to:

- **entity** — a domain noun the app is about (`place`, `city`, `card`). Depends on `shared` only. Can own its own `api/` + query hooks — see `.claude/docs/entities.md`.
- **feature** — one user action (`save-card`, `search-city`). Depends on `entities` (via barrel) + `shared`.
- **widget** — a composed page section (`city-info`, `dock`). Depends on `features`/`entities` (via barrel) + `shared`.

If genuinely ambiguous, ask the user rather than guessing — the layer determines what the slice is allowed to import, and getting it wrong means a lint failure or a later refactor.

## 2. Create the folder

Slice name is kebab-case: `frontend/src/<layer>/<slice-name>/`. Only create the subfolders the slice actually needs:

- `ui/` — PascalCase component files (`MyComponent.tsx`), export name matches filename, regular function declaration (see `.claude/rules/components.md`).
- `model/` — `useX.ts` hooks (TanStack Query wrappers, Zustand stores), `types.ts`, `constants.ts`.
- `api/` — `<name>Api.ts`: a plain object of async functions wrapping `shared/api/axios.ts`'s `apiClient`.

Don't create empty folders for subfolders the slice doesn't need yet.

## 3. Write the barrel (`index.ts`)

Export only what other slices actually need — the slice's entire public surface, per the `internalPath: "index.ts"` boundaries rule:

```ts
export { placeApi } from "./api/placeApi";
export { usePlaces, placesKey } from "./model/usePlaces";
```

## 4. Wire state and API correctly

- Server data → a `model/useX.ts` hook built on `useQuery`/`useMutation`.
- Persistent client/UI state → a Zustand store in `model/use<Name>Store.ts`, small and typed with an explicit `interface`.
- API calls → through `shared/api/axios.ts`'s `apiClient`, never a new axios instance or bare `fetch`.

## 5. Verify

Run `npm run lint` from `frontend/` after scaffolding — it catches any boundaries violation immediately. Fix any violation before considering the slice done; don't suppress the lint rule.
