DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('deposit', 'withdraw');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" varchar(256),
	"amount" integer,
	"type" "type" DEFAULT 'withdraw'
);
