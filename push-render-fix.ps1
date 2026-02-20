Write-Host "========================================" -ForegroundColor Cyan
Write-Host " PUSHING RENDER FIX TO GITHUB" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location $PSScriptRoot

Write-Host "[1/3] Adding all changes..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "[2/3] Committing changes..." -ForegroundColor Yellow
git commit -m "Fix: Remove Pillow dependency causing Render build failure"

Write-Host ""
Write-Host "[3/3] Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " PUSH COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Render will now automatically rebuild your app." -ForegroundColor White
Write-Host "Check deployment status at: https://dashboard.render.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "Expected deployment time: 5-10 minutes" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to exit"
