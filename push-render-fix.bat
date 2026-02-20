@echo off
echo ========================================
echo  PUSHING RENDER FIX TO GITHUB
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Adding all changes...
git add .

echo.
echo [2/3] Committing changes...
git commit -m "Fix: Remove Pillow dependency causing Render build failure"

echo.
echo [3/3] Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo  PUSH COMPLETE!
echo ========================================
echo.
echo Render will now automatically rebuild your app.
echo Check deployment status at: https://dashboard.render.com
echo.
echo Expected deployment time: 5-10 minutes
echo.
pause
