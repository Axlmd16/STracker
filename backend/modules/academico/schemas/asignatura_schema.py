from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class AsignaturaBase(BaseModel):
    id: Optional[int] = None
    nombre: str
    nro_horas: int
    paralelo: str
    fecha_inicio: datetime
    fecha_fin: datetime
    docente_id: Optional[int] = None
    
    class Config:
        from_attributes = True
        
class AsignaturaCreate(AsignaturaBase):
    pass

class AsignaturaUpdate(AsignaturaBase):
    nombre: str
    nro_horas: int
    paralelo: str
    fecha_inicio: datetime
    fecha_fin: datetime
    docente_id: Optional[int] = None
    
    class Config:
        from_attributes = True

class AsignaturaInDB(AsignaturaBase):
    id: int
    class Config:
        from_attributes = True
        
class AsignaturaResponse(BaseModel):
    message: str
    data: AsignaturaBase
    class Config:
        from_attributes = True
        
class EstudianteAsignatura(BaseModel):
    id_estudiante: int
    class Config:
        from_attributes = True