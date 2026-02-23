from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from app.database import engine, Base
from app.routers import auth, users, services, applications, services_api, whatsapp, documents, services_data, portal_redirect, proxy, grants, admin, automation
from app.config import get_settings

settings = get_settings()

# Create database tables (only creates if they don't exist)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    description="Unified Portal for Gas, Electricity, Water & Property Services",
    version="1.0.0"
)

def parse_cors_origins():
    raw_value = settings.BACKEND_CORS_ORIGINS
    if not raw_value:
        return ["*"], False

    try:
        parsed = json.loads(raw_value)
        if isinstance(parsed, list) and parsed:
            has_wildcard = "*" in parsed
            return parsed, not has_wildcard
    except (json.JSONDecodeError, TypeError):
        pass

    fallback = [origin.strip() for origin in str(raw_value).split(",") if origin.strip()]
    if not fallback:
        fallback = ["*"]

    has_wildcard = "*" in fallback
    return fallback, not has_wildcard

cors_origins, allow_credentials = parse_cors_origins()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(services.router)
app.include_router(services_api.router)
app.include_router(services_data.router)
app.include_router(portal_redirect.router)
app.include_router(applications.router)
app.include_router(automation.router)  # Automation routes
app.include_router(documents.router)
app.include_router(whatsapp.router)
app.include_router(proxy.router)
app.include_router(grants.router)
app.include_router(admin.router)  # Admin panel routes

@app.get("/")
def root():
    return {
        "message": "Welcome to Unified Services Portal",
        "services": ["Electricity", "Gas", "Water", "Property"],
        "docs": "/docs"
    }

@app.get("/health")
@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "Gujarat Portal Backend"}


if __name__ == "__main__":
    import uvicorn
    import os
    import sys
    
    # Add the parent directory to sys.path to allow running as a script
    sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

    # Using "app.main:app" string allows reload to work properly
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
