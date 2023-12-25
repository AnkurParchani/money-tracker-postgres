import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { configDotenv } from "dotenv";

configDotenv({ path: "./.env" });

import * as transactionSchema from "./src/db/schema/transactionSchema";
import * as userSchema from "./src/db/schema/userSchema";
import * as bioSchema from "./src/db/schema/bioSchema";

const connectionString = process.env.SUPABASE_URI as string;

const combinedSchema = {
  ...userSchema,
  ...bioSchema,
  ...transactionSchema,
};

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString);

export const db = drizzle(client, { schema: combinedSchema });
