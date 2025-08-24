import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';
import { signToken } from '@/lib/auth';

async function hash(text: string) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await dbConnect();
    const user:any = await User.findOne({ email });
    if (!user || !(await user.verifyPassword(password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Context-based device check (simple demo: ip+ua hash)
    const ip = (req.headers.get('x-forwarded-for')||'unknown').split(',')[0].trim();
    const ua = req.headers.get('user-agent') || 'unknown';
    const ipHash = await hash(ip);
    const uaHash = await hash(ua);

    const device = user.devices.find((d:any)=> d.ipHash===ipHash && d.uaHash===uaHash);
    if (!device) {
      user.devices.push({ ipHash, uaHash, lastSeen: new Date().toISOString(), trusted: false });
    } else {
      device.lastSeen = new Date().toISOString();
    }
    await user.save();

    const token = signToken({ sub: String(user._id), email, role: user.role });
    const res = NextResponse.json({ ok: true });
    res.cookies.set('se_token', token, { httpOnly: true, sameSite: 'lax', secure: false, path: '/' });
    return res;
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
