@echo off
REM Test script for Intelligent Teleprompter Python Backend on Windows

echo ========================================
echo Testing Teleprompter Backend
echo ========================================
echo.

REM Check if curl is available (Windows 10+ has it built-in)
where curl >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: curl is not available
    echo Please install curl or use PowerShell to test:
    echo   Invoke-WebRequest -Uri http://localhost:5000/health
    pause
    exit /b 1
)

echo Testing health endpoint at http://localhost:5000/health
echo.
curl http://localhost:5000/health
echo.
echo.

if %errorlevel% equ 0 (
    echo ========================================
    echo Backend is running correctly!
    echo ========================================
) else (
    echo ========================================
    echo ERROR: Backend is not responding
    echo Make sure the server is running with run.bat
    echo ========================================
)

echo.
pause
