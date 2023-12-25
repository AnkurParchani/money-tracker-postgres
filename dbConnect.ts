import { configDotenv } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import * as transactionSchema from "./src/db/schema/transactionSchema";
import * as userSchema from "./src/db/schema/userSchema";
import * as bioSchema from "./src/db/schema/bioSchema";

configDotenv({ path: "./.env" });

const combinedSchema = {
  ...transactionSchema,
  ...userSchema,
  ...bioSchema,
};

const client = new Client({
  host: process.env.DATABASE_HOST,
  port: 5432,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

export const connect = async () => {
  await client.connect();

  console.log("DB Connection successful");
};

export const db = drizzle(client, { schema: combinedSchema });
