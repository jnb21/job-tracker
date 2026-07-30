from fastapi import APIRouter, Depends, HTTPException
from app.database import get_db
from app.schemas.application import ApplicationCreate, ApplicationUpdate
from app.services import applications as service

router = APIRouter(prefix="/applications", tags=["applications"])


@router.post("/")
def create_application(data: ApplicationCreate, conn=Depends(get_db)):
    return service.create_application(conn, data)


@router.get("/")
def get_applications(conn=Depends(get_db)):
    return service.list_applications(conn)


@router.get("/{application_id}")
def get_application(application_id: int, conn=Depends(get_db)):
    row = service.get_application(conn, application_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return row


@router.put("/{application_id}")
def update_application(application_id: int, data: ApplicationUpdate, conn=Depends(get_db)):
    row = service.update_application(conn, application_id, data)
    if row is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return row


@router.delete("/{application_id}")
def delete_application(application_id: int, conn=Depends(get_db)):
    row = service.delete_application(conn, application_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return {"detail": "Application deleted"}