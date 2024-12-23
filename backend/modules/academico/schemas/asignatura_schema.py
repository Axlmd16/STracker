from pydantic import BaseModel
from typing import List, Optional

class AsignaturaBase(BaseModel):
    id: Optional[int] = None
    nombre: str
    nro_horas: int
    paralelo: str
    fecha_inicio: str
    fecha_fin: str
    docente_id: Optional[int] = None
    
    class Config:
        from_attributes = True
        
        
class AsignaturaCreate(AsignaturaBase):
    pass

class AsignaturaUpdate(AsignaturaBase):
    id: int
    pass

class AsignaturaInDB(AsignaturaBase):
    id: int
    class Config:
        from_attributes = True
        
class AsignaturaResponse(BaseModel):
    message: str
    data: AsignaturaBase
    class Config:
        from_attributes = True
        
        
    