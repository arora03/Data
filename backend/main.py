from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

import models, schemas
import os
import google.generativeai as genai
from dotenv import load_dotenv
from database import engine, get_db

load_dotenv()
load_dotenv(dotenv_path="../.env")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GEMINI_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# Create DB tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Nexus Insights API")

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/stories", response_model=List[schemas.StoryClusterSchema])
