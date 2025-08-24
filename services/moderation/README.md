# Moderation Service (Flask + BART MNLI)
Runs a zero-shot classifier endpoint compatible with the web app.

## Setup
```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8001
```

## Endpoint
POST `/classify`
```json
{ "text": "example", "labels": ["spam","toxicity"] }
```
