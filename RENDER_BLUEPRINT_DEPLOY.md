# Render Deployment Blueprint (Working)

This repo is now configured for one-click Render Blueprint deploy using `render.yaml`.

## What gets deployed

1. `gujarat-portal-db` (PostgreSQL, free plan)
2. `gujarat-portal-backend` (FastAPI, Python web service)
3. `gujarat-portal-frontend` (Vite static site)

## Important behavior included

- Backend auto-seeds grants/tables on each start:
  - `python -m app.seed_data.seed_database`
- DB URL works for Render Postgres URLs (`postgres://` and `postgresql://`)
- CORS allows:
  - your Render frontend domain(s)
  - localhost on any port during development

## Deploy steps

1. Push this repository to GitHub.
2. Open Render dashboard.
3. Click `New` -> `Blueprint`.
4. Connect your GitHub repo.
5. Select the branch and deploy.

Render reads `render.yaml` automatically and provisions all services.

## After first deploy

1. Open backend URL and confirm health:
   - `https://<your-backend>.onrender.com/api/health`
2. Open frontend URL and test:
   - Register
   - Login
   - Create an application

## If service names are changed in Render

Update these values in `render.yaml` and redeploy:

- `FRONTEND_URL` (backend env var)
- `BACKEND_CORS_ORIGINS` (backend env var)
- `VITE_API_URL` (frontend env var)

## Common fixes

1. `401` on frontend:
   - confirm backend and frontend URLs in env vars match actual Render domains.
2. CORS errors:
   - check `BACKEND_CORS_ORIGINS` contains frontend domain.
   - keep `BACKEND_CORS_ORIGIN_REGEX` as configured.
3. DB errors after deploy:
   - verify backend `DATABASE_URL` is connected via `fromDatabase.connectionString`.
