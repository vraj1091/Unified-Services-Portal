# Deployment Summary - Data Upload Guide

## Quick Answer: How to Upload Data to Deployed App

You have **5 methods** to upload data to your deployed application:

---

## 🚀 Method 1: Automatic Seeding (EASIEST & RECOMMENDED)

**What**: Data seeds automatically when Docker container starts

**How**:
```bash
# 1. Rebuild the backend image
docker-compose build backend

# 2. Deploy
docker-compose up -d

# 3. Done! Data is automatically seeded
```

**Pros**: 
- ✅ Automatic
- ✅ No manual steps
- ✅ Works on every deployment
- ✅ Already configured in updated Dockerfile

**Cons**: 
- Requires rebuilding Docker image

---

## 🔧 Method 2: SSH Access (For Existing Deployment)

**What**: SSH into your EC2 instance and run seed script manually

**How**:
```bash
# 1. SSH into EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# 2. Navigate to backend
cd /path/to/Unified-Services-Portal/backend

# 3. Run seed script
python seed_all_data.py

# 4. Verify
sqlite3 unified_portal.db "SELECT COUNT(*) FROM grants;"
```

**Pros**: 
- ✅ Works on existing deployment
- ✅ No rebuild needed
- ✅ Quick

**Cons**: 
- Requires SSH access
- Manual process

---

## 📁 Method 3: Upload Database File

**What**: Upload pre-populated database file directly

**How**:
```bash
# 1. Create database locally
python Unified-Services-Portal/backend/seed_all_data.py

# 2. Upload to EC2
scp -i your-key.pem \
    Unified-Services-Portal/backend/unified_portal.db \
    ubuntu@your-ec2-ip:/path/to/app/backend/

# 3. Restart container
docker-compose restart backend
```

**Pros**: 
- ✅ Fast
- ✅ No rebuild needed
- ✅ Can backup/restore easily

**Cons**: 
- Requires SCP access
- File permissions might need adjustment

---

## 🌐 Method 4: API Endpoint (For Adding Data Without Redeployment)

**What**: Create an admin API endpoint to seed data

**How**:
```bash
# Call API endpoint
curl -X POST http://your-deployed-app:8000/api/grants/admin/seed-grants \
  -H "admin-token: your-admin-token"
```

**Pros**: 
- ✅ No redeployment needed
- ✅ Can add data anytime
- ✅ Remote access

**Cons**: 
- Requires API implementation
- Requires authentication

---

## 🗄️ Method 5: Database Migration (For Production)

**What**: Migrate from SQLite to PostgreSQL for production

**How**:
```bash
# 1. Update config to use PostgreSQL
# 2. Update docker-compose.yml
# 3. Run migrations
# 4. Seed data
```

**Pros**: 
- ✅ Production-ready
- ✅ Better scalability
- ✅ Better performance

**Cons**: 
- More complex setup
- Requires database knowledge

---

## 📋 Step-by-Step: Deploy with Data (Recommended)

### On Your Local Machine:

```bash
# 1. Navigate to project
cd Unified-Services-Portal

# 2. Build backend with updated Dockerfile
docker-compose build backend

# 3. Start all services
docker-compose up -d

# 4. Wait 10 seconds for startup
sleep 10

# 5. Verify data
curl http://localhost:8000/api/grants

# 6. Check frontend
open http://localhost:80
```

### Or Use the Deployment Script:

**Linux/Mac**:
```bash
chmod +x deploy-with-data.sh
./deploy-with-data.sh
```

**Windows**:
```bash
deploy-with-data.bat
```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Backend is running: `curl http://your-app:8000/health`
- [ ] Data is present: `curl http://your-app:8000/api/grants`
- [ ] Frontend loads: `http://your-app:80`
- [ ] Government Grants page shows data
- [ ] Can filter and search grants
- [ ] Database file exists: `ls -la unified_portal.db`

---

## 🐛 Troubleshooting

### Data Not Showing?

```bash
# 1. Check logs
docker-compose logs backend

# 2. Verify database
docker-compose exec backend sqlite3 unified_portal.db "SELECT COUNT(*) FROM grants;"

# 3. Reseed if needed
docker-compose exec backend python seed_all_data.py

# 4. Restart
docker-compose restart backend
```

### Permission Issues?

```bash
# Fix permissions
docker-compose exec backend chmod 755 unified_portal.db
docker-compose exec backend chmod 755 /app
```

### Container Won't Start?

```bash
# Check logs
docker-compose logs backend

# Rebuild
docker-compose build --no-cache backend

# Restart
docker-compose restart backend
```

---

## 📊 What Data Gets Uploaded?

The seed script uploads **10 Government Grants**:

1. Startup India Seed Fund Scheme (SISFS)
2. Atal Innovation Mission (AIM)
3. Credit Guarantee Fund Scheme for MSMEs (CGFMSE)
4. Technology Upgradation Fund Scheme (TUFS)
5. Mahila Udyam Nidhi Scheme
6. Stand-Up India Scheme
7. NSFDC Schemes
8. Market Development Assistance (MDA)
9. STPI Scheme
10. Digital India Innovation Fund

Each grant includes:
- Name (English & Hindi)
- Category
- Ministry
- Funding amount
- Eligibility criteria
- Required documents
- Application dates
- Official links

---

## 🔄 Continuous Deployment

For CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Build and Deploy
  run: |
    docker-compose build backend
    docker-compose up -d
    sleep 10
    docker-compose exec -T backend python seed_all_data.py
```

---

## 📝 Important Notes

1. **Database Location**: `/app/backend/unified_portal.db`
2. **Seed Script**: `/app/backend/seed_all_data.py`
3. **API Endpoint**: `http://your-app:8000/api/grants`
4. **Automatic Seeding**: Happens on container startup (if using updated Dockerfile)

---

## 🎯 Recommended Approach

**For Development**: Use Method 1 (Automatic Seeding)
- Simple, automatic, no manual steps

**For Production**: Use Method 1 + Method 3 (Backup)
- Automatic seeding + regular backups
- Or migrate to PostgreSQL (Method 5)

**For Quick Updates**: Use Method 2 (SSH)
- Fast, no rebuild needed

---

## 📞 Need Help?

1. Check `DATA_DEPLOYMENT_GUIDE.md` for detailed instructions
2. Review Docker logs: `docker-compose logs -f backend`
3. Test API: `curl http://localhost:8000/api/grants`
4. Verify database: `sqlite3 unified_portal.db ".tables"`

---

## ✨ Summary

| Method | Ease | Speed | Rebuild | Best For |
|--------|------|-------|---------|----------|
| 1. Auto Seed | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Yes | New deployments |
| 2. SSH | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | No | Existing deployment |
| 3. Upload DB | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | No | Backup/restore |
| 4. API | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | No | Adding data later |
| 5. Migration | ⭐⭐ | ⭐⭐ | Yes | Production |

**Recommendation**: Use **Method 1** for simplicity and reliability! 🚀

