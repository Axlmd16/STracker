from models.Cuenta import Cuenta
from core.database import DatabaseEngine
from models.Usuario import Usuario
from modules.inicio_sesion.schemas.cuenta_schema import CuentaCreate, CuentaRol

class CuentaControl:
    def __init__(self):
        pass

    def obtener_cuentas(self):
        with DatabaseEngine.get_session() as db:
            return db.query(Cuenta).all()

    def obtener_cuenta(self, id: int):
        with DatabaseEngine.get_session() as db:
            return db.query(Cuenta).filter(Cuenta.id == id).first()
        
    def crear_cuenta(self, cuenta):
        with DatabaseEngine.get_session() as db:
            db_cuenta = Cuenta(**cuenta.dict())
            db.add(db_cuenta)
            db.commit()
            db.refresh(db_cuenta)
            return db_cuenta

    def actualizar_cuenta(self, id: int, cuenta):
        with DatabaseEngine.get_session() as db:
            db.query(Cuenta).filter(Cuenta.id == id).update(cuenta.dict())
            db.commit()
            return db.query(Cuenta).filter(Cuenta.id == id).first()

    def eliminar_cuenta(self, id: int):
        with DatabaseEngine.get_session() as db:
            cuenta = db.query(Cuenta).filter(Cuenta.id == id).first()
            if cuenta:
                db.delete(cuenta)
                db.commit()
                return True
            else:
                return False
            
    def generar_username(self, usuario):
        nombre = usuario.nombres.split(" ")[0]  # Primer nombre
        apellido = usuario.apellidos.split(" ")[0]  # Primer apellido
        
        username = f"{nombre.lower()}.{apellido.lower()}@unl.edu.ec"
        
        with DatabaseEngine.get_session() as db:
            cuenta_existente = db.query(Cuenta).filter(Cuenta.username == username).first()
            
            if cuenta_existente:
                segundo_nombre = usuario.nombres.split(" ")[1] if len(usuario.nombres.split(" ")) > 1 else ""
                if segundo_nombre:
                    username = f"{nombre.lower()}.{segundo_nombre[0].lower()}.{apellido.lower()}@unl.edu.ec"
                else:
                    username = f"{nombre.lower()}.{apellido.lower()}1@unl.edu.ec"
        
        return username

    
    def cambiar_estado_cuenta(self, id: int, activar: bool):
        with DatabaseEngine.get_session() as db:
            cuenta = db.query(Cuenta).filter(Cuenta.id == id).first()
            if not cuenta:
                return None
            cuenta.estado = activar
            db.commit()
            db.refresh(cuenta)  
            return cuenta

    def login(self, data):
        with DatabaseEngine.get_session() as db:
            cuenta = db.query(Cuenta).filter(Cuenta.username == data.username).first()
            if not cuenta:
                return None
            if cuenta.password != data.password:
                return None
            return cuenta
        

    def combinar_usuario_cuenta(self, cuenta):
        with DatabaseEngine.get_session() as db:
            usr =  db.query(Usuario).filter(Usuario.id == cuenta.usuario_id).first()
    
            return CuentaRol(
                id=cuenta.id,
                username=cuenta.username, 
                password=cuenta.password, 
                estado=cuenta.estado, 
                rol=usr.rol, 
                id_usuario=usr.id
                )
        
        

        
    