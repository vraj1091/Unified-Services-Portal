# 🚀 How to Run - Gujarat Unified Services Portal

## ⚡ Quick Start (Easiest Way)

### Option 1: Run Everything at Once
Double-click: **`start-all.bat`**

This will open 3 windows:
- Backend API (Port 8000)
- Frontend Website (Port 5173)
- Mobile App (Expo)

### Option 2: Run Individually
- **Backend only**: Double-click `start-backend.bat`
- **Frontend only**: Double-click `start-frontend.bat`
- **Mobile App only**: Double-click `start-mobile.bat`

---

## 📝 Manual Commands

### Frontend (Website)
```cmd
cd frontend
npm install
npm run dev
```
**Access at:** http://localhost:5173

### Backend (API)
```cmd
cd backend
pip install -r requirements.txt
python main.py
```
**Access at:** http://localhost:8000
**API Docs:** http://localhost:8000/docs

### Mobile App
```cmd
cd mobile-app
npm install
npm start
```
**Then:** Scan QR code with Expo Go app

---

## ❌ Fix Your Current Error

You got this error:
```
npm error Missing script: "start"
```

**Solution:** Use `npm run dev` instead of `npm start`

```cmd
cd frontend
npm run dev
```

---

## 🔧 Complete Setup from Scratch

### 1. Install Prerequisites
- **Python 3.8+**: https://www.python.org/downloads/
- **Node.js 16+**: https://nodejs.org/
- **Git**: https://git-scm.com/

### 2. Install Backend Dependencies
```cmd
cd backend
pip install -r requirements.txt
```

### 3. Install Frontend Dependencies
```cmd
cd frontend
npm install
```

### 4. Install Mobile App Dependencies
```cmd
cd mobile-app
npm install
```

### 5. Run Everything
Use `start-all.bat` or run each service manually

---

## 📱 Mobile App Setup

### Step 1: Install Expo Go
- **Android**: https://play.google.com/store/apps/details?id=host.exp.exponent
- **iOS**: https://apps.apple.com/app/expo-go/id982107779

### Step 2: Find Your IP Address
```cmd
ipconfig
```
Look for **IPv4 Address** (e.g., 192.168.1.100)

### Step 3: Update API URL
Edit `mobile-app\src\services\api.js`:
```javascript
const API_URL = 'http://192.168.1.100:8000';  // Your IP here
```

### Step 4: Run Mobile App
```cmd
cd mobile-app
npm start
```

### Step 5: Scan QR Code
Open Expo Go app and scan the QR code

---

## 🐛 Common Errors & Solutions

### Error: "Missing script: start"
**Problem:** Frontend uses `dev` not `start`
**Solution:**
```cmd
npm run dev
```

### Error: "Module not found"
**Problem:** Dependencies not installed
**Solution:**
```cmd
npm install
# or for Python
pip install -r requirements.txt
```

### Error: "Port already in use"
**Problem:** Service already running
**Solution:** Close the existing process or change port

### Error: "Can't connect to backend" (Mobile)
**Problem:** Using localhost instead of IP
**Solution:** Use your computer's IP address (192.168.x.x)

### Error: "ENOENT: no such file or directory"
**Problem:** Wrong directory
**Solution:** Make sure you're in the correct folder

---

## 📊 Service URLs

| Service | URL | Notes |
|---------|-----|-------|
| Frontend | http://localhost:5173 | Website |
| Backend | http://localhost:8000 | API Server |
| API Docs | http://localhost:8000/docs | Swagger UI |
| Mobile | Scan QR Code | Expo Go App |

---

## 🎯 What to Run for Different Tasks

### Testing Website:
```cmd
start-backend.bat
start-frontend.bat
```

### Testing Mobile App:
```cmd
start-backend.bat
start-mobile.bat
```

### Full Development:
```cmd
start-all.bat
```

---

## ✅ Verify Everything Works

### 1. Check Backend
Open: http://localhost:8000/docs
You should see API documentation

### 2. Check Frontend
Open: http://localhost:5173
You should see the website

### 3. Check Mobile
Scan QR code with Expo Go
App should load on your phone

---

## 💡 Pro Tips

1. **Always start Backend first** - Other services need it
2. **Use batch files** - Easier than typing commands
3. **Keep terminals open** - Closing stops the service
4. **Check firewall** - Allow Python and Node.js
5. **Same WiFi** - Phone and computer must be on same network

---

## 🚀 Quick Reference

### Start Everything:
```cmd
start-all.bat
```

### Start Frontend Only:
```cmd
cd frontend
npm run dev
```

### Start Backend Only:
```cmd
cd backend
python main.py
```

### Start Mobile Only:
```cmd
cd mobile-app
npm start
```

---

## 📞 Need Help?

Check these files:
- **RUN_EVERYTHING.md** - Detailed guide
- **frontend/README.md** - Frontend docs
- **backend/README.md** - Backend docs
- **mobile-app/START_HERE.md** - Mobile app guide

---

## 🎊 You're Ready!

Just double-click **`start-all.bat`** and everything will start!

**Happy Coding!** 🚀
