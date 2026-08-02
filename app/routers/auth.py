import psycopg2
from fastapi import APIRouter, Depends, HTTPException
from app.database import get_db
from app.schemas.auth import UserRegister, UserOut, UserLogin, Token
from app.services import auth as service
from app.core.security import get_current_user_id

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserOut)
def register(data: UserRegister, conn=Depends(get_db)):
    try:
        return service.register_user(conn, data)
    except psycopg2.errors.UniqueViolation:
        conn.rollback()
        raise HTTPException(status_code=400, detail="Email already registered")


@router.post("/login", response_model=Token)
def login(data: UserLogin, conn=Depends(get_db)):
    token = service.login_user(conn, data)
    if token is None:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"access_token": token}


@router.get("/me", response_model=UserOut)
def me(conn=Depends(get_db), user_id: int = Depends(get_current_user_id)):
    user = service.get_user_by_id(conn, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user