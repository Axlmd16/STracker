from fastapi import APIRouter, Header, HTTPException
from modules.inicio_sesion.controllers.cuenta_control import CuentaControl
from modules.inicio_sesion.controllers.utils.jwt_funtions import create_token, validate_token
from ..schemas.cuenta_schema import CuentaLogin
from fastapi.responses import JSONResponse
from fastapi import Request
from email.mime.multipart import MIMEMultipart
from modules.notificacion.controllers.notificacion_controller import NotificacionController
from datetime import datetime, timedelta
from email.mime.multipart import MIMEMultipart
from modules.adaptadores.encriptados import PasswordAdapter
from email.mime.text import MIMEText
import os
import random
import smtplib

cc = CuentaControl()
notificaciones_controller = NotificacionController()
manejador_encriptado = PasswordAdapter()
auth_router = APIRouter()
token_store = {}

@auth_router.post("/login",  tags=["Auth"])
def login(cuenta: CuentaLogin):
    response = cc.login(cuenta)
    if response:
        if response.estado:
            cuenta_user = cc.combinar_usuario_cuenta(response)
            return {"token": create_token(cuenta_user.dict())}
        else:
            return JSONResponse(status_code=401, content={"message": "Tu cuenta esta desactivada, contacta al administrador"})
    else:
        return JSONResponse(status_code=401, content={"message": "Credenciales invalidas"})
    

    
@auth_router.post("/verify/token", tags=["Auth"])
def verify_token(Authorization: str = Header(None)):
    if Authorization is None:
        return JSONResponse(status_code=401, content={"message": "Token no proporcionado"})
    
    token = Authorization.split(" ")[1]
    print(f"Token recibido: {token}")
    return validate_token(token, True)

@auth_router.post("/validar_usuario_cambio_password")
async def verificar_usuario_cambio_password(request: Request):
    print(f"\n\n\nINFO EN VERIFICAR USUARIO CAMBIO PASSWORD")
    print(request)
    try:
        data = await request.json()
        cedula = data["numIdentificacion"]
        email = data["correo"]
        usuario = cc.verificar_usuario(email, cedula)
        if usuario is None:
            return False 
        return usuario["id"] 
    except Exception as e:
        print(f"Error en verificar_usuario_cambio_password: {e}")
        return False
       
@auth_router.post("/send-recovery-email", tags=["Notificaciones"])
async def send_recovery_email(request: Request):
    try:
        data = await request.json()
        print(f"\n\n\n\n\n\nAQUI ESTA LA DATA: {data}\n\n\n\n\n\n\n")
        email = data["correo"]
        print(f"\n\n\n\n{email}\n\n")
        encrypted_id_cuenta = data["id_cuenta_reset_password"]

        print("\n\nEncriptados: ")
        print(encrypted_id_cuenta)
        print(email)
        print("\n\n\n\n")

        token = generate_token()
        token_store[token] = datetime.now() + timedelta(minutes=5)

        recovery_link = f"http://localhost:5173/reset_password/{token}/{encrypted_id_cuenta}"

        msg = MIMEMultipart()
        print(os.getenv("CORREO_ADMIN"))
        msg['From'] = os.getenv("CORREO_ADMIN")
        msg['To'] = email
        msg['Subject'] = 'Recuperacion de Contraseña'

        button_style = "background-color:#0369a1; border:none; color:white; padding:10px 20px; text-align:center; text-decoration:none; display:inline-block; font-size:14px; margin:0 auto; cursor:pointer; border-radius:5px;"

        html = f"""
        <html>
            <body>
                <p>Hola,</p>
                <p>Recibiste este correo electronico porque solicitaste restablecer la contraseña de tu cuenta.</p>
                <p>Haz clic en el siguiente boton para restablecer tu contraseña:</p>
                <p style="text-align: center;"><a href="{recovery_link}" style="{button_style}">Restablecer Contraseña</a></p>
                <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este correo electronico de forma segura.</p>
                <p>Gracias,<br>El equipo de soporte</p>
            </body>
        </html>
        """

        msg.attach(MIMEText(html, 'html'))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()

        server.login(os.getenv("CORREO_ADMIN"), os.getenv("CLAVE_APP_ADMIN"))

        server.sendmail(os.getenv("CORREO_ADMIN"), email, msg.as_string())

        server.quit()

        return {"msg": "Correo de recuperación enviado"}, 200

    except Exception as e:
        print(f"Error en send_recovery_email: {e}")
        raise HTTPException(status_code=500, detail="Error al enviar el correo de recuperación")

def generate_token():
    random_numbers = [str(random.randint(0, 9)) for _ in range(4)]
    random_string = ''.join(random_numbers)
    return random_string  

@auth_router.put("/reset_password")
async def reset_password(request: Request):
    print(f"\n\n\nrequest {request}")
    try:
        # print("request 1")
        data = await request.json()
        token = data["token"]
        # print("request 2")
        if token in token_store:
            # print("request 3")
            if token_store[token] > datetime.now():
                # print("request 4")
                print(int (data["id_cuenta"]))
                print((data["password"]))
                id_cuenta = int(data["id_cuenta"])  
                password = data["password"]
                # print("request 5")
                password_hasheado = manejador_encriptado.encrypt(password)
                cuenta_control = CuentaControl()
                # print("request 6")
                cambiodo = cuenta_control.actualizar_password(id_cuenta, password_hasheado)
                # print("request 7")
                if cambiodo == True:
                    # print("request 8")
                    return True
        else:
            # print("request 11")
            return False
    except Exception as e:
        print(f"Error en reset_password: {e}")    
    