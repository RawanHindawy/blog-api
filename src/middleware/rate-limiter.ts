import type { Context, Next } from 'hono'

interface RateLimitOptions {
  windowMs?: number  // Default: 15 minutes
  max?: number       // Default: 100
  message?: string   // Default: 'Too many requests, please try again later.'
}

const rateLimit = (options: RateLimitOptions = {}) => {
  const requests = new Map<string, { count: number; reset: number }>()
  
  const { 
    windowMs = 15 * 60 * 1000,  // 15 minutes
    max = 100,
    message = 'Too many requests, please try again later.'
  } = options

  return async (c: Context, next: Next) => {
    const ip = c.req.header('x-forwarded-for') || 'unknown'
    const now = Date.now()
    
    const requestInfo = requests.get(ip) || { count: 0, reset: now + windowMs }
    
    // Reset if window has expired
    if (now > requestInfo.reset) {
      requestInfo.count = 0
      requestInfo.reset = now + windowMs
    }

    requestInfo.count++
    requests.set(ip, requestInfo)

    // Set headers
    c.header('RateLimit-Limit', max.toString())
    c.header('RateLimit-Remaining', Math.max(0, max - requestInfo.count).toString())
    c.header('RateLimit-Reset', requestInfo.reset.toString())

    if (requestInfo.count > max) {
      return c.json({ message }, 429)
    }

    await next()
  }
}

export default rateLimit