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
        "label": "Russia-Ukraine War"
    },
    {
        "query": '"US China" OR "Taiwan strait" OR "South China Sea" OR "China sanctions" OR "China Taiwan"',
        "label": "US-China Tensions"
    },
    {
        "query": '"UN Security Council" OR "United Nations" OR "global sanctions" OR "international diplomacy" OR "G20 summit"',
        "label": "Global Diplomacy"
    },
    {
        "query": '"Iran nuclear" OR "North Korea" OR "Kim Jong" OR "Iran US" OR "nuclear deal"',
        "label": "Nuclear & Rogue States"
    },
]

def run_ingestion():
    print("Starting multi-topic news ingestion...")
    db = SessionLocal()

    for topic in TOPICS:
        print(f"\n[Topic] {topic['label']}")
        
        # 1. Fetch articles for this specific topic
        raw_articles = fetch_news_for_topic(topic["query"], page_size=10)
        
        if not raw_articles:
            print(f"  No articles found for: {topic['label']}. Skipping.")
            continue
        
        print(f"  Fetched {len(raw_articles)} articles. Sending to Gemini...")
        
        # 2. Embed (pass-through currently)
        embed_and_store_articles(raw_articles)
        
        # 3. Gemini analyzes this topic batch
        cluster_data = analyze_cluster_with_gemini(raw_articles)
        
        # 4. Save to DB
        try:
