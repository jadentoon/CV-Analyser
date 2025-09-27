from pydantic import BaseModel
from datetime import datetime

class JobDescriptionCreate(BaseModel):
    user_id: int
    job_title: str
    job_text: str

class JobDescriptionResponse(BaseModel):
    id: int
    user_id: int
    job_title: str
    upload_date: datetime

    class Config:
        from_attributes = True
