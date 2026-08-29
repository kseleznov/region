---
name: hook
description: Creates a model/ hook following this project's FSD and data-fetching conventions — TanStack Query for server state, Zustand for persistent client state, apiClient for HTTP. Use when a slice needs new business logic extracted out of a component.
---

## Input

If not provided — ask before creating:

- Hook name (e.g. `useToggleSave`, `useCityFacts`)
- Slice location (e.g. `features/save-card/model/`, `widgets/city-facts/model/`)
- What it manages and what it returns

## Algorithm

### 1. Identify what the hook needs

- Zustand store → import from the owning slice's own `index.ts`/`model/`, never reach into another slice's store internals.
- Server data → `useQuery`/`useMutation` from `@tanstack/react-query`, calling through `apiClient` (`@/shared/api/axios`) or the slice's own `api/xxxApi.ts`.
- Nothing manually memoized for performance — the React Compiler handles that (see `frontend/AGENTS.md` / `.claude/rules/pitfalls.md`). Only wrap something in `useCallback`/`useMemo` if there's a correctness reason.

### 2. File shape

```ts
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/axios";

export function useThing() {
  const [localState, setLocalState] = useState(...);

  const query = useQuery({
    queryKey: ["thing"],
    queryFn: () => apiClient.get("/thing").then((r) => r.data),
  });

  function handleAction() {
    // ...
  }

  return {
    // whatever the consumer needs — flat object
  };
}
```

Match the existing style (see `entities/place/model/usePlaces.ts`, `features/auth/model/useAuth.ts`): a plain `export function useX()`, `useState` for local fields, a `useMutation`/`useQuery` call, and plain (non-`useCallback`-wrapped) handler functions unless there's a specific reason to stabilize one.

### 3. Rules

- Regular function declaration, not an arrow function: `export function useThing() { ... }`.
- Don't mirror props/store state into local `useState` via `useEffect` — that causes cascading renders. Derive it directly, or compute during render.
- `useEffect` is fine for subscriptions, timers, or a genuine side effect after a user action — not for syncing state that could just be derived.
- Server data always via TanStack Query — never a bare `useEffect` + `fetch` + `useState` for API data.

### 4. After creating

- If the hook needs its own API calls beyond what an existing entity/feature API module provides, add them to that module (or create `api/xxxApi.ts` if the slice doesn't have one yet) rather than calling `apiClient` inline in the hook for anything non-trivial.
- Add to the slice's `index.ts` only if another slice needs to import this hook.
- Run `npm run lint` from `frontend/` before considering it done.
