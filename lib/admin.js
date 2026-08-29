import { createHash, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE = 'admin_passcode';

/* Constant-time comparison, hashed first so unequal-length inputs never throw
   or short-circuit early — avoids leaking the passcode via response timing. */
export function passcodeMatches(candidate) {
  const expected = process.env.ADMIN_PASSCODE || '';
  if (!expected) return false;
  const a = createHash('sha256').update(String(candidate || '')).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}
