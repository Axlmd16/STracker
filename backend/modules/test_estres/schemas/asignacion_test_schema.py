from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

# class AsignacionTestSchema(BaseModel):
#     fecha_asignacion: datetime
#     fecha_limite: datetime
#     descripcion: Optional[str] = None
#     docente_id: int
#     test_id: int
#     actividad_academica_id: Optional[int] = None
#     asignatura_id: int
#     id_grupo: Optional[int] = None

#     class Config:
#         from_attributes = True
        
        
class AsignacionTestSchema(BaseModel):
    fecha_asignacion: datetime
    fecha_limite: datetime
    descripcion: Optional[str] = None
    test_id: int
    asignatura_id: int

    class Config:
        from_attributes = True
        
