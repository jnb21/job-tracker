import os
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import Header, HTTPException

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", 60))


def hash_password(plain_password: str) -> str:
    return pwd_context.hash(plain_password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def register_user(conn, data):
    hashed = hash_password(data.password)
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO users (email, hashed_password)
            VALUES (%s, %s)
            RETURNING id, email
            """,
            (data.email, hashed)
        )
        row = cur.fetchone()
        conn.commit()
        return row


def get_user_by_email(conn, email: str):
    with conn.cursor() as cur:
        cur.execute(
            "SELECT id, email, hashed_password FROM users WHERE email = %s",
            (email,)
        )
        return cur.fetchone()


def get_user_by_id(conn, user_id: int):
    with conn.cursor() as cur:
        cur.execute(
            "SELECT id, email FROM users WHERE id = %s",
            (user_id,)
        )
        return cur.fetchone()


def create_access_token(user_id: int) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=JWT_EXPIRE_MINUTES)
    payload = {"sub": str(user_id), "exp": expire}
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


def login_user(conn, data):
    user = get_user_by_email(conn, data.email)
    if user is None or not verify_password(data.password, user["hashed_password"]):
        return None
    return create_access_token(user["id"])


def get_current_user_id(authorization: str = Header(...)) -> int:
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return int(payload.get("sub"))
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")