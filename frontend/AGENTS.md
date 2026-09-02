# Region — frontend

Mobile-first web app (Next.js App Router, body capped at 500px) for browsing cities/places, saving favorites, and marking visited spots. Talks to the NestJS API in `../backend` over `NEXT_PUBLIC_API_URL`.

**Stack:** Next.js 16 (App Router) · React 19 + React Compiler · TypeScript (strict) · Tailwind CSS v4 · Zustand · TanStack Query · axios · Framer Motion · React Three Fiber/drei · Embla Carousel · lucide-react

**Commands:** `npm run dev` · `npm run build` · `npm run lint` (eslint: prettier + FSD boundaries + react-compiler rules). No test suite is configured — don't claim something is "tested" beyond lint/build passing, and don't invent a test command.

---

# Rules & Documentation Synchronization

- `frontend/.claude/doc-mapping.json` maps `frontend/src/**` path patterns to per-layer `rules` (`frontend/.claude/rules/*.md`) and `docs` (`frontend/.claude/docs/*.md`).
- **Before analyzing or modifying a file under `frontend/src/`**, look up its path in the mapping and open every matched `rules`/`docs` file — a file usually matches several patterns (e.g. a `features/**/*.tsx` file maps to `features.md`, `components.md`, `naming.md`, `pitfalls.md`, `code-quality.md`).
- These files are the ground truth for conventions in that layer — don't rely on memory of a past session.
- Keep this file under ~200 lines. If a section grows past a paragraph, move the detail into the matching `rules/`/`docs/` file and leave a pointer here instead.
- There is no automated freshness check for rules/docs — if you change a convention, update the matching file yourself in the same session.

---

# Architecture (FSD)

`frontend/src` is Feature-Sliced Design: `app → widgets → features → entities → shared` (left imports right, never the reverse) — enforced by `eslint-plugin-boundaries`, a lint error not a suggestion. Cross-slice imports MUST go through the slice's `index.ts` barrel (never `model/`, `ui/`, `api/` directly). No layer-level barrels — import a slice directly (`@/widgets/city-info`), never `@/widgets`.

Full per-layer rules and slice-anatomy examples: `.claude/rules/{app,widgets,features,entities,shared}.md` and `.claude/docs/{app,widgets,features,entities,shared}.md`.

---

# State & Data

- Server state → TanStack Query (`useQuery`/`useMutation`) inside a `model/useX.ts` hook. Don't use `useState`/`useEffect` to hold API data.
- Persistent client/UI state → a Zustand store colocated in the owning feature's `model/use<Name>Store.ts`, small, typed with an explicit `interface`.
- All HTTP calls go through the single axios instance `apiClient` in `shared/api/axios.ts` (cookie-based JWT refresh built in). Never a second axios instance or bare `fetch` for backend calls.

See `.claude/rules/api.md` for the API-layer contract.

---

# React Compiler

`reactCompiler: true` + `eslint-plugin-react-compiler` as an error. Do **not** hand-add `useMemo`/`useCallback`/`React.memo` for optimization — the compiler handles it. Only use them for a correctness reason (stable identity for an external system), never for performance.

---

# TypeScript

- Strict mode. No `any` — the codebase currently has zero occurrences; keep it that way.
- Component props: `interface <ComponentName>Props` (e.g. `ChipsProps`, `MiniMapProps`) — not a bare `Props`.
- Prefer `interface` for object/data shapes, `type` for unions/intersections/aliases.

---

# Components & Naming

- Components and hooks are **regular function declarations** with named exports: `export function ComponentName(...)`, `export function useSomething(...)`. No arrow-function components/hooks, no `export default` (Next.js file conventions — `page.tsx`/`layout.tsx` — are the only exception).
- Files/exports: PascalCase components, `useX.ts` hooks, kebab-case slice folders, `UPPER_SNAKE_CASE` constants.
- User-facing strings (labels, errors, empty states) are **not hardcoded** — they go through `shared/i18n` (`const { t } = useTranslation(); t("some.key")`), with the English/Russian text in `shared/i18n/locales/{en,ru}.ts`. English is the source of truth for the dictionary shape. Code, identifiers, and comments are in English. The active locale comes from the `NEXT_LOCALE` cookie (`getServerLocale()` in RSC, `LocaleProvider` context on the client); place/city content is translated server-side via `?lang=`.

Full naming checklist (handler/prop/state naming quality): `.claude/rules/naming.md`.

---

# Styling

Tailwind v4, theme tokens as CSS variables in `globals.css` under `@theme` (`--color-brand-*`, etc.) — prefer existing tokens over raw hex in new code. Merge conditional classNames with `cn()` (never string concatenation). Variant-driven components use `class-variance-authority` (see `shared/ui/button/variants.ts`). Inline `style={{}}` is fine for genuinely dynamic values (computed colors, three.js/canvas sizing, drop-shadows) — not as a substitute for a Tailwind class that already covers the same static value.

---

# Tooling

- **Prettier**: enforced via `eslint-plugin-prettier` (`npm run lint`); a `PostToolUse` hook auto-fixes `frontend/src/**/*.{ts,tsx}` on every edit (see repo `.claude/settings.json`).
- **ESLint**: `eslint-plugin-boundaries` enforces the FSD import rules above; `eslint-plugin-react-compiler` enforces the memoization rule.
- No husky/lint-staged — `npm run lint` before considering frontend work done is manual, not git-hook-enforced.

---

# Git

- Conventional Commits: `type(scope): description` (already the convention in this repo's history) — see `.claude/rules/git.md` for the full type list and branch-naming convention.
