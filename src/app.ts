import { Hono } from "hono";
import mainRouter from "./routes/main-routes.ts";
import { errorHandler } from './middleware/error-middleware';
// import rateLimit from "./middleware/rate-limiter.ts";
// import { logger } from 'hono/logger';
// import { secureHeaders } from 'hono/secure-headers';
// import { prettyJSON } from 'hono/pretty-json';

export const createApp = () => {
  const app = new Hono();

  app.route("/api", mainRouter());

  app.onError(errorHandler)
  // app.use('*', logger())
  // app.use('*', secureHeaders())
  // app.use('*', prettyJSON())

  return app;
};