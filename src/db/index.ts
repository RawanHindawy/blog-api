import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "../config/environment.ts";

const db = drizzle(config.DATABASE_URL!);

export default db;
