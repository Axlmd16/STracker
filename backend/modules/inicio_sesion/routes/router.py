from fastapi import APIRouter, HTTPException
from middlewares.verify_token_route import VerifyTokenRoute
from modules.inicio_sesion.controllers.usuario_control import UsuarioControl
from modules.inicio_sesion.schemas.usuario_schema import UsuarioCreate, UsuarioResponse, UsuarioUpdate
from modules.inicio_sesion.controllers.cuenta_control import CuentaControl
from modules.inicio_sesion.schemas.cuenta_schema import CuentaCreate, CuentaResponse, CuentaUpdate


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
    cuentas = cc.obtener_cuentas()
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
def cambiar_estado_cuenta(id: int, activar: bool):
    try:
        response = cc.cambiar_estado_cuenta(id, activar)
        if response is None:
            raise HTTPException(status_code=404, detail="Cuenta no encontrada")
        estado = "activada" if activar else "desactivada"
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
        usr_found = uc.obtener_usuario_por_cedula(usuario.cedula)
        if usr_found:
            raise HTTPException(status_code=409, detail="La cedula ya se encuentra registrada")
        
        response = uc.crear_usuario(usuario)
        
        if response:
            username = cc.generar_username(response)
            cuenta = CuentaCreate(
                username=username, 
                password=response.cedula, 
                usuario_id=response.id
            )
            response_cc = cc.crear_cuenta(cuenta)
            
            if response_cc:
                return {"message": "Usuario y cuenta registrados correctamente", "data": response}
        
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
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
def editar_usuario(id: int, usuario: UsuarioUpdate):
    response = uc.actualizar_usuario(id, usuario)
    if not response:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"message": f"Usuario con id: {id} actualizado correctamente", "data": response}
    
@router.delete("/usuarios/{id}")
def remover_usuario(id: int):
    response = uc.eliminar_usuario(id)
    if response:
        return {"message": f"Usuario con id: {id} eliminado correctamente"}
    else:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")


