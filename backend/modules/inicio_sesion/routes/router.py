from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from middlewares.verify_token_route import VerifyTokenRoute
from modules.inicio_sesion.controllers.usuario_control import UsuarioControl
from modules.inicio_sesion.schemas.usuario_schema import ImportarUsuariosRequest, UsuarioBase, UsuarioCreate, UsuarioResponse, UsuarioUpdate
from modules.inicio_sesion.controllers.cuenta_control import CuentaControl
from modules.inicio_sesion.schemas.cuenta_schema import CuentaCreate, CuentaResponse, CuentaUpdate, CuentaUpdateEstado


router = APIRouter(route_class=VerifyTokenRoute)

uc = UsuarioControl()
cc = CuentaControl()

#* CRUD CUENTAS ----------------------------------------------------------------------------------------------------   
# @router.post("/cuentas/", response_model=CuentaResponse)
# def guardar_cuenta(cuenta: CuentaCreate):
#     try:
#         response = cc.crear_cuenta(cuenta)
#         return {"message": "Cuenta creada correctamente", "data": response}
#     except HTTPException as http_exc:
#         raise http_exc
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error interno del servidor: {str(e)}")
    
@router.get("/cuentas/")
def get_cuentas():
    cuentas = []
    for cuenta in cc.obtener_cuentas():
        cuentas.append(cc.combinar_usuario_cuenta(cuenta))     
    
    return {"message": "All accounts", "data": cuentas}

@router.get("/cuentas/{id}")
def get_cuenta(id: int):
    response = cc.obtener_cuenta(id)
    if not response:
        raise HTTPException(status_code=404, detail="Cuenta no encontrada")
    return {"message": f"Cuenta con id: {id}", "data": response}

@router.put("/cuentas/{id}", response_model=CuentaResponse)
def editar_cuenta(id: int, cuenta: CuentaUpdate):
    response = cc.actualizar_cuenta(id, cuenta)
    if not response:
        raise HTTPException(status_code=404, detail="Cuenta no encontrada")
    return {"message": f"Cuenta con id: {id} actualizada correctamente", "data": response}

@router.delete("/cuentas/{id}")
def remover_cuenta(id: int):
    response = cc.eliminar_cuenta(id)
    if response:
        return {"message": f"Cuenta con id: {id} eliminada correctamente"}
    else:
        raise HTTPException(status_code=404, detail="Cuenta no encontrada")
    
@router.put("/cuentas/{id}/cambiar_estado", response_model=CuentaResponse)
def cambiar_estado_cuenta(id: int, data: CuentaUpdateEstado):
    try:
        response = cc.cambiar_estado_cuenta(id, data.activar)
        if response is None:
            raise HTTPException(status_code=404, detail="Cuenta no encontrada")
        estado = "activada" if data.activar else "desactivada"
        return {
            "message": f"Cuenta con id: {id} {estado} correctamente",
            "data": response
        }
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno del servidor: {str(e)}")



#* CRUD USUARIOS ----------------------------------------------------------------------------------------------------   
@router.post("/usuarios/", response_model=UsuarioResponse)
def guardar_usuario(usuario: UsuarioCreate):
    try:
        # Validar usuario único
        uc.validar_usuario_unico(usuario.cedula, usuario.email)

        usuario_creado = uc.crear_usuario(usuario)
        if not usuario_creado:
            raise HTTPException(status_code=500, detail="Error al crear el usuario")

        username = cc.generar_username(usuario_creado)

        # Crear cuenta 
        cuenta = CuentaCreate(
            username=username,
            password=usuario_creado.cedula,  
            estado=True,
            usuario_id=usuario_creado.id
        )
        cuenta_creada = cc.crear_cuenta(cuenta)
        if not cuenta_creada:
            raise HTTPException(status_code=500, detail="Error al crear la cuenta")

        return {"status": 200, "message": "Usuario creado correctamente", "data": usuario_creado}
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno del servidor: {str(e)}")


@router.post("/usuarios/importar")
def importar_usuarios(request: ImportarUsuariosRequest):
    try:
        response = uc.importar_usuarios(request.data)
        if not response:
            raise HTTPException(status_code=500, detail="Error al importar los usuarios")

        return {"message": "Usuarios y cuentas creados correctamente", "code": 200}
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Error interno del servidor: {str(e)}")


@router.get("/usuarios/")
def get_usuarios():
    usrs = uc.obtener_usuarios()
    return {"message": "All users", "data": usrs}

@router.get("/usuarios/{id}")
def get_usuario(id: int):
    response = uc.obtener_usuario(id)
    if not response:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"message": f"Usuario con id: {id}", "data": response}


@router.put("/usuarios/{id}", response_model=UsuarioResponse)
def editar_usuario(id: int, usuario: UsuarioBase):
    response = uc.actualizar_usuario(id, usuario)
    if not response:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"status": 200, "message": f"Usuario con id: {id} actualizado correctamente", "data": response}
    
@router.delete("/usuarios/{id}")
def remover_usuario(id: int):
    response = uc.eliminar_usuario(id)
    if response:
        return {"message": f"Usuario con id: {id} eliminado correctamente"}
    else:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    


#* Funcion para obtener los 3 ultimos usuarios registrados
@router.get("/usuarios_ultimos/")
def get_ultimos_usuarios():
    response = uc.obtener_ultimos_usuarios()
    return {"message": "Ultimos usuarios", "data": response}

#* Funcion para obtener informacion general
@router.get("/informacion_general/")
def get_informacion_general():
    response = uc.obtener_info_general()
    return {"message": "Informacion general", "data": response}


#* Obtener docentes ----------------------------------------------------------------------------------------------------
@router.get("/docentes/")
def get_docentes():
    docentes = uc.obtener_docentes()
    return {"message": "All teachers", "data": docentes}


@router.get("/estudiantes/")
def get_docentes():
    data = uc.obtener_estudiantes()
    return {"message": "All teachers", "data": data}