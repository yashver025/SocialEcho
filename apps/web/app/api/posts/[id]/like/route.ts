import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Post from '@/models/Post';
import { requireAuth } from '@/lib/auth';

export async function POST(_req: Request, { params }: { params: { id: string }}) {
  try {
    const u = requireAuth();
    await dbConnect();
    await Post.updateOne({ _id: params.id }, { $addToSet: { likes: u.sub } });
    return NextResponse.json({ ok: true });
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
