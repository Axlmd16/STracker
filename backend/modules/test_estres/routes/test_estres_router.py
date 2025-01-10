from fastapi import APIRouter, HTTPException
from ..controllers.test_estres_controller import TestEstresController
from ..schemas.test_estres_schema import TestEstresSchema

router_test_estres = APIRouter()

test_controller = TestEstresController()

@router_test_estres.get("/test_estres/", tags=["Test Estres"])
def get_test_estres():
    all_test_estres = test_controller.obtener_all_test_estres()
    return {"message": "All test_estres", "data": all_test_estres}

@router_test_estres.get("/test_estres/{id}", tags=["Test Estres"])
def get_test_estres(id: int):
    test_estres = test_controller.obtener_test_estres(id)
    if not test_estres:
        raise HTTPException(status_code=404, detail="TestEstres no encontrado")
    return {"message": "test_estres", "data": test_estres}

@router_test_estres.post("/test_estres/", tags=["Test Estres"])
def crear_test_estres(test_estres: TestEstresSchema):
    test_estres_creado = test_controller.crear_test_estres(test_estres)
    return {"message": "test_estres creado", "data": test_estres_creado}

@router_test_estres.put("/test_estres/{id}", tags=["Test Estres"])
def modificar_test_estres(id: int, test_estres: TestEstresSchema):
    test_estres_modificado = test_controller.modificar_test_estres(id, test_estres)
    if not test_estres_modificado:
        raise HTTPException(status_code=404, detail="TestEstres no encontrado para modificar")
    return {"message": "test_estres modificado", "data": test_estres_modificado}

@router_test_estres.delete("/test_estres/{id}", tags=["Test Estres"])
def eliminar_test_estres(id: int):
    test_estres_eliminado = test_controller.eliminar_test_estres(id)
    if not test_estres_eliminado:
        raise HTTPException(status_code=    404, detail="TestEstres no encontrado para eliminar")
    return {"message": "test_estres eliminado", "data": test_estres_eliminado}

@router_test_estres.get("/test_estres_ultimos", tags=["Test Estres"])
def get_ultimos_test_estres():
    ultimos_test_estres = test_controller.get_ultimos_test()
    return {"message": "Ultimos test_estres", "data": ultimos_test_estres}