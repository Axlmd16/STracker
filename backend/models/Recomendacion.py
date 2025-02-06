from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base

class Recomendacion(Base):
    __tablename__ = "recomendacion"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    titulo = Column(String(255), nullable=False)
    descripcion = Column(String(255), nullable=False)
    prioridad = Column(Integer, nullable=False)
    
    # Relacines
    tests = relationship( "TestEstres", secondary="recomendacion_test", back_populates="recomendaciones")