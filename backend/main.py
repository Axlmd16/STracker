from fastapi import FastAPI
from core.database import init_db
from modules.inicio_sesion.routes.router import router
from modules.inicio_sesion.routes.auth_route import auth_router
from modules.academico.routes.router import router_asignatura
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv('.env')


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
app.include_router(router_asignatura)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la aplicacion FastAPI!"}