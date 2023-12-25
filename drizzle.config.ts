import { configDotenv } from "dotenv";
import type { Config } from "drizzle-kit";

configDotenv({ path: "./.env" });

export default {
  schema: "./src/db/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
  },
} satisfies Config;
