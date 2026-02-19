@echo off
echo ========================================
echo  Push to GitHub Repository
echo ========================================
echo.

echo Step 1: Checking git status...
git status
echo.

echo Step 2: Adding all files...
git add -A
echo.

echo Step 3: Committing changes...
git commit -m "Complete mobile app with document management system - Added professional 2-color design - Implemented document upload and viewer - Fixed all navigation issues - Created complete working application"
echo.

echo Step 4: Setting remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/vraj1091/Unified-Services-Portal.git
echo.

echo Step 5: Pushing to GitHub...
git push -u origin main
echo.

echo ========================================
echo  Push Complete!
echo ========================================
echo.
echo Visit: https://github.com/vraj1091/Unified-Services-Portal
echo.
pause
