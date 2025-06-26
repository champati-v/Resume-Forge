# 💼 ResumeForge — Your AI-Powered Resume Editor (Fullstack)

**ResumeForge** is a modern web-based resume editor that lets users:
- Upload & edit resumes (mock-parsed)
- Use AI (mocked) to enhance each section
- Save and download resumes as JSON
- Built with **React.js + Tailwind CSS + FastAPI**

![image](https://github.com/user-attachments/assets/5ef2b1c3-4f2d-4c6d-83c3-cd11f9120e2e)

---

## 🚀 Features

✅ Upload `.pdf` or `.docx` file (simulated parsing)  
✅ Edit resume fields: Name, Summary, Experience, Education, Skills  
✅ Enhance any section with "AI" via `/ai-enhance` FastAPI endpoint  
✅ Save resume to backend via `/save-resume`  
✅ Download final resume as `.json`  
✅ Beautiful **dark-mode** UI with SaaS-grade feel

---

## 🛠️ Tech Stack

### 🖥️ Frontend
- React + TypeScript + Tailwind CSS
- Component libraries: Lucide, Custom UI kit
- Toast notifications for feedback

### ⚙️ Backend
- Python 3.x + FastAPI
- Endpoints:
  - `POST /ai-enhance` → Returns mocked enhanced content
  - `POST /save-resume` → Saves resume JSON to disk
  - `GET /get-resume` → (optional) Fetch saved resume

---

## ⚙️ Setup Instructions

### 🔹 1. Clone the Project

```bash
git clone https://github.com/champati-v/Resume-Forge.git
cd resume-forge

cd frontend 
npm install
npm run dev

Open another terminal

cd backend 
python -m venv venv
venv\Scripts\activate  (for windows)
or
source venv/bin/activate (for mac/linux)

pip install fastapi uvicorn
uvicorn main:app --reload
