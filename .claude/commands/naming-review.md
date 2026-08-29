# Naming Review

Audit naming in the current diff (or specified files) against `frontend/.claude/rules/naming.md`.

## Steps

1. **Identify scope**

   ```bash
   git diff --staged --name-only
   git diff --name-only
   ```

   No args → review the diff. A path given → review that file.

2. **Check each file** against the naming-quality checklist in `frontend/.claude/rules/naming.md`:

   - Generic handlers without a subject (`handleChange`, `handleClick`)
   - Vague state without domain context (`data`, `result`, `isLoading`)
   - Negative boolean flags (`isDisabled`, `isNotVisible`)
   - Weak prop names without a subject (`onClick`, `onChange` as a component's own prop)
   - `min`/`max` without context

3. **Report findings**

   ```
   file.ts:42  handleChange → handleEmailChange   (generic handler — missing subject)
   store.ts:8  isLoading → isFetchingUser         (vague — loading what?)
   ```

4. **Propose renames** — exact search→replace per finding. Don't rename automatically; wait for approval unless the user says "fix it."
