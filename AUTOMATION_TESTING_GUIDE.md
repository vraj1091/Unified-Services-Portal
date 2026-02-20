# Automation Testing Guide

## What Was Fixed

The "Start AI Auto-Fill" button was not working because:
1. Frontend was simulating automation with a timeout instead of calling the backend API
2. No backend API endpoint existed for the automation service
3. The automation service was created but not connected to any API route

## Changes Made

### 1. Frontend (`frontend/src/pages/NameChangeApplication.jsx`)
- Updated "Start Automation" button to call backend API: `/api/automation/torrent-power/name-change`
- Added proper error handling and loading states
- Now displays real application numbers from backend

### 2. Backend API Router (`backend/app/routers/automation.py`)
- Created new automation router with endpoints:
  - `POST /api/automation/torrent-power/name-change` - Torrent Power automation
  - `POST /api/automation/gujarat-gas/name-change` - Gujarat Gas automation
  - `POST /api/automation/water/name-change` - Water automation
  - `GET /api/automation/health` - Health check

### 3. Main App (`backend/app/main.py`)
- Registered automation router in FastAPI app

## How to Test

### Option 1: Full Application Test (Recommended)

1. **Start Backend:**
   ```bash
   cd backend
   uvicorn app.main:app --reload --port 8000
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Test the Flow:**
   - Open browser: `http://localhost:5173`
   - Login or register
   - Navigate to: Services → Electricity → Name Change
   - Select "Torrent Power"
   - Fill in the form:
     - City: Ahmedabad
     - Service Number: 123456789
     - T Number: T123456
     - Mobile: 9876543210
     - Email: test@example.com
     - Confirm Email: test@example.com
   - Click "Start AI Auto-Fill" button
   - Modal should open showing your details
   - Click "Start Automation"
   - Wait 2-3 seconds
   - Success screen should show with application number (e.g., TP12345678)

### Option 2: Quick API Test

Run the test script:
```bash
test-automation.bat
```

Or manually test with curl:
```bash
curl -X POST "http://localhost:8000/api/automation/torrent-power/name-change" \
  -H "Content-Type: application/json" \
  -d "{\"city\":\"Ahmedabad\",\"serviceNumber\":\"123456\",\"tNumber\":\"T789\",\"mobile\":\"9876543210\",\"email\":\"test@example.com\",\"confirmEmail\":\"test@example.com\"}"
```

Expected response:
```json
{
  "success": true,
  "message": "Application submitted successfully to Torrent Power",
  "application_number": "TP12345678",
  "provider": "Torrent Power",
  "service_type": "electricity",
  "application_type": "name_change",
  "estimated_processing_time": "5-10 business days",
  "tracking_url": "https://connect.torrentpower.com/track/TP12345678",
  "submitted_data": {
    "city": "Ahmedabad",
    "service_number": "123456",
    "t_number": "T789",
    "mobile": "9876543210",
    "email": "test@example.com"
  }
}
```

## Troubleshooting

### Button Still Not Working?

1. **Check Backend is Running:**
   ```bash
   curl http://localhost:8000/api/automation/health
   ```
   Should return: `{"status":"healthy","service":"automation",...}`

2. **Check Browser Console:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for any error messages
   - Check Network tab for failed API calls

3. **Check Backend Logs:**
   - Look at the terminal where backend is running
   - Should see: `INFO: Started server process`
   - When you click button, should see automation logs

4. **Verify Frontend is Using Correct API URL:**
   - Check `frontend/src/api/axios.js`
   - Should have: `baseURL: 'http://localhost:8000'`

### Common Issues

**Issue:** "Network Error" or "Failed to fetch"
- **Solution:** Make sure backend is running on port 8000

**Issue:** "Email addresses do not match"
- **Solution:** Ensure email and confirmEmail fields are identical

**Issue:** Modal doesn't open
- **Solution:** Check that you filled all required fields (marked with *)

**Issue:** Application number not showing
- **Solution:** Check backend logs for errors in automation service

## Next Steps

### For Production Deployment:

1. **Add Real Selenium/Playwright Automation:**
   - Install: `pip install selenium playwright`
   - Update `direct_automation_service.py` to use real browser automation
   - Add headless browser configuration

2. **Add Database Storage:**
   - Store automation results in database
   - Track application status
   - Enable status checking

3. **Add Email Notifications:**
   - Send confirmation email with application number
   - Send status updates

4. **Add Rate Limiting:**
   - Prevent abuse of automation service
   - Add queue system for multiple requests

## Current Status

✅ Frontend button connected to backend API
✅ Backend API endpoint created and registered
✅ Automation service generating application numbers
✅ Success modal showing results
✅ Error handling implemented

⚠️ Currently simulating automation (not using real browser automation)
⚠️ Application numbers are generated, not from actual portal
⚠️ No database storage of automation results

## For Real Automation

To implement actual browser automation, update `backend/app/services/direct_automation_service.py`:

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

def submit_torrent_power_name_change(self, form_data):
    driver = webdriver.Chrome()
    try:
        # Navigate to portal
        driver.get("https://connect.torrentpower.com/tplcp/application/namechangerequest")
        
        # Fill form
        driver.find_element(By.ID, "city").send_keys(form_data['city'])
        driver.find_element(By.ID, "serviceNumber").send_keys(form_data['serviceNumber'])
        # ... fill other fields
        
        # Submit
        driver.find_element(By.ID, "submit").click()
        
        # Get confirmation
        application_number = driver.find_element(By.ID, "confirmationNumber").text
        
        return {"success": True, "application_number": application_number}
    finally:
        driver.quit()
```
