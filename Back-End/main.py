from fastapi import FastAPI, UploadFile, Depends,Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from utils.pdf_reader import extract_text_from_pdf
from database import SessionLocal
from models import JobDescription, CVs
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
async def upload_cv(file : UploadFile, user_id: int = Form(...), db: Session = Depends(get_db)):
    file_bytes = await file.read()
    
    extracted_text = extract_text_from_pdf(file_bytes)
    
    if not extracted_text.strip():
        return {"error" : "No text could be extracted from the PDF."}
    
    new_cv = CVs(
        user_id = user_id,
        filename = file.filename,
        cv_text = extracted_text
    )
    db.add(new_cv)
    db.commit()
    db.refresh(new_cv)
    return {
        "message" : "CV uploaded and processed successfully",
        "cv_id": new_cv.id,
        "filename": new_cv.filename,
        "sample_text": extracted_text[:200]
    }

@app.post("/upload_job/", response_model=JobDescriptionResponse)
async def upload_job(job : JobDescriptionCreate, db: Session = Depends(get_db)):
    new_job = JobDescription(
        user_id = job.user_id,
        job_title = job.job_title,
        job_text = job.job_text
    )
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job

