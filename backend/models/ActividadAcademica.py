from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, CHAR
from sqlalchemy.orm import relationship
from core.database import Base

class ActividadAcademica(Base):
    __tablename__ = "actividad_academica"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    titulo = Column(String, nullable=False)
    descripcion = Column(String, nullable=False)
    fecha_inicio = Column(DateTime, nullable=False)
    fecha_fin = Column(DateTime, nullable=False)
    asignatura_id = Column(Integer, ForeignKey("asignatura.id"), nullable=False)
    
    # Relaciones
    asignatura = relationship("Asignatura", back_populates="actividades_academicas")
    asignaciones_test_ac = relationship("AsignacionTest", back_populates="actividad_academica", overlaps="actividad_academica")