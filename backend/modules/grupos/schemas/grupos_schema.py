from pydantic import BaseModel

class GrupoSchema(BaseModel):
    nombre: str
    nro_estudiantes: int 
    

class GeaSchema(BaseModel):
    estudiante_asignatura_id: int
    grupo_id: int
