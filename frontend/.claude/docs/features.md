# Layer: features

**Responsibility:** one user-facing action, coordinating one or more entities. This is where a read-only entity becomes something the user does something with (save it, visit it, search for it, authenticate).

## Slice structure (pattern)

```
features/<name>/
  api/            ← only if the feature calls the backend directly (not just via an entity)
    <name>Api.ts
  model/
    useX.ts       ← the feature's primary hook: mutation/state-machine logic
    use<Name>Store.ts  ← Zustand store, only if state must survive across components
    <helper>.ts   ← pure slice-local helper (err→message map, formatter, table); out of index.ts
    types.ts
  ui/             ← optional — some features are pure logic, rendered by a widget/entity
    Component.tsx
  index.ts
```

## Example: `auth` (full-featured slice)

```
features/auth/
  api/authApi.ts           ← login, register, logout, refresh, me
  model/
    types.ts                ← User, auth-related types
    useAuth.ts               ← mode: "sign-in" | "sign-up" — form state + mutation + navigation
    useAuthStore.ts          ← Zustand: { user, setUser, clearUser }
    useAuthBootstrap.ts      ← one-shot /auth/me probe + wires the axios session-expired handler
    getAuthErrorMessage.ts   ← pure err → user-message map used by useAuth (not in index.ts)
    useLogout.ts
```

`useAuth.ts` owns the whole sign-in/sign-up flow: local field state, the `useMutation` call, success (fetch `me`, set user, redirect) and error handling. The err→message mapping is a pure helper in `model/getAuthErrorMessage.ts`, not inline in the hook. The widget that renders the form (`widgets/auth-form`) only calls into this hook — no fetch/mutation logic in the widget's JSX.

## Example: `save-card` (hook-only feature, no `ui/`)

```
features/save-card/
  model/useToggleSave.ts
  index.ts
```

Consumed directly by `entities/card`'s UI — a feature doesn't need to render anything itself if its whole job is exposing a mutation hook.

## Rules

See `.claude/rules/features.md`.

## Dependencies

`features` → `entities` (via `index.ts`) + `shared`.
