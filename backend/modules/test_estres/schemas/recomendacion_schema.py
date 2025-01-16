from pydantic import BaseModel

class RecomendacionSchema(BaseModel):
    titulo: str
    descripcion: str 
    prioridad: int 

class RecomendacionTestSchema(BaseModel):
    recomendacion_id: int 
    test_estres_id: int
    