import { Redis } from '@upstash/redis';

let redis: Redis | null = null;

// In-memory cache fallback when Redis is unavailable (reduces API calls)
const memoryCache = new Map<string, { value: any; expires: number }>();

function getRedis(): Redis | null {
  if (redis) return redis;

  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token || !url.startsWith('https://')) return null;

  redis = new Redis({ url, token });
  return redis;
}

function getMemoryCache<T>(key: string): T | null {
  const cached = memoryCache.get(key);
  if (!cached) return null;
  
  if (Date.now() > cached.expires) {
    memoryCache.delete(key);
    return null;
  }
  
  return cached.value as T;
}

function setMemoryCache<T>(key: string, value: T, ttlSeconds: number): void {
  memoryCache.set(key, {
    value,
    expires: Date.now() + ttlSeconds * 1000,
  });
  
  // Clean up expired entries periodically (keep cache size reasonable)
  if (memoryCache.size > 100) {
    const now = Date.now();
    for (const [k, v] of memoryCache.entries()) {
      if (now > v.expires) {
        memoryCache.delete(k);
      }
    }
  }
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  // Try Redis first
  const client = getRedis();
  if (client) {
    try {
      const result = await client.get<T>(key);
      if (result) return result;
    } catch {
      // Fall through to memory cache
    }
  }
  
  // Fallback to in-memory cache (reduces API calls when Redis unavailable)
  return getMemoryCache<T>(key);
}

export async function cacheSet<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
  // Always set in-memory cache (works even without Redis)
  setMemoryCache(key, value, ttlSeconds);
  
  // Also try Redis if available
  const client = getRedis();
  if (!client) return;
  try {
    await client.set(key, JSON.stringify(value), { ex: ttlSeconds });
  } catch {
    // cache write failures are non-fatal - memory cache still works
  }
}
