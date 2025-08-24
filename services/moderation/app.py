from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI(title="SocialEcho Moderation")
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

class Inp(BaseModel):
    text: str
    labels: list[str]

@app.post("/classify")
def classify(inp: Inp):
    res = classifier(inp.text, candidate_labels=inp.labels)
    return {"labels": res["labels"], "scores": [float(s) for s in res["scores"]]}
