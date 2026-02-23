"""
Script to seed the database with services data
Run this after creating the database tables
"""

import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.database import engine, SessionLocal
from app.models import Base
from app.seed_data.seed_grants import seed_grants

def seed_database():
    """Seed the database with initial services data"""
    
    # Create all tables
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("[OK] Tables created successfully")
    
    # Seed government grants
    print("\nSeeding government grants...")
    seed_grants()
    
    # Note: Services are loaded from services_data.json via service_loader.py
    # This function just ensures tables exist
    print("[OK] Database ready for services data")

if __name__ == "__main__":
    seed_database()
