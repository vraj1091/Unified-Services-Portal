from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import User, Document, DocumentType
from app.schemas import UserResponse, UserUpdate, DocumentResponse, AutoFillData
from app.auth import get_current_user
import uuid

router = APIRouter(prefix="/api/users", tags=["Users"])

@router.put("/profile", response_model=UserResponse)
def update_profile(
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    for field, value in user_data.model_dump(exclude_unset=True).items():
        setattr(current_user, field, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.post("/documents/upload", response_model=DocumentResponse)
async def upload_document(
    doc_type: DocumentType,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    import os
    import shutil
    
    # Create uploads directory if it doesn't exist
    upload_dir = "uploads/documents"
    os.makedirs(upload_dir, exist_ok=True)
    
    # Generate unique filename
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{current_user.id}_{doc_type.value}_{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(upload_dir, unique_filename)
    
    # Save file to disk
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Store relative path in database
    file_url = f"/uploads/documents/{unique_filename}"
    
    # For now, no OCR processing - just store the document
    extracted_data = {}
    
    # Create document record
    document = Document(
        user_id=current_user.id,
        doc_type=doc_type,
        file_url=file_url,
        file_name=file.filename,
        extracted_data=extracted_data
    )
    db.add(document)
    db.commit()
    db.refresh(document)
    
    # Update user profile with extracted data
    if doc_type == DocumentType.AADHAAR and extracted_data:
        if extracted_data.get("aadhaar_number"):
            current_user.aadhaar_number = extracted_data["aadhaar_number"]
        if extracted_data.get("full_name") and not current_user.full_name:
            current_user.full_name = extracted_data["full_name"]
        if extracted_data.get("date_of_birth"):
            current_user.date_of_birth = extracted_data["date_of_birth"]
        if extracted_data.get("address"):
            current_user.address = extracted_data["address"]
        if extracted_data.get("pincode"):
            current_user.pincode = extracted_data["pincode"]
        if extracted_data.get("gender"):
            current_user.gender = extracted_data["gender"]
        db.commit()
    
    elif doc_type == DocumentType.PAN and extracted_data:
        if extracted_data.get("pan_number"):
            current_user.pan_number = extracted_data["pan_number"]
        if extracted_data.get("full_name") and not current_user.full_name:
            current_user.full_name = extracted_data["full_name"]
        if extracted_data.get("date_of_birth") and not current_user.date_of_birth:
            current_user.date_of_birth = extracted_data["date_of_birth"]
        db.commit()
    
    return document

@router.get("/documents", response_model=List[DocumentResponse])
def get_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Document).filter(Document.user_id == current_user.id).all()

@router.get("/documents/{document_id}/download")
async def download_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Download document file"""
    from fastapi.responses import FileResponse
    import os
    
    document = db.query(Document).filter(
        Document.id == document_id,
        Document.user_id == current_user.id
    ).first()
    
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Extract filename from file_url
    # file_url format: /uploads/documents/filename.ext
    file_path = document.file_url.lstrip('/')
    
    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404, 
            detail="File not found on server. It may have been deleted or moved."
        )
    
    return FileResponse(
        path=file_path,
        filename=document.file_name,
        media_type='application/octet-stream'
    )

@router.delete("/documents/{document_id}")
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete document"""
    import os
    
    document = db.query(Document).filter(
        Document.id == document_id,
        Document.user_id == current_user.id
    ).first()
    
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Delete file from disk if it exists
    file_path = document.file_url.lstrip('/')
    if os.path.exists(file_path):
        try:
            os.remove(file_path)
        except Exception as e:
            print(f"Failed to delete file: {e}")
    
    # Delete from database
    db.delete(document)
    db.commit()
    
    return {"success": True, "message": "Document deleted successfully"}

@router.get("/autofill-data", response_model=AutoFillData)
def get_autofill_data(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all user data for auto-filling forms"""
    return AutoFillData(
        user=current_user,
        electricity_accounts=current_user.electricity_accounts,
        gas_accounts=current_user.gas_accounts,
        water_accounts=current_user.water_accounts,
        property_accounts=current_user.property_accounts
    )
