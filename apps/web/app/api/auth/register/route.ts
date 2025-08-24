import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();
    await dbConnect();
    const exists = await User.findOne({ email });
    if (exists) return NextResponse.json({ error: 'Email in use' }, { status: 409 });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, name, passwordHash });
    return NextResponse.json({ ok: true, id: user._id });
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
