from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import fitz  # PyMuPDF
import tempfile
import os

from app.api.routes import router

app = FastAPI(title="AI Complaint Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    # Save uploaded PDF temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp:
        temp.write(await file.read())
        temp_path = temp.name

    # Extract text
    doc = fitz.open(temp_path)
    text = ""

    for page in doc:
        text += page.get_text()

    doc.close()
    os.remove(temp_path)

    return {
        "filename": file.filename,
        "text": text
    }