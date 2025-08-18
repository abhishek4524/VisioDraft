# ingestion.py
import os, glob
from pathlib import Path
from llm_client import get_embedding
from vector_store import upsert_vectors

def text_from_file(path):
    # add PDF/TXT parsing here. For now read txt.
    return Path(path).read_text(encoding='utf-8')

def chunk_text(text, chunk_size=800, overlap=200):
    i = 0
    chunks = []
    while i < len(text):
        chunk = text[i:i+chunk_size]
        chunks.append(chunk)
        i += chunk_size - overlap
    return chunks

def ingest_folder(folder='data/docs'):
    docs = glob.glob(os.path.join(folder, '*'))
    for doc in docs:
        text = text_from_file(doc)
        chunks = chunk_text(text)
        embeddings = [ get_embedding(chunk) for chunk in chunks ]
        # create metadata for each chunk
        metadatas = [{'source': doc, 'chunk_index': i} for i in range(len(chunks))]
        upsert_vectors(embeddings, chunks, metadatas)
