from fastapi import APIRouter

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def admin_root():
    return {"message": "Admin Panel API"}
