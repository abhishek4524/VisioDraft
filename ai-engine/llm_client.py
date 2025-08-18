# llm_client.py
import os
import openai
openai.api_key = os.getenv("OPENAI_API_KEY")

def get_embedding(text):
    resp = openai.Embedding.create(model="text-embedding-3-small", input=text)
    return resp['data'][0]['embedding']

def call_llm(prompt, temperature=0.2, max_tokens=512):
    resp = openai.ChatCompletion.create(
        model="gpt-4o-mini",   # or gpt-4o / gpt-4
        messages=[{"role":"user","content":prompt}],
        temperature=temperature,
        max_tokens=max_tokens
    )
    return resp['choices'][0]['message']['content']
