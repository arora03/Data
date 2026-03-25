#INFERA Backend

This is the Python backend that powers the Nexus Insights dashboard. It uses **FastAPI**, **SQLite**, **ChromaDB**, **Gemini 1.5 Flash**, and **NewsAPI**.

## 1. Setup

First, install the required packages:

```bash
cd backend
pip install -r requirements.txt
```

## 2. API Keys

Create a file named `.env` in the `backend/` folder and add your keys:

```ini
GEMINI_API_KEY=your_gemini_api_key_here
NEWSAPI_KEY=your_newsapi_key_here
```

## 3. Ingesting Data

Before starting the server, you need to populate the database with real news. Run the ingestion script. This will use NewsAPI to get the latest tech articles, pass them to Gemini 1.5 Flash for analysis and contradiction detection, and store them in SQLite and Chroma DB.

```bash
python ingest.py
```

## 4. Running the Server

Start the FastAPI server on port 3000 to serve data to your frontend:

```bash
uvicorn main:app --reload --port 3000
```

Your REST API is now alive at `http://localhost:3000/api/stories` and perfectly mimics the structure expected by `mockData.ts`. You can go to the frontend and replace the mock imports with real `fetch` calls to `http://localhost:3000/api/...`.
