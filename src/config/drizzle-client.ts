import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../db/schema";
export const pool = new pg.Pool({
  connectionString: process.env.PG_DATABASE,
  ssl: false,
});

export const db = drizzle(pool, { schema });
