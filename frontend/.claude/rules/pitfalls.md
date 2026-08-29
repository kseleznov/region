---
paths: ['frontend/src/**']
---

# Project-specific pitfalls

## React Compiler vs. manual memoization

`reactCompiler: true` + `eslint-plugin-react-compiler` as an error. Don't add `useMemo`/`useCallback`/`React.memo` to "optimize" a component — the compiler already does this, and hand-added memoization can violate the rules of React in a way the lint rule then flags. Only reach for them for a correctness reason (e.g. a ref-stable callback an external subscription needs), and say why in a comment if it's not obvious.

## Zustand — non-primitive selectors re-render on every set

A selector returning a new object/array each call (`useAuthStore((s) => ({ user: s.user, setUser: s.setUser }))`) creates a new reference every render → the component re-renders on every store update, not just when `user` changes. Select primitives individually, or use `useShallow` from `zustand/react/shallow` for a genuinely multi-field read.

## Barrel bypass

`eslint-plugin-boundaries` catches a same-layer wrong-direction import, but not a same-slice-family shortcut like importing `entities/place/api/placeApi` directly from a widget instead of `entities/place` (the barrel). Both are violations of the FSD contract even when lint stays quiet about the second one — always import cross-slice through `index.ts`.

## Axios interceptor — don't re-implement retry/refresh per call

The 401 → refresh → retry flow is centralized in `shared/api/axios.ts`'s response interceptor. A per-slice API function that catches a 401 and tries its own refresh logic will race with the interceptor's queue and can double-refresh or redirect prematurely.

## `"use client"` is the norm here, not a smell

Every `app/*/page.tsx` in this codebase is a client component. Don't "fix" this by trying to convert a page to a server component — it's the deliberate baseline for this app (heavy client-side interactivity, Zustand/React Query throughout).

## Images

`next/image` requires the remote host to be listed in `next.config.ts`'s `images.remotePatterns` — a new image domain will 500 in dev/build until added there.
