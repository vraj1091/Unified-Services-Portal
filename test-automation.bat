@echo off
echo ========================================
echo Testing Automation API
echo ========================================
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && uvicorn app.main:app --reload --port 8000"

timeout /t 5 /nobreak >nul

echo.
echo Testing Automation Endpoint...
curl -X POST "http://localhost:8000/api/automation/torrent-power/name-change" ^
  -H "Content-Type: application/json" ^
  -d "{\"city\":\"Ahmedabad\",\"serviceNumber\":\"123456\",\"tNumber\":\"T789\",\"mobile\":\"9876543210\",\"email\":\"test@example.com\",\"confirmEmail\":\"test@example.com\"}"

echo.
echo.
echo ========================================
echo Test Complete!
echo ========================================
echo.
echo Press any key to stop the backend server...
pause >nul

taskkill /FI "WindowTitle eq Backend Server*" /T /F
