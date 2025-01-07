-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."address_type" AS ENUM('permanent', 'current');--> statement-breakpoint
CREATE TYPE "public"."identification_type" AS ENUM('national_id', 'passport');--> statement-breakpoint
CREATE TYPE "public"."martial_status" AS ENUM('single', 'married', 'married_with_dependents', 'divorced', 'widow', 'other');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "academic_qualifications" (
	"qualification_id" serial NOT NULL,
	"application_id" integer NOT NULL,
	"country" text NOT NULL,
	"university" text NOT NULL,
	"faculty" text NOT NULL,
	"type" text NOT NULL,
	"qualification" text NOT NULL,
	"specialization" text NOT NULL,
	"year" text NOT NULL,
	"date" timestamp NOT NULL,
	"credit_hours" boolean NOT NULL,
	"grade" text NOT NULL,
	"gpa" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "addresses" (
	"address_id" serial NOT NULL,
	"application_id" integer NOT NULL,
	"house_number" text NOT NULL,
	"street" text NOT NULL,
	"city" text NOT NULL,
	"type" "address_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "applications" (
	"application_id" serial NOT NULL,
	"student_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "attachments" (
	"attachment_id" serial NOT NULL,
	"application_id" integer NOT NULL,
	"type" text NOT NULL,
	"attachment_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "emergency_contacts" (
	"contact_id" serial NOT NULL,
	"application_id" integer NOT NULL,
	"name" text NOT NULL,
	"address" text,
	"phone_number" text NOT NULL,
	"email" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "registerations" (
	"registeration_id" serial NOT NULL,
	"application_id" integer NOT NULL,
	"academic_year" text NOT NULL,
	"faculty" text NOT NULL,
	"academic_degree" text NOT NULL,
	"academic_program" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "students" (
	"student_id" serial NOT NULL,
	"full_name_ar" text NOT NULL,
	"full_name_en" text NOT NULL,
	"gender" boolean NOT NULL,
	"email" text NOT NULL,
	"nationality" text NOT NULL,
	"image_url" text NOT NULL,
	"phone_no_main" text NOT NULL,
	"phone_no_sec" text,
	"fax" text,
	"id_type" "identification_type" NOT NULL,
	"id_issuance_date" timestamp NOT NULL,
	"id_number" text NOT NULL,
	"id_authority" text NOT NULL,
	"martial_status" "martial_status",
	"is_working" boolean NOT NULL,
	"job_type" text,
	"hashed_password" text NOT NULL,
	"sec_question" text NOT NULL,
	"sec_answer" text NOT NULL,
	"military_status" text NOT NULL,
	"dob" timestamp NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "academic_qualifications_application_id_idx" ON "academic_qualifications" USING btree ("application_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "applications_student_id_idx" ON "applications" USING btree ("student_id");
*/