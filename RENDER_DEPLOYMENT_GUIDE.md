# 🚀 Render Deployment Guide - Gujarat Services Portal

## Complete Step-by-Step Deployment Instructions

### Prerequisites
- GitHub account
- Render account (free tier works!)
- Your code pushed to GitHub

---

## 📋 Step 1: Prepare Your Repository

### 1.1 Push Code to GitHub
```bash
cd gujarat-unified-services-portal-grants-and-improvements
git init
git add .
git commit -m "Initial commit - Ready for Render deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 1.2 Verify Files
Make sure these files exist:
- ✅ `render.yaml` (root directory)
- ✅ `backend/requirements.txt`
- ✅ `frontend/package.json`
- ✅ `backend/app/main.py`

---

## 🎯 Step 2: Deploy on Render

### Method 1: Using Blueprint (Recommended - One Click!)

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com

2. **Click "New +" → "Blueprint"**

3. **Connect GitHub Repository**
   - Select your repository
   - Render will detect `render.yaml`

4. **Review Services**
   - Backend API (Python)
   - Frontend Web (Node.js)
   - PostgreSQL Database

5. **Click "Apply"**
   - Render will create all services automatically
   - Wait 5-10 minutes for deployment

### Method 2: Manual Setup (Alternative)

#### 2.1 Create PostgreSQL Database
1. Click "New +" → "PostgreSQL"
2. Name: `gujarat-portal-db`
3. Database: `gujarat_portal`
4. User: `gujarat_user`
5. Plan: Free
6. Click "Create Database"
7. **Copy the Internal Database URL** (you'll need this)

#### 2.2 Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repo
3. Configure:
   - **Name**: `gujarat-portal-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

4. **Environment Variables**:
   ```
   DATABASE_URL = [Paste Internal Database URL from step 2.1]
   SECRET_KEY = [Generate random string: openssl rand -hex 32]
   ALGORITHM = HS256
   ACCESS_TOKEN_EXPIRE_MINUTES = 30
   ENVIRONMENT = production
   CORS_ORIGINS = *
   ```

5. Click "Create Web Service"
6. **Copy the Backend URL** (e.g., `https://gujarat-portal-backend.onrender.com`)

#### 2.3 Deploy Frontend
1. Click "New +" → "Web Service"
2. Connect your GitHub repo
3. Configure:
   - **Name**: `gujarat-portal-frontend`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview -- --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

4. **Environment Variables**:
   ```
   VITE_API_URL = [Paste Backend URL from step 2.2]
   NODE_ENV = production
   ```

5. Click "Create Web Service"

---

## ✅ Step 3: Verify Deployment

### 3.1 Check Backend
1. Visit: `https://your-backend-url.onrender.com/docs`
2. You should see FastAPI Swagger documentation
3. Test health endpoint: `https://your-backend-url.onrender.com/api/health`
4. Should return: `{"status": "healthy", "service": "Gujarat Portal Backend"}`

### 3.2 Check Frontend
1. Visit: `https://your-frontend-url.onrender.com`
2. You should see the login page
3. Try to register a new account
4. Try to login

### 3.3 Check Database
1. Go to Render Dashboard → Your Database
2. Click "Connect" → Copy External Database URL
3. Use a PostgreSQL client (like DBeaver or pgAdmin) to connect
4. Verify tables are created

---

## 🔧 Step 4: Configure Frontend API URL

### Update Frontend Environment
1. Go to Frontend service in Render
2. Environment → Edit
3. Update `VITE_API_URL`:
   ```
   VITE_API_URL = https://your-backend-url.onrender.com
   ```
4. Save and redeploy

---

## 📱 Step 5: Test Full Application

### Test Checklist:
- ✅ Register new user
- ✅ Login with credentials
- ✅ View dashboard
- ✅ Upload document
- ✅ View documents
- ✅ Delete document
- ✅ Apply for service
- ✅ View applications
- ✅ Browse government grants
- ✅ Company formation services
- ✅ Profile settings
- ✅ Logout

---

## 🐛 Troubleshooting

### Issue 1: Backend Not Starting
**Error**: "Application failed to start"

**Solution**:
1. Check logs: Render Dashboard → Backend Service → Logs
2. Verify `requirements.txt` has all dependencies
3. Check `DATABASE_URL` is set correctly
4. Ensure Python version is 3.11+

### Issue 2: Frontend Can't Connect to Backend
**Error**: "Network Error" or "Failed to fetch"

**Solution**:
1. Verify `VITE_API_URL` is set correctly
2. Check CORS is enabled in backend
3. Ensure backend is running (check health endpoint)
4. Redeploy frontend after updating env vars

### Issue 3: Database Connection Failed
**Error**: "Could not connect to database"

**Solution**:
1. Verify database is running (Render Dashboard)
2. Check `DATABASE_URL` format:
   ```
   postgresql://user:password@host:port/database
   ```
3. Use Internal Database URL (not External)
4. Wait for database to finish provisioning

### Issue 4: File Upload Not Working
**Error**: "Upload failed"

**Solution**:
1. Render free tier has ephemeral storage
2. Files uploaded will be deleted on restart
3. For production, use:
   - AWS S3
   - Cloudinary
   - Render Disk (paid plan)

### Issue 5: Slow First Load
**Symptom**: Takes 30-60 seconds to load

**Reason**: Free tier services sleep after 15 minutes of inactivity

**Solutions**:
- Upgrade to paid plan ($7/month)
- Use a service like UptimeRobot to ping every 14 minutes
- Accept the cold start delay

---

## 🎨 Step 6: Custom Domain (Optional)

### Add Custom Domain
1. Go to Frontend service
2. Settings → Custom Domain
3. Add your domain (e.g., `gujaratportal.com`)
4. Update DNS records as instructed
5. SSL certificate auto-generated

---

## 🔐 Step 7: Security Hardening

### Production Checklist:
1. **Generate Strong SECRET_KEY**:
   ```bash
   openssl rand -hex 32
   ```

2. **Update CORS Origins**:
   ```
   CORS_ORIGINS = https://your-frontend-domain.com
   ```

3. **Enable HTTPS Only**:
   - Render provides free SSL
   - Force HTTPS in frontend

4. **Set Secure Cookies**:
   - Update backend auth settings
   - Set `secure=True` for cookies

5. **Rate Limiting**:
   - Add rate limiting middleware
   - Prevent abuse

---

## 📊 Step 8: Monitoring

### Set Up Monitoring
1. **Render Dashboard**:
   - View logs in real-time
   - Monitor CPU/Memory usage
   - Check deployment history

2. **Health Checks**:
   - Backend: `/api/health`
   - Frontend: `/`

3. **Alerts**:
   - Set up email alerts for failures
   - Monitor uptime

---

## 💰 Cost Breakdown

### Free Tier (What You Get):
- ✅ Backend API: Free
- ✅ Frontend Web: Free
- ✅ PostgreSQL: Free (90 days, then $7/month)
- ✅ SSL Certificates: Free
- ✅ Automatic Deploys: Free

### Limitations:
- ⚠️ Services sleep after 15 min inactivity
- ⚠️ 750 hours/month (shared across services)
- ⚠️ Ephemeral storage (files deleted on restart)
- ⚠️ Limited CPU/Memory

### Paid Plans:
- **Starter**: $7/month per service
  - No sleep
  - More resources
  - Persistent disk

---

## 🚀 Step 9: Continuous Deployment

### Auto-Deploy on Git Push
1. Render automatically deploys on push to `main`
2. Push changes:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```
3. Render detects changes and redeploys
4. Check deployment status in dashboard

---

## 📝 Environment Variables Reference

### Backend Required:
```env
DATABASE_URL=postgresql://user:pass@host:port/db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ENVIRONMENT=production
CORS_ORIGINS=*
```

### Frontend Required:
```env
VITE_API_URL=https://your-backend-url.onrender.com
NODE_ENV=production
```

---

## 🎯 Success Checklist

Before going live, verify:
- ✅ Backend health check returns 200
- ✅ Frontend loads without errors
- ✅ User registration works
- ✅ User login works
- ✅ Document upload works
- ✅ All API endpoints respond
- ✅ Database connections stable
- ✅ CORS configured correctly
- ✅ SSL certificates active
- ✅ Custom domain configured (if applicable)

---

## 📞 Support

### Need Help?
1. **Render Docs**: https://render.com/docs
2. **Render Community**: https://community.render.com
3. **FastAPI Docs**: https://fastapi.tiangolo.com
4. **React Docs**: https://react.dev

---

## 🎉 Congratulations!

Your Gujarat Services Portal is now live on Render!

**Your URLs**:
- Frontend: `https://gujarat-portal-frontend.onrender.com`
- Backend API: `https://gujarat-portal-backend.onrender.com`
- API Docs: `https://gujarat-portal-backend.onrender.com/docs`

Share your application with users and start processing government service applications! 🚀
