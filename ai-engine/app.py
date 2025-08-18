# app.py
from fastapi import FastAPI
from pydantic import BaseModel
from llm_client import get_embedding, call_llm
from vector_store import query_vectors

app = FastAPI()

class QueryRequest(BaseModel):
    question: str
    top_k: int = 4

@app.post("/api/query")
async def query(req: QueryRequest):
    q_emb = get_embedding(req.question)
    hits = query_vectors(q_emb, k=req.top_k)
    context = "\n\n---\n\n".join([h['text'] for h in hits])
    sources = [h['meta'] for h in hits]
    prompt = f"Use the following context to answer the question. If context doesn't contain answer, say you don't know.\n\nContext:\n{context}\n\nQuestion: {req.question}\n\nAnswer concisely and cite sources."
    answer = call_llm(prompt)
    return {"answer": answer, "sources": sources}
