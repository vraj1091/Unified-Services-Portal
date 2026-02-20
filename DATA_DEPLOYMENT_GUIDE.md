# Data Deployment Guide - Unified Services Portal

## Overview
This guide explains how to upload and sync data to your deployed application on AWS EC2.

---

## Current Setup
- **Deployment**: Docker Compose on AWS EC2
- **Database**: SQLite (`unified_portal.db`)
- **Backend**: Python FastAPI
- **Frontend**: React/Vite

---

## Method 1: Automatic Seeding (Recommended) ✅

### How It Works
The Docker container automatically seeds the database when it starts.

### Steps:

1. **Rebuild and Deploy**
   ```bash
   # On your local machine
   cd Unified-Services-Portal
   
   # Rebuild the backend image
   docker-compose build backend
   
   # Deploy to production
   docker-compose -f docker-compose.yml up -d
   ```

2. **What Happens**
   - Container starts
   - Runs `seed_all_data.py` automatically
   - Seeds 10 government grants
   - Starts the FastAPI server

3. **Verify Data**
   ```bash
   # Check if data was seeded
   curl http://your-deployed-app:8000/api/grants
   ```

---

## Method 2: Manual SSH Access

### If You Need to Seed Data on Existing Deployment

1. **SSH into EC2 Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

2. **Navigate to App Directory**
   ```bash
   cd /path/to/Unified-Services-Portal/backend
   ```

3. **Run Seed Script**
   ```bash
   python seed_all_data.py
   ```

4. **Verify**
   ```bash
   sqlite3 unified_portal.db "SELECT COUNT(*) FROM grants;"
   ```

---

## Method 3: Database File Upload

### If You Want to Upload Pre-populated Database

1. **Create Database Locally**
   ```bash
   # On your local machine
   python Unified-Services-Portal/backend/seed_all_data.py
   ```

2. **Upload Database File to EC2**
   ```bash
   scp -i your-key.pem \
       Unified-Services-Portal/backend/unified_portal.db \
       ubuntu@your-ec2-ip:/path/to/app/backend/
   ```

3. **Restart Docker Container**
   ```bash
   docker-compose restart backend
   ```

---

## Method 4: API-Based Data Upload

### For Adding Data Without Redeployment

Create an admin endpoint to add grants via API:

```python
# Add to app/routers/grants.py

@router.post("/admin/seed-grants")
def admin_seed_grants(
    admin_token: str = Header(...),
    db: Session = Depends(get_db)
):
    """Admin endpoint to seed grants"""
    if admin_token != settings.ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    from app.seed_data.seed_grants import seed_grants
    seed_grants()
    
    return {"message": "Grants seeded successfully"}
```

Then call:
```bash
curl -X POST http://your-deployed-app:8000/api/grants/admin/seed-grants \
  -H "admin-token: your-admin-token"
```

---

## Method 5: Database Migration (For Production)

### Migrate from SQLite to PostgreSQL

1. **Update Requirements**
   ```bash
   pip install psycopg2-binary
   ```

2. **Update Config**
   ```python
   # app/config.py
   DATABASE_URL: str = "postgresql://user:password@host:5432/unified_portal"
   ```

3. **Update Docker Compose**
   ```yaml
   services:
     postgres:
       image: postgres:15
       environment:
         POSTGRES_DB: unified_portal
         POSTGRES_USER: portal_user
         POSTGRES_PASSWORD: secure_password
       volumes:
         - postgres-data:/var/lib/postgresql/data
   
   volumes:
     postgres-data:
   ```

4. **Migrate Data**
   ```bash
   # Create tables
   python -c "from app.database import Base, engine; Base.metadata.create_all(bind=engine)"
   
   # Seed data
   python seed_all_data.py
   ```

---

## Deployment Checklist

- [ ] Updated Dockerfile with seed script
- [ ] Rebuilt Docker image
- [ ] Pushed to Docker registry (if using)
- [ ] Deployed to EC2
- [ ] Verified data is present via API
- [ ] Tested grants page in frontend
- [ ] Checked database file permissions
- [ ] Set up backups

---

## Troubleshooting

### Data Not Showing After Deployment

1. **Check Container Logs**
   ```bash
   docker-compose logs backend
   ```

2. **Verify Database File**
   ```bash
   docker-compose exec backend ls -la unified_portal.db
   ```

3. **Check API Response**
   ```bash
   docker-compose exec backend curl http://localhost:8000/api/grants
   ```

4. **Reseed Database**
   ```bash
   docker-compose exec backend python seed_all_data.py
   ```

### Permission Issues

```bash
# Fix permissions
docker-compose exec backend chmod 755 unified_portal.db
docker-compose exec backend chmod 755 /app
```

### Database Locked Error

```bash
# Restart container
docker-compose restart backend
```

---

## Backup & Recovery

### Backup Database

```bash
# Local backup
cp Unified-Services-Portal/backend/unified_portal.db \
   Unified-Services-Portal/backend/unified_portal.db.backup

# Remote backup from EC2
scp -i your-key.pem \
    ubuntu@your-ec2-ip:/path/to/app/backend/unified_portal.db \
    ./backup/unified_portal.db.backup
```

### Restore Database

```bash
# Restore from backup
cp ./backup/unified_portal.db.backup \
   Unified-Services-Portal/backend/unified_portal.db

# Restart container
docker-compose restart backend
```

---

## Monitoring Data

### Check Data Count

```bash
# Via API
curl http://your-deployed-app:8000/api/grants

# Via SSH
ssh -i your-key.pem ubuntu@your-ec2-ip
sqlite3 /path/to/app/backend/unified_portal.db "SELECT COUNT(*) FROM grants;"
```

### View Specific Grant

```bash
curl http://your-deployed-app:8000/api/grants/1
```

---

## Best Practices

1. **Always Backup Before Deploying**
   - Keep a backup of your database
   - Test migrations locally first

2. **Use Environment Variables**
   - Store sensitive data in `.env` files
   - Never commit credentials

3. **Monitor Logs**
   - Check Docker logs regularly
   - Set up log aggregation for production

4. **Version Control**
   - Keep seed data in version control
   - Document data changes

5. **Test Locally First**
   - Test all data operations locally
   - Verify before deploying to production

---

## Quick Commands Reference

```bash
# Build and deploy
docker-compose build backend
docker-compose up -d

# Check logs
docker-compose logs -f backend

# Seed data
docker-compose exec backend python seed_all_data.py

# Access database
docker-compose exec backend sqlite3 unified_portal.db

# Restart services
docker-compose restart

# Stop services
docker-compose down

# View running containers
docker-compose ps
```

---

## Support

For issues or questions:
1. Check the logs: `docker-compose logs backend`
2. Verify database: `sqlite3 unified_portal.db ".tables"`
3. Test API: `curl http://localhost:8000/health`

