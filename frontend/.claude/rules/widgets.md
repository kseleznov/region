---
paths: ['frontend/src/widgets/**']
---

# Layer: widgets

A widget is a composed page section: it wires together one or more `features`/`entities` and renders a coherent chunk of UI (`city-info`, `exploring-window`, `dock`, `header`, `saved`...).

## Rules

- May import `features`/`entities` (via their `index.ts` barrel only) and `shared`. Must not import another `widgets` slice — if two widgets need to share something, that something belongs in a lower layer (`features`, `entities`, or `shared`), not in a widget-to-widget import.
- A widget with any non-trivial aggregation logic (filtering, derived state, orchestrating multiple hooks) gets a `model/useWidgetName.ts` hook — the `ui/` component stays render-only.
- Large widgets split into sub-components in the same `ui/` folder rather than growing one file (see `exploring-window/ui/{Filters,SubcategoryModal,SwipeHint,...}.tsx` for the pattern) — extract once a component mixes more than one clearly separable concern, not on a fixed line-count threshold.
- Only export from `index.ts` what `app` (or another consumer) actually imports — internal sub-components and helper hooks stay unexported.
