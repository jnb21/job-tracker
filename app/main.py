import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import applications,auth

app = FastAPI(title="Job Application Tracker")

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