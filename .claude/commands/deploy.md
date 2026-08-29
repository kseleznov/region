# Deploy

There is no CI/CD or hosting pipeline configured in this repo yet (no workflow files, no `vercel.json`/`Dockerfile` for the app itself — only a `docker-compose.yml` for the local Postgres instance). This command is a **pre-push readiness check**, not an actual deploy trigger — running it does not deploy anything anywhere.

## Steps

1. **Check current state**

   ```bash
   git status
   git branch --show-current
   ```

2. **Lint** the package(s) you changed

   ```bash
   cd frontend && npm run lint
   ```

   Stop and report if there are errors — don't continue with lint failing.

3. **Production build**

   ```bash
   cd frontend && npm run build
   ```

   Stop and report if the build fails — never push broken code.

4. **Push**

   ```bash
   git push origin <current-branch>
   ```

   Confirm with the user before pushing if you haven't already been told to push in this turn.

5. **Report** — branch, whether lint/build passed, whether the push succeeded, and remind the user that nothing beyond git push happened (no actual deployment ran).

If the user wants a real deploy pipeline (Vercel/hosting + CI), that's a separate, larger piece of setup — surface it as a decision rather than assuming a target.
