from pydantic import BaseModel, field_validator
from typing import List, Optional
from datetime import datetime

class ActividadBase(BaseModel):
    id: Optional[int] = None
    titulo: str
    descripcion: Optional[str] = None
    fecha_inicio: datetime
    fecha_fin: datetime
    tipo_actividad: str
    asignatura_id: Optional[int] = None
    class Config:
        from_attributes = True
        
    @field_validator("fecha_fin")
    def validar_fechas(cls, fecha_fin, values):
        fecha_inicio = values.data.get("fecha_inicio")
        if fecha_inicio and fecha_fin <= fecha_inicio:
            raise ValueError("La fecha de finalización debe ser posterior a la fecha de inicio")
        return fecha_fin
        
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