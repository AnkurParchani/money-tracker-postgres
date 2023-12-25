CREATE TABLE IF NOT EXISTS "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50),
	"rollno" integer,
	"email" varchar(50)
);
