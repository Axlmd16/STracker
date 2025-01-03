from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base

class AsignacionTest(Base):
    __tablename__ = "asignacion_test"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    fecha_asignacion = Column(DateTime, nullable=False)
    fecha_limite = Column(DateTime, nullable=False)
    descripcion = Column(String(255), nullable=True)
    docente_id = Column(Integer, ForeignKey("usuario.id"), nullable=False)
    test_id = Column(Integer, ForeignKey("test_estres.id"), nullable=False)
    actividad_academica_id = Column(Integer, ForeignKey("actividad_academica.id"), nullable=True) 
    asignatura_id = Column(Integer, ForeignKey("asignatura.id"), nullable=False)
    id_grupo = Column(Integer, ForeignKey("grupo.id"), nullable=True)
    
    # Relaciones
    asignatura = relationship("Asignatura", back_populates="asignaciones")
    test = relationship("TestEstres", back_populates="asignaciones_test")
    actividad_academica = relationship("ActividadAcademica", back_populates="asignaciones_test_ac")
    resultados = relationship("ResultadoTest", back_populates="asignacion", cascade="all, delete-orphan")
    grupo = relationship("Grupo", back_populates="asignaciones_test", lazy="subquery")