from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Enum as Enum_sql
from sqlalchemy.orm import relationship
from core.database import Base
from enum import Enum

class EstadoActividadEnum(str, Enum):
    PENDIENTE = "PENDIENTE"
    EN_PROGRESO = "EN_PROGRESO"
    FINALIZADO = "FINALIZADO"
    
    
class TipoActividad(str, Enum):
    ACTIVIDAD_EXTRA_CLASE = "ACTIVIDAD_EXTRA_CLASE"
    ACTIVIDAD_EN_CLASE = "ACTIVIDAD_EN_CLASE"
    FORO = "FORO"

class ActividadAcademica(Base):
    __tablename__ = "actividad_academica"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    titulo = Column(String(255), nullable=False)
    descripcion = Column(String(255), nullable=True)
    fecha_inicio = Column(DateTime, nullable=False)
    fecha_fin = Column(DateTime, nullable=False)
    asignatura_id = Column(Integer, ForeignKey("asignatura.id", ondelete="CASCADE"), nullable=False)
    estado = Column(Enum_sql(EstadoActividadEnum), nullable= False, default=EstadoActividadEnum.PENDIENTE)
    tipo_actividad = Column(Enum_sql(TipoActividad), nullable=False, default=TipoActividad.ACTIVIDAD_EXTRA_CLASE)
    
    
    # Relaciones
    asignatura = relationship("Asignatura", back_populates="actividades_academicas")
    asignaciones_test_ac = relationship("AsignacionTest", back_populates="actividad_academica", overlaps="actividad_academica")