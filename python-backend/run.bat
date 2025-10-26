@echo off
REM Run script for Intelligent Teleprompter Python Backend on Windows

echo ========================================
echo Intelligent Teleprompter Backend
echo ========================================
echo.

REM Check if virtual environment exists
if not exist "venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    echo Please run setup.bat first to set up the environment.
    pause
    exit /b 1
)

echo Starting Python Flask server...
echo Server will be available at http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

REM Activate virtual environment and run server
call venv\Scripts\activate.bat
python server.py
