// Shared types & utilities
export type UserRole = 'USER' | 'MOD' | 'ADMIN';

export interface DeviceFingerprint {
  ipHash: string;
  uaHash: string;
  lastSeen: string;
  trusted: boolean;
}

export const hash = async (text: string) => {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
};
