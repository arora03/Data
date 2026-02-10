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

