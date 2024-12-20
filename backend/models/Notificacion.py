from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from core.database import Base

class Notificacion(Base):
    __tablename__ = "notificacion"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    titulo = Column(String, nullable=False)
    mensaje = Column(String, nullable=False)
    fecha = Column(DateTime, nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuario.id"))
    
    # Relación
    usuario = relationship("Usuario", back_populates="notificaciones")