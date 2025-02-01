from fastapi import APIRouter, HTTPException
from modules.notificacion.controllers.notificacion_controller import NotificacionController
from modules.notificacion.schemas.notificacio_schema import NotificacionSchema
import smtplib
from fastapi import Request
from fastapi.responses import JSONResponse
from email.mime.text import MIMEText
from pydantic import BaseModel
from dotenv import load_dotenv
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
import os
import random
load_dotenv('.env')

router_notificaciones = APIRouter()
notificaciones_controller = NotificacionController()
token_store = {}

@router_notificaciones.get("/notificaciones/usuario/{id}", tags=["Notificaciones"])
def prueba(id: int):
    notificaciones_usuario = notificaciones_controller.obtener_notificaciones_por_usuario(id)
    return {"message": "Notificaciones del usuario", "data": notificaciones_usuario}

@router_notificaciones.post("/notificaciones/{id}/{titulo}/{mensaje}", tags=["Notificaciones"])
def prueba(id: int, titulo: str, mensaje: str):
    notificaion = notificaciones_controller.crear_notificacion(id, titulo, mensaje)
    return notificaion

# *Recuperacion de contraseña

@router_notificaciones.post("/validar_usuario_cambio_password")
async def verificar_usuario_cambio_password(request: Request):
    try:
        data = await request.json()
        cedula = data["numIdentificacion"]
        email = data["correo"]
        usuario = notificaciones_controller.verificar_usuario(email, cedula)
        if usuario is None:
            return False 
        return usuario 
    except Exception as e:
        print(f"Error en verificar_usuario_cambio_password: {e}")
        return False
       
@router_notificaciones.post("/send-recovery-email", tags=["Notificaciones"])
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
        token_store[token] = datetime.now() + timedelta(minutes=1)

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