from fastapi import APIRouter, Depends, HTTPException
from app.database import get_db
from app.schemas.auth import UserRegister, UserOut
from app.services import auth as service

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserOut)
def register(data: UserRegister, conn=Depends(get_db)):
    try:
        return service.register_user(conn, data)
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail="Email already registered")