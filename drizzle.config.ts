import { configDotenv } from "dotenv";
import type { Config } from "drizzle-kit";

configDotenv({ path: "./.env" });

export default {
  schema: "./src/db/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: process.env.SUPABASE_DATABASE_HOST!,
    user: process.env.SUPABASE_DATABASE_USERNAME!,
    password: process.env.SUPABASE_DATABASE_PASSWORD!,
    port: 5432,
    database: process.env.SUPABASE_DATABASE_NAME!,
  },
} satisfies Config;
