# Layer: widgets

**Responsibility:** composed page sections — a widget wires together features/entities into a coherent, renderable chunk that a page (`app/`) drops in directly.

## Slice structure (pattern)

```
widgets/<name>/
  ui/
    MainComponent.tsx    ← the widget's public component
    SubComponent.tsx     ← split-out pieces, same folder
  model/                 ← only if the widget has its own aggregation/orchestration logic
    useWidgetName.ts
  index.ts
```

## Example: `exploring-window` (large, multi-file widget)

```
widgets/exploring-window/
  model/
    filters.ts
    types.ts
    useExploringWindow.ts
    useFilters.ts
    usePlaceSlider.ts
    usePlaceSliderUI.ts
  ui/
    ExploringWindow.tsx    ← composition root for the widget
    Filters.tsx
    PlaceSlider.tsx
    SectionTransition.tsx
    SubcategoryModal.tsx
    SwipeHint.tsx
    ViewControl.tsx
```

Several independent concerns (filtering, sliding between places, section transition animation, a modal) each got their own hook and/or component file instead of one large `ExploringWindow.tsx` — follow this shape once a widget accumulates more than one clearly separable concern.

## Example: `city-info` (simple composition, one hook)

```
widgets/city-info/
  model/{types.ts,useCityInfo.ts}
  ui/{CityDescription.tsx,CityImages.tsx,CityInfo.tsx,CityLocation.tsx,CityWeather.tsx}
```

`CityInfo.tsx` is the composition root that renders the other `ui/*` sub-components; `useCityInfo.ts` is the single hook feeding all of them.

## Rules

See `.claude/rules/widgets.md`.

## Dependencies

`widgets` → `features`/`entities` (via `index.ts`) + `shared`. Never another `widgets` slice.
