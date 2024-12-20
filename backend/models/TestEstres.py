from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from core.database import Base

class TestEstres(Base):
    __tablename__ = "test_estres"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    url = Column(String, nullable=False, unique=True)
    descripcion = Column(String, nullable=False)
    
    # Relación
    asignaciones_test = relationship("AsignacionTest", back_populates="test")