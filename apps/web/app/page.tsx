'use client'
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [text, setText] = useState('');

  useEffect(()=>{
    fetch('/api/posts').then(r=>r.json()).then(setPosts);
  },[]);

  const submit = async () => {
    await fetch('/api/posts', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ text }) });
    setText('');
    const updated = await fetch('/api/posts').then(r=>r.json());
    setPosts(updated);
  };

  return (
    <main className="space-y-4">
      <div className="card">
        <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full border rounded p-2" rows={3} placeholder="Share something..." />
        <div className="mt-2">
          <button onClick={submit} className="bg-black text-white px-4 py-2 rounded-2xl">Post</button>
        </div>
      </div>
      <section className="space-y-3">
        {posts.map(p=>(
          <article key={p._id} className="card">
            <p className="whitespace-pre-wrap">{p.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
