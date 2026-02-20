# 🚀 Deploy to Render - Quick Start

## One-Click Deployment

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Deploy to Render"
git push origin main
```

### Step 2: Deploy on Render
1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will detect `render.yaml`
5. Click **"Apply"**
6. Wait 10 minutes ⏱️

### Step 3: Done! 🎉
Your app is live at:
- Frontend: `https://gujarat-portal-frontend.onrender.com`
- Backend: `https://gujarat-portal-backend.onrender.com/docs`

---

## What Gets Deployed?

### 🔹 Backend API (Python/FastAPI)
- User authentication
- Document management
- Service applications
- Government grants
- PostgreSQL database

### 🔹 Frontend Web (React/Vite)
- User interface
- Document upload
- Application forms
- Dashboard
- Profile management

### 🔹 PostgreSQL Database
- User data
- Documents
- Applications
- Service records

---

## Environment Variables (Auto-Configured)

### Backend
- `DATABASE_URL` - Auto from database
- `SECRET_KEY` - Auto-generated
- `ALGORITHM` - HS256
- `ACCESS_TOKEN_EXPIRE_MINUTES` - 30
- `CORS_ORIGINS` - *

### Frontend
- `VITE_API_URL` - Auto from backend
- `NODE_ENV` - production

---

## Free Tier Limits

✅ **What's Free:**
- Backend hosting
- Frontend hosting
- PostgreSQL (90 days free, then $7/month)
- SSL certificates
- Automatic deployments

⚠️ **Limitations:**
- Services sleep after 15 min inactivity
- First request takes 30-60 seconds (cold start)
- Ephemeral storage (files deleted on restart)

---

## Need Help?

📖 **Full Guide**: See `RENDER_DEPLOYMENT_GUIDE.md`
✅ **Checklist**: See `DEPLOYMENT_CHECKLIST.md`
🐛 **Issues**: Check Render logs in dashboard

---

## Test Your Deployment

After deployment, test:
1. Visit frontend URL
2. Register new account
3. Login
4. Upload document
5. View documents
6. Apply for service
7. Check applications

All working? **Congratulations!** 🎉

---

## Update Your App

Push changes to GitHub:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

Render auto-deploys in ~5 minutes! 🚀
