from models.Asignatura import Asignatura
from models.Usuario import Usuario
from core.database import SessionLocal
from fastapi import HTTPException
from modules.inicio_sesion.schemas.usuario_schema import UsuarioBase


class AsignaturaControl:
    def __init__(self):
        pass
    
    def obtener_asignaturas(self):
        with SessionLocal() as db:
            return db.query(Asignatura).all()
        
    def obtener_asignatura(self, id: int):
        with SessionLocal() as db:
            return db.query(Asignatura).filter(Asignatura.id == id).first()
        
    def crear_asignatura(self, asig):
        with SessionLocal() as db:
            db_asignatura = Asignatura(**asig.dict())
            db.add(db_asignatura)
            db.commit()
            db.refresh(db_asignatura)
            return db_asignatura
        
    def actualizar_asignatura(self, id: int, asig):
        with SessionLocal() as db:
            db.query(Asignatura).filter(Asignatura.id == id).update(asig.dict())
            db.commit()
            return db.query(Asignatura).filter(Asignatura.id == id).first()
        
    def eliminar_asignatura(self, id: int):
        with SessionLocal() as db:
            asignatura = db.query(Asignatura).filter(Asignatura.id == id).first()
            if asignatura:
                db.delete(asignatura)
                db.commit()
                return True
            else:
                return False
            
    # def validar_estudiante_en_asignatura(self, estudiante, asignatura):
    #     for e in asignatura.estudiantes:
    #         if e.id == estudiante.id:
    #             raise HTTPException(status_code=400, detail="Estudiante ya se encuentra en la asignatura")
    #         return True
            
    
    def agregar_estudiante_asignatura(self, id_asignatura: int, id_estudiante: int):
        with SessionLocal() as db:
            asignatura = db.query(Asignatura).filter(Asignatura.id == id_asignatura).first()
            estudiante = db.query(Usuario).filter(Usuario.id == id_estudiante).first()
            
            if estudiante and asignatura:
                asignatura.estudiantes.append(estudiante)
                db.commit()
                return True
            return HTTPException(status_code=404, detail="Estudiante o asignatura no encontrada")
                
    def obtener_estudiantes_asignatura(self, id: int):
        with SessionLocal() as db:
            asignatura = db.query(Asignatura).filter(Asignatura.id == id).first()
            if asignatura:
                estudiantes = asignatura.estudiantes
                dict_estudiantes = [UsuarioBase.from_orm(estudiante).dict() for estudiante in estudiantes]
                return dict_estudiantes
                
            else:
                raise HTTPException(status_code=404, detail="Asignatura no encontrada")
            
    