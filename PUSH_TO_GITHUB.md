# Push Code to GitHub Repository

## Repository URL
https://github.com/vraj1091/Unified-Services-Portal

## Step-by-Step Instructions

### 1. Open Command Prompt or PowerShell
Navigate to your project directory:
```bash
cd C:\Users\vrajr\Downloads\gujarat-unified-services-portal-grants-and-improvements\gujarat-unified-services-portal-grants-and-improvements
```

### 2. Check Current Git Status
```bash
git status
```

### 3. Add Remote Repository (if not already added)
```bash
git remote add origin https://github.com/vraj1091/Unified-Services-Portal.git
```

Or if remote already exists, update it:
```bash
git remote set-url origin https://github.com/vraj1091/Unified-Services-Portal.git
```

### 4. Check Remote
```bash
git remote -v
```

### 5. Add All Files
```bash
git add -A
```

Or add specific directories:
```bash
git add .
```

### 6. Commit Changes
```bash
git commit -m "Complete mobile app with document management system

- Added professional 2-color design system
- Implemented global document context for cross-app document management
- Fixed document upload functionality with TouchableOpacity
- Created document viewer with preview, download, share, delete features
- Integrated utility services flow with document uploads
- Added service providers screen with comprehensive provider database
- Implemented company formation and government grants screens
- Fixed all navigation and routing issues
- Added proper error handling and user feedback
- Created complete working mobile application"
```

### 7. Push to GitHub
```bash
git push -u origin main
```

Or if your branch is named 'master':
```bash
git push -u origin master
```

### 8. If Push is Rejected (force push - use with caution)
```bash
git push -u origin main --force
```

## Alternative: Using GitHub Desktop

1. Open GitHub Desktop
2. File → Add Local Repository
3. Select: `C:\Users\vrajr\Downloads\gujarat-unified-services-portal-grants-and-improvements\gujarat-unified-services-portal-grants-and-improvements`
4. Click "Commit to main" button
5. Click "Push origin" button

## Manual Commands (Copy and Paste)

```bash
# Navigate to project
cd C:\Users\vrajr\Downloads\gujarat-unified-services-portal-grants-and-improvements\gujarat-unified-services-portal-grants-and-improvements

# Configure git (if first time)
git config user.name "vraj1091"
git config user.email "your-email@example.com"

# Add remote
git remote add origin https://github.com/vraj1091/Unified-Services-Portal.git

# Stage all changes
git add -A

# Commit
git commit -m "Complete mobile app with document management system"

# Push
git push -u origin main
```

## If You Get Authentication Error

### Option 1: Use Personal Access Token
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: repo (all)
4. Copy the token
5. When prompted for password, paste the token

### Option 2: Use GitHub CLI
```bash
# Install GitHub CLI first
winget install GitHub.cli

# Authenticate
gh auth login

# Push
git push -u origin main
```

## Verify Upload

After pushing, visit:
https://github.com/vraj1091/Unified-Services-Portal

You should see all your files uploaded!

## Project Structure Being Uploaded

```
gujarat-unified-services-portal-grants-and-improvements/
├── backend/                    # Backend API
├── frontend/                   # Web frontend
├── mobile-app/                 # React Native mobile app
│   ├── src/
│   │   ├── context/           # Global state management
│   │   │   ├── AuthContext.js
│   │   │   ├── ThemeContext.js
│   │   │   └── DocumentContext.js  # NEW: Document management
│   │   ├── screens/           # All app screens
│   │   │   ├── auth/          # Login, Register
│   │   │   ├── utility/       # Utility services flow
│   │   │   ├── company/       # Company formation
│   │   │   ├── grants/        # Government grants
│   │   │   └── *.js           # Dashboard, Documents, etc.
│   │   └── theme/             # Design system
│   ├── App.js                 # Main app entry
│   └── package.json
├── terraform/                  # Infrastructure as code
├── docker-compose.yml
├── README.md
└── Documentation files
```

## What's Included

✅ Complete mobile application
✅ Document management system
✅ Professional UI/UX design
✅ All service flows (Utility, Company, Grants)
✅ Authentication system
✅ Navigation setup
✅ Context providers
✅ All documentation files

## Troubleshooting

### Error: "fatal: not a git repository"
```bash
git init
git remote add origin https://github.com/vraj1091/Unified-Services-Portal.git
```

### Error: "Updates were rejected"
```bash
git pull origin main --rebase
git push -u origin main
```

### Error: "Permission denied"
- Check your GitHub credentials
- Use Personal Access Token instead of password
- Or use SSH key authentication

## Need Help?

If you encounter any issues, share the error message and I'll help you resolve it!
