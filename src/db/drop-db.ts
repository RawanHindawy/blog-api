import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { config } from "../config/environment";

export const dropDatabase = async () => {
  const client = new Pool({
    connectionString: config.DATABASE_URL,
  });

  drizzle(client);

  try {
    console.log("Dropping database...");
    await client.query(`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO postgres;
      GRANT ALL ON SCHEMA public TO public;
    `);
    console.log("Database dropped successfully");
  } catch (error) {
    console.error("Error dropping database:", error);
    throw error;
  } finally {
    await client.end();
  }
};
