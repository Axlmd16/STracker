from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, CHAR
from sqlalchemy.orm import relationship
from core.database import Base

class Asignatura(Base):
    __tablename__ = "asignatura"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String, nullable=False)
    nro_horas = Column(Integer, nullable=False)
    paralelo = Column(CHAR, nullable=False)
    fecha_inicio = Column(DateTime, nullable=False)
    fecha_fin = Column(DateTime, nullable=False)
    docente_id = Column(Integer, ForeignKey("usuario.id"))
    
    # Relaciones
    docente = relationship("Usuario", back_populates="asignaturas_dictadas")
    estudiantes = relationship("Usuario", secondary="estudiante_asignatura", back_populates="asignaturas_estudiante")
    actividades_academicas = relationship("ActividadAcademica", back_populates="asignatura")

