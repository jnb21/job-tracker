from fastapi import APIRouter, Depends, HTTPException
from app.database import get_db
from app.schemas.application import ApplicationCreate, ApplicationUpdate
from app.services import applications as service
from app.core.security import get_current_user_id

router = APIRouter(prefix="/applications", tags=["applications"])


@router.post("/")
def create_application(data: ApplicationCreate, conn=Depends(get_db), user_id: int = Depends(get_current_user_id)):
    return service.create_application(conn, data, user_id)


@router.get("/")
def get_applications(conn=Depends(get_db), user_id: int = Depends(get_current_user_id)):
    return service.list_applications(conn, user_id)


@router.get("/{application_id}")
def get_application(application_id: int, conn=Depends(get_db), user_id: int = Depends(get_current_user_id)):
    row = service.get_application(conn, application_id, user_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return row


@router.put("/{application_id}")
def update_application(application_id: int, data: ApplicationUpdate, conn=Depends(get_db), user_id: int = Depends(get_current_user_id)):
    row = service.update_application(conn, application_id, data, user_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return row


@router.delete("/{application_id}")
def delete_application(application_id: int, conn=Depends(get_db), user_id: int = Depends(get_current_user_id)):
    row = service.delete_application(conn, application_id, user_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return {"detail": "Application deleted"}
