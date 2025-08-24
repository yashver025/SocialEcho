import jwt from 'jsonwebtoken';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new Error('Missing JWT_SECRET');

export interface JWTPayload {
  sub: string;
  email: string;
  role: 'USER'|'MOD'|'ADMIN';
}

export function signToken(payload: JWTPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try { return jwt.verify(token, JWT_SECRET) as JWTPayload; }
  catch { return null; }
}

export function getAuthUser(): JWTPayload | null {
  const store = cookies();
  const token = store.get('se_token')?.value;
  return token ? verifyToken(token) : null;
}

export function requireAuth(): JWTPayload {
  const u = getAuthUser();
  if (!u) throw new Error('Unauthorized');
  return u;
}
