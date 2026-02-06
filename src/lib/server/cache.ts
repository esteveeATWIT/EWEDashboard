const memory = new Map<string, { expiresAt: number; payload: unknown }>();

export async function withCache<T>(key: string, ttlMs: number, resolver: () => Promise<T>): Promise<T> {
  const current = memory.get(key);
  const now = Date.now();

  if (current && current.expiresAt > now) {
    return current.payload as T;
  }

  const value = await resolver();
  memory.set(key, { expiresAt: now + ttlMs, payload: value });
  return value;
}
