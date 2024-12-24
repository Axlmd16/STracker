from pydantic import BaseModel, EmailStr
from typing import Optional


class CuentaBase(BaseModel):
    id: Optional[int] = None
    username: EmailStr
    password: str
    estado: Optional[bool] = True
    usuario_id: int
    
    class Config:
        from_attributes = True
    
class CuentaCreate(CuentaBase):
    pass

class CuentaUpdate(CuentaBase):
    id: int
    pass

class CuentaInDB(CuentaBase):
    id: int
    class Config:
        from_attributes = True
        
class CuentaResponse(BaseModel):
    message: str
    data: CuentaBase
    class Config:
        from_attributes = True
        
class CuentaLogin(BaseModel):
    username: EmailStr
    password: str
    class Config:
        from_attributes = True

class CuentaRol(BaseModel):
    username: EmailStr
    password: str
    estado: Optional[bool] = True
    rol: str
    id_usuario: int
    class Config:
        from_attributes = True