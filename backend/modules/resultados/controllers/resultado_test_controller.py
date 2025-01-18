from core.database import DatabaseEngine
from models.ResultadoTest import ResultadoTest
from sqlalchemy import func, case
from models.EstudianteAsignatura import EstudianteAsignatura
from sqlalchemy import text
from datetime import datetime, timedelta

from modules.resultados.schemas.resultado_test_schema import InformeResultadoAsignatura

class ResultadoTestControl:
    def __init__(self):
        pass

    def obtener_resultados(self):
        with DatabaseEngine.get_session() as db:
            return db.query(ResultadoTest).all()

    def obtener_resultado(self, id: int):
        with DatabaseEngine.get_session() as db:
            return db.query(ResultadoTest).filter(ResultadoTest.id == id).first()

    def crear_resultado(self, resultado):
        with DatabaseEngine.get_session() as db:
            db_resultado = ResultadoTest(**resultado.dict())
            db.add(db_resultado)
            db.commit()
            db.refresh(db_resultado)
            return db_resultado

    def actualizar_resultado(self, id: int, resultado):
        with DatabaseEngine.get_session() as db:
            db.query(ResultadoTest).filter(ResultadoTest.id == id).update(resultado.dict())
            db.commit()
            return db.query(ResultadoTest).filter(ResultadoTest.id == id).first()

    def eliminar_resultado(self, id: int):
        with DatabaseEngine.get_session() as db:
            resultado = db.query(ResultadoTest).filter(ResultadoTest.id == id).first()
            if resultado:
                db.delete(resultado)
                db.commit()
                return True
            else:
                return False

    def obtener_resultados_por_estudiante(self, estudiante_id: int):
        with DatabaseEngine.get_session() as db:
            estudiante_asignatura_ids = db.query(EstudianteAsignatura.id).filter(EstudianteAsignatura.estudiante_id == estudiante_id).all()
            estudiante_asignatura_ids = [ea.id for ea in estudiante_asignatura_ids]
            resultados = db.query(ResultadoTest).filter(ResultadoTest.estudiante_asignatura_id.in_(estudiante_asignatura_ids)).all()
            return resultados

    def obtener_resultados_por_test(self, test_id: int):
        with DatabaseEngine.get_session() as db:
            return db.query(ResultadoTest).filter(ResultadoTest.test_id == test_id).all()

    def obtener_estudiante_asignatura_id(self, estudiante_id: int):
        with DatabaseEngine.get_session() as db:
            query = text("""
                SELECT id
                FROM estudiante_asignatura 
                WHERE estudiante_id = :estudiante_id
            """)
            result = db.execute(query, {"estudiante_id": estudiante_id}).fetchone()
            if result:
                return result[0]
            else:
                return None
            
    def obtener_niveles_estres_por_asignatura(self, asignatura_id: int):
        with DatabaseEngine.get_session() as db:
            fecha_inicio = datetime.now() - timedelta(days=7)

            promedios_estudiantes = (
                db.query(
                    EstudianteAsignatura.estudiante_id.label("estudiante_id"),
                    func.avg(ResultadoTest.resultado).label("promedio_estres")
                )
                .join(EstudianteAsignatura, ResultadoTest.estudiante_asignatura_id == EstudianteAsignatura.id)
                .filter(
                    EstudianteAsignatura.asignatura_id == asignatura_id,
                    ResultadoTest.fecha_realizacion >= fecha_inicio  
                )
                .group_by(EstudianteAsignatura.estudiante_id)
                .all()
            )

            # Contar los estudiantes en cada nivel de estrés
            niveles = {"alto": 0, "medio": 0, "bajo": 0}
            for promedio in promedios_estudiantes:
                if promedio.promedio_estres >= 80:
                    niveles["alto"] += 1
                elif promedio.promedio_estres >= 50:
                    niveles["medio"] += 1
                else:
                    niveles["bajo"] += 1

            # Construir la respuesta en formato JSON
            resultado_json = {
                "asignatura_id": asignatura_id,
                "periodo": "última semana",
                "niveles_estres": [
                    {"nivel_estres": "alto", "cantidad": niveles["alto"]},
                    {"nivel_estres": "medio", "cantidad": niveles["medio"]},
                    {"nivel_estres": "bajo", "cantidad": niveles["bajo"]},
                ],
            }

            return resultado_json