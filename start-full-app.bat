@echo off
echo ========================================
echo Starting Gujarat Unified Services Portal
echo ========================================
echo.

echo [1/2] Starting Backend Server on port 8000...
start "Backend - Port 8000" cmd /k "cd backend && uvicorn app.main:app --reload --port 8000"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend Server on port 5173...
start "Frontend - Port 5173" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Application Started!
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo API Docs: http://localhost:8000/docs
echo.
echo Press any key to stop all servers...
pause >nul

echo.
echo Stopping servers...
taskkill /FI "WindowTitle eq Backend*" /T /F
taskkill /FI "WindowTitle eq Frontend*" /T /F

echo.
echo All servers stopped.
pause
