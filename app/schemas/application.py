from pydantic import BaseModel
from typing import Optional


class ApplicationCreate(BaseModel):
    company: str
    role: str
    status: str = "applied"
    notes: Optional[str] = None

class ApplicationUpdate(BaseModel):
    company: str
    role: str
    status: str
    notes: Optional[str] = None