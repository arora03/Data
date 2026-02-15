import os
from database import SessionLocal
from services import fetch_news_for_topic, embed_and_store_articles, analyze_cluster_with_gemini, save_cluster_to_db

# Define 7 distinct geopolitical topics to create 7 separate story clusters
TOPICS = [
    {
        "query": '"Indian Parliament" OR "India Parliament" OR "Lok Sabha" OR "Rajya Sabha" OR "Indian legislature"',
        "label": "Indian Parliament"
    },
    {
        "query": '"India geopolitics" OR "India China border" OR "India Pakistan" OR "Modi foreign policy" OR "India diplomacy"',
        "label": "India Geopolitics"
    },
    {
        "query": '"Israel Gaza" OR "Israel war" OR "Hamas" OR "Middle East conflict" OR "US Israel"',
        "label": "Israel-Gaza Conflict"
    },
    {
        "query": '"Ukraine war" OR "Russia Ukraine" OR "NATO Russia" OR "Ukraine aid" OR "Zelensky"',
