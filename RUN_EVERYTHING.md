# 🚀 How to Run Everything - Complete Guide

## 📋 Quick Navigation
- [Run Frontend (Website)](#run-frontend-website)
- [Run Backend (API)](#run-backend-api)
- [Run Mobile App](#run-mobile-app)
- [Run Everything Together](#run-everything-together)

---

## 🌐 Run Frontend (Website)

### Step 1: Navigate to Frontend
```cmd
cd gujarat-unified-services-portal-grants-and-improvements\frontend
```

### Step 2: Install Dependencies (if not done)
```cmd
npm install
```

### Step 3: Run Frontend
```cmd
npm run dev
```

**✅ Frontend will start at:** `http://localhost:5173`

**Note:** The script is `npm run dev` NOT `npm start` (Vite uses `dev` instead of `start`)

---

## 🔧 Run Backend (API)

### Step 1: Navigate to Backend
```cmd
cd gujarat-unified-services-portal-grants-and-improvements\backend
```

### Step 2: Install Dependencies (if not done)
```cmd
pip install -r requirements.txt
```

### Step 3: Run Backend
```cmd
python main.py
```

**OR using uvicorn:**
```cmd
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**✅ Backend will start at:** `http://localhost:8000`
**✅ API Docs at:** `http://localhost:8000/docs`

---

## 📱 Run Mobile App

### Step 1: Navigate to Mobile App
```cmd
cd gujarat-unified-services-portal-grants-and-improvements\mobile-app
```

### Step 2: Install Dependencies (if not done)
```cmd
npm install
```

### Step 3: Update API URL
Edit `src\services\api.js`:
```javascript
// Find your computer's IP address first
// Open CMD and type: ipconfig
// Look for IPv4 Address (e.g., 192.168.1.100)

const API_URL = 'http://192.168.1.100:8000';  // Replace with your IP
```

### Step 4: Run Mobile App
```cmd
npm start
```

### Step 5: Test on Phone
1. Install **Expo Go** app from Play Store/App Store
2. Scan the QR code shown in terminal
3. App will load on your phone!

**OR test on emulator:**
- Press `a` for Android emulator
- Press `w` for web browser

---

## 🎯 Run Everything Together

### Option 1: Using Multiple Terminals (Recommended)

**Terminal 1 - Backend:**
```cmd
cd gujarat-unified-services-portal-grants-and-improvements\backend
python main.py
```

**Terminal 2 - Frontend:**
```cmd
cd gujarat-unified-services-portal-grants-and-improvements\frontend
npm run dev
```

**Terminal 3 - Mobile App:**
```cmd
cd gujarat-unified-services-portal-grants-and-improvements\mobile-app
npm start
```

### Option 2: Using Batch File

Create `start-all.bat` in the root folder:
```batch
@echo off
echo Starting Gujarat Unified Services Portal...
echo.

echo Starting Backend...
start cmd /k "cd backend && python main.py"
timeout /t 3

echo Starting Frontend...
start cmd /k "cd frontend && npm run dev"
timeout /t 3

echo Starting Mobile App...
start cmd /k "cd mobile-app && npm start"

echo.
echo All services started!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo Mobile: Scan QR code with Expo Go
pause
```

Then run:
```cmd
start-all.bat
```

---

## 🔍 Find Your IP Address

### Windows:
```cmd
ipconfig
```
Look for **IPv4 Address** under your active network adapter (e.g., `192.168.1.100`)

### Mac/Linux:
```bash
ifconfig
```
Look for **inet** address

---

## ✅ Verify Everything is Running

### Check Backend:
Open browser: `http://localhost:8000/docs`
You should see API documentation

### Check Frontend:
Open browser: `http://localhost:5173`
You should see the website

### Check Mobile App:
1. Scan QR code with Expo Go app
2. App should load on your phone

---

## 🐛 Troubleshooting

### Frontend Error: "Missing script: start"
**Solution:** Use `npm run dev` instead of `npm start`

### Backend Error: "Module not found"
**Solution:**
```cmd
cd backend
pip install -r requirements.txt
```

### Mobile App Error: "Can't connect to backend"
**Solution:**
1. Find your IP: `ipconfig`
2. Update `mobile-app\src\services\api.js`
3. Use IP address, not `localhost`
4. Ensure phone and computer on same WiFi

### Port Already in Use
**Solution:**
- Backend: Change port in `main.py`
- Frontend: Change port in `vite.config.js`

---

## 📊 Quick Reference

| Service | Command | URL |
|---------|---------|-----|
| Frontend | `npm run dev` | http://localhost:5173 |
| Backend | `python main.py` | http://localhost:8000 |
| Mobile | `npm start` | Scan QR code |

---

## 🎯 What to Run for Different Scenarios

### Testing Website Only:
```cmd
# Terminal 1
cd backend
python main.py

# Terminal 2
cd frontend
npm run dev
```

### Testing Mobile App Only:
```cmd
# Terminal 1
cd backend
python main.py

# Terminal 2
cd mobile-app
npm start
```

### Testing Everything:
```cmd
# Run all three terminals as shown above
```

---

## 💡 Pro Tips

1. **Always start Backend first** - Frontend and Mobile need it
2. **Use your IP address** for mobile app, not localhost
3. **Keep terminals open** - Closing them stops the services
4. **Check firewall** - Allow Python and Node.js through firewall
5. **Same WiFi network** - Phone and computer must be on same network

---

## 🚀 Quick Start Commands

### For Website Development:
```cmd
cd gujarat-unified-services-portal-grants-and-improvements
cd backend && python main.py
# Open new terminal
cd frontend && npm run dev
```

### For Mobile App Development:
```cmd
cd gujarat-unified-services-portal-grants-and-improvements
cd backend && python main.py
# Open new terminal
cd mobile-app && npm start
```

---

## ✨ Success Indicators

### Backend Running:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

### Frontend Running:
```
VITE v5.0.0  ready in 500 ms
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.100:5173/
```

### Mobile App Running:
```
Metro waiting on exp://192.168.1.100:8081
Scan the QR code above with Expo Go (Android) or Camera app (iOS)
```

---

## 🎊 You're All Set!

Now you can:
- ✅ Run the website
- ✅ Run the mobile app
- ✅ Test all features
- ✅ Develop new features

**Happy Coding!** 🚀
