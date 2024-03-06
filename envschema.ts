import z from "zod";

const envSchema = z.object({
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_USER: z.string().min(1),
  POSTGRES_DB: z.string().min(1),
  PG_DATABASE: z.string().min(1),
  DB_SCHEMA_PATH: z.string().min(1),
  DB_OUT_PATH: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  RESET_TOKEN_SECRET: z.string().min(1),
  OAUTH_USERINFO_URL: z.string().min(1),
  SESSION_SECRET: z.string().min(1),
  API_URL: z.string().min(1),
  HOST: z.string().min(1),
  PORT: z.number(),
  GOOGLE_REDIRECT_URI: z.string().min(1),
});

const envServer = envSchema.parse({
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_DB: process.env.POSTGRES_DB,
  PG_DATABASE: process.env.PG_DATABASE,
  DB_SCHEMA_PATH: process.env.DB_SCHEMA_PATH,
  DB_OUT_PATH: process.env.DB_OUT_PATH,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  RESET_TOKEN_SECRET: process.env.RESET_TOKEN_SECRET,
  OAUTH_USERINFO_URL: process.env.OAUTH_USERINFO_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
  API_URL: process.env.API_URL,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
});

// if (!envServer.success) {
//   throw new Error(
//     "There is an error with the server environment variables",
//     envServer.error,
//   );
// }

export const envServerSchema = envServer;
type EnvSchemaType = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaType {}
  }
}
