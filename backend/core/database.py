from contextlib import contextmanager
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from core.config import settings
from threading import Lock

class DatabaseEngine:
    _instance = None
    _lock = Lock()

    def __new__(cls, *args, **kwargs):
        with cls._lock:
            if not cls._instance:
                cls._instance = super(DatabaseEngine, cls).__new__(cls, *args, **kwargs)
                cls._instance.engine = create_engine(
                    settings.database_url,
                    connect_args={"check_same_thread": False} if "MySQLdb" in settings.database_url else {},
                )
                cls._instance.SessionLocal = sessionmaker(
                    autocommit=False, autoflush=False, bind=cls._instance.engine
                )
        return cls._instance


    @contextmanager
    def get_session():
        db = DatabaseEngine().SessionLocal()
        try:
            yield db
        finally:
            db.close()
 

Base = declarative_base()

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
        Base.metadata.create_all(bind=DatabaseEngine().engine)
    except Exception as e:
        print(f"Error al crear tablas: {e}")
        raise

    
    
    
    