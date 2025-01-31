from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from core.database import Base

class TestEstres(Base):
    __tablename__ = "test_estres"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    url = Column(String(255), nullable=False, unique=True)
    descripcion = Column(String(255), nullable=False)
    estado = Column(Boolean, default=True)  
    
    # Relación
    asignaciones_test = relationship("AsignacionTest", back_populates="test")
    recomendaciones = relationship("Recomendacion", secondary="recomendacion_test", back_populates="tests")