from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = "sqlite:///./apidb.db"
    database_url: str = "mysql+mysqldb://root:2002@localhost:3306/stresstracker"

    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings()