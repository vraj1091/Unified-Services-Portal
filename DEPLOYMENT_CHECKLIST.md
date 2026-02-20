# ✅ Pre-Deployment Checklist

## Before Deploying to Render

### 1. Code Preparation
- [ ] All code committed to Git
- [ ] `.gitignore` configured properly
- [ ] No sensitive data in code (API keys, passwords)
- [ ] Environment variables documented

### 2. Backend Checks
- [ ] `requirements.txt` is complete
- [ ] Health check endpoint works (`/api/health`)
- [ ] Database models are defined
- [ ] CORS is configured
- [ ] File upload directory exists
- [ ] All API endpoints tested locally

### 3. Frontend Checks
- [ ] `package.json` has all dependencies
- [ ] Build command works (`npm run build`)
- [ ] Environment variables configured
- [ ] API URL is configurable
- [ ] All routes work
- [ ] Mobile responsive

### 4. Database
- [ ] PostgreSQL compatible (using SQLAlchemy)
- [ ] Migrations ready (if using Alembic)
- [ ] Database URL format correct
- [ ] Tables auto-create on startup

### 5. Files Needed
- [ ] `render.yaml` in root
- [ ] `backend/requirements.txt`
- [ ] `frontend/package.json`
- [ ] `backend/app/main.py`
- [ ] `.gitignore`

---

## Quick Test Commands

### Test Backend Locally
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
# Visit: http://localhost:8000/docs
```

### Test Frontend Locally
```bash
cd frontend
npm install
npm run dev
# Visit: http://localhost:5173
```

### Test Build
```bash
cd frontend
npm run build
npm run preview
# Visit: http://localhost:4173
```

---

## Deployment Steps Summary

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to Render**
   - Visit: https://dashboard.render.com
   - Click "New +" → "Blueprint"
   - Select your repository
   - Click "Apply"

3. **Wait for Deployment**
   - Backend: ~5 minutes
   - Frontend: ~3 minutes
   - Database: ~2 minutes

4. **Test Live Application**
   - Visit frontend URL
   - Register account
   - Test all features

---

## Post-Deployment

### Verify Everything Works
- [ ] Frontend loads
- [ ] Backend API responds
- [ ] Database connected
- [ ] User registration works
- [ ] User login works
- [ ] Document upload works
- [ ] All pages accessible
- [ ] No console errors

### Monitor
- [ ] Check Render logs
- [ ] Monitor error rates
- [ ] Test from different devices
- [ ] Test from different networks

---

## Common Issues & Fixes

### Issue: Build Failed
**Fix**: Check logs, verify dependencies, ensure correct Node/Python version

### Issue: Can't Connect to Database
**Fix**: Use Internal Database URL, not External

### Issue: CORS Error
**Fix**: Add frontend URL to CORS_ORIGINS in backend

### Issue: 404 on Routes
**Fix**: Configure frontend routing for SPA

### Issue: Files Not Persisting
**Fix**: Use external storage (S3) or Render Disk

---

## Ready to Deploy?

If all checkboxes are checked, you're ready to deploy! 🚀

Follow the detailed guide in `RENDER_DEPLOYMENT_GUIDE.md`
