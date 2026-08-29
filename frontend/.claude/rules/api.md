---
paths: ['frontend/src/shared/api/**']
---

# API layer

`shared/api/axios.ts` exports `apiClient` — the one and only axios instance in the app. It:

- Sets `baseURL` from `NEXT_PUBLIC_API_URL` and `withCredentials: true` (the backend uses httpOnly cookies for the JWT access/refresh pair — there is no bearer token in JS-visible storage).
- Has a response interceptor that transparently refreshes the access token on a 401, queues concurrent requests during the refresh, and retries them; on refresh failure it redirects to `ROUTES.signIn`.

## Rules

- Never create a second `axios.create(...)` instance, and never call `fetch()` for a backend endpoint — always go through `apiClient`.
- Per-slice API modules (`entities/place/api/placeApi.ts`, `features/auth/api/authApi.ts`) are plain objects of `async` functions, each typed with an explicit return type against `shared/types/` or the slice's own `model/types.ts` — not a class, not an untyped `any` response.
- Don't add a second refresh/retry mechanism inside a per-slice API module — the 401 handling is centralized in the interceptor; a slice's API function should just call `apiClient` and let it propagate.
- If an endpoint can legitimately return "not found" as a normal outcome (not an error to surface), catch and return `null` at the API-module boundary rather than letting the caller catch axios errors (see `placeApi.getById`).
