import { serve } from "@hono/node-server";
import { createApp } from "./app.ts";
import { config } from "./config/environment.ts";

const port = Number(config.PORT);
const app = createApp();

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
