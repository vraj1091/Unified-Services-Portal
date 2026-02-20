@echo off
REM Unified Services Portal - Deployment Script with Data Seeding (Windows)

setlocal enabledelayedexpansion

echo.
echo ==========================================
echo Unified Services Portal - Deployment
echo ==========================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not installed or not in PATH
    exit /b 1
)
echo [OK] Docker found

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker Compose is not installed or not in PATH
    exit /b 1
)
echo [OK] Docker Compose found

REM Step 1: Build images
echo.
echo [STEP 1] Building Docker images...
docker-compose build --no-cache
if errorlevel 1 (
    echo [ERROR] Failed to build images
    exit /b 1
)
echo [OK] Images built successfully

REM Step 2: Start services
echo.
echo [STEP 2] Starting services...
docker-compose up -d
if errorlevel 1 (
    echo [ERROR] Failed to start services
    exit /b 1
)
echo [OK] Services started

REM Step 3: Wait for backend to be ready
echo.
echo [STEP 3] Waiting for backend to be ready...
timeout /t 10 /nobreak

REM Check if backend is healthy (simplified for Windows)
echo Checking backend health...
for /L %%i in (1,1,30) do (
    docker-compose exec -T backend curl -f http://localhost:8000/health >nul 2>&1
    if errorlevel 0 (
        echo [OK] Backend is healthy
        goto backend_ready
    )
    echo Waiting for backend... (%%i/30)
    timeout /t 2 /nobreak
)

:backend_ready

REM Step 4: Verify data
echo.
echo [STEP 4] Verifying data...

REM Try to get grants count
for /f "delims=" %%i in ('docker-compose exec -T backend curl -s http://localhost:8000/api/grants 2^>nul ^| find /c "id"') do set GRANT_COUNT=%%i

if %GRANT_COUNT% gtr 0 (
    echo [OK] Data verified: %GRANT_COUNT% grants found
) else (
    echo [WARNING] No grants found, seeding database...
    docker-compose exec -T backend python seed_all_data.py
    echo [OK] Database seeded
)

REM Step 5: Display status
echo.
echo ==========================================
echo [SUCCESS] DEPLOYMENT SUCCESSFUL
echo ==========================================
echo.
echo Services Status:
docker-compose ps
echo.
echo Access your application:
echo   Frontend: http://localhost:80
echo   Backend:  http://localhost:8000
echo   API Docs: http://localhost:8000/docs
echo.
echo View logs:
echo   docker-compose logs -f backend
echo   docker-compose logs -f frontend
echo.
echo Stop services:
echo   docker-compose down
echo.

pause

