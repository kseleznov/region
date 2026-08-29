---
paths: ['frontend/src/**/*.test.ts', 'frontend/src/**/*.test.tsx']
---

# Testing

There is no test framework configured in `frontend/` (no Jest/Vitest/Testing Library in `package.json`, no test script beyond `lint`). This is a factual gap, not a convention to preserve — but don't:

- Claim something is "tested" based on `npm run lint`/`npm run build` passing.
- Invent a `npm run test` command that doesn't exist.
- Silently add a single test file without a runner — a lone `*.test.ts` with no framework installed will not run and gives false confidence.

If the user asks for tests to be added, that's a setup decision (which runner, config, CI wiring) — surface it explicitly rather than picking one unilaterally and bolting on a partial setup.
