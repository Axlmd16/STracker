from fastapi import FastAPI
from core.database import init_db
from modules.inicio_sesion.routes.router import router
from modules.inicio_sesion.routes.auth_route import auth_router
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

dotenv_path = os.path.join(os.path.dirname(__file__), 'core', '.env')
load_dotenv(dotenv_path)


init_db()

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(auth_router)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la aplicacion FastAPI!"}