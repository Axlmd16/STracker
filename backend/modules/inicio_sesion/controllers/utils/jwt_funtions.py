from jwt import encode, decode, ExpiredSignatureError, DecodeError
from datetime import datetime, timedelta
from os import getenv
from fastapi.responses import JSONResponse

def expiracion_token(days: int = 1) -> datetime:
    date = datetime.now() + timedelta(days=days)
    return date

def create_token(data: dict):
    token = encode(payload={**data, 'exp': expiracion_token(2)}, key=getenv("SECRET_KEY"), algorithm='HS256')
    return token

def validate_token(token: str, out: bool = False):
    try:
        if out:
            return decode(token, getenv("SECRET_KEY"), algorithms=['HS256'])
        decode(token, getenv("SECRET_KEY"), algorithms=['HS256'])

    except DecodeError:
        return JSONResponse(status_code=401, content={"message": "Token invalido"})
    except ExpiredSignatureError:
        return JSONResponse(status_code=401, content={"message": "Token expirado"})
    
    