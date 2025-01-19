from typing import List
from fastapi import APIRouter, HTTPException

from modules.grupos.schemas.grupos_schema import GrupoSchema, GeaSchema
from modules.grupos.controllers.grupos_controller import GrupoController, GeaGrupoController
from modules.inicio_sesion.schemas.usuario_schema import UsuarioBase

router_grupo = APIRouter()

grupo_controller = GrupoController()

@router_grupo.get("/grupos", tags=["Grupo"])
def get_todos_grupos():
    grupos = grupo_controller.obtener_todos_grupos()
    return {"message": "Todos los grupos", "data": grupos}

@router_grupo.get("/grupos/{id}", tags=["Grupo"])
def get_grupo(id: int):
    grupo = grupo_controller.obtener_grupo(id)
    if not grupo:
        raise HTTPException(status_code=404, detail="Grupo no encontrado")
    return {"message": "Grupo encontrado", "data": grupo}

@router_grupo.get("/grupos/estudiantes/{id}", tags=["Grupo"])
def get_grupo_con_estudiantes(id: int):
    grupo_con_estudiantes = grupo_controller.obtener_grupo_con_estudiantes(id)
    if not grupo_con_estudiantes:
        raise HTTPException(status_code=404, detail="Grupo no encontrado")
    return {"message": "Grupo encontrado", "data": grupo_con_estudiantes}

@router_grupo.post("/grupos", tags=["Grupo"])
def crear_grupo(grupo: GrupoSchema):
    nuevo_grupo = grupo_controller.crear_grupo(grupo)
    return {"message": "Grupo creado", "data": nuevo_grupo}

@router_grupo.put("/grupos/{id}", tags=["Grupo"])
def modificar_grupo(id: int, grupo: GrupoSchema):
    grupo_modificado = grupo_controller.modificar_grupo(id, grupo)
    if not grupo_modificado:
        raise HTTPException(status_code=404, detail="Grupo no encontrado para modificar")
    return {"message": "Grupo modificado", "data": grupo_modificado}

@router_grupo.delete("/grupos/{id}", tags=["Grupo"])
def eliminar_grupo(id: int):
    grupo_eliminado = grupo_controller.eliminar_grupo(id)
    if not grupo_eliminado:
        raise HTTPException(status_code=404, detail="Grupo no encontrado para eliminar")
    return {"message": "Grupo eliminado", "data": grupo_eliminado}

#* Para los estudiantes en grupos

controlador = GeaGrupoController()

@router_grupo.post("/estudiante_grupo/{id_estudiante_asignatura}/{id_grupo}", response_model=dict, tags=["Grupo_Estudiante"]) 
def agregar_estudiante_a_grupo(id_estudiante_asignatura: int, id_grupo: int):
    estudiante_agregado = controlador.agregar_estudiante_a_grupo(id_estudiante_asignatura, id_grupo)
    if not estudiante_agregado:
        raise HTTPException(status_code=404, detail="Algo salio mal")
    return {"message": "Estudiante Agregado", "data": estudiante_agregado}

@router_grupo.delete("/estudiante_grupo/{estudiante_asignatura_id}/{grupo_id}", response_model=dict, tags=["Grupo_Estudiante"])
def eliminar_estudiante_de_grupo(estudiante_asignatura_id: int, grupo_id: int):
    estudiante_eliminado = controlador.eliminar_estudiante_de_grupo(estudiante_asignatura_id, grupo_id)
    if not estudiante_eliminado:
        raise HTTPException(status_code=404, detail="Algo salió mal")
    return {"message": "Estudiante Eliminado", "data": estudiante_eliminado}

#Todo: mover este metodo al controlador de usuario
@router_grupo.get("/asignatura_estudiante/{id}", tags=["Estudiante_Pruebas"])
def get_asignatura_estudiante(id: int):
    asignaturas_por_rol = controlador.obtener_asignaturas_por_rol(id)
    return {"message": "Asignaturas del estudiante", "data": asignaturas_por_rol}