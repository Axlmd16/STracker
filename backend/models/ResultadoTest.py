from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Float, UniqueConstraint
from sqlalchemy.orm import relationship
from core.database import Base

class ResultadoTest(Base):
    __tablename__ = "resultado_test"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    fecha_realizacion = Column(DateTime, nullable=True)
    resultado = Column(Float, nullable=True, default=0.0)
    retroalimentacion = Column(String(255), nullable=True)
    compartido = Column(Boolean, nullable=True, default=False)
    asignacion_id = Column(Integer, ForeignKey("asignacion_test.id", ondelete="CASCADE"), nullable=False)
    estudiante_asignatura_id = Column(Integer, ForeignKey("estudiante_asignatura.id", ondelete="CASCADE"), nullable=True)
    grupo_id = Column(Integer, ForeignKey("grupo.id", ondelete="CASCADE"), nullable=True)
    actividad_academica_id = Column(Integer, ForeignKey("actividad_academica.id", ondelete="CASCADE"), nullable=True)
    
    # Relaciones
    asignacion = relationship("AsignacionTest", back_populates="resultados", lazy="subquery")
    estudiante_asignatura = relationship("EstudianteAsignatura", back_populates="test_realizados")
    grupo = relationship("Grupo", back_populates="resultados")
    actividad_academica = relationship("ActividadAcademica", back_populates="resultados")

