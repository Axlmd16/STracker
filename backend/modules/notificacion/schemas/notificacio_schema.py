from datetime import datetime
from pydantic import BaseModel


class NotificacionSchema(BaseModel):
    titulo: str
    mensaje: str
    fecha: datetime
    usuario_id: int 
    
    class Config:
        from_attributes = True
        
class NotificacionResultadoSchema(BaseModel):
    titulo: str
    mensaje: str
    docente_id: int
    resultado_test_id: int
    asignatura_id: int
    estudiante_asignatura_id: int
    
    class Config:
        from_attributes = True