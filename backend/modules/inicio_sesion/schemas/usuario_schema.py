
from pydantic import BaseModel
from typing import Optional


class UsuarioBase(BaseModel):
    id: Optional[int] = None
    nombres: str
    apellidos: str
    email: str
    telefono: Optional[str] = None
    cedula: str
    rol: str
    
    class Config:
        from_attributes = True

class UsuarioCreate(UsuarioBase):
    pass

class UsuarioUpdate(UsuarioBase):
    id : int
    pass

class UsuarioInDB(UsuarioBase):
    id: int
    class Config:
        from_attributes = True
        
class UsuarioResponse(BaseModel):
    message: str
    data: UsuarioBase
    class Config:
        from_attributes = True