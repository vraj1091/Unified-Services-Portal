@echo off
title Gujarat Unified Services Portal - Startup
color 0A

echo.
echo ========================================================================
echo          GUJARAT UNIFIED SERVICES PORTAL - STARTING ALL SERVICES
echo ========================================================================
echo.

echo [1/3] Starting Backend API Server...
start "Backend API" cmd /k "cd backend && echo Starting Backend... && python main.py"
timeout /t 5 /nobreak >nul

echo [2/3] Starting Frontend Website...
start "Frontend Website" cmd /k "cd frontend && echo Starting Frontend... && npm run dev"
timeout /t 5 /nobreak >nul

echo [3/3] Starting Mobile App...
start "Mobile App" cmd /k "cd mobile-app && echo Starting Mobile App... && npm start"
timeout /t 3 /nobreak >nul

echo.
echo ========================================================================
echo                        ALL SERVICES STARTED!
echo ========================================================================
echo.
echo Backend API:     http://localhost:8000
echo API Docs:        http://localhost:8000/docs
echo Frontend:        http://localhost:5173
echo Mobile App:      Scan QR code with Expo Go app
echo.
echo ========================================================================
echo.
echo Press any key to close this window (services will keep running)...
pause >nul
