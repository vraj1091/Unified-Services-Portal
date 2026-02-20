"""
Automation API Router
Handles direct automation requests for utility providers
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
from app.services.direct_automation_service import direct_automation_service

router = APIRouter(prefix="/api/automation", tags=["Automation"])

class TorrentPowerNameChangeRequest(BaseModel):
    city: str
    serviceNumber: str
    tNumber: str
    mobile: str
    email: EmailStr
    confirmEmail: EmailStr

class GujaratGasNameChangeRequest(BaseModel):
    currentName: str
    newName: str
    connectionNumber: str
    mobile: str
    aadhaarNumber: Optional[str] = None

class WaterNameChangeRequest(BaseModel):
    currentName: str
    newName: str
    connectionNumber: str
    mobile: str
    aadhaarNumber: Optional[str] = None

@router.post("/torrent-power/name-change")
async def automate_torrent_power_name_change(request: TorrentPowerNameChangeRequest):
    """
    Automate Torrent Power name change application submission
    """
    # Validate email confirmation
    if request.email != request.confirmEmail:
        raise HTTPException(status_code=400, detail="Email addresses do not match")
    
    # Convert request to dict
    form_data = {
        "city": request.city,
        "serviceNumber": request.serviceNumber,
        "tNumber": request.tNumber,
        "mobile": request.mobile,
        "email": request.email
    }
    
    # Call automation service
    result = direct_automation_service.submit_torrent_power_name_change(form_data)
    
    if not result.get("success"):
        raise HTTPException(status_code=400, detail=result.get("message", "Automation failed"))
    
    return result

@router.post("/gujarat-gas/name-change")
async def automate_gujarat_gas_name_change(request: GujaratGasNameChangeRequest):
    """
    Automate Gujarat Gas name change application submission
    """
    form_data = {
        "currentName": request.currentName,
        "newName": request.newName,
        "connectionNumber": request.connectionNumber,
        "mobile": request.mobile,
        "aadhaarNumber": request.aadhaarNumber
    }
    
    result = direct_automation_service.submit_gujarat_gas_name_change(form_data)
    
    if not result.get("success"):
        raise HTTPException(status_code=400, detail=result.get("message", "Automation failed"))
    
    return result

@router.post("/water/name-change")
async def automate_water_name_change(request: WaterNameChangeRequest):
    """
    Automate Water Department name change application submission
    """
    form_data = {
        "currentName": request.currentName,
        "newName": request.newName,
        "connectionNumber": request.connectionNumber,
        "mobile": request.mobile,
        "aadhaarNumber": request.aadhaarNumber
    }
    
    result = direct_automation_service.submit_water_name_change(form_data)
    
    if not result.get("success"):
        raise HTTPException(status_code=400, detail=result.get("message", "Automation failed"))
    
    return result

@router.get("/health")
async def automation_health_check():
    """
    Check if automation service is available
    """
    return {
        "status": "healthy",
        "service": "automation",
        "available_providers": [
            "torrent-power",
            "gujarat-gas",
            "water"
        ]
    }
