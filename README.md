# 🧠 Infera — Intelligence Beyond Headlines

**Infera** is an AI-powered news intelligence platform that transforms raw global news into **structured insights, narratives, and reasoning**.

Instead of just showing articles, Infera helps you understand:
- what’s happening  
- why it matters  
- how narratives differ  
- where conflicts exist  

---

## 🚀 What Makes Infera Different

Most systems:
> aggregate → summarize → display

Infera:
> **understands → structures → analyzes → explains**

---

## ⚡ Core Capabilities

### 📰 1. Story Clustering
Groups thousands of articles into **coherent real-world events** using semantic embeddings.

---

### 🧠 2. Claim Extraction
Breaks articles into **atomic factual claims**, enabling deeper analysis beyond surface-level summaries.

---

### 🕸 3. Narrative Detection
Identifies **competing narratives** within the same story.

Example:
- “Policy strengthens economy”
- “Policy increases risk”

---

### ⚔️ 4. Contradiction Detection
Detects **conflicts between narratives** using LLM reasoning + NLI models.

- Agreement  
- Contradiction  
- Uncertainty  

---

### 💡 5. Impact Reasoning
Explains:
- why a story matters  
- who is affected  
- what might happen next  

---

### ⏳ 6. Timeline Intelligence
Tracks how stories evolve over time:
- growth
- spikes
- narrative shifts  

---

### 🔍 7. Query Interface
Ask:
> “Why is semiconductor news trending?”

Get:
- structured explanation  
- supporting narratives  
- visual context  

---

## 🏗️ System Architecture

```text
News Sources (RSS / APIs)
        ↓
Ingestion Pipeline
        ↓
Text Processing
        ↓
Embeddings + Vector Database
        ↓
Article Clustering (Stories)
        ↓
Claim Extraction (LLM)
        ↓
Claim Embeddings
        ↓
Narrative Clustering
        ↓
Contradiction Detection
        ↓
Impact Reasoning
        ↓
Visualization Dashboard




git clone https://github.com/your-username/infera
cd infera
pip install -r requirements.txt
uvicorn app.main:app --reload




👤 Author

Built with focus on AI systems, reasoning, and product-level thinking.

ANIRUDH ARORA - NAVYAA DWIVEDI - ISHITA ISHA
