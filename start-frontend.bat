@echo off
title Gujarat Portal - Frontend
color 0B

echo.
echo ========================================================================
echo                    STARTING FRONTEND WEBSITE
echo ========================================================================
echo.

cd frontend

echo Installing dependencies (if needed)...
call npm install

echo.
echo Starting development server...
echo.
echo Frontend will be available at: http://localhost:5173
echo.
echo ========================================================================
echo.

call npm run dev

pause
