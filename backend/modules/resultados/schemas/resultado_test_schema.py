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
    estudiante_asignatura_id: int

    class Config:
        from_attributes = True

class RespuestaFormulario(BaseModel):
    timestamp: str
    puntuacion: str
    id_unico: str
    tiene_estres: str