@echo off
title Gujarat Portal - Mobile App
color 0E

echo.
echo ========================================================================
echo                    STARTING MOBILE APP
echo ========================================================================
echo.

cd mobile-app

echo Installing dependencies (if needed)...
call npm install

echo.
echo Starting Expo development server...
echo.
echo IMPORTANT: 
echo 1. Install "Expo Go" app on your phone
echo 2. Scan the QR code that will appear
echo 3. Make sure your phone and computer are on the same WiFi
echo.
echo ========================================================================
echo.

call npm start

pause
