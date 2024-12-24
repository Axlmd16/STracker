from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ActividadBase(BaseModel):
    id: Optional[int] = None
    titulo: str
    descripcion: Optional[str] = None
    fecha_inicio: datetime
    fecha_fin: datetime
    asignatura_id: Optional[int] = None
    class Config:
        from_attributes = True
        
class ActividadCreate(ActividadBase):
    pass

class ActividadUpdate(ActividadBase):
    id: int
    pass

class ActividadInDB(ActividadBase):
    id: int
    class Config:
        from_attributes = True
        
class ActividadResponse(BaseModel):
    message: str
    data: ActividadBase
    class Config:
        from_attributes = True