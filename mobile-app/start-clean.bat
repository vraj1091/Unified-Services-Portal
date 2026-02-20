@echo off
echo Starting Mobile App (Clean)...
echo.

cd /d "%~dp0"

REM Kill any existing node processes
taskkill /F /IM node.exe 2>nul

REM Clear cache
if exist .expo rmdir /s /q .expo

REM Start Expo
echo Starting Expo dev server...
echo.
npx expo start --web --clear

pause
