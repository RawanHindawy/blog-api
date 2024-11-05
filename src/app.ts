import { Hono } from "hono";
import mainRouter from "./routes/main-routes.ts";
import { errorHandler } from "./middleware/error-middleware";
import { logger } from "hono/logger";
import { prometheus } from "@hono/prometheus";
// import { secureHeaders } from 'hono/secure-headers';
// import { prettyJSON } from 'hono/pretty-json';

export const createApp = () => {
  const app = new Hono();

  const middleware = prometheus();
  app.use("*", middleware.registerMetrics);
  app.get("/metrics", middleware.printMetrics);

  app.use("*", logger());

  app.route("/api", mainRouter());

  app.onError(errorHandler);
  // app.use('*', secureHeaders())
  // app.use('*', prettyJSON())

  return app;
};
