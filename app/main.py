import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import applications,auth
from app.database import connection_pool


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    connection_pool.closeall()


app = FastAPI(title="Job Application Tracker", lifespan=lifespan)

origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(applications.router)
app.include_router(auth.router)


@app.get("/health")
def health():
    return {"status": "ok"}