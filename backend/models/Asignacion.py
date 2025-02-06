   
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base

class AsignacionTest(Base):
    __tablename__ = "asignacion_test"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    fecha_asignacion = Column(DateTime, nullable=False)
    fecha_limite = Column(DateTime, nullable=False)
    descripcion = Column(String(255), nullable=True)
    test_id = Column(Integer, ForeignKey("test_estres.id", ondelete="CASCADE"), nullable=False)
    asignatura_id = Column(Integer, ForeignKey("asignatura.id", ondelete="CASCADE"), nullable=False)
    
    # Relaciones
    asignatura = relationship("Asignatura", back_populates="asignaciones")
    test = relationship("TestEstres", back_populates="asignaciones_test", lazy="subquery")
    resultados = relationship("ResultadoTest", back_populates="asignacion", cascade="all, delete-orphan", lazy="subquery")
