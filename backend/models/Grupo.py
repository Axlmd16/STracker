from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from core.database import Base

class Grupo(Base):
    __tablename__ = "grupo"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String, nullable=False)
    nro_estudiantes = Column(Integer, nullable=False)
    
    # Relación
    estudiantes = relationship("Usuario", secondary="estudiante_grupo", back_populates="grupos")