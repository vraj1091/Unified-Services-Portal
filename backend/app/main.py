from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request, Response
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
    local_origin_regex = settings.BACKEND_CORS_ORIGIN_REGEX or r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$"

    if not raw_value:
        return ["*"], False, local_origin_regex

    try:
        parsed = json.loads(raw_value)
        if isinstance(parsed, list) and parsed:
            has_wildcard = "*" in parsed
            return parsed, not has_wildcard, None if has_wildcard else local_origin_regex
    except (json.JSONDecodeError, TypeError):
        pass

    fallback = [origin.strip() for origin in str(raw_value).split(",") if origin.strip()]
    if not fallback:
        fallback = ["*"]

    has_wildcard = "*" in fallback
    return fallback, not has_wildcard, None if has_wildcard else local_origin_regex

cors_origins, allow_credentials, cors_origin_regex = parse_cors_origins()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_origin_regex=cors_origin_regex,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hard CORS fallback for Render/browser preflight edge cases.
# This guarantees Access-Control-* headers even when upstream config drifts.
@app.middleware("http")
async def force_cors_headers(request: Request, call_next):
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "*",
    }

    if request.method == "OPTIONS":
        return Response(status_code=204, headers=cors_headers)

    try:
        response = await call_next(request)
    except Exception:
        response = Response(status_code=500)

    for key, value in cors_headers.items():
        response.headers[key] = value
    return response

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
