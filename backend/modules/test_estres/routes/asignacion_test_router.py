from fastapi import APIRouter, HTTPException
from modules.grupos.controllers.grupos_controller import GrupoController
from models.EstudianteAsignatura import EstudianteAsignatura
from sqlalchemy import text
from middlewares.verify_token_route import VerifyTokenRoute
from modules.resultados.controllers.resultado_test_controller import ResultadoTestControl
from modules.resultados.schemas.resultado_test_schema import ResultadoTestSchema
from ..controllers.asignacion_test_controller import AsignacionTestController
from modules.notificacion.controllers.notificacion_controller import NotificacionController
from ..schemas.asignacion_test_schema import AsignacionTestSchema
from modules.academico.controllers.asignatura_control import AsignaturaControl
import smtplib
from fastapi import Request
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv
import colorama
load_dotenv('.env')

router_asignacion_test =APIRouter(route_class=VerifyTokenRoute)
asignacion_controller = AsignacionTestController()
notificaciones_controller = NotificacionController()
rc = ResultadoTestControl()
ac = AsignaturaControl()
grupo_controller = GrupoController()

@router_asignacion_test.get("/asignacion_test/", tags=["Asignacion Test"])
def get_asignaciones():
    all_asignaciones = asignacion_controller.obtener_all_asignaciones()
    return {"message": "All asignaciones", "data": all_asignaciones}

@router_asignacion_test.get("/asignacion_test/{id}", tags=["Asignacion Test"])
def get_asignacion(id: int):
    asignacion = asignacion_controller.obtener_asignacion(id)
    if not asignacion:
        raise HTTPException(status_code=404, detail="AsignacionTest no encontrada")
    return {"message": "Asignacion test", "data": asignacion}

@router_asignacion_test.post("/asignacion_test/", tags=["Asignacion Test"], response_model=None)
async def crear_asignacion(asignacion: AsignacionTestSchema, resultadoTest: ResultadoTestSchema):
    print(colorama.Fore.CYAN + f"\n\n\ncomenzando a enviar notifiacion")
    asignacion_creada = asignacion_controller.crear_asignacion(asignacion)
    asignatura = ac.obtener_asignatura(asignacion.asignatura_id)
    nombre_asignatura = asignatura.nombre
    resultadoTest.asignacion_id = asignacion_creada.id
    if resultadoTest.estudiante_asignatura_id != None:
        estudiante_asignatura_id = rc.obtener_estudiante_asignatura_id(resultadoTest.estudiante_asignatura_id)
        if estudiante_asignatura_id:
            resultadoTest.estudiante_asignatura_id = estudiante_asignatura_id
            rc.crear_resultado(resultadoTest)
            info_notificacion = notificaciones_controller.crear_notificacion_estudiante(estudiante_asignatura_id, asignacion.descripcion, nombre_asignatura)
            await enviarNotificacionEstudiante(info_notificacion[0], info_notificacion[1], info_notificacion[2])
        else:
            raise HTTPException(status_code=404, detail="No se encontró el registro para el estudiante_id proporcionado.")
    elif resultadoTest.grupo_id != None:
        grupo_con_estudiantes = grupo_controller.obtener_estudiante_para_resultados(resultadoTest.grupo_id)
        for estudiante in grupo_con_estudiantes:
            print('Estudiante: ', estudiante)
            resultadoTest.estudiante_asignatura_id = estudiante 
            rc.crear_resultado(resultadoTest)
            info_notificacion = notificaciones_controller.crear_notificacion_estudiante(estudiante, asignacion.descripcion, nombre_asignatura)
            await enviarNotificacionEstudiante(info_notificacion[0], info_notificacion[1], info_notificacion[2])
    else:
        estudiante_asignatura = grupo_controller.obtener_estudiantes_asignatura_por_id(asignacion.asignatura_id)
        for estudiante in estudiante_asignatura:
            resultadoTest.estudiante_asignatura_id = estudiante 
            rc.crear_resultado(resultadoTest)
            info_notificacion = notificaciones_controller.crear_notificacion_estudiante(estudiante, asignacion.descripcion, nombre_asignatura)
            await enviarNotificacionEstudiante(info_notificacion[0], info_notificacion[1], info_notificacion[2])

async def enviarNotificacionEstudiante(titulo, mensaje, email):
    print(colorama.Fore.RED + f"\n\n\ncomenzando a enviar notifiacion: {email}")
    try:
        msg = MIMEMultipart()
        print(os.getenv("CORREO_ADMIN"))
        msg['From'] = os.getenv("CORREO_ADMIN")
        msg['To'] = email
        msg['Subject'] = 'Nuevo Test Asignado'

        recovery_link = f"http://localhost:5173/login"
        button_style = "background-color:#60A5FA; border:none; color:white; padding:15px 25px; font-size:16px; text-align:center; text-decoration:none; display:block; font-weight:bold; border-radius:8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: background-color 0.3s ease-in-out; margin: 0 auto; width: 60%; max-width: 250px;"
        mensaje_formateado = mensaje.replace("\n", "<br>")

        html = f"""
        <html>
            <head>
                <style>
                    body {{
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        background-color: #f4f7fc;
                        color: #FFF;  /* Cambié el color de texto a blanco */
                        margin: 0;
                        padding: 0;
                        text-align: center;
                    }}
                    .container {{
                        width: 80%;
                        max-width: 600px;
                        background: linear-gradient(135deg, #00bcd4, #00acc1);  /* Gradiente cyan */
                        color: white;
                        padding: 40px;
                        margin: 30px auto;
                        border-radius: 15px;
                        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                    }}
                    .header {{
                        font-size: 28px;
                        font-weight: bold;
                        margin-bottom: 20px;
                    }}
                    .message {{
                        font-size: 18px;
                        margin-bottom: 30px;
                        line-height: 1.6;
                    }}
                    .cta {{
                        margin-top: 30px;
                    }}
                    .footer {{
                        font-size: 14px;
                        color: #FFF;  /* Cambié el color del texto del footer a blanco */
                        margin-top: 30px;
                    }}
                    a {{
                        color: inherit;
                        text-decoration: none;
                    }}
                    a:hover {{
                        background-color: #8e44ad;  /* Violeta aún más oscuro al hacer hover */
                    }}
                </style>
            </head>
            <body>
                <div class="container">
                    <p class="header">¡Nuevo Test Asignado!</p>
                    <p class="message">{titulo}</p>
                    <p class="message">{mensaje_formateado}</p>
                    <div class="cta">
                        <a href="{recovery_link}" style="{button_style}" onmouseover="this.style.backgroundColor=''" onmouseout="this.style.backgroundColor='#9b59b6'">Realizar Test</a>
                    </div>
                    <p class="footer">Gracias,<br>El equipo de soporte</p>
                </div>
            </body>
        </html>
        """

        msg.attach(MIMEText(html, 'html'))
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(os.getenv("CORREO_ADMIN"), os.getenv("CLAVE_APP_ADMIN"))
        server.sendmail(os.getenv("CORREO_ADMIN"), email, msg.as_string())
        server.quit()

        return True
    except Exception as e:
        print(f"Error al enviar la notificación: {e}")
        return False


#* ----------------------------------------

@router_asignacion_test.put("/asignacion_test/{id}", tags=["Asignacion Test"])
def modificar_asignacion(id: int, asignacion: AsignacionTestSchema):
    asignacion_modificada = asignacion_controller.modificar_asignacion(id, asignacion)
    if not asignacion_modificada:
        raise HTTPException(status_code=404, detail="AsignacionTest no encontrada para modificar")
    return {"message": "Asignacion test modificada", "data": asignacion_modificada}

@router_asignacion_test.delete("/asignacion_test/{id}", tags=["Asignacion Test"])
def eliminar_asignacion(id: int):
    asignacion_eliminada = asignacion_controller.eliminar_asignacion(id)
    if not asignacion_eliminada:
        raise HTTPException(status_code=404, detail="AsignacionTest no encontrada para eliminar")
    return {"message": "Asignacion test eliminada", "data": asignacion_eliminada}

@router_asignacion_test.get("/asignacion_test/asignatura/{asignatura_id}", tags=["Asignacion Test"])
def get_asignaciones_por_asignatura(asignatura_id: int):
    asignaciones = asignacion_controller.obtener_asignaciones_por_asignatura(asignatura_id)
    if asignaciones == None:
        raise HTTPException(status_code=404, detail="No se encontraron asignaciones para esta asignatura")
    return {"message": "Asignaciones para la asignatura", "data": asignaciones}

#! Nota: Esto debo cambiarlo en otro archivo
@router_asignacion_test.get("/grupo/asignatura/{asignatura_id}", tags=["Grupos"])
def get_grupos_por_asignatura(asignatura_id: int):
    print(f"aquiauiqiquqiuqiqu\n\n\n\n\n")
    asignaciones = asignacion_controller.obtener_grupos_por_asignatura(asignatura_id)
    if not asignaciones:
        raise HTTPException(status_code=404, detail="No se encontraron asignaciones para esta asignatura")
    return {"message": "Asignaciones para la asignatura", "data": asignaciones}

#! Nota: Esto debo cambiarlo en otro archivo
@router_asignacion_test.get("/actividades/asignatura/{asignatura_id}", tags=["Actividades"])
def get_asignaciones_por_asignatura(asignatura_id: int):
    asignaciones = asignacion_controller.obtener_actividades_por_asignatura(asignatura_id)
    if not asignaciones:
        raise HTTPException(status_code=404, detail="No se encontraron asignaciones para esta asignatura")
    return {"message": "Asignaciones para la asignatura", "data": asignaciones}



