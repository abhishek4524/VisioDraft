# vector_store.py
import faiss, numpy as np, pickle, os

INDEX_PATH = 'data/faiss_index.pkl'
DIM = 1536  # embedding size (OpenAI text-embedding-3-small ~1536)

class VectorStore:
    def __init__(self):
        self.index = None
        self.docs = []  # parallel array of texts/metadatas
        if os.path.exists(INDEX_PATH):
            with open(INDEX_PATH,'rb') as f:
                self.index, self.docs = pickle.load(f)
        else:
            self.index = faiss.IndexFlatL2(DIM)

    def upsert(self, embeddings, texts, metadatas):
        arr = np.array(embeddings).astype('float32')
        self.index.add(arr)
        for t,m in zip(texts, metadatas):
            self.docs.append({'text': t, 'meta': m})
        with open(INDEX_PATH,'wb') as f:
            pickle.dump((self.index, self.docs), f)

    def search(self, embedding, k=4):
        D, I = self.index.search(np.array([embedding]).astype('float32'), k)
        results = []
        for idx in I[0]:
            if idx < len(self.docs):
                results.append(self.docs[idx])
        return results

_vs = VectorStore()

def upsert_vectors(embeddings, texts, metadatas):
    _vs.upsert(embeddings, texts, metadatas)

def query_vectors(embedding, k=4):
    return _vs.search(embedding, k)
