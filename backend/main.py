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
def get_stories(time: str = None, source: str = None, db: Session = Depends(get_db)):
    stories = db.query(models.StoryCluster).all()
    if source and source != "All Sources":
        stories = [s for s in stories if source in s.sources]
        
    if time == "Today":
        # Usually we would filter dates, but for now we just return top 5
        stories = stories[:5]
    elif time == "Week":
        stories = stories[:10]
        
    return stories

@app.get("/api/stories/{story_id}", response_model=schemas.StoryClusterSchema)
def get_story(story_id: str, db: Session = Depends(get_db)):
    story = db.query(models.StoryCluster).filter(models.StoryCluster.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    return story

@app.get("/api/stories/{story_id}/narratives", response_model=List[schemas.NarrativeSchema])
def get_narratives(story_id: str, db: Session = Depends(get_db)):
    return db.query(models.Narrative).filter(models.Narrative.storyId == story_id).all()

@app.get("/api/stories/{story_id}/contradictions", response_model=List[schemas.ContradictionSchema])
def get_contradictions(story_id: str, db: Session = Depends(get_db)):
    return db.query(models.Contradiction).filter(models.Contradiction.storyId == story_id).all()

@app.get("/api/narratives", response_model=List[schemas.NarrativeSchema])
def get_all_narratives(db: Session = Depends(get_db)):
    return db.query(models.Narrative).all()

@app.get("/api/contradictions", response_model=List[schemas.ContradictionSchema])
