-- TODO: Fix having conflict db names with docker config
-- CREATE DATABASE mis_db
-- WITH ENCODING 'UTF8'
-- LC_COLLATE='ar_AE.utf8' -- لضبط الترتيب باللغة العربية
-- LC_CTYPE='ar_AE.utf8' -- لضبط نوع الأحرف
-- TEMPLATE template0;

-- Set client encoding to UTF-8 for Arabic support
SET client_encoding = 'UTF8';

-- Create ENUMs
CREATE TYPE "identification_type" AS ENUM ('national_id', 'passport');
CREATE TYPE "address_type" AS ENUM ('permanent', 'current');
CREATE TYPE "martial_status" AS ENUM (
    'single', -- اعزب
    'married', -- متزوج
    'married_with_dependents', -- متزوج ويعول
    'divorced', -- مطلق
    'widow', -- أرمل
    'other' -- اخرى
);

-- Create tables with plural names
CREATE TABLE "students" (
    "student_id" SERIAL PRIMARY KEY,
    "full_name_ar" TEXT NOT NULL,
    "full_name_en" TEXT NOT NULL,
    "gender" BOOLEAN NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "nationality" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "phone_no_main" TEXT NOT NULL,
    "phone_no_sec" TEXT,
    "fax" TEXT,
    "id_type" identification_type NOT NULL,
    "id_issuance_date" DATE NOT NULL,
    "id_number" TEXT NOT NULL,
    "id_authority" TEXT NOT NULL,
    "martial_status" martial_status,
    "is_working" BOOLEAN NOT NULL,
    "job_type" TEXT,
    "hashed_password" TEXT NOT NULL,
    "sec_question" TEXT NOT NULL,
    "sec_answer" TEXT NOT NULL,
    "military_status" TEXT NOT NULL,
    "dob" DATE NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "applications" (
    "application_id" SERIAL PRIMARY KEY,
    "student_id" INTEGER NOT NULL,
    "is_admin_accepted" BOOL NOT NULL DEFAULT FALSE,
    FOREIGN KEY ("student_id") REFERENCES "students"("student_id")
);

CREATE TABLE "registerations" (
    -- TODO: Add الترشيح الوزاري
    "registeration_id" SERIAL PRIMARY KEY,
    "application_id" INTEGER UNIQUE NOT NULL,
    "academic_year" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "academic_degree" TEXT NOT NULL,
    "academic_program" TEXT NOT NULL,
    FOREIGN KEY ("application_id") REFERENCES "applications"("application_id")
);

CREATE TABLE "attachments" (
    "attachment_id" SERIAL PRIMARY KEY,
    "application_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "attachment_url" TEXT NOT NULL,
    FOREIGN KEY ("application_id") REFERENCES "applications"("application_id")
);

CREATE TABLE "addresses" (
    "address_id" SERIAL PRIMARY KEY,
    "application_id" INTEGER NOT NULL,
    "house_number" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "type" address_type NOT NULL,
    FOREIGN KEY ("application_id") REFERENCES "applications"("application_id")
);

CREATE TABLE "emergency_contacts" (
    "contact_id" SERIAL PRIMARY KEY,
    "application_id" INTEGER UNIQUE NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone_number" TEXT NOT NULL,
    "email" TEXT,
    FOREIGN KEY ("application_id") REFERENCES "applications"("application_id")
);

CREATE TABLE "academic_qualifications" (
    "qualification_id" SERIAL PRIMARY KEY,
    "application_id" INTEGER UNIQUE NOT NULL,
    "country" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "credit_hours" BOOLEAN NOT NULL,
    "grade" TEXT NOT NULL,
    "gpa" TEXT NOT NULL,
    FOREIGN KEY ("application_id") REFERENCES "applications"("application_id")
);

CREATE TABLE "admins" (
    "admin_id" SERIAL PRIMARY KEY,
    "full_name_ar" TEXT NOT NULL,
    "full_name_en" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    -- "phone_no_main" TEXT NOT NULL,
    -- "phone_no_sec" TEXT,
    -- "fax" TEXT,
    -- "id_type" identification_type NOT NULL,
    -- "id_issuance_date" DATE NOT NULL,
    -- "id_number" TEXT NOT NULL,
    -- "id_authority" TEXT NOT NULL,
    -- "martial_status" martial_status,
    -- "is_working" BOOLEAN NOT NULL,
    -- "job_type" TEXT,
    "hashed_password" TEXT NOT NULL,
    -- "sec_question" TEXT NOT NULL,
    -- "sec_answer" TEXT NOT NULL,
    -- "military_status" TEXT NOT NULL,
    -- "dob" DATE NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create views
CREATE VIEW admin_applications_list
AS
	SELECT a.application_id, s.full_name_ar AS student_name, r.academic_degree, r.academic_program, a.is_admin_accepted
	FROM applications a
	JOIN students s USING(student_id)
	JOIN registerations r USING(application_id);


-- Create indexes for foreign keys
CREATE INDEX "applications_student_id_idx" ON "applications"("student_id");
CREATE INDEX "academic_qualifications_application_id_idx" ON "academic_qualifications"("application_id");

-- Set table and column comments for Arabic support
COMMENT ON TABLE "students" IS 'جدول الطلاب';
COMMENT ON TABLE "registerations" IS 'That''s what the student/alumn want to apply for';
COMMENT ON TABLE "emergency_contacts" IS 'Do I need more than an emergency contact? we use 1 to 1 so far';
COMMENT ON COLUMN "students"."full_name_en" IS 'It''s a composite attribute that includes student name, dad, grandfather, family name';
COMMENT ON COLUMN "students"."full_name_ar" IS 'الاسم الكامل بالعربية';
COMMENT ON COLUMN "students"."nationality" IS 'Should we use an enum, string or a json/another table';
COMMENT ON COLUMN "students"."id_type" IS 'If he''s egyptian, it''ll use national ID, otherwise passport ID';
COMMENT ON COLUMN "students"."id_authority" IS 'The city that issued your id';
COMMENT ON COLUMN "students"."military_status" IS 'A string so far, may use an enum later';
COMMENT ON COLUMN "academic_qualifications"."grade" IS 'Will later make it all a numeric and add a hashmap to conver it to grades if it''s not credit hours (GPA)';


-- Create a trigger for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_students_updated_at
    BEFORE UPDATE ON "students"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at
    BEFORE UPDATE ON "admins"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
