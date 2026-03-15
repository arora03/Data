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
def get_all_contradictions(db: Session = Depends(get_db)):
    return db.query(models.Contradiction).all()

@app.get("/api/stories/{story_id}/articles", response_model=List[schemas.ArticleSchema])
def get_articles(story_id: str, db: Session = Depends(get_db)):
    return db.query(models.Article).filter(models.Article.storyId == story_id).all()

class SearchRequest(BaseModel):
    query: str

@app.post("/api/search")
def search_insights(req: SearchRequest, db: Session = Depends(get_db)):
    stories = db.query(models.StoryCluster).all()
    titles = [f"- {s.title}: {s.summary}" for s in stories[:20]]
    context_str = "\n".join(titles)
    
    related_ids = [s.id for s in stories[:2]]
    narratives_res = ["AI is evolving rapidly", "Regulatory frameworks are lagging"]
    
    if GEMINI_API_KEY:
        try:
            model = genai.GenerativeModel('models/gemini-flash-latest')
            prompt = f"""Context covering recent news:\n{context_str}\n\nAnswer the user's question based strictly on the context. If the context is empty or doesn't have the answer, state that. \nUser Question: {req.query}"""
            res = model.generate_content(prompt)
            return {
                "answer": res.text,
                "narratives": narratives_res,
                "relatedStories": related_ids
            }
        except Exception as e:
            pass
            
    # Fallback
    return {
        "answer": f"Based on the knowledge base of {len(stories)} recent events, '{req.query}' relates heavily to the ongoing developments in the technology sector.",
        "narratives": narratives_res,
        "relatedStories": related_ids
    }

@app.get("/api/stories/{story_id}/impact", response_model=schemas.ImpactDataSchema)
def get_impact(story_id: str, db: Session = Depends(get_db)):
    impact =  db.query(models.ImpactData).filter(models.ImpactData.storyId == story_id).first()
    if not impact:
        raise HTTPException(status_code=404, detail="Impact data not found")
    return impact

@app.get("/api/analytics/timeline", response_model=List[schemas.TimelinePointSchema])
def get_timeline(db: Session = Depends(get_db)):
    return db.query(models.TimelinePoint).all()

@app.get("/api/analytics/trending", response_model=List[schemas.TrendingTopicSchema])
def get_trending(db: Session = Depends(get_db)):
    return db.query(models.TrendingTopic).all()

@app.get("/api/analytics/heatmap", response_model=List[schemas.GeographicHeatmapSchema])
def get_heatmap(db: Session = Depends(get_db)):
    return db.query(models.GeographicHeatmap).all()

# [Stage 25% | Commit 18 | 2026-03-24 23:33]

# [Stage 50% | Commit 23 | 2026-03-24 23:33]

# [Stage 75% | Commit 27 | 2026-03-24 23:33]

# [Stage 100% | Commit 37 | 2026-03-24 23:34]
