# Quick Push Script for bapu Branch
# This script helps you push to the bapu branch with proper authentication

Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     PUSH TO BAPU BRANCH - QUICK SETUP                        ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "Unified-Services-Portal/.git")) {
    Write-Host "❌ Error: Not in the correct directory" -ForegroundColor Red
    Write-Host "Please run this script from the root directory" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Git repository found" -ForegroundColor Green
Write-Host ""

# Check current branch
$branch = git -C Unified-Services-Portal rev-parse --abbrev-ref HEAD
Write-Host "Current branch: $branch" -ForegroundColor Cyan

# Switch to bapu if needed
if ($branch -ne "bapu") {
    Write-Host "Switching to bapu branch..." -ForegroundColor Yellow
    git -C Unified-Services-Portal checkout bapu
    Write-Host "✓ Switched to bapu branch" -ForegroundColor Green
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan

# Show commits to push
Write-Host ""
Write-Host "📤 Commits to push:" -ForegroundColor Cyan
$commits = git -C Unified-Services-Portal log origin/bapu..bapu --oneline
if ($commits) {
    Write-Host $commits
    Write-Host ""
} else {
    Write-Host "No commits to push" -ForegroundColor Yellow
    exit 0
}

Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan

# Ask for authentication method
Write-Host ""
Write-Host "🔐 Choose Authentication Method:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. GitHub CLI (Recommended - easiest)" -ForegroundColor Green
Write-Host "2. Personal Access Token" -ForegroundColor Yellow
Write-Host "3. Git Credential Manager" -ForegroundColor Yellow
Write-Host "4. SSH" -ForegroundColor Yellow
Write-Host ""

$method = Read-Host "Enter choice (1-4)"

Write-Host ""

switch ($method) {
    "1" {
        Write-Host "📥 GitHub CLI Setup" -ForegroundColor Cyan
        Write-Host ""
        
        # Check if GitHub CLI is installed
        $ghInstalled = $null -ne (Get-Command gh -ErrorAction SilentlyContinue)
        
        if (-not $ghInstalled) {
            Write-Host "❌ GitHub CLI is not installed" -ForegroundColor Red
            Write-Host ""
            Write-Host "Install from: https://cli.github.com/" -ForegroundColor Yellow
            Write-Host "Or run: choco install gh" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "After installing, run this script again" -ForegroundColor Cyan
            exit 1
        }
        
        Write-Host "✓ GitHub CLI found" -ForegroundColor Green
        Write-Host ""
        Write-Host "Authenticating with GitHub..." -ForegroundColor Cyan
        gh auth login
        
        Write-Host ""
        Write-Host "✓ Authentication successful" -ForegroundColor Green
    }
    "2" {
        Write-Host "🔑 Personal Access Token Setup" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "1. Go to: https://github.com/settings/tokens" -ForegroundColor Yellow
        Write-Host "2. Click 'Generate new token (classic)'"
        Write-Host "3. Select 'repo' scope"
        Write-Host "4. Copy the token"
        Write-Host ""
        
        $token = Read-Host "Paste your Personal Access Token"
        if (-not $token) {
            Write-Host "❌ No token provided" -ForegroundColor Red
            exit 1
        }
        
        # Update remote with token
        $remote = "https://vraj1091:$token@github.com/vraj1091/Unified-Services-Portal.git"
        git -C Unified-Services-Portal remote set-url origin $remote
        Write-Host "✓ Remote updated with token" -ForegroundColor Green
    }
    "3" {
        Write-Host "🔐 Git Credential Manager Setup" -ForegroundColor Cyan
        Write-Host ""
        git config --global credential.helper manager
        Write-Host "✓ Credential Manager configured" -ForegroundColor Green
        Write-Host ""
        Write-Host "Git will prompt for credentials when you push" -ForegroundColor Yellow
    }
    "4" {
        Write-Host "🔐 SSH Setup" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "1. Generate SSH key: ssh-keygen -t ed25519 -C 'your-email@gmail.com'" -ForegroundColor Yellow
        Write-Host "2. Add to GitHub: https://github.com/settings/keys"
        Write-Host "3. Update remote: git remote set-url origin git@github.com:vraj1091/Unified-Services-Portal.git"
        Write-Host "4. Then run this script again"
        exit 0
    }
    default {
        Write-Host "❌ Invalid choice" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan

# Push to GitHub
Write-Host ""
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
Write-Host ""

try {
    git -C Unified-Services-Portal push origin bapu
    
    Write-Host ""
    Write-Host "✅ SUCCESS! Code pushed to GitHub" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 Verify on GitHub:" -ForegroundColor Cyan
    Write-Host "https://github.com/vraj1091/Unified-Services-Portal/tree/bapu" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "✨ Your commits are now on GitHub!" -ForegroundColor Green
    
} catch {
    Write-Host ""
    Write-Host "❌ Error pushing to GitHub" -ForegroundColor Red
    Write-Host $_.Exception.Message
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Check your authentication method"
    Write-Host "2. Verify token/credentials are correct"
    Write-Host "3. Check internet connection"
    Write-Host "4. Try again with different authentication method"
    exit 1
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
