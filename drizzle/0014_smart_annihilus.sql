ALTER TABLE "details" RENAME TO "bios";--> statement-breakpoint
ALTER TABLE "bios" DROP CONSTRAINT "details_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "bios" ADD COLUMN "bio" varchar(256);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bios" ADD CONSTRAINT "bios_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "bios" DROP COLUMN IF EXISTS "address";--> statement-breakpoint
ALTER TABLE "bios" DROP COLUMN IF EXISTS "gender";--> statement-breakpoint
ALTER TABLE "bios" DROP COLUMN IF EXISTS "height";--> statement-breakpoint
ALTER TABLE "bios" DROP COLUMN IF EXISTS "phone";