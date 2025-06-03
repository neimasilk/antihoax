// antihoax-backend/src/utils/cache.js

// This is a very simple in-memory cache.
// For production, consider using a more robust solution like Redis, Memcached,
// or a Node.js library like 'node-cache' or 'lru-cache'.

class SimpleCache {
  constructor(defaultTtlSeconds = 60 * 5) { // Default TTL: 5 minutes
    this.cache = new Map();
    this.defaultTtl = defaultTtlSeconds * 1000; // Convert to milliseconds
    console.log(`SimpleCache initialized with default TTL: ${defaultTtlSeconds} seconds.`);
  }

  _now() {
    return Date.now();
  }

  /**
   * Sets a value in the cache with an optional TTL.
   * @param {string} key The cache key.
   * @param {any} value The value to cache.
   * @param {number} [ttlSeconds] Optional TTL in seconds for this specific key.
   */
  set(key, value, ttlSeconds) {
    const ttl = (ttlSeconds ? ttlSeconds * 1000 : this.defaultTtl);
    const expiresAt = this._now() + ttl;
    this.cache.set(key, { value, expiresAt });
    console.log(`Cache SET: Key "${key}", TTL: ${ttl / 1000}s`);
  }

  /**
   * Retrieves a value from the cache. Returns undefined if not found or expired.
   * @param {string} key The cache key.
   * @returns {any|undefined} The cached value or undefined.
   */
  get(key) {
    const entry = this.cache.get(key);
    if (entry) {
      if (this._now() < entry.expiresAt) {
        console.log(`Cache HIT: Key "${key}"`);
        return entry.value;
      } else {
        console.log(`Cache EXPIRED: Key "${key}"`);
        this.cache.delete(key); // Clean up expired entry
      }
    } else {
      console.log(`Cache MISS: Key "${key}"`);
    }
    return undefined;
  }

  /**
   * Deletes a value from the cache.
   * @param {string} key The cache key.
   * @returns {boolean} True if an element in the Map object existed and has been removed, or false if the element does not exist.
   */
  delete(key) {
    const deleted = this.cache.delete(key);
    if (deleted) {
      console.log(`Cache DELETE: Key "${key}"`);
    }
    return deleted;
  }

  /**
   * Clears the entire cache.
   */
  clear() {
    this.cache.clear();
    console.log("Cache CLEARED.");
  }

  /**
   * Returns the number of items currently in the cache (including expired items not yet cleaned).
   * @returns {number}
   */
  size() {
    return this.cache.size;
  }

  /**
   * Cleans up all expired items from the cache.
   * This can be called periodically if needed, though `get` also cleans up individually.
   */
  cleanupExpired() {
    const now = this._now();
    let cleanedCount = 0;
    for (const [key, entry] of this.cache.entries()) {
      if (now >= entry.expiresAt) {
        this.cache.delete(key);
        cleanedCount++;
      }
    }
    if (cleanedCount > 0) {
      console.log(`Cache cleanup: Removed ${cleanedCount} expired items.`);
    }
    return cleanedCount;
  }
}

// Export a singleton instance
const cacheInstance = new SimpleCache(process.env.CACHE_DEFAULT_TTL_SECONDS || 300); // Default 5 mins, configurable via .env

// Example of more specific caches if needed, could be different instances or a more complex store
// const userCache = new SimpleCache(60 * 60); // 1 hour TTL for user data
// const apiResponseCache = new SimpleCache(60); // 1 minute TTL for some API responses

module.exports = cacheInstance;
// If you need multiple cache instances with different configurations, you might export the class itself:
// module.exports = { SimpleCache, defaultCache: cacheInstance };
