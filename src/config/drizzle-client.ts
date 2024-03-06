import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../db/schema";
import { migrate } from "drizzle-orm/node-postgres/migrator";

export const pool = new pg.Pool({
  connectionString: process.env.PG_DATABASE,
  ssl: false,
});

export const db = drizzle(pool, { schema });

await migrate(db, { migrationsFolder: "src/db/drizzle" });
