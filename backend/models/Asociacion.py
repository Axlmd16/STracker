from sqlalchemy import Table, Column, Integer, ForeignKey
from core.database import Base

# Tabla intermedia: Relación muchos a muchos entre estudiantes y grupos
estudiante_grupo = Table(
    'estudiante_grupo', Base.metadata,
    Column('estudiante_id', Integer, ForeignKey('usuario.id'), primary_key=True),
    Column('grupo_id', Integer, ForeignKey('grupo.id'), primary_key=True)
)

# Tabla intermedia: Relación muchos a muchos entre estudiantes y asignaturas
estudiante_asignatura = Table(
    'estudiante_asignatura', Base.metadata,
    Column('estudiante_id', Integer, ForeignKey('usuario.id'), primary_key=True),
    Column('asignatura_id', Integer, ForeignKey('asignatura.id'), primary_key=True)
)