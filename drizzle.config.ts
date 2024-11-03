import { defineConfig } from "drizzle-kit";
import { config } from "./src/config/environment";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: config.DATABASE_URL,
  },
});
