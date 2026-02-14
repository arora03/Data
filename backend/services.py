import os
import json
import uuid
from typing import List
from datetime import datetime, timedelta
from dotenv import load_dotenv
import google.generativeai as genai
from newsapi import NewsApiClient
from sqlalchemy.orm import Session
import models

load_dotenv()
load_dotenv(dotenv_path="../.env")

NEWSAPI_KEY = os.getenv("NEWSAPI_KEY") or os.getenv("NEWSAPI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GEMINI_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

if NEWSAPI_KEY:
    newsapi = NewsApiClient(api_key=NEWSAPI_KEY)

def fetch_news_for_topic(query: str, page_size: int = 10) -> List[dict]:
    """Fetch articles for a specific topic query from NewsAPI â€” last 10 days only"""
    if not NEWSAPI_KEY:
        print("NEWSAPI_KEY not found. Skipping fetch.")
        return []
    # Only fetch articles from the last 10 days
    from_date = (datetime.utcnow() - timedelta(days=10)).strftime('%Y-%m-%dT%H:%M:%S')
    try:
        result = newsapi.get_everything(
            q=query,
            language='en',
            sort_by='publishedAt',
            page_size=page_size,
            from_param=from_date
        )
        articles = []
        for article in result.get('articles', []):
            if not article.get('title') or not article.get('content'):
                continue
            articles.append({
                "id": str(uuid.uuid4()),
                "headline": article['title'],
                "source": article['source']['name'],
                "timestamp": article['publishedAt'],
                "summary": article['description'] or article['content'],
                "url": article['url'],
                "content": article['content']
            })
        return articles
    except Exception as e:
        print(f"NewsAPI error for query '{query}': {e}")
        return []

# Keep old function as alias for compatibility
def fetch_top_news() -> List[dict]:
    return fetch_news_for_topic('geopolitics OR war OR conflict', page_size=10)
    return articles

def embed_and_store_articles(articles: List[dict]):
    """Skip vector DB storage for now"""
    pass

def analyze_cluster_with_gemini(articles: List[dict]) -> dict:
    """Pass a group of articles to Gemini and extract structured data"""
    if not GEMINI_API_KEY:
        print("GEMINI_API_KEY not found. Returning dummy data.")
        return get_dummy_cluster(articles)

    model = genai.GenerativeModel('models/gemini-flash-latest')
    
    prompt = f"""
    You are an AI news analyst. Analyze these articles and return a JSON object ONLY. Do not use markdown backticks around the json.
    Articles:
    {json.dumps(articles, indent=2)}

    Output exactly this JSON format:
    {{
        "title": "A short cluster title",
        "summary": "1-2 sentence summary of what this is about",
        "entities": ["Entity1", "Entity2"],
        "sentiment": "positive" | "negative" | "neutral" | "mixed",
        "category": "Technology",
        "importance": 8,
        "trend": "up",
        "narratives": [
            {{
                "title": "Narrative title",
                "summary": "Narrative explanation",
                "sentiment": "positive",
                "confidence": 0.9,
                "sources": ["Source1"]
            }}
        ],
        "contradictions": [
            {{
                "score": 85,
                "explanation": "Why they contradict",
                "claimA": {{"text": "claim", "sources": ["s1"], "confidence": 0.8}},
                "claimB": {{"text": "claim", "sources": ["s1"], "confidence": 0.8}}
            }}
        ],
        "impact": {{
            "whyItMatters": "...",
            "whoIsAffected": "...",
            "futureOutlook": "..."
        }}
    }}
    """
