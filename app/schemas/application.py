from enum import Enum
from typing import Optional
from pydantic import BaseModel


class ApplicationStatus(str, Enum):
    applied = "applied"
    online_assessment = "online_assessment"
    interview = "interview"
    offer = "offer"
    rejected = "rejected"


class ApplicationCreate(BaseModel):
    company: str
    role: str
    status: ApplicationStatus = ApplicationStatus.applied
    notes: Optional[str] = None

class ApplicationUpdate(BaseModel):
    company: str
    role: str
    status: ApplicationStatus
    notes: Optional[str] = None
