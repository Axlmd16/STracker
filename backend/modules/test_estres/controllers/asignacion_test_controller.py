from models.Grupo import Grupo
from models.EstudianteAsignatura import EstudianteAsignatura
from models.ActividadAcademica import ActividadAcademica
from models.Asignacion import AsignacionTest
from core.database import DatabaseEngine
from sqlalchemy import text

#* Clase auxiliar

class Gea:
    def __init__(self, estudiante_asignatura_id, grupo_id):
        self.estudiante_asignatura_id = estudiante_asignatura_id
        self.grupo_id = grupo_id

class AsignacionTestController:
    def __init__(self):
        pass

    def obtener_all_asignaciones(self):
        with DatabaseEngine.get_session() as db:
            return db.query(AsignacionTest).all()

    def obtener_asignacion(self, id: int):
        with DatabaseEngine.get_session() as db:
            return db.query(AsignacionTest).filter(AsignacionTest.id == id).first()

    def crear_asignacion(self, asignacion):
        with DatabaseEngine.get_session() as db:
            db_asignacion = AsignacionTest(**asignacion.dict())
            db.add(db_asignacion)
            db.commit()
            db.refresh(db_asignacion)
            return db_asignacion

    def modificar_asignacion(self, id: int, asignacion):
        with DatabaseEngine.get_session() as db:
            db_asignacion = db.query(AsignacionTest).filter(AsignacionTest.id == id).first()
            if db_asignacion:
                for key, value in asignacion.dict(exclude_unset=True).items():
                    setattr(db_asignacion, key, value)
                db.commit()
                db.refresh(db_asignacion)
                return db_asignacion
            return None

    def eliminar_asignacion(self, id: int):
        with DatabaseEngine.get_session() as db:
            db_asignacion = db.query(AsignacionTest).filter(AsignacionTest.id == id).first()
            if db_asignacion:
                db.delete(db_asignacion)
                db.commit()
                return True
            return False

    def obtener_asignaciones_por_asignatura(self, asignatura_id: int):
        with DatabaseEngine.get_session() as db:
            return db.query(AsignacionTest).filter(AsignacionTest.asignatura_id == asignatura_id).all()

    def obtener_grupos_por_asignatura(self, asignatura_id: int):
        with DatabaseEngine.get_session() as db:
            try:
                # Consulta SQL cruda
                query = text("""
                    SELECT DISTINCT g.id AS grupo_id, g.nombre AS nombre_grupo
                    FROM grupo g
                    JOIN gea ga ON g.id = ga.grupo_id
                    JOIN estudiante_asignatura ea ON ea.id = ga.estudiante_asignatura_id
                    JOIN asignatura asig ON asig.id = ea.asignatura_id
                    WHERE asig.id = :asignatura_id
                """)
                result = db.execute(query, {'asignatura_id': asignatura_id}).fetchall()
                
                grupos = [{'id': row[0], 'nombre': row[1]} for row in result]
                print(grupos)
                return grupos

            except Exception as e:
                print(f"Error: {e}")
                return None

    def obtener_actividades_por_asignatura(self, asignatura_id: int):
        with DatabaseEngine.get_session() as db:
            return db.query(ActividadAcademica).filter(ActividadAcademica.asignatura_id == asignatura_id).all()    

    def obtener_asignaciones_para_estudiantes(self, estudiante_id: int):
        with DatabaseEngine.get_session() as db:
            try:
                estudiante_asignaturas = db.query(EstudianteAsignatura).filter(
                    EstudianteAsignatura.estudiante_id == estudiante_id
                ).all()

                asignatura_ids = [ea.asignatura_id for ea in estudiante_asignaturas]

                asignaciones = db.query(AsignacionTest).filter(
                    AsignacionTest.asignatura_id.in_(asignatura_ids)
                ).all()

                asignaciones_filtradas = []

                for asignacion in asignaciones:
                    grupo = db.query(Grupo).filter(Grupo.id == asignacion.id_grupo).first()

                    if grupo:  
                        for estudiante_asignatura in estudiante_asignaturas:
                            if grupo in estudiante_asignatura.grupos:
                                asignaciones_filtradas.append(asignacion)
                                break 

                return asignaciones_filtradas

            except Exception as e:
                print(f"Error: {e}")
                return None
