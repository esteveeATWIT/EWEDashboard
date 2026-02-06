const limitStore = new Map<string, { count: number; resetAt: number }>();

export function applyRateLimit(key: string, limit = 60, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = limitStore.get(key);

  if (!entry || entry.resetAt <= now) {
    limitStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count += 1;
  return true;
}
