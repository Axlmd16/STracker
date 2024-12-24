from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base

class Cuenta(Base):
    __tablename__ = "cuenta"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    estado = Column(Boolean, default=True)
    usuario_id = Column(Integer, ForeignKey("usuario.id", ondelete="CASCADE")) 
    
    # Relación
    usuario = relationship("Usuario", back_populates="cuenta")