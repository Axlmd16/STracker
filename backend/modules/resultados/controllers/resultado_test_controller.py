from core.database import SessionLocal
from models.ResultadoTest import ResultadoTest
from models.EstudianteAsignatura import EstudianteAsignatura

class ResultadoTestControl:
    def __init__(self):
        pass
    
    def obtener_resultados(self):
        with SessionLocal() as db:
            return db.query(ResultadoTest).all()
        
    def obtener_resultado(self, id: int):
        with SessionLocal() as db:
            return db.query(ResultadoTest).filter(ResultadoTest.id == id).first()
        
    def crear_resultado(self, resultado):
        with SessionLocal() as db:
            db_resultado = ResultadoTest(**resultado.dict())
            db.add(db_resultado)
            db.commit()
            db.refresh(db_resultado)
            return db_resultado
        
    def actualizar_resultado(self, id: int, resultado):
        with SessionLocal() as db:
            db.query(ResultadoTest).filter(ResultadoTest.id == id).update(resultado.dict())
            db.commit()
            return db.query(ResultadoTest).filter(ResultadoTest.id == id).first()
        
    def eliminar_resultado(self, id: int):
        with SessionLocal() as db:
            resultado = db.query(ResultadoTest).filter(ResultadoTest.id == id).first()
            if resultado:
                db.delete(resultado)
                db.commit()
                return True
            else:
                return False
            
    
    def obtener_resultados_por_estudiante(self, estudiante_id: int):
        with SessionLocal() as db:
            print(f"estudiante_id: {estudiante_id}")
            estudiante_asignatura_ids = db.query(EstudianteAsignatura.id).filter(EstudianteAsignatura.estudiante_id == estudiante_id).all()
            print(f"estudiante_asignatura_ids: {estudiante_asignatura_ids}")
            estudiante_asignatura_ids = [ea.id for ea in estudiante_asignatura_ids]
            print(f"estudiante_asignatura_ids: {estudiante_asignatura_ids}")
            resultados = db.query(ResultadoTest).filter(ResultadoTest.estudiante_asignatura_id.in_(estudiante_asignatura_ids)).all()
            
            return resultados
        
        
        
        
        
    def obtener_resultados_por_test(self, test_id: int):
        with SessionLocal() as db:
            return db.query(ResultadoTest).filter(ResultadoTest.test_id == test_id).all()