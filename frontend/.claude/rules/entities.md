---
paths: ['frontend/src/entities/**']
---

# Layer: entities

A domain noun the app is about: `place`, `city`, `card`, `rank`. Unlike a typical FSD "entities are Zustand-only" convention, entities in this project also own the API calls and query hooks for their own domain data — see `entities/place/{api/placeApi.ts,model/usePlaces.ts}`. Don't invent a `features/`-level wrapper just to fetch an entity's own data; that lives in the entity itself.

## Rules

- May import `shared` only. Must not import another `entities` slice, or anything from `features`/`widgets`/`app`.
- An entity's `api/xxxApi.ts` is a plain object of async functions wrapping `apiClient` (see `shared/api/axios.ts` / `.claude/rules/api.md`) — not a class.
- An entity's `model/useX.ts` wraps that API in `useQuery`/`useMutation` and is the thing other layers actually import (`usePlaces`, not `placeApi` directly, unless the caller genuinely needs the raw API call).
- Local, non-server state for an entity (e.g. `entities/rank`'s badge animation state) can live in a plain hook — reach for a Zustand store only if the state must persist across components/renders outside of props.
- `index.ts` re-exports the API object, the hooks, and any query-key constant other layers need (see `entities/place/index.ts`: `placeApi`, `usePlaces`, `placesKey`) — not internal types used only inside the slice.
