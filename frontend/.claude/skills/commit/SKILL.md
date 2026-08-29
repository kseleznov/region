---
name: commit
description: Prepares and makes a git commit for frontend changes following this repo's Conventional Commits convention. Use when the user asks to commit frontend work.
---

1. Run `git status` and `git diff --staged` (and `git diff` if nothing is staged yet) to see what changed.
2. Determine the commit type: `feat` / `fix` / `refactor` / `docs` / `test` / `chore`.
3. Write the message: `type(scope): description` — scope is the touched FSD slice or area (`auth`, `save-card`, `city-info`), max ~72 chars on the first line. Add a body only if the *why* isn't obvious from the diff.
4. Check the current branch (`git branch --show-current`) — if it's `main`, stop and confirm with the user before committing directly to it.
5. Run `npm run lint` from `frontend/` — if it fails because of this change, stop and report; don't commit.
6. Stage specific files (never `git add .`/`git add -A`) and show the user what's staged before committing.
7. Commit.

See `.claude/rules/git.md` for the full type list and branch-naming convention.

## Rules

- One commit = one logical change.
- Never stage `.env`, `node_modules`, `.next/`, or other build output.
- Don't commit if lint is failing because of the change being committed.
