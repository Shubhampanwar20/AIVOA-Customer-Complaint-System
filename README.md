# 🧠 AIVOA – AI-Powered Customer Complaint Management System

An AI-powered Customer Complaint Management System developed for the **AIVOA Full Stack Developer Assessment**. This application helps pharmaceutical quality teams analyze customer complaints, extract structured information, assess risk, and generate AI-powered recommendations.

---

## 🚀 Features

- 📄 Complaint PDF/Text Analysis
- 🤖 AI-Powered Complaint Analysis
- 📝 Automatic Complaint Summary
- 👤 Customer Information Extraction
- 💊 Product Information Extraction
- 🔢 Batch Number Detection
- 📅 Manufacturing & Expiry Date Extraction
- 📦 Quantity Detection
- ⚠️ AI Risk Classification
- 🔍 Root Cause Recommendation
- ✅ CAPA Recommendation
- 💬 AI Copilot Panel
- 🔄 React + Redux State Management
- ⚡ FastAPI Backend
- 🧩 LangGraph AI Workflow
- 🚀 Groq LLM Integration

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Redux Toolkit
- Vite
- Axios
- CSS

## Backend

- Python
- FastAPI
- LangGraph
- Groq LLM
- Pydantic

## AI

- LangGraph
- Groq API
- Prompt Engineering

---

# 📁 Project Structure

```
AIVOA-Customer-Complaint-System
│
├── backend
│   ├── app
│   │   ├── ai
│   │   ├── api
│   │   ├── database
│   │   ├── models
│   │   ├── schemas
│   │   └── services
│   └── main.py
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   ├── services
│   │   └── assets
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Shubhampanwar20/AIVOA-Customer-Complaint-System.git
```

```
cd AIVOA-Customer-Complaint-System
```

---

## Backend Setup

```
cd backend
```

Create virtual environment

```
python -m venv venv
```

Activate

### Windows

```
venv\Scripts\activate
```

### Mac/Linux

```
source venv/bin/activate
```

Install dependencies

```
pip install -r requirements.txt
```

Create `.env`

```
GROQ_API_KEY=your_api_key
```

Run backend

```
uvicorn app.main:app --reload
```

Backend:

```
http://127.0.0.1:8000
```

---

## Frontend Setup

```
cd frontend
```

Install packages

```
npm install
```

Run

```
npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# 🤖 AI Workflow

1. User uploads a complaint or enters complaint text.
2. Frontend sends the complaint to the FastAPI backend.
3. FastAPI calls the LangGraph workflow.
4. LangGraph sends the prompt to the Groq LLM.
5. The AI extracts structured complaint information.
6. The response is returned as JSON.
7. React displays the AI-generated information in the Complaint Form and AI Copilot.

---

# 📊 Extracted Information

The AI extracts:

- Complaint Source
- Customer Name
- Product Name
- Product Strength
- Batch Number
- Manufacturing Date
- Expiry Date
- Quantity
- Complaint Summary
- Risk Classification
- Root Cause
- CAPA Recommendation

---

# 📸 Screenshots

> Add screenshots here after uploading them to GitHub.

Example:

```
screenshots/dashboard.png
screenshots/copilot.png
screenshots/analysis.png
```

---

# 🎥 Demo Video

A 10–15 minute demonstration explains:

- Frontend workflow
- Backend architecture
- LangGraph implementation
- AI features
- Code flow
- Design decisions

---

# 📌 Future Improvements

- OCR Integration
- Duplicate Complaint Detection
- Email Integration
- User Authentication
- Complaint History
- Dashboard Analytics
- Database Persistence
- Multi-Agent AI Workflow

---

# 👨‍💻 Developer

**Shubham Panwar**

BCA (Artificial Intelligence & Data Science)

GitHub:
https://github.com/Shubhampanwar20

---

# 📄 License

This project was developed for the **AIVOA Full Stack Developer Assessment** and is intended for educational and evaluation purposes.
