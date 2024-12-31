from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from core.config import settings

engine = create_engine(
    # settings.database_url, connect_args={"check_same_thread": False} if "sqlite" in settings.database_url else {})
    settings.database_url, connect_args={"check_same_thread": False} if "MySQLdb" in settings.database_url else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Tablas
def init_db():
    from models.Usuario import Usuario
    from models.Cuenta import Cuenta
    from models.Notificacion import Notificacion
    from models.Grupo import Grupo
    from models.Asignatura import Asignatura
    from models.EstudianteAsignatura import EstudianteAsignatura
    from models.Asociacion import recomendacion_test
    from models.Asignacion import AsignacionTest
    from models.TestEstres import TestEstres
    from models.ResultadoTest import ResultadoTest
    from models.ActividadAcademica import ActividadAcademica
    from models.Asociacion import gea
    from models.Recomendacion import Recomendacion
        
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as e:
        print(f"Error al crear tablas: {e}")
        raise