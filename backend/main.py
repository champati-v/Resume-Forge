
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os

app = FastAPI()

# Allow all origins for now (adjust if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path to save resume
SAVE_PATH = "saved_resume.json"

# Models
class AIEnhanceRequest(BaseModel):
    section: str
    content: str

class ResumeData(BaseModel):
    data: dict

# Endpoint: AI Enhance (Mocked)
@app.post("/ai-enhance")
def ai_enhance(req: AIEnhanceRequest):
    # Simple mock enhancement logic (can be improved later)
    improved = f"🔍 Enhanced: {req.content.strip().capitalize()} (Polished with AI ✨)"
    return {"enhanced": improved}

# Endpoint: Save Resume
@app.post("/save-resume")
def save_resume(resume: dict):
    with open(SAVE_PATH, "w", encoding="utf-8") as f:
        json.dump(resume, f, indent=2)
    return {"status": "success", "message": "Resume saved successfully."}

# Optional: Get Resume (for future use)
@app.get("/get-resume")
def get_resume():
    if os.path.exists(SAVE_PATH):
        with open(SAVE_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
        return {"resume": data}
    return {"resume": None, "message": "No saved resume found."}
