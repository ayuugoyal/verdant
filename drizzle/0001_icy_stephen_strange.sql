CREATE TABLE IF NOT EXISTS "open_ai_responses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question_id" uuid NOT NULL,
	"response" json NOT NULL,
	"created_at" timestamp DEFAULT NOW() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"question1" varchar NOT NULL,
	"question2" varchar NOT NULL,
	"question3" varchar NOT NULL,
	"question4" varchar NOT NULL,
	"created_at" timestamp DEFAULT NOW() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "dateofbirth" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "gender" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "age" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "bloudgroup" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "primarylanguage" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "emergencycontact" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "address" varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "open_ai_responses" ADD CONSTRAINT "open_ai_responses_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions" ADD CONSTRAINT "questions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");