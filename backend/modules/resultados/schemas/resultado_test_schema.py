from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class ResultadoTestSchema(BaseModel):
    retroalimentacion: Optional[str] = None
    fecha_realizacion: Optional[datetime] = None
    resultado: Optional[float] = None
    asignacion_id: Optional[int] = None
    grupo_id: Optional[int] = None
    actividad_academica_id: Optional[int] = None
    estudiante_asignatura_id: Optional[int] = None

    class Config:
        from_attributes = True

class RespuestaFormulario(BaseModel):
    puntuacion: float
    # id_unico: str
    
class IdRespuestaFormulario(BaseModel):
    # puntuacion: float
    id_unico: str
    
    
class InformeResultadoAsignatura(BaseModel):
    nivel_estres: str
    cantidad: int
    
class InformeResultadoEstudiante(BaseModel):
    nivel_estres: str
    cantidad: int
    
    
class UpdateRetroalimentacionResultado(BaseModel):
    retroalimentacion: str = Field(..., max_length=255)
    