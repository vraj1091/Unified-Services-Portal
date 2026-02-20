@echo off
echo ========================================
echo  DEPLOYING ALL FIXES TO RENDER
echo ========================================
echo.
echo Fixed Issues:
echo  [1] Frontend: vite not found
echo  [2] Backend: pydantic Rust compilation
echo  [3] Mobile: Not configured for deployment
echo.
echo ========================================
echo.

cd /d "%~dp0"

echo [Step 1/3] Adding all changes...
git add .

echo.
echo [Step 2/3] Committing fixes...
git commit -m "Fix: Resolve all Render deployment issues (frontend, backend, mobile)"

echo.
echo [Step 3/3] Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo  DEPLOYMENT STARTED!
echo ========================================
echo.
echo Render is now building your services:
echo.
echo  1. Backend API (Python)     - 3-5 min
echo  2. Frontend Web (React)     - 2-3 min
echo  3. Mobile App (Expo Web)    - 2-3 min
echo  4. PostgreSQL Database      - 1-2 min
echo.
echo Total deployment time: 8-13 minutes
echo.
echo Monitor progress at:
echo https://dashboard.render.com
echo.
echo Your services will be available at:
echo  - Backend:  https://gujarat-portal-backend.onrender.com
echo  - Frontend: https://gujarat-portal-frontend.onrender.com
echo  - Mobile:   https://gujarat-portal-mobile.onrender.com
echo.
pause
