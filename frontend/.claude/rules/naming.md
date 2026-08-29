---
paths: ['frontend/src/**']
---

# Naming

- Folders/slices: kebab-case (`select-city`, `cards-slider`).
- Components: PascalCase file + export name, matching (`Card.tsx` → `Card`).
- Hooks: `useX.ts`, one primary export named after the file (`useAuth.ts` → `useAuth`).
- Zustand stores: `use<Domain>Store` (`useAuthStore`, `useSelectCityStore`).
- Constants: `UPPER_SNAKE_CASE`.
- Props type: `<ComponentName>Props`.

## Naming quality (apply when writing or reviewing a diff)

Flag and rename when a name doesn't say what it's for:

- **Generic handlers without a subject** — `handleChange`, `handleClick` → name the thing being changed/clicked (`handleEmailChange`, `handleSaveClick`).
- **Vague state without domain context** — `data`, `result`, `isLoading` used bare → `placesData`, `submitResult`, `isFetchingPlaces`.
- **Negative boolean flags** — `isDisabled`, `isNotVisible` → flip to affirmative where it reads better (`canSubmit`, `isVisible`).
- **Weak prop names without a subject** — `onClick`, `onChange`, `onClose` as a prop name with no domain noun → `onEmailChange`, `onDrawerClose` (a plain DOM event handler on a native element is fine as `onClick`; this is about a *component's own prop*).
- **`min`/`max` without context** — `minPrice`, `maxCount`, not bare `min`/`max`.

Don't rename mechanically on sight — this is judgment, not a lint rule. When reviewing, propose the rename with the reason; don't auto-apply unless asked to fix it.
