from fastapi import APIRouter, Header
from modules.inicio_sesion.controllers.cuenta_control import CuentaControl
from modules.inicio_sesion.controllers.utils.jwt_funtions import create_token, validate_token
from ..schemas.cuenta_schema import CuentaLogin
from fastapi.responses import JSONResponse

cc = CuentaControl()

auth_router = APIRouter()

@auth_router.post("/login")
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
    

    
@auth_router.post("/verify/token")
def verify_token(Authorization: str = Header(None)):
    if Authorization is None:
        return JSONResponse(status_code=401, content={"message": "Token no proporcionado"})
    
    token = Authorization.split(" ")[1]
    print(f"Token recibido: {token}")
    return validate_token(token, True)
