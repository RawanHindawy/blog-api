import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export const config = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || "",
  REDIS_URL: process.env.REDIS_URL || "",
  REDIS_TOKEN: process.env.REDIS_TOKEN || "",
  NODE_ENV: process.env.NODE_ENV || "development",
} as const;

export type Config = typeof config;
