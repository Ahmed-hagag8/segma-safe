interface RateLimitRecord {
  count: number;
  resetTime: number;
}

/**
 * In-memory, per-process limiter. Correct only when the app runs as a SINGLE
 * process (see ecosystem.config.cjs — fork mode, 1 instance). For multi-instance
 * setups move this to Redis.
 */
const globalStore = globalThis as unknown as {
  __rateLimitMap?: Map<string, RateLimitRecord>;
  __rateLimitTimer?: ReturnType<typeof setInterval>;
};

const rateLimitMap = (globalStore.__rateLimitMap ??= new Map<string, RateLimitRecord>());

// Purge expired entries every 10 min. Singleton so hot-reload doesn't stack timers;
// unref() so the timer never keeps the process alive on shutdown.
if (!globalStore.__rateLimitTimer) {
  globalStore.__rateLimitTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap) {
      if (now > record.resetTime) rateLimitMap.delete(key);
    }
  }, 10 * 60 * 1000);
  globalStore.__rateLimitTimer.unref?.();
}

export interface RateLimitOptions {
  windowMs: number;
  max: number;
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { windowMs: 10 * 60 * 1000, max: 5 }
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + options.windowMs,
    });
    return {
      success: true,
      remaining: options.max - 1,
      reset: now + options.windowMs,
    };
  }

  if (record.count >= options.max) {
    return {
      success: false,
      remaining: 0,
      reset: record.resetTime,
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: options.max - record.count,
    reset: record.resetTime,
  };
}
