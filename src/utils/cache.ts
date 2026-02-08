/**
 * Simple in-memory cache for GitHub API responses
 * Helps avoid rate limiting during repeated requests
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class MemoryCache {
  private cache = new Map<string, CacheEntry<unknown>>();
  private defaultTTL: number;

  constructor(defaultTTLSeconds = 300) { // Default: 5 minutes
    this.defaultTTL = defaultTTLSeconds * 1000;
  }

  /**
   * Get a cached value
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    
    if (!entry) {
      return null;
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > this.defaultTTL) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Set a cached value
   */
  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Check if a key exists and is not expired
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Delete a specific key
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all cached entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  stats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Singleton instance for GitHub API cache
export const githubCache = new MemoryCache(300); // 5 minutes TTL

/**
 * Generate cache key for GitHub profile
 */
export function getProfileCacheKey(username: string): string {
  return `profile:${username.toLowerCase()}`;
}

/**
 * Wrapper function to cache async operations
 */
export async function withCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  cache: MemoryCache = githubCache
): Promise<T> {
  // Check cache first
  const cached = cache.get<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Fetch fresh data
  const data = await fetchFn();
  
  // Cache the result
  cache.set(key, data);
  
  return data;
}
