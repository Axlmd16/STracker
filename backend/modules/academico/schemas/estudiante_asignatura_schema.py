from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class EstudianteAsignaturaBase(BaseModel):
    id: Optional[int] = None
    estudiante_id: int
    asignatura_id: int
    class Config:
        from_attributes = True
        
        
class EstudianteAsig(BaseModel):
    id: Optional[int] = None
    estudiante_id: int
    class Config:
        from_attributes = True