from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    app_name: str = "Language Learning Platform"
    
    # Supabase credentials
    supabase_url: str
    supabase_key: str
    supabase_service_key: str
    
    # Database URL
    database_url: str = "sqlite:///./app.db"
    
    # Security
    secret_key: str

    # Generative AI API Keys
    google_genai_api_key: str
    gemini_api_key: str

    class Config:
        env_file = ".env"
        case_sensitive = False
        env_file_encoding = 'utf-8'


@lru_cache()
def get_settings():
    return Settings()
