import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text } = await req.json();
  const url = process.env.MODERATION_URL as string;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, labels: ['toxicity','harassment','spam','nsfw'] })
  });
  const data = await res.json();
  return NextResponse.json(data);
}
