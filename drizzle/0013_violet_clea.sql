CREATE TABLE IF NOT EXISTS "details" (
	"id" serial PRIMARY KEY NOT NULL,
	"address" varchar(256),
	"gender" varchar(256),
	"height" real,
	"phone" integer,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "details" ADD CONSTRAINT "details_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
