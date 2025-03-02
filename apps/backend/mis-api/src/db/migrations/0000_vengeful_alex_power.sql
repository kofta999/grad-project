-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."address_type" AS ENUM('permanent', 'current');--> statement-breakpoint
CREATE TYPE "public"."department_type" AS ENUM('diploma', 'masters', 'phd');--> statement-breakpoint
CREATE TYPE "public"."identification_type" AS ENUM('national_id', 'passport');--> statement-breakpoint
CREATE TYPE "public"."martial_status" AS ENUM('single', 'married', 'married_with_dependents', 'divorced', 'widow', 'other');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "students" (
	"student_id" serial PRIMARY KEY NOT NULL,
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
	"id_issuance_date" date NOT NULL,
	"id_number" text NOT NULL,
	"id_authority" text NOT NULL,
	"martial_status" "martial_status",
	"is_working" boolean NOT NULL,
	"job_type" text,
	"hashed_password" text NOT NULL,
	"sec_question" text NOT NULL,
	"sec_answer" text NOT NULL,
	"military_status" text NOT NULL,
	"dob" date NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "students_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "registerations" (
	"registeration_id" serial PRIMARY KEY NOT NULL,
	"application_id" integer NOT NULL,
	"academic_year" text NOT NULL,
	"faculty" text NOT NULL,
	"academic_degree" text NOT NULL,
	"academic_program" text NOT NULL,
	CONSTRAINT "registerations_application_id_key" UNIQUE("application_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "emergency_contacts" (
	"contact_id" serial PRIMARY KEY NOT NULL,
	"application_id" integer NOT NULL,
	"name" text NOT NULL,
	"address" text,
	"phone_number" text NOT NULL,
	"email" text,
	CONSTRAINT "emergency_contacts_application_id_key" UNIQUE("application_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "attachments" (
	"attachment_id" serial PRIMARY KEY NOT NULL,
	"application_id" integer NOT NULL,
	"type" text NOT NULL,
	"attachment_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "addresses" (
	"address_id" serial PRIMARY KEY NOT NULL,
	"application_id" integer NOT NULL,
	"city" text NOT NULL,
	"type" "address_type" NOT NULL,
	"country" text DEFAULT '' NOT NULL,
	"full_address" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "academic_qualifications" (
	"qualification_id" serial PRIMARY KEY NOT NULL,
	"application_id" integer NOT NULL,
	"country" text NOT NULL,
	"university" text NOT NULL,
	"faculty" text NOT NULL,
	"type" text NOT NULL,
	"qualification" text NOT NULL,
	"specialization" text NOT NULL,
	"year" text NOT NULL,
	"date" date NOT NULL,
	"credit_hours" boolean NOT NULL,
	"grade" text NOT NULL,
	"gpa" text NOT NULL,
	CONSTRAINT "academic_qualifications_application_id_key" UNIQUE("application_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "applications" (
	"application_id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"is_admin_accepted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admins" (
	"admin_id" serial PRIMARY KEY NOT NULL,
	"full_name_ar" text NOT NULL,
	"full_name_en" text NOT NULL,
	"email" text NOT NULL,
	"hashed_password" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "admins_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "departments" (
	"department_id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"title" text NOT NULL,
	"type" "department_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "courses" (
	"course_id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"title" text NOT NULL,
	"prerequisite" integer,
	"total_hours" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "department_courses" (
	"course_id" integer NOT NULL,
	"department_id" integer NOT NULL,
	"is_compulsory" boolean NOT NULL,
	CONSTRAINT "department_courses_pkey" PRIMARY KEY("course_id","department_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "registerations" ADD CONSTRAINT "registerations_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("application_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "emergency_contacts" ADD CONSTRAINT "emergency_contacts_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("application_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attachments" ADD CONSTRAINT "attachments_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("application_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "addresses" ADD CONSTRAINT "addresses_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("application_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "academic_qualifications" ADD CONSTRAINT "academic_qualifications_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("application_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."students"("student_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "department_courses" ADD CONSTRAINT "department_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("course_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "department_courses" ADD CONSTRAINT "department_courses_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("department_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "academic_qualifications_application_id_idx" ON "academic_qualifications" USING btree ("application_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "applications_student_id_idx" ON "applications" USING btree ("student_id");--> statement-breakpoint
CREATE VIEW "public"."admin_applications_list" AS (SELECT a.application_id, s.full_name_ar AS student_name, r.academic_degree, r.academic_program, a.is_admin_accepted FROM applications a JOIN students s USING (student_id) JOIN registerations r USING (application_id));
*/