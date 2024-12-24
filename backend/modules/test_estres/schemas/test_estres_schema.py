from pydantic import BaseModel, HttpUrl, ValidationError, validator
from typing import Any

class TestEstresSchema(BaseModel):
    url: HttpUrl
    descripcion: str
    estado: bool = True

    @validator("url")
    def validar_google_forms(cls, value: HttpUrl) -> HttpUrl:
        url_str = str(value)  
        if not url_str.startswith("https://docs.google.com/forms/"):
            raise ValueError("La URL debe ser un enlace válido de Google Forms")
        return value
