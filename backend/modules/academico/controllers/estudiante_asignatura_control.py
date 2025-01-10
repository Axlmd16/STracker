from fastapi import HTTPException
from core.database import SessionLocal
from models.Asignatura import Asignatura
from models.EstudianteAsignatura import EstudianteAsignatura
from modules.academico.schemas.estudiante_asignatura_schema import EstudianteAsignaturaBase
from modules.inicio_sesion.controllers.usuario_control import UsuarioControl
from modules.inicio_sesion.schemas.usuario_schema import UsuarioBase

class EstudianteAsignaturaControl:
    def __init__(self):
        pass
    
    def obtener_todas(self):
        with SessionLocal() as db:
            return db.query(EstudianteAsignatura).all()
    
    def obtener(self, id: int):
        with SessionLocal() as db:
            return db.query(EstudianteAsignatura).filter(EstudianteAsignatura.id == id).first()
        
    def agregar_estudiante_a_asignatura(self, id_asignatura: int, id_estudiante: int):
        with SessionLocal() as db:
            est_asig = EstudianteAsignatura(asignatura_id=id_asignatura, estudiante_id=id_estudiante)
            db.add(est_asig)
            db.commit()
            db.refresh(est_asig)
            return est_asig
        
    def actualizar_estudiante_asignatura(self, id: int, est_asig):
        with SessionLocal() as db:
            db.query(EstudianteAsignatura).filter(EstudianteAsignatura.id == id).update(est_asig.dict())
            db.commit()
            return db.query(EstudianteAsignatura).filter(EstudianteAsignatura.id == id).first()
            
    def obtener_estudiantes_en_asignatura(self, id: int):
        with SessionLocal() as db:
            asignatura = db.query(Asignatura).filter(Asignatura.id == id).first()
            if asignatura:
                estudiantes_asignatura = asignatura.estudiantes
                
                estudiantes = []
                for data in estudiantes_asignatura:
                    est = UsuarioControl().obtener_usuario(data.estudiante_id)
                    estudiante_dict = UsuarioBase.from_orm(est).dict()
                    estudiante_dict['estudiante_asignatura_id'] = data.id
                    estudiantes.append(estudiante_dict)
                    
                
                return estudiantes
                
            else:
                raise HTTPException(status_code=404, detail="Asignatura no encontrada")
            
    def quitar_estudiante_de_asignatura(self, id_asignatura: int, id_estudiante: int):
        with SessionLocal() as db:
            est_asig = db.query(EstudianteAsignatura).filter(EstudianteAsignatura.asignatura_id == id_asignatura, EstudianteAsignatura.estudiante_id == id_estudiante).first()
            if est_asig:
                db.delete(est_asig)
                db.commit()
                return True
            else:
                return False
            
            
    def obtener_asignaturas_estudiante(self, id: int):
        with SessionLocal() as db:
            est_asigs = db.query(EstudianteAsignatura).filter(EstudianteAsignatura.estudiante_id == id).all()
            asignaturas = []
            for est_asig in est_asigs:
                asignatura = db.query(Asignatura).filter(Asignatura.id == est_asig.asignatura_id).first()
                asignaturas.append(asignatura)

                
            return asignaturas

