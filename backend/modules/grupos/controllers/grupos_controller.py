from sqlalchemy import text
from models.Usuario import Usuario
from models.Grupo import Grupo  
from core.database import DatabaseEngine
from fastapi import HTTPException

class GrupoController:
    def __init__(self):
        pass

    def obtener_todos_grupos(self):
        with DatabaseEngine.get_session() as db:
            return db.query(Grupo).all()

    def obtener_grupo(self, id: int):
        with DatabaseEngine.get_session() as db:
            return db.query(Grupo).filter(Grupo.id == id).first()
    
    def crear_grupo(self, grupo):
        with DatabaseEngine.get_session() as db:
            db_grupo = Grupo(**grupo.dict())
            db.add(db_grupo)
            db.commit()
            db.refresh(db_grupo)
            return db_grupo

    def modificar_grupo(self, id: int, grupo):
        with DatabaseEngine.get_session() as db:
            db_grupo = db.query(Grupo).filter(Grupo.id == id).first()
            if db_grupo:
                for key, value in grupo.dict(exclude_unset=True).items():
                    setattr(db_grupo, key, value)
                db.commit()
                db.refresh(db_grupo)
                return db_grupo
            return None

    def eliminar_grupo(self, id: int):
        with DatabaseEngine.get_session() as db:
            db_grupo = db.query(Grupo).filter(Grupo.id == id).first()
            if db_grupo:
                db.delete(db_grupo)
                db.commit()
                return True

    def obtener_grupo_con_estudiantes(self, id: int):
        with DatabaseEngine.get_session() as db:
            gea_registros = db.execute(
                text("SELECT estudiante_asignatura_id FROM gea WHERE grupo_id = :grupo_id"),
                {"grupo_id": id}
            ).fetchall()

            if not gea_registros:
                raise HTTPException(status_code=404, detail="No se encontraron estudiantes en este grupo")

            estudiante_asignatura_ids = [registro[0] for registro in gea_registros]
            print(f"\n\n\n\n\nestudiante_asignatura_ids: {estudiante_asignatura_ids}\n\n\n\n\n")

            estudiantes = db.execute(
                text("SELECT estudiante_id FROM estudiante_asignatura WHERE id IN :estudiante_asignatura_ids"),
                {"estudiante_asignatura_ids": tuple(estudiante_asignatura_ids)}
            ).fetchall()

            if not estudiantes:
                raise HTTPException(status_code=404, detail="No se encontraron estudiantes asignados a este grupo")

            estudiantes_ids = [estudiante[0] for estudiante in estudiantes]
            print(f"\n\n\n\n\nestudiantes_ids: {estudiantes_ids}\n\n\n\n\n")

            usuarios = db.execute(
                text("SELECT * FROM usuario WHERE id IN :estudiantes_ids"),
                {"estudiantes_ids": tuple(estudiantes_ids)}
            ).fetchall()

            print(f"\n\n\n\n\nusuarios: {usuarios}\n\n\n\n\n")

            if not usuarios:
                raise HTTPException(status_code=404, detail="No se encontraron usuarios para estos estudiantes")

            resultado = []
            for usuario in usuarios:
                resultado.append({
                    "id": usuario[0], 
                    "nombres": usuario[1],  
                    "apellidos": usuario[2],  
                })

            return resultado

    def obtener_estudiante_para_resultados(self, grupo_id: int):
        with DatabaseEngine.get_session() as db:
            try:
                query = text("""
                    SELECT estudiante_asignatura_id
                    FROM gea
                    WHERE grupo_id = :grupo_id
                """)
                result = db.execute(query, {'grupo_id': grupo_id}).fetchall()

                estudiante_asignatura_ids = [row[0] for row in result]
                
                return estudiante_asignatura_ids

            except Exception as e:
                print(f"Error: {e}")
                return None

    def obtener_estudiantes_asignatura_por_id(self, id_asignatura: int):
        with DatabaseEngine.get_session() as db:
            try:
                query = text("""
                    SELECT id
                    FROM estudiante_asignatura
                    WHERE asignatura_id = :asignatura_id
                """)
                result = db.execute(query, {'asignatura_id': id_asignatura}).fetchall()

                estudiante_asignatura_ids = [row[0] for row in result]
                
                return estudiante_asignatura_ids

            except Exception as e:
                print(f"Error: {e}")
                return None

   
class GeaGrupoController:
    def __init__(self):
        pass
    
    def agregar_estudiante_a_grupo(self, estudiante_id: int, grupo_id: int):
        with DatabaseEngine.get_session() as db:
            result = db.execute(
                text("SELECT id FROM estudiante_asignatura WHERE estudiante_id = :estudiante_id"),
                {"estudiante_id": estudiante_id}
            ).fetchone()

            if result is None:
                return {"error": "El estudiante no existe en la asignatura."}

            estudiante_asignatura_id = result[0]  

            print(f"\n\n\nEstudiante Asignatura ID: {estudiante_asignatura_id}\n\n")

            db.execute(
                text("INSERT INTO gea (estudiante_asignatura_id, grupo_id) VALUES (:estudiante_asignatura_id, :grupo_id)"),
                {"estudiante_asignatura_id": estudiante_asignatura_id, "grupo_id": grupo_id}
            )
            db.commit()

            return {
                "message": "Estudiante agregado al grupo con éxito",
                "estudiante_asignatura_id": estudiante_asignatura_id,
                "grupo_id": grupo_id
            }

    
    def eliminar_estudiante_de_grupo(self, estudiante: int, grupo_id: int):
        with DatabaseEngine.get_session() as db:
            estudiante_asignatura = db.execute(
                text("SELECT id FROM estudiante_asignatura WHERE estudiante_id = :estudiante_id"),
                {"estudiante_id": estudiante}
            ).fetchone()

            if not estudiante_asignatura:
                raise HTTPException(status_code=404, detail="Estudiante no encontrado")

            estudiante_asignatura_id = estudiante_asignatura[0]

            gea_registro = db.execute(
                text("SELECT * FROM gea WHERE estudiante_asignatura_id = :estudiante_asignatura_id AND grupo_id = :grupo_id"),
                {"estudiante_asignatura_id": estudiante_asignatura_id, "grupo_id": grupo_id}
            ).fetchone()

            if not gea_registro:
                raise HTTPException(status_code=404, detail="No se encontró el estudiante en el grupo")

            db.execute(
                text("DELETE FROM gea WHERE estudiante_asignatura_id = :estudiante_asignatura_id AND grupo_id = :grupo_id"),
                {"estudiante_asignatura_id": estudiante_asignatura_id, "grupo_id": grupo_id}
            )
            db.commit()

            return {"message": "Estudiante eliminado del grupo con éxito"}


    def obtener_grupos_de_estudiante(self, estudiante_id: int):
        with DatabaseEngine.get_session() as db:
            estudiante = db.query(Usuario).filter(Usuario.id == estudiante_id).first()

            if not estudiante:
                raise HTTPException(status_code=404, detail="Estudiante no encontrado")
            if estudiante.rol != "estudiante":
                raise HTTPException(status_code=403, detail="El usuario no tiene el rol de estudiante")

            return estudiante.grupos

    def obtener_estudiantes_de_grupo(self, grupo_id: int):
        with DatabaseEngine.get_session() as db:
            grupo = db.query(Grupo).filter(Grupo.id == grupo_id).first()

            if not grupo:
                raise HTTPException(status_code=404, detail="Grupo no encontrado")

            return grupo.estudiantes

    