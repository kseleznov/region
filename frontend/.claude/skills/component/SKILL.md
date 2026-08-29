---
name: component
description: Creates a single React component following this project's FSD and component conventions — clean JSX, logic in a hook, regular function declaration with named export. Use for adding one component inside an existing slice; use the "slice" skill instead when the component needs a whole new slice around it.
---

## Input

If not provided — ask before creating:

- Component name
- Layer and slice it belongs to (e.g. `features/search-city/ui/`, `widgets/city-info/ui/`, `shared/ui/`)
- What props it receives and what it renders

## Algorithm

### 1. `"use client"` or not

Every route/page in this app is a client component already, and most `ui/` components use hooks or handlers — default to `"use client"` unless the component is genuinely static markup with zero interactivity.

### 2. Check the existing UI kit first

Before writing custom markup, check `frontend/src/shared/ui/` (`Button`, `Chips`, `StarRating`, `ImagesSlider`, `MiniMap`, `Search`, `BackButton`, icons) — reuse or extend, don't duplicate.

### 3. File shape

```tsx
"use client"; // only if needed

import { cn } from "@/shared/lib/cn";
// other imports

interface ComponentNameProps {
  // every prop explicitly typed
}

export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  return (
    // JSX only — no business logic here
  );
}
```

### 4. Component purity

**Must not be in JSX/component body:**
- `fetch`/`await`/API calls
- data transforms beyond a trivial `.map()`/format call
- complex conditionals (a simple `cond ? a : b` is fine; branch on more than that → extract to the hook)

**Where it goes instead:** business logic → `model/use<ComponentName>.ts` in the same slice; formatting/transform helpers → `shared/lib/`.

### 5. Naming & export

- Regular function declaration, named export: `export function ComponentName(...)`. Never `export default`, never an arrow-function component.
- Props type: `interface <ComponentName>Props`.
- Style with `cn()` for conditional classes; inline `style={{}}` only for a genuinely dynamic value.

### 6. Splitting

If the component grows past one clearly separable concern, split into sibling files in the same `ui/` folder (see `widgets/exploring-window/ui/*` for the pattern) rather than one large file.

### 7. After creating

- If there's non-trivial logic → create `model/use<ComponentName>.ts` next to it and move the logic there.
- Add to the slice's `index.ts` only if something outside the slice needs to import this component.
- Run `npm run lint` from `frontend/` before considering it done.
