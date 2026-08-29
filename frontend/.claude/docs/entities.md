# Layer: entities

**Responsibility:** domain nouns the app is about, including their own data-fetching. Unlike the "entities are Zustand-only, no async" convention some FSD projects use, entities here own `api/` + `model/useX.ts` query hooks for their own domain data.

## Slice structure (pattern)

```
entities/<name>/
  api/
    <name>Api.ts    ← plain object of async functions wrapping apiClient
  model/
    useX.ts         ← useQuery/useMutation wrapper around <name>Api
    types.ts        ← entity-specific types (when not already in shared/types)
    constants.ts     ← defaults/enums (when needed)
  ui/               ← optional — only if the entity has its own renderable representation
    Component.tsx
  index.ts          ← public API barrel
```

## Example slice: `place`

```
entities/place/
  api/placeApi.ts    ← getAll, getCategories, getById, toggleSave, toggleVisit
  model/usePlaces.ts ← usePlaces() query hook + placesKey query-key export
```

`api/placeApi.ts`:

```ts
export const placeApi = {
  getAll: async (cookieHeader?: string): Promise<ICard[]> => { ... },
  getById: async (id: number): Promise<ICard | null> => { ... },
  toggleSave: async (id: number): Promise<{ isSaved: boolean }> => { ... },
  // ...
};
```

`index.ts`:

```ts
export { placeApi } from "./api/placeApi";
export { usePlaces, placesKey } from "./model/usePlaces";
```

## Example slice: `rank` (UI-bearing entity, no API)

```
entities/rank/
  model/{constants.ts,types.ts,useRankBadge.ts}
  ui/RankBadge.tsx
  index.ts
```

Not every entity needs `api/` — `rank` is purely derived/presentational (badge tiers computed from a score), so it only has `model/` + `ui/`.

## Rules

See `.claude/rules/entities.md` for the enforceable rules; this file is the "what does a good one look like" reference.

## Dependencies

`entities` → `shared` only.
