import React, { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';

export default function Chat() {
  const [q, setQ] = useState('');
  const [messages, setMessages] = useState([]);

  const send = async () => {
    if (!q.trim()) return;
    const userMsg = { role: 'user', text: q };
    setMessages(m => [...m, userMsg]);
    setQ('');
    try {
      setMessages(m => [...m, { role:'assistant', text: null, loading: true }]);
      const res = await axios.post('/api/query', { question: q });
      // replace last loading message
      setMessages(prev => {
        const copy = prev.slice(0, -1);
        return [...copy, { role: 'assistant', text: res.data.answer, sources: res.data.sources }];
      });
    } catch (e) {
      setMessages(prev => {
        const copy = prev.slice(0, -1);
        return [...copy, { role: 'assistant', text: 'Error answering. Try again.' }];
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="space-y-3 mb-4">
        {messages.map((m,i) => (
          <div key={i} className={m.role==='user' ? 'text-right' : 'text-left'}>
            <div className="inline-block p-3 rounded-lg bg-gray-100">{m.text ?? <LoadingSpinner size={20} />}</div>
            {m.sources && m.sources.length>0 && (
              <div className="text-xs text-gray-500 mt-1">Sources: {m.sources.map(s=>s.source).join(', ')}</div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} className="flex-1 px-3 py-2 border rounded" />
        <button onClick={send} className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
      </div>
    </div>
  );
}
