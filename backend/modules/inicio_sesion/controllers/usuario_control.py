from models.Usuario import Usuario
from core.database import SessionLocal

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

    def crear_usuario(self, usuario):
        with SessionLocal() as db:
            db_usuario = Usuario(**usuario.dict())
            db.add(db_usuario)
            db.commit()
            db.refresh(db_usuario)
            return db_usuario

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