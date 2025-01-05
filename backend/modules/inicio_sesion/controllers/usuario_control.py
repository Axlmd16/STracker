from models import Cuenta
from models.TestEstres import TestEstres
from models.Usuario import Usuario
from core.database import SessionLocal
from fastapi import HTTPException
from modules.inicio_sesion.controllers.cuenta_control import CuentaControl

class UsuarioControl:
    def __init__(self):
        pass

    def obtener_usuarios(self):
        with SessionLocal() as db:
            return db.query(Usuario).all()

    def obtener_usuario(self, id: int):
        with SessionLocal() as db:
            return db.query(Usuario).filter(Usuario.id == id).first()
        
    def obtener_usuario_por_cedula(self, cedula: str):
        with SessionLocal() as db:
            return db.query(Usuario).filter(Usuario.cedula == cedula).first()
    
    def obtener_usuario_por_email(self, email: str):
        with SessionLocal() as db:
            return db.query(Usuario).filter(Usuario.email == email).first()

    def validar_usuario_unico(self, cedula: str, email: str):
        if self.obtener_usuario_por_cedula(cedula):
            raise HTTPException(status_code=409, detail="La cédula ya se encuentra registrada")

        if self.obtener_usuario_por_email(email): 
            raise HTTPException(status_code=409, detail="El correo electrónico ya se encuentra registrado")

    def crear_usuario(self, usuario):
        self.validar_usuario_unico(usuario.cedula, usuario.email)
        with SessionLocal() as db:
            db_usuario = Usuario(**usuario.dict())
            db.add(db_usuario)
            db.commit()
            db.refresh(db_usuario)
            return db_usuario
        
    def importar_usuarios(self, usuarios):
        with SessionLocal() as db:
            for usuario in usuarios:
                # Validar si el usuario ya existe
                self.validar_usuario_unico(usuario.cedula, usuario.email)
                
                # Crear usuario
                db_usuario = Usuario(**usuario.dict())
                db.add(db_usuario)
                db.commit()
                db.refresh(db_usuario)

                # Generar username
                username = CuentaControl().generar_username(db_usuario)

                # Crear cuenta 
                cuenta = Cuenta(
                    username=username,
                    password=db_usuario.cedula,  
                    estado=True,
                    usuario_id=db_usuario.id
                )
                db.add(cuenta)
            db.commit()
        return True


    def actualizar_usuario(self, id: int, usuario):
        with SessionLocal() as db:
            db.query(Usuario).filter(Usuario.id == id).update(usuario.dict())
            db.commit()
            return db.query(Usuario).filter(Usuario.id == id).first()

    def eliminar_usuario(self, id: int):
        with SessionLocal() as db:
            usuario = db.query(Usuario).filter(Usuario.id == id).first()
            if usuario:
                db.delete(usuario)
                db.commit()
                return True
            else:
                return False
            
    def obtener_docentes(self):  
        with SessionLocal() as db:
            docentes = db.query(Usuario).filter(Usuario.rol == "DOCENTE").all()
            return docentes

    def obtener_estudiantes(self):  
        with SessionLocal() as db:
            estudiantes = db.query(Usuario).filter(Usuario.rol == "ESTUDIANTE").all()
            return estudiantes
        
    def obtener_ultimos_usuarios(self):
        with SessionLocal() as db:
            return db.query(Usuario).order_by(Usuario.id.desc()).limit(3).all()
        
    def obtener_info_general(self):
        with SessionLocal() as db:
            docentes = db.query(Usuario).filter(Usuario.rol == "DOCENTE").count()
            estudiantes = db.query(Usuario).filter(Usuario.rol == "ESTUDIANTE").count()
            total_usuarios = docentes + estudiantes
            total_test = db.query(TestEstres).filter(TestEstres.estado == True).count()
            return {"total_docentes": docentes, "total_estudiantes": estudiantes, "total_usuarios": total_usuarios, "total_test": total_test}