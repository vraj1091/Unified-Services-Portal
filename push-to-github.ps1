# Push Code to GitHub - Collaborator Edition
# This script helps you push code to the bapu branch

Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     PUSH CODE TO GITHUB - COLLABORATOR EDITION               ║" -ForegroundColor Cyan
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

# Check if on bapu branch
if ($branch -ne "bapu") {
    Write-Host "⚠ Warning: You're on '$branch' branch, not 'bapu'" -ForegroundColor Yellow
    $switch = Read-Host "Switch to bapu branch? (y/n)"
    if ($switch -eq "y") {
        git -C Unified-Services-Portal checkout bapu
        Write-Host "✓ Switched to bapu branch" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan

# Show status
Write-Host ""
Write-Host "📊 Current Status:" -ForegroundColor Cyan
git -C Unified-Services-Portal status

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan

# Check for uncommitted changes
$status = git -C Unified-Services-Portal status --porcelain
if ($status) {
    Write-Host ""
    Write-Host "⚠ You have uncommitted changes:" -ForegroundColor Yellow
    Write-Host $status
    Write-Host ""
    
    $commit = Read-Host "Do you want to commit these changes? (y/n)"
    if ($commit -eq "y") {
        $message = Read-Host "Enter commit message"
        git -C Unified-Services-Portal add .
        git -C Unified-Services-Portal commit -m $message
        Write-Host "✓ Changes committed" -ForegroundColor Green
    } else {
        Write-Host "Skipping commit" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan

# Check commits to push
Write-Host ""
Write-Host "📤 Commits to push:" -ForegroundColor Cyan
$commits = git -C Unified-Services-Portal log origin/bapu..bapu --oneline
if ($commits) {
    Write-Host $commits
} else {
    Write-Host "No commits to push" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan

# Ask for authentication method
Write-Host ""
Write-Host "🔐 Authentication Methods:" -ForegroundColor Cyan
Write-Host "1. GitHub CLI (Recommended - easiest)"
Write-Host "2. Personal Access Token"
Write-Host "3. Git Credential Manager"
Write-Host "4. SSH"
Write-Host ""

$method = Read-Host "Choose authentication method (1-4)"

switch ($method) {
    "1" {
        Write-Host ""
        Write-Host "📥 GitHub CLI Method" -ForegroundColor Cyan
        Write-Host "1. Download from: https://cli.github.com/" -ForegroundColor Yellow
        Write-Host "2. Install GitHub CLI"
        Write-Host "3. Run: gh auth login"
        Write-Host "4. Then run this script again"
        Write-Host ""
        Write-Host "Or install via: choco install gh" -ForegroundColor Yellow
        exit 0
    }
    "2" {
        Write-Host ""
        Write-Host "🔑 Personal Access Token Method" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "1. Go to: https://github.com/settings/tokens" -ForegroundColor Yellow
        Write-Host "2. Click 'Generate new token (classic)'"
        Write-Host "3. Select 'repo' scope"
        Write-Host "4. Copy the token"
        Write-Host ""
        
        $token = Read-Host "Paste your Personal Access Token"
        if ($token) {
            # Update remote with token
            $remote = "https://vraj1091:$token@github.com/vraj1091/Unified-Services-Portal.git"
            git -C Unified-Services-Portal remote set-url origin $remote
            Write-Host "✓ Remote updated with token" -ForegroundColor Green
        } else {
            Write-Host "❌ No token provided" -ForegroundColor Red
            exit 1
        }
    }
    "3" {
        Write-Host ""
        Write-Host "🔐 Git Credential Manager Method" -ForegroundColor Cyan
        Write-Host "Git Credential Manager will prompt for credentials" -ForegroundColor Yellow
        git config --global credential.helper manager
        Write-Host "✓ Credential Manager configured" -ForegroundColor Green
    }
    "4" {
        Write-Host ""
        Write-Host "🔐 SSH Method" -ForegroundColor Cyan
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
Write-Host "✨ Done! Your code is now on GitHub" -ForegroundColor Green
Write-Host ""

