# Layer: shared

**Responsibility:** framework-agnostic building blocks with zero domain knowledge — the only layer every other layer can depend on.

## Structure

```
shared/
  api/axios.ts        ← the one apiClient instance + 401 refresh interceptor
  config/routes.ts     ← ROUTES — every route path constant
  lib/                 ← generic helpers: cn.ts, formatDecimal.ts, toLowerCase.ts, trimValue.ts, useImageSlider.ts
  types/               ← cross-cutting domain types shared by multiple slices: card.ts, category.ts
  ui/                  ← the UI kit
    button/{Button.tsx,variants.ts,index.ts}   ← cva-driven variants
    chips/, images-slider/, mini-map/, star-rating/, search/, back-button/, banner/, icons/
```

## UI kit inventory (check before writing a new primitive)

`Button`, `Chips`, `StarRating`, `ImagesSlider`, `MiniMap`, `Search`, `BackButton`, `Banner`/`Letter3D` (3D text banner), plus icon components in `shared/ui/icons/`. A new cross-slice-reusable primitive goes here; something specific to one entity/feature's rendering does not.

## Example: variant-driven component (`button`)

```
shared/ui/button/
  Button.tsx     ← reads variant via buttonVariants(), merges with cn()
  variants.ts     ← cva() definition
  index.ts        ← export { Button }
```

## Rules

See `.claude/rules/shared.md` (general) and `.claude/rules/api.md` (the axios client specifically).

## Dependencies

`shared` → `shared` only (or external packages). Never imports anything from `entities`/`features`/`widgets`/`app`.
