from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from core.database import Base

class ResultadoTest(Base):
    __tablename__ = "resultado_test"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    fecha = Column(DateTime, nullable=False)
    resultado = Column(Float, nullable=True)
    asignacion_id = Column(Integer, ForeignKey("asignacion_test.id"), nullable=False)
    estudiante_id = Column(Integer, ForeignKey("usuario.id"), nullable=False)
    
    # Relaciones
    asignacion = relationship("AsignacionTest", back_populates="resultados")
    estudiante = relationship("Usuario", back_populates="test_realizados")