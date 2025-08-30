from fastapi import FastAPI, UploadFile
from pydantic import BaseModel

class JobDescription(BaseModel):
    text: str

app = FastAPI()

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
    return {"Job Description": job.text}

