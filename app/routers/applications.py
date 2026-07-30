from fastapi import APIRouter, Depends
from app.database import get_db
from app.schemas.applications import ApplicationCreate
from app.services import applications as service

router = APIRouter(prefix="/applications", tags=["applications"])


@router.post("/")
def create_application(data: ApplicationCreate, conn=Depends(get_db)):
    return service.create_application(conn, data)