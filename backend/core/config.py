from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

load_dotenv(".env")

class Settings(BaseSettings):
    database_url: str = os.getenv("DATABASE_URL")

settings = Settings()