# Test script for Intelligent Teleprompter Python Backend on Windows (PowerShell)

Write-Host "========================================"  -ForegroundColor Cyan
Write-Host "Testing Teleprompter Backend" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Testing health endpoint at http://localhost:5000/health" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/health" -UseBasicParsing
    $content = $response.Content | ConvertFrom-Json
    
    Write-Host "Response:" -ForegroundColor Green
    Write-Host "  Status: $($content.status)" -ForegroundColor White
    Write-Host "  Message: $($content.message)" -ForegroundColor White
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Backend is running correctly!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
} catch {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "ERROR: Backend is not responding" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure the server is running with run.ps1 or run.bat" -ForegroundColor Yellow
    Write-Host "Error details: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to exit"
