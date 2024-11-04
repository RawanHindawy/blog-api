import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "../config/environment.ts";

const db = drizzle({ connection: config.DATABASE_URL!, casing: 'snake_case' });

export default db;
