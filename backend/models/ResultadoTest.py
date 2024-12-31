from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Float, UniqueConstraint
from sqlalchemy.orm import relationship
from core.database import Base

class ResultadoTest(Base):
    __tablename__ = "resultado_test"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    fecha = Column(DateTime, nullable=False)
    resultado = Column(Float, nullable=True)
    asignacion_id = Column(Integer, ForeignKey("asignacion_test.id"), nullable=False)
    estudiante_asignatura_id = Column(Integer, ForeignKey("estudiante_asignatura.id"), nullable=False)
    
    # Relaciones
    asignacion = relationship("AsignacionTest", back_populates="resultados")
    estudiante_asignatura = relationship("EstudianteAsignatura", back_populates="test_realizados")

    # Índice compuesto para evitar combinaciones duplicadas
    __table_args__ = (
        UniqueConstraint('asignacion_id', 'estudiante_asignatura_id', name='unique_asignacion_estudiante'),
    )