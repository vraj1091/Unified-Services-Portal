# Fix: WebSocket Connection Error

## Error
```
WebSocket connection to 'ws://localhost:19006/_expo/ws' failed
```

## What This Means

The Expo development server is not running or not accessible on port 19006.

## Quick Fix (Run This)

### Option 1: Use Fix Script (Easiest)
```bash
cd mobile-app
fix-expo.bat
```

### Option 2: Manual Steps

1. **Stop all Node processes**:
   ```bash
   taskkill /F /IM node.exe
   ```

2. **Clear Expo cache**:
   ```bash
   cd mobile-app
   rmdir /s /q .expo
   rmdir /s /q node_modules\.cache
   ```

3. **Start Expo with clean cache**:
   ```bash
   npx expo start --web --clear
   ```

## Common Causes & Solutions

### Cause 1: Port 19006 Already in Use

**Solution**:
```bash
# Kill process on port 19006
netstat -ano | findstr :19006
taskkill /F /PID [PID_NUMBER]

# Or use different port
npx expo start --web --port 19007
```

### Cause 2: Expo Not Installed

**Solution**:
```bash
cd mobile-app
npm install
npx expo install
```

### Cause 3: Corrupted Cache

**Solution**:
```bash
cd mobile-app
npx expo start --clear
```

### Cause 4: Firewall Blocking

**Solution**:
- Allow Node.js through Windows Firewall
- Or temporarily disable firewall for testing

### Cause 5: Wrong Directory

**Solution**:
```bash
# Make sure you're in mobile-app folder
cd mobile-app
npx expo start --web
```

## Step-by-Step Fix

### Step 1: Clean Everything
```bash
cd mobile-app
taskkill /F /IM node.exe
rmdir /s /q .expo
rmdir /s /q node_modules\.cache
```

### Step 2: Reinstall Dependencies
```bash
npm install
```

### Step 3: Start Fresh
```bash
npx expo start --web --clear
```

### Step 4: Open Browser
- Browser should auto-open to: http://localhost:19006
- If not, manually open: http://localhost:19006

## Alternative: Use Different Port

If port 19006 is blocked:

```bash
npx expo start --web --port 8081
```

Then open: http://localhost:8081

## Check if Expo is Running

Open browser and visit:
- http://localhost:19006 (should show Expo app)
- http://localhost:19006/_expo/ws (WebSocket endpoint)

## Scripts Created

1. **fix-expo.bat** - Complete fix (clears cache, reinstalls, starts)
2. **start-clean.bat** - Quick clean start

## If Still Not Working

### Check Node.js Version
```bash
node --version
```
Should be: v16.x or higher

### Check npm Version
```bash
npm --version
```
Should be: v8.x or higher

### Reinstall Expo CLI
```bash
npm install -g expo-cli
```

### Check Firewall
```bash
# Windows Firewall
netsh advfirewall firewall add rule name="Node.js" dir=in action=allow program="C:\Program Files\nodejs\node.exe" enable=yes
```

## Expected Output

When working correctly, you should see:
```
Metro waiting on exp://192.168.x.x:19006
› Press w │ open web

› Press a │ open Android
› Press i │ open iOS simulator
› Press j │ open debugger

› Press r │ reload app
› Press m │ toggle menu
› Press ? │ show all commands

Logs for your project will appear below.
```

## Test the Fix

1. Run: `fix-expo.bat`
2. Wait for "Metro waiting on..."
3. Press `w` to open web
4. Browser should open with your app
5. No WebSocket errors in console

## Success Indicators

✅ Browser opens automatically
✅ App loads in browser
✅ No WebSocket errors in console
✅ Hot reload works when you edit files
✅ Console shows "Metro waiting on..."

## Still Having Issues?

### Try Different Browser
- Chrome (recommended)
- Firefox
- Edge

### Check localhost
```bash
ping localhost
```
Should respond with 127.0.0.1

### Check hosts file
File: `C:\Windows\System32\drivers\etc\hosts`

Should contain:
```
127.0.0.1 localhost
```

## Quick Commands Reference

```bash
# Start normally
npx expo start --web

# Start with clear cache
npx expo start --web --clear

# Start on different port
npx expo start --web --port 8081

# Kill all node processes
taskkill /F /IM node.exe

# Clear Expo cache
rmdir /s /q .expo

# Reinstall dependencies
npm install
```

---

**Run `fix-expo.bat` to fix everything automatically!**
