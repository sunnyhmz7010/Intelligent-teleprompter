# Run script for Intelligent Teleprompter Python Backend on Windows (PowerShell)

Write-Host "========================================"  -ForegroundColor Cyan
Write-Host "Intelligent Teleprompter Backend" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if virtual environment exists
if (-not (Test-Path "venv\Scripts\Activate.ps1")) {
    Write-Host "[ERROR] Virtual environment not found!" -ForegroundColor Red
    Write-Host "Please run setup.ps1 first to set up the environment." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Starting Python Flask server..." -ForegroundColor Green
Write-Host "Server will be available at http://localhost:5000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Activate virtual environment and run server
& .\venv\Scripts\Activate.ps1
python server.py
