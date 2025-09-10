from pydantic import BaseModel
from datetime import datetime

class JobDescriptionCreate(BaseModel):
    user_id: int
    job_text: str

class JobDescriptionResponse(BaseModel):
    id: int
    user_id: int
    job_text: str
    upload_date: datetime

    class Config:
        orm_mode = True
