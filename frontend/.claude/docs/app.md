# Layer: app

**Responsibility:** Next.js App Router routes, global providers, and app-wide setup. No business logic — this layer composes lower layers.

## Structure

```
app/
  layout.tsx       ← root layout
  providers.tsx     ← QueryClientProvider + auth bootstrap (fetches `me` on mount)
  fonts.ts
  globals.css       ← Tailwind v4 theme tokens (@theme block) + global CSS
  manifest.ts       ← PWA manifest
  page.tsx          ← "/" route
  <route>/page.tsx  ← one folder per route: greeting/, region/, exploring/, saved/, profile/, overview/, auth/sign-in/, auth/sign-up/
```

## Example route

```tsx
// app/overview/page.tsx
"use client";

import { SomeWidget } from "@/widgets/some-widget";

export default function OverviewPage() {
  return <SomeWidget />;
}
```

Every page in this app is currently a client component and typically just renders one top-level widget for that route — the actual UI composition lives in `widgets/`, not in the page file itself.

## Rules

See `.claude/rules/app.md`.

## Dependencies

`app` → `widgets`/`features`/`entities` (via `index.ts`) + `shared`. Nothing imports `app`.
