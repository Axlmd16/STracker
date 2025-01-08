from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, CHAR
from sqlalchemy.orm import relationship
from core.database import Base

class Asignatura(Base):
    __tablename__ = "asignatura"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    nro_horas = Column(Integer, nullable=False)
    paralelo = Column(CHAR, nullable=False)
    fecha_inicio = Column(DateTime, nullable=False)
    fecha_fin = Column(DateTime, nullable=False)
    docente_id = Column(Integer, ForeignKey("usuario.id", ondelete="CASCADE"))

    # Relaciones
    docente = relationship("Usuario", back_populates="asignaturas_dictadas")
    actividades_academicas = relationship(
        "ActividadAcademica", 
        back_populates="asignatura",
        cascade="all, delete-orphan"
    )
    asignaciones = relationship(
        "AsignacionTest", 
        back_populates="asignatura",
        cascade="all, delete-orphan"
    )
    estudiantes = relationship(
        "EstudianteAsignatura", 
        back_populates="asignatura", 
        cascade="all, delete-orphan"
    )

