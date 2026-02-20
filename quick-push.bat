@echo off
echo ========================================
echo  QUICK PUSH - SIMPLIFIED DEPLOYMENT
echo ========================================
echo.
echo Changes:
echo  - Simplified render.yaml
echo  - Removed mobile app (causing issues)
echo  - Removed complex service references
echo  - Added manual deployment guide
echo.
pause
echo.

git add -A
git commit -m "Fix: Simplify deployment - remove mobile app, use direct URLs"
git push origin main

echo.
echo ========================================
echo  PUSHED TO GITHUB!
echo ========================================
echo.
echo IMPORTANT: Blueprint may still fail.
echo.
echo RECOMMENDED: Deploy manually instead
echo  1. Read SIMPLE_DEPLOY_GUIDE.md
echo  2. Deploy backend manually
echo  3. Deploy frontend manually
echo  4. Skip mobile app for now
echo.
echo This will give you working backend + frontend
echo in 10-15 minutes with full logs visible.
echo.
pause
