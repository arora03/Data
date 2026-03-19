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

class ArticleSchema(BaseModel):
    id: str
    storyId: str
    headline: str
    source: str
    timestamp: str
    sentiment: str
    summary: str

    class Config:
        from_attributes = True

class StoryClusterSchema(BaseModel):
    id: str
    title: str
    summary: str
    entities: List[str]
    articleCount: int
    sentiment: str
    narrativeCount: int
    contradictions: int
    updatedAt: str
    category: str
    importance: int
    trend: str
    sources: List[str]

    class Config:
        from_attributes = True

class TimelinePointSchema(BaseModel):
    date: str
    articles: int
    stories: int
    contradictions: int
    label: Optional[str] = None

    class Config:
        from_attributes = True

class TrendingTopicSchema(BaseModel):
    name: str
    count: int
    change: int
    category: str

    class Config:
        from_attributes = True

class ImpactDataSchema(BaseModel):
    whyItMatters: str
    whoIsAffected: str
    futureOutlook: str

    class Config:
        from_attributes = True

class GeographicHeatmapSchema(BaseModel):
    region: str
    x: int
    y: int
    intensity: float
    articles: int

    class Config:
        from_attributes = True

# [Stage 25% | Commit 6 | 2026-03-24 23:33]

# [Stage 50% | Commit 14 | 2026-03-24 23:33]

# [Stage 75% | Commit 45 | 2026-03-24 23:34]

# [Stage 100% | Commit 47 | 2026-03-24 23:34]
