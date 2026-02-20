# Simple Deployment Guide - Render

## Current Issue: "No logs to show"

This usually means the service failed to start before logging began. Let's fix it step by step.

## Quick Fix Steps

### Step 1: Simplify Configuration

I've simplified `render.yaml` to remove:
- ❌ Mobile app (causing issues)
- ❌ Complex build commands
- ❌ Service references (fromService)
- ✅ Just Backend + Frontend + Database

### Step 2: Manual Deployment (Recommended)

Instead of using Blueprint, let's deploy manually:

#### A. Deploy Backend

1. Go to Render Dashboard: https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - **Name**: `gujarat-portal-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT`

5. **Environment Variables**:
   ```
   SECRET_KEY = your-secret-key-here
   ALGORITHM = HS256
   ACCESS_TOKEN_EXPIRE_MINUTES = 30
   ENVIRONMENT = production
   CORS_ORIGINS = *
   ```

6. Click "Create Web Service"
7. **Wait for it to deploy** (3-5 minutes)
8. **Copy the URL** (e.g., `https://gujarat-portal-backend.onrender.com`)

#### B. Create Database

1. Click "New +" → "PostgreSQL"
2. Configure:
   - **Name**: `gujarat-portal-db`
   - **Database**: `gujarat_portal`
   - **User**: `gujarat_user`
   - **Region**: Oregon
   - **Plan**: Free

3. Click "Create Database"
4. **Copy Internal Database URL**
5. Go back to Backend service → Environment
6. Add variable:
   ```
   DATABASE_URL = [paste internal database URL]
   ```
7. Save and redeploy backend

#### C. Deploy Frontend

1. Click "New +" → "Web Service"
2. Connect your GitHub repo
3. Configure:
   - **Name**: `gujarat-portal-frontend`
   - **Region**: Oregon
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Runtime**: Node
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm run preview -- --host 0.0.0.0 --port $PORT`

4. **Environment Variables**:
   ```
   VITE_API_URL = https://gujarat-portal-backend.onrender.com
   NODE_ENV = production
   ```

5. Click "Create Web Service"
6. Wait for deployment (2-3 minutes)

### Step 3: Verify Deployment

1. **Test Backend**:
   ```
   https://gujarat-portal-backend.onrender.com/api/health
   ```
   Should return: `{"status":"healthy",...}`

2. **Test Frontend**:
   ```
   https://gujarat-portal-frontend.onrender.com
   ```
   Should show login page

3. **Test Full Flow**:
   - Register new account
   - Login
   - Check dashboard loads with sidebar

## Common Issues & Fixes

### Issue 1: Backend "No logs to show"

**Cause**: Python dependencies failing to install

**Fix**:
1. Check `backend/requirements.txt` is valid
2. Try simpler build command: `pip install -r requirements.txt`
3. Check logs immediately after deploy starts

### Issue 2: Frontend "No logs to show"

**Cause**: Node dependencies or vite build failing

**Fix**:
1. Use `npm ci` instead of `npm install` (faster, more reliable)
2. Ensure vite is in dependencies (not devDependencies)
3. Check `frontend/package.json` is valid

### Issue 3: Database Connection Failed

**Cause**: Wrong DATABASE_URL or database not ready

**Fix**:
1. Use **Internal Database URL** (not External)
2. Wait 2-3 minutes for database to provision
3. Format: `postgresql://user:pass@host:port/db`

### Issue 4: CORS Errors

**Cause**: Backend not allowing frontend origin

**Fix**:
1. Set `CORS_ORIGINS = *` in backend env vars
2. Or set specific: `CORS_ORIGINS = https://your-frontend.onrender.com`

## Alternative: Deploy Without Blueprint

If Blueprint keeps failing, delete `render.yaml` and deploy manually as described above.

## Debugging Tips

### View Logs in Real-Time

1. Go to service in Render dashboard
2. Click "Logs" tab
3. Watch logs as service starts
4. Look for error messages

### Common Error Messages

**"ModuleNotFoundError"**
→ Missing Python dependency
→ Add to requirements.txt

**"Cannot find module"**
→ Missing Node dependency
→ Add to package.json

**"Port already in use"**
→ Wrong start command
→ Use `--port $PORT`

**"Database connection refused"**
→ Wrong DATABASE_URL
→ Check connection string

## Test Locally First

Before deploying, test locally:

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Visit: http://localhost:8000/docs

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Visit: http://localhost:5173

## Success Checklist

- ✅ Backend health check returns 200
- ✅ Frontend loads without errors
- ✅ Can register new account
- ✅ Can login successfully
- ✅ Dashboard shows with sidebar
- ✅ User profile dropdown works
- ✅ Can upload documents
- ✅ Can apply for services

## Need Help?

1. Check Render Status: https://status.render.com
2. Render Docs: https://render.com/docs
3. Render Community: https://community.render.com

---

**Current Status**: Simplified configuration ready
**Next Step**: Manual deployment recommended
**Estimated Time**: 10-15 minutes
