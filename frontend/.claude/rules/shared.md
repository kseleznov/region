---
paths: ['frontend/src/shared/**']
---

# Layer: shared

Framework-agnostic building blocks: UI kit (`shared/ui`), helpers (`shared/lib`), API client (`shared/api`), config (`shared/config`), cross-cutting types (`shared/types`). No domain knowledge lives here.

## Rules

- May only import other `shared` code (or external packages). Never imports from `entities`/`features`/`widgets`/`app` — if a `shared/ui` component needs domain data, that's a sign it belongs in `entities` or `features`, not `shared`.
- `shared/ui` components must be generic and free of domain-specific side effects — no calls to a specific entity's API or store from inside `shared/ui`.
- Before writing a new low-level UI primitive, check the existing inventory: `Button`, `Chips`, `StarRating`, `ImagesSlider`, `MiniMap`, `Search`, `BackButton`, icons in `shared/ui/icons/`. Reuse or extend one of these rather than writing a parallel one-off.
- Use `cn()` (`shared/lib/cn.ts`) for conditional/merged classNames everywhere, including inside `shared/ui`.
- `shared/api/axios.ts` is the single axios instance for the whole app (see `.claude/rules/api.md`) — don't add a second one under `shared/` or anywhere else.
- Cross-cutting types that multiple entities/features need go in `shared/types/` (e.g. `card.ts`, `category.ts`); a type used by only one slice stays in that slice's own `model/types.ts`.
