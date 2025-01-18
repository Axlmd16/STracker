from models.Recomendacion import Recomendacion
from sqlalchemy import text 
from core.database import DatabaseEngine

class RecomendacionesTest:
    def __init__(self, recomendacion_id: int, test_estres_id: int):
        self.recomendacion_id = recomendacion_id
        self.test_estres_id = test_estres_id

class RecomendacionesController:

    def __init__(self):
        pass

    def obtener_recomendaciones(self):
        with DatabaseEngine.get_session() as db:
            return db.query(Recomendacion).all()
        
    def obtener_recomendacion_por_id(self, id_recomendacion: int):
        with DatabaseEngine.get_session() as db:
            return db.query(Recomendacion).filter(Recomendacion.id == id_recomendacion).first()
        
    def crear_recomendacion(self, recomendacion):
        with DatabaseEngine.get_session() as db:
            db_recomendacion = Recomendacion(**recomendacion.dict())
            db.add(db_recomendacion)
            db.commit()
            db.refresh(db_recomendacion)
            return db_recomendacion
        
    def modificar_recomendacion(self, id_recomendacion: int, recomendacion: Recomendacion):
        with DatabaseEngine.get_session() as db:
            db_recomendacion = db.query(Recomendacion).filter(Recomendacion.id == id_recomendacion).first()
            if db_recomendacion:
                for key, value in recomendacion.dict(exclude_unset=True).items():
                    setattr(db_recomendacion, key, value)
                db.commit()
                db.refresh(db_recomendacion)
                return db_recomendacion
            return None
        
    def eliminar_recomendacion(self, id_recomendacion: int):
        with DatabaseEngine.get_session() as db:
            db_recomendacion = db.query(Recomendacion).filter(Recomendacion.id == id_recomendacion).first()
            if db_recomendacion:
                db.delete(db_recomendacion)
                db.commit()
                return True
            return False
    
    def crear_recomendacion_test(self, recomendacion_id: int, test_estres_id: int):
        with DatabaseEngine.get_session() as db:
            existing_record = db.execute(
                text("""
                    SELECT 1 FROM recomendacion_test 
                    WHERE recomendacion_id = :recomendacion_id 
                    AND test_estres_id = :test_estres_id
                    LIMIT 1
                """),
                {"recomendacion_id": recomendacion_id, "test_estres_id": test_estres_id}
            ).fetchone()

            if existing_record:
                return {"message": "La recomendación ya está asociada a este test de estrés"}

            sql = text("""
                INSERT INTO recomendacion_test (recomendacion_id, test_estres_id)
                VALUES (:recomendacion_id, :test_estres_id)
            """)
            db.execute(sql, {"recomendacion_id": recomendacion_id, "test_estres_id": test_estres_id})
            db.commit()

            return {"recomendacion_id": recomendacion_id, "test_estres_id": test_estres_id}
            
    def eliminar_recomendacion_test(self, recomendacion_id: int, test_estres_id: int):
        with DatabaseEngine.get_session() as db:
            sql = text("""
                DELETE FROM recomendacion_test
                WHERE recomendacion_id = :recomendacion_id
                AND test_estres_id = :test_estres_id
            """)

            result = db.execute(sql, {"recomendacion_id": recomendacion_id, "test_estres_id": test_estres_id})
            db.commit()

            if result.rowcount > 0:
                return True
            else:
                return False

    def obtener_recomendaciones_por_test(self, id_test: int):
        with DatabaseEngine.get_session() as db:
            sql = text("""
                SELECT recomendacion_id 
                FROM recomendacion_test
                WHERE test_estres_id = :id_test
            """)
            result = db.execute(sql, {"id_test": id_test})
            
            recomendacion_ids = [row.recomendacion_id for row in result.fetchall()]
            
            if not recomendacion_ids:
                return []

            sql_recomendaciones = text("""
                SELECT * 
                FROM recomendacion
                WHERE id IN :recomendacion_ids
            """)
            result_recomendaciones = db.execute(sql_recomendaciones, {"recomendacion_ids": tuple(recomendacion_ids)})

            columns = result_recomendaciones.keys()  
            recomendaciones = [
                dict(zip(columns, row)) for row in result_recomendaciones.fetchall()
            ]

            print(f"\n\n\n\n\n\nrecomendaciones: {recomendaciones}\n\n\n\n\n\n")
            
            return recomendaciones if recomendaciones else []
    
    def obtener_recomendaciones_por_prioridad(self, prioridad: int):
        with DatabaseEngine.get_session() as db:
            recomendaciones = db.query(Recomendacion).filter(Recomendacion.prioridad == prioridad).all()
            return recomendaciones if recomendaciones else []
        
    def obtener_recomendaciones_de_test(id):
        with DatabaseEngine.get_session() as db:
            recomendaciones = db.query(Recomendacion).join(RecomendacionesTest).filter(RecomendacionesTest.test_estres_id == id).all()
            return recomendaciones if recomendaciones else []
             
        
    # def obtener_recomendaciones_de_test(id):  
    #     with DatabaseEngine.get_session() as db:
    #         sql = text("""
    #             SELECT recomendacion_id 
    #             FROM recomendacion_test
    #             WHERE test_estres_id = :id
    #         """)
    #         result = db.execute(sql, {"id": id}) 
    #         recomendacion_ids = [row.recomendacion_id for row in result.fetchall()]
            
    #         if not recomendacion_ids:
    #             return []
            
    #         sql_recomendaciones = text("""
    #             SELECT *
    #             FROM recomendacion
    #             WHERE id IN :recomendacion_ids
    #         """)
    #         result_recomendaciones = db.execute(sql_recomendaciones, {"recomendacion_ids": tuple(recomendacion_ids)})
            
    #         columns = result_recomendaciones.keys()
    #         recomendaciones = [
    #             dict(zip(columns, row)) for row in result_recomendaciones.fetchall()
    #         ]
            
    #         return recomendaciones if recomendaciones else []