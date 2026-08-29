---
paths: ['frontend/src/**/*.tsx']
---

# Components (.tsx)

- Regular function declaration, named export: `export function ComponentName({ ... }: ComponentNameProps) { ... }`. No arrow-function components, no `export default` — the only exception is Next.js file conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`).
- Props type: `interface <ComponentName>Props` (e.g. `ChipsProps`, `MiniMapProps`, `SwipeHintProps`) — not a bare `Props`, not inline destructured types for anything beyond a single trivial prop.
- `"use client"` at the top when the component uses hooks, event handlers, or browser APIs. Every route in `app/` in this codebase is currently a client component — that's the established pattern here, not an anti-pattern to fix.
- Business logic (data fetching, transforms, branching beyond a simple ternary) does not belong in JSX — extract to the slice's `model/useX.ts` hook. A component reads hook output and renders.
- Merge classNames with `cn()`; use `class-variance-authority` (`variants.ts`) for a component with multiple visual variants rather than chained ternaries in `className`.
- Inline `style={{}}` is acceptable for computed/dynamic values (colors, filters, three.js/canvas sizing) — not for a static value a Tailwind class already expresses.
- Large components split into sibling files in the same `ui/` folder rather than growing one file — split when a component mixes clearly separable concerns, not at a fixed line count.
