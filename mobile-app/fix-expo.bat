@echo off
echo ========================================
echo  FIXING EXPO WEBSOCKET ERROR
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Stopping any running Expo processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 >nul

echo.
echo [2/5] Clearing Expo cache...
if exist .expo rmdir /s /q .expo
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo.
echo [3/5] Clearing Metro bundler cache...
npx expo start -c --clear

echo.
echo [4/5] Reinstalling dependencies...
npm install

echo.
echo [5/5] Starting Expo with clean cache...
echo.
echo ========================================
echo  STARTING EXPO DEV SERVER
echo ========================================
echo.
echo The app will open in your browser.
echo Press Ctrl+C to stop the server.
echo.

npx expo start --web --clear

pause
