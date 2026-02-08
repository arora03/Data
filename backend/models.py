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

