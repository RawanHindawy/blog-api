export type RateLimitOptions = {
  windowMs?: number; // Default: 15 minutes
  max?: number; // Default: 100
  message?: string; // Default: 'Too many requests, please try again later.'
};
