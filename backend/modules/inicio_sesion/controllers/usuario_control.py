from models.Usuario import Usuario
from core.database import SessionLocal
from fastapi import HTTPException

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
        with SessionLocal() as db:
            db_usuario = Usuario(**usuario.dict())
            db.add(db_usuario)
            db.commit()
            db.refresh(db_usuario)
            return db_usuario
        
    def importar_usuarios(self, usuarios):
    
        for usuario in usuarios:
            self.validar_usuario_unico(usuario.cedula, usuario.email)

        with SessionLocal() as db:
            for usuario in usuarios:
                print("entra")
                db_usuario = Usuario(**usuario.dict())
                db.add(db_usuario)
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