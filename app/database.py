import os
import time
from fastapi import HTTPException
from psycopg2.pool import ThreadedConnectionPool, PoolError
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set. Copy .env.example to .env and fill it in.")

connection_pool = ThreadedConnectionPool(
    minconn=1,
    maxconn=10,
    dsn=DATABASE_URL,
    cursor_factory=RealDictCursor,
)

POOL_WAIT_TIMEOUT_SECONDS = 5


def get_db():
    conn = None
    deadline = time.monotonic() + POOL_WAIT_TIMEOUT_SECONDS
    while conn is None:
        try:
            conn = connection_pool.getconn()
        except PoolError:
            if time.monotonic() >= deadline:
                raise HTTPException(status_code=503, detail="Server is busy, please try again")
            time.sleep(0.05)

    try:
        yield conn
    except Exception:
        conn.rollback()
        raise
    finally:
        connection_pool.putconn(conn)