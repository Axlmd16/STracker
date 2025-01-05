from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from core.database import Base

class Grupo(Base):
    __tablename__ = "grupo"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    nro_estudiantes = Column(Integer, nullable=False)

    # Relación
    estudiantes_asignaturas = relationship("EstudianteAsignatura", secondary="gea", back_populates="grupos") 
    asignaciones_test = relationship("AsignacionTest", back_populates="grupo")