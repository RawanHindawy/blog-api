import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "../config/environment.ts";
import * as schema from "./schema";
const db = drizzle({ connection: config.DATABASE_URL!, casing: 'snake_case', schema });

export default db;
