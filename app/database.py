from sqlmodel import SQLModel, Session, create_engine
from app.config import get_settings
from supabase import create_client, Client
from typing import Generator
import os

settings = get_settings()

engine = None
supabase_client: Client = None


def init_db():
    global engine, supabase_client
    
    database_url = settings.database_url or "sqlite:///./app.db"
    engine = create_engine(database_url, echo=False)
    SQLModel.metadata.create_all(engine)
    
    with Session(engine) as session:
        from app.models import User, UserRole
        existing_user = session.query(User).filter(User.id == 1).first()
        if not existing_user:
            demo_teacher = User(
                id=1,
                email="teacher@demo.com",
                full_name="Demo Teacher",
                role=UserRole.TEACHER
            )
            session.add(demo_teacher)
            session.commit()
    
    if settings.supabase_url and settings.supabase_key:
        supabase_client = create_client(settings.supabase_url, settings.supabase_key)


def get_session() -> Generator[Session, None, None]:
    if engine is None:
        raise Exception("Database not initialized")
    
    with Session(engine) as session:
        yield session


def get_supabase() -> Client:
    if supabase_client is None:
        raise Exception("Supabase client not initialized")
    return supabase_client
