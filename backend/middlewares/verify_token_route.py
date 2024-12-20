from fastapi.responses import JSONResponse
from fastapi.routing import APIRoute
from fastapi.requests import Request
from fastapi.exceptions import HTTPException
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_400_BAD_REQUEST

from modules.inicio_sesion.controllers.utils.jwt_funtions import validate_token

class VerifyTokenRoute(APIRoute):
    
    def get_route_handler(self):
        original_route = super().get_route_handler()
        
        async def verify_token_middleware(request: Request):
            authorization: str = request.headers.get("Authorization")
            
            if not authorization:
                return JSONResponse(status_code=HTTP_401_UNAUTHORIZED, content={"message": "Encabezado de autorización no proporcionado"})
            
            try:
                scheme, token = authorization.split()
                if scheme.lower() != "bearer":
                    raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Esquema de autorización invalido")
            except ValueError:
                return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": "Formato de autorización invalido"})
            
            validate_response = validate_token(token, False)
            
            if validate_response is None:
                return await original_route(request)
            else:
                return JSONResponse(status_code=HTTP_401_UNAUTHORIZED, content={"message": "Token invalido"})
        
        return verify_token_middleware