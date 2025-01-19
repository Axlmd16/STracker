from datetime import datetime
from pydantic import BaseModel


class NotificacionSchema(BaseModel):
    titulo: str
    mensaje: str
    fecha: datetime
    usuario_id: int 
    
    class Config:
        from_attributes = True