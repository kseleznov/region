---
paths: ['frontend/src/app/**']
---

# Layer: app

Next.js App Router routes only. One `page.tsx` per route under `src/app/<route>/page.tsx`. This layer composes widgets/features/entities/shared — it does not contain business logic itself.

## Rules

- Every route currently observed is a client component (`"use client"` at the top) — this app has no server components in `app/`. Follow that unless you have a specific reason to introduce a server component (and note the reason).
- Route paths are defined once in `shared/config/routes.ts` (`ROUTES.xxx`) — use that constant for navigation (`router.push(ROUTES.overview)`), never a hardcoded string literal path.
- `app/providers.tsx` holds app-wide providers (currently `QueryClientProvider` + auth bootstrap). Add new global providers here, not inside individual pages.
- `app` may import from `widgets`, `features`, `entities` (via their `index.ts` barrels) and `shared`. It must not be imported by any other layer.
- Global styles (`globals.css`), fonts (`fonts.ts`), and the PWA manifest (`manifest.ts`) live in this layer — don't duplicate global CSS/theme setup elsewhere.
