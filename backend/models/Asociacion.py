from sqlalchemy import Table, Column, Integer, ForeignKey
from core.database import Base


gea = Table(
    'gea', Base.metadata,
    Column('estudiante_asignatura_id', Integer, ForeignKey('estudiante_asignatura.id'), primary_key=True),
    Column('grupo_id', Integer, ForeignKey('grupo.id'), primary_key=True)
)

recomendacion_test = Table(
    'recomendacion_test', Base.metadata,
    Column('recomendacion_id', Integer, ForeignKey('recomendacion.id'), primary_key=True),
    Column('test_estres_id', Integer, ForeignKey('test_estres.id'), primary_key=True)
)