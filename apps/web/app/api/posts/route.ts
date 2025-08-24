import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Post from '@/models/Post';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: -1 }).limit(50);
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  try {
    const u = requireAuth();
    const body = await req.json();
    await dbConnect();
    const post = await Post.create({ authorId: u.sub, text: body.text });
    return NextResponse.json(post, { status: 201 });
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 401 });
  }
}
