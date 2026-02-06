from pydantic import BaseModel
from typing import List, Dict, Optional, Any

class NarrativeSchema(BaseModel):
    id: str
    storyId: str
    title: str
    summary: str
    sources: List[str]
    sentiment: str
    confidence: float
    articleCount: int

    class Config:
        from_attributes = True

class ContradictionSchema(BaseModel):
    id: str
    storyId: str
    score: int
    explanation: str
    claimA: Dict[str, Any]
    claimB: Dict[str, Any]

    class Config:
        from_attributes = True
