ALTER TABLE "posts" ALTER COLUMN "author_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "author_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "created_at" text;