from sqlalchemy import (
    Table, Column, Integer, ForeignKey, DateTime, UniqueConstraint
)
from core.database import Base
from sqlalchemy.orm import relationship



class EstudianteAsignatura(Base):
    __tablename__ = "estudiante_asignatura"

    id = Column(Integer, primary_key=True, autoincrement=True)
    estudiante_id = Column(Integer, ForeignKey("usuario.id", ondelete="CASCADE"))
    asignatura_id = Column(Integer, ForeignKey("asignatura.id", ondelete="CASCADE"))

    # Clave única para evitar duplicados
    __table_args__ = (
        UniqueConstraint("estudiante_id", "asignatura_id", name="unique_estudiante_asignatura"),
    )

    # Relaciones
    test_realizados = relationship("ResultadoTest", back_populates="estudiante_asignatura", cascade="all, delete-orphan")
    asignatura = relationship("Asignatura", back_populates="estudiantes")
    grupos = relationship("Grupo", secondary="gea", back_populates="estudiantes_asignaturas")
    estudiantes = relationship("Usuario", back_populates="asignaturas_estudiante")

def __repr__(self):
    return f"<EstudianteAsignatura(id={self.id}, estudiante_id={self.estudiante_id}, asignatura_id={self.asignatura_id})>"