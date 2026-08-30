---
paths: ['frontend/src/features/**']
---

# Layer: features

A feature is one user-facing action: `auth`, `save-card`, `visit-card`, `search-city`, `select-city`, `select-region`. It's the layer that turns a read-only entity into something the user can *do* something with.

## Rules

- May import `entities` (via `index.ts` barrel only) and `shared`. Must not import `widgets` or other `features` — if two features need the same behavior, extract it into an `entities` hook or a `shared/lib` helper, don't cross-import features.
- A feature that talks to the backend directly (not just via an entity's API) gets its own `api/xxxApi.ts` (see `features/auth/api/authApi.ts`).
- A feature that needs state surviving across components gets a Zustand store in its own `model/use<Name>Store.ts` (e.g. `features/auth/model/useAuthStore.ts`, `features/select-city/model/useSelectCityStore.ts`) — don't put feature-local state in a shared/global store.
- A feature's primary hook (`model/useX.ts`) owns the mutation/state-machine logic; the `ui/` component (if any) only renders and calls the hook's handlers — see `features/auth/model/useAuth.ts` + `widgets/auth-form/ui/*` for the split between a feature's logic and the widget that renders it.
- A `model/useX.ts` hook holds hook/stateful logic only. A pure, framework-free helper it uses (error→message mapping, a formatter, a lookup table) lives in its own `model/<name>.ts` named for the job — e.g. `features/auth/model/getAuthErrorMessage.ts` — not inline in the hook once it's more than a few lines. Slice-internal, so keep it out of `index.ts`. There is no slice-level `lib/` segment in this project; `lib/` is `shared/` only.
- Not every feature needs a `ui/` folder — a feature can be pure logic (`save-card`, `visit-card` are hook-only, rendered by whichever entity/widget uses them).
