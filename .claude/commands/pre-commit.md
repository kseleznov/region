# Pre-commit

Run pre-commit checks for changes under `frontend/` (or `backend/`, if you touched that instead) and commit.

## Steps

1. **Check what changed**

   ```bash
   git status
   git diff --staged --name-only
   git diff --name-only
   ```

2. **Run lint** in whichever package(s) changed

   ```bash
   cd frontend && npm run lint
   ```

   (a `PostToolUse` hook already auto-fixes formatting on every edit — see `.claude/settings.json` — so this should mostly catch real issues, not formatting drift). If errors — fix them before continuing.

3. **Run a build sanity check** (optional but recommended for anything beyond a trivial change)

   ```bash
   cd frontend && npm run build
   ```

   If it fails — stop and report; don't commit broken code.

4. **Stage specific files** — never `git add .`/`git add -A`. Show the user what's staged.

5. **Commit** — Conventional Commits (`type(scope): description`), see `.claude/rules/git.md`. Don't commit directly to `main` without confirming with the user first.

There is no husky/lint-staged in this repo and no automated doc-freshness check — `frontend/AGENTS.md` and `frontend/.claude/{rules,docs}/*.md` are kept up to date manually. If you changed a convention while doing this work, update the matching file yourself before committing.
