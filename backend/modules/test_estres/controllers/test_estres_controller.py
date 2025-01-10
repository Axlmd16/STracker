from sqlalchemy import func
from models.TestEstres import TestEstres
from core.database import SessionLocal

class TestEstresController:
    def __init__(self):
        pass

    def obtener_all_test_estres(self):
        with SessionLocal() as db:
            return db.query(TestEstres).all()

    def obtener_test_estres(self, id: int):
        with SessionLocal() as db:
            return db.query(TestEstres).filter(TestEstres.id == id).first()
    
    def crear_test_estres(self, test_estres):
        with SessionLocal() as db:
            db_test_estres = TestEstres(**test_estres.dict())
            db.add(db_test_estres)
            db.commit()
            db.refresh(db_test_estres)
            return db_test_estres

    def modificar_test_estres(self, id: int, test_estres):
        with SessionLocal() as db:
            db_test = db.query(TestEstres).filter(TestEstres.id == id).first()
            if db_test:
                for key, value in test_estres.dict(exclude_unset=True).items():
                    setattr(db_test, key, value)
                db.commit()
                db.refresh(db_test)
                return db_test
            return None

    def eliminar_test_estres(self, id: int):
        with SessionLocal() as db:
            db_test = db.query(TestEstres).filter(TestEstres.id == id).first()
            if db_test:
                db.delete(db_test)
                db.commit()
                return True
            
    
    def get_ultimos_test(self):
        with SessionLocal() as db:
            return db.query(TestEstres).order_by(TestEstres.id.desc()).limit(3).all()
        
    def ramdon_id_test(self):
        with SessionLocal() as db:
            return db.query(TestEstres).order_by(func.random()).first().id