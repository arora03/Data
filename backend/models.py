from sqlalchemy import Column, Integer, String, Float, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database import Base

class StoryCluster(Base):
    __tablename__ = "story_clusters"

    id = Column(String, primary_key=True, index=True)
    title = Column(String)
    summary = Column(String)
    entities = Column(JSON) # list of strings
    articleCount = Column(Integer)
    sentiment = Column(String)
    narrativeCount = Column(Integer)
    contradictions = Column(Integer)
    updatedAt = Column(String)
    category = Column(String)
    importance = Column(Integer)
    trend = Column(String)
    sources = Column(JSON) # list of strings

    narratives = relationship("Narrative", back_populates="story")
    contradictions_list = relationship("Contradiction", back_populates="story")
    articles = relationship("Article", back_populates="story")
    impact = relationship("ImpactData", back_populates="story", uselist=False)

class Narrative(Base):
    __tablename__ = "narratives"

    id = Column(String, primary_key=True, index=True)
    storyId = Column(String, ForeignKey("story_clusters.id"))
    title = Column(String)
    summary = Column(String)
    sources = Column(JSON)
    sentiment = Column(String)
    confidence = Column(Float)
    articleCount = Column(Integer)

    story = relationship("StoryCluster", back_populates="narratives")

class Contradiction(Base):
    __tablename__ = "contradictions"

    id = Column(String, primary_key=True, index=True)
    storyId = Column(String, ForeignKey("story_clusters.id"))
    score = Column(Integer)
    explanation = Column(String)
    claimA = Column(JSON) # {text: string, sources: [], confidence: number}
    claimB = Column(JSON)

    story = relationship("StoryCluster", back_populates="contradictions_list")

class Article(Base):
    __tablename__ = "articles"

    id = Column(String, primary_key=True, index=True)
    storyId = Column(String, ForeignKey("story_clusters.id"))
    headline = Column(String)
    source = Column(String)
    timestamp = Column(String)
    sentiment = Column(String)
    summary = Column(String)

    story = relationship("StoryCluster", back_populates="articles")

class TimelinePoint(Base):
    __tablename__ = "timeline_points"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    date = Column(String, unique=True, index=True)
    articles = Column(Integer)
    stories = Column(Integer)
    contradictions = Column(Integer)
    label = Column(String, nullable=True)

class TrendingTopic(Base):
    __tablename__ = "trending_topics"

    name = Column(String, primary_key=True, index=True)
    count = Column(Integer)
    change = Column(Integer)
    category = Column(String)

class ImpactData(Base):
    __tablename__ = "impact_data"

    storyId = Column(String, ForeignKey("story_clusters.id"), primary_key=True)
    whyItMatters = Column(String)
    whoIsAffected = Column(String)
    futureOutlook = Column(String)

    story = relationship("StoryCluster", back_populates="impact")

class GeographicHeatmap(Base):
    __tablename__ = "geographic_heatmap"

    id = Column(Integer, primary_key=True, autoincrement=True)
    region = Column(String)
    x = Column(Integer)
    y = Column(Integer)
    intensity = Column(Float)
    articles = Column(Integer)

# [Stage 25% | Commit 2 | 2026-03-24 23:33]

# [Stage 50% | Commit 8 | 2026-03-24 23:33]

# [Stage 75% | Commit 44 | 2026-03-24 23:34]

# [Stage 100% | Commit 46 | 2026-03-24 23:34]
