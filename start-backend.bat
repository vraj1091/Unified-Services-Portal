@echo off
title Gujarat Portal - Backend
color 0C

echo.
echo ========================================================================
echo                    STARTING BACKEND API SERVER
echo ========================================================================
echo.

cd backend

echo Installing dependencies (if needed)...
pip install -r requirements.txt

echo.
echo Starting API server...
echo.
echo Backend will be available at: http://localhost:8000
echo API Docs will be available at: http://localhost:8000/docs
echo.
echo ========================================================================
echo.

python main.py

pause
