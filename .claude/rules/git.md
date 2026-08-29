# Git conventions (whole repo)

Repo-wide, not layer-specific — applies to `frontend/` and `backend/` alike. Matches the convention already visible in `git log` (e.g. `refactor(users): extract constants...`, `chore(backend): add PrismaService disconnect...`).

## Commit messages — Conventional Commits

```
type(scope): description
```

**Types:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`.
**Scope:** the touched slice or area (`auth`, `places`, `frontend`, `backend`) — matches existing history's style of scoping by domain/module.

Examples: `feat(auth): add Google login`, `fix(places): handle expired access token`, `refactor(select-city): extract confirm button to its own component`.

## Branch naming

`type/kebab-words` — `feature/`, `fix/`, `refactor/`, `documentation/`, `test/`, `chore/`. Example: `feature/city-search`, `fix/token-refresh`.

## Rules

- One commit = one logical change.
- Don't commit `.env`, secrets, `node_modules`, build output (`dist/`, `.next/`).
- Never commit directly to `main` without being asked to.
- Don't commit if `npm run lint` (in the touched package) is failing because of the change you're making.
