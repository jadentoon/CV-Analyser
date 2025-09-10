from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import SessionLocal

class JobDescription(BaseModel):
    text: str

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],     
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message":"API is working as intended."}

@app.post("/upload_cv/")
async def upload_cv(file : UploadFile):
    #Placeholder - only returns name.
    return {"filename": file.filename}

@app.post("/upload_job/")
async def upload_job(job : JobDescription):
    #Placeholder - only returns text.
    return {"job_text": job.text}

