from fastapi import FastAPI, UploadFile, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal
from models import JobDescription
from schemas import JobDescriptionCreate, JobDescriptionResponse

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

@app.post("/upload_job/", response_model=JobDescriptionResponse)
async def upload_job(job : JobDescriptionCreate, db: Session = Depends(get_db)):
    new_job = JobDescription(
        user_id = job.user_id,
        job_text = job.job_text
    )
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job

