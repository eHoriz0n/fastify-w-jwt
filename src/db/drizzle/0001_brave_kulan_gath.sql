ALTER TABLE "user" ADD COLUMN "verified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "TWO_FA";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "twoFaEmail";