from sqlalchemy import Column, Integer, String, ForeignKey, Enum as Enum_sql
from sqlalchemy.orm import relationship
from core.database import Base
from enum import Enum

class RolEnum(str, Enum):
    ADMINISTRADOR = "ADMINISTRADOR"
    DOCENTE = "DOCENTE"
    ESTUDIANTE = "ESTUDIANTE"

class Usuario(Base):
    __tablename__ = "usuario"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombres = Column(String(255), nullable=False)
    apellidos = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    telefono = Column(String(255), nullable=True)
    cedula = Column(String(255), unique=True, index=True, nullable=False)
    rol = Column(Enum_sql(RolEnum), nullable=False)

    cuenta = relationship("Cuenta", back_populates="usuario")
    notificaciones = relationship("Notificacion", back_populates="usuario")
    asignaciones = relationship("AsignacionTest", back_populates="docente")
    test_realizados = relationship("ResultadoTest", back_populates="estudiante")
    asignaturas_estudiante = relationship("Asignatura", secondary="estudiante_asignatura", back_populates="estudiantes")
    asignaturas_dictadas = relationship("Asignatura", back_populates="docente")
    
    grupos = relationship("Grupo", secondary="estudiante_grupo", back_populates="estudiantes")