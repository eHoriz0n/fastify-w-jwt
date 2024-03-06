import type { Config } from "drizzle-kit";
// import dotenv from "dotenv";

// dotenv.config({});
// const urls = {
//   schema:
//     process.env.NODE_ENV === "development"
//       ? "./src/db/schema.ts"
//       : "./dist/src/db/schema.js",
//   out:
//     process.env.NODE_ENV === "development"
//       ? "./src/db/drizzle"
//       : "./dist/src/db/drizzle",
// };
export default {
  schema: process.env.DB_SCHEMA_PATH,
  out: process.env.DB_OUT_PATH,

  breakpoints: true,
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.PG_DATABASE,
    ssl: false,
  },
  verbose: true,
  strict: false,
} satisfies Config;
