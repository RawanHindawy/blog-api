import type { Context, Next } from "hono";
import type { RateLimitOptions } from "../types/rate-limiter";

const rateLimit = (options: RateLimitOptions = {}) => {
  const requests = new Map<string, { count: number; reset: number }>();

  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 100,
    message = "Too many requests, please try again later.",
  } = options;

  return async (c: Context, next: Next) => {
    const now = Date.now();
    const ip = c.req.header("x-forwarded-for") || "unknown";
    const req = requests.get(ip) || { count: 0, reset: now + windowMs };

    // Reset if window has expired
    if (now > req.reset) {
      req.count = 0;
      req.reset = now + windowMs;
    }

    req.count++;
    requests.set(ip, req);

    c.header("RateLimit-Limit", `${max}`);
    c.header("RateLimit-Remaining", `${Math.max(0, max - req.count)}`);
    c.header("RateLimit-Reset", `${req.reset}`);

    return req.count > max ? c.json({ message }, 429) : next();
  };
};

export default rateLimit;
