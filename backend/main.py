from fastapi import FastAPI
from core.database import init_db
from modules.academico.routes.router_actividades import router_actividades
from modules.inicio_sesion.routes.router import router
from modules.inicio_sesion.routes.auth_route import auth_router
from modules.test_estres.routes.test_estres_router import router_test_estres
from modules.test_estres.routes.asignacion_test_router import router_asignacion_test
from modules.academico.routes.router_asignatura import router_asignatura
from modules.resultados.routes.resultado_test_router import router_resultados
from modules.test_estres.routes.recomendaciones_routes import router_recomendaciones
from modules.notificacion.routes.notificacion_router import router_notificaciones
from modules.grupos.routes.grupos_routes import router_grupo
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles

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

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(router)
app.include_router(auth_router)
app.include_router(router_test_estres)
app.include_router(router_asignacion_test)
app.include_router(router_asignatura)
app.include_router(router_actividades)
app.include_router(router_resultados)
app.include_router(router_grupo)
app.include_router(router_recomendaciones)
app.include_router(router_notificaciones)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la aplicacion FastAPI!"}

