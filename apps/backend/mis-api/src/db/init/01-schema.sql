-- TODO: Fix having conflict db names with docker config
-- CREATE DATABASE mis_db
-- WITH ENCODING 'UTF8'
-- LC_COLLATE='ar_AE.utf8' -- لضبط الترتيب باللغة العربية
-- LC_CTYPE='ar_AE.utf8' -- لضبط نوع الأحرف
-- LC_TIME = 'en_US.UTF-8' -- لضبط شكل التاريخ والوقت
-- TEMPLATE template0;
-- Set client encoding to UTF-8 for Arabic support
SET
	client_encoding = 'UTF8';

-- Create ENUMs
CREATE TYPE "identification_type" AS ENUM('national_id', 'passport');

CREATE TYPE "address_type" AS ENUM('permanent', 'current');

CREATE TYPE "martial_status" AS ENUM(
	'single', -- اعزب
	'married', -- متزوج
	'married_with_dependents', -- متزوج ويعول
	'divorced', -- مطلق
	'widow', -- أرمل
	'other' -- اخرى
);

CREATE TYPE "department_type" AS ENUM('diploma', 'masters', 'phd');

CREATE TYPE "semester_type" AS ENUM('first', 'second', 'third');

CREATE TABLE academic_years (
	academic_year_id serial PRIMARY KEY,
	start_date date NOT NULL,
	end_date date NOT NULL
);

CREATE TABLE departments (
	department_id serial PRIMARY KEY,
	code TEXT NOT NULL,
	title TEXT NOT NULL,
	type department_type NOT NULL
);

-- Create tables with plural names
CREATE TABLE "students" (
	"student_id" serial PRIMARY KEY,
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
	"id_issuance_date" date NOT NULL,
	"id_number" TEXT NOT NULL,
	"id_authority" TEXT NOT NULL,
	"martial_status" martial_status,
	"is_working" BOOLEAN NOT NULL,
	"job_type" TEXT,
	"hashed_password" TEXT NOT NULL,
	"sec_question" TEXT NOT NULL,
	"sec_answer" TEXT NOT NULL,
	"military_status" TEXT NOT NULL,
	"dob" date NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "applications" (
	"application_id" serial PRIMARY KEY,
	"student_id" INTEGER NOT NULL,
	"is_admin_accepted" BOOL NOT NULL DEFAULT FALSE,
	FOREIGN key ("student_id") REFERENCES "students" ("student_id")
);

CREATE TABLE "registerations" (
	-- TODO: Add الترشيح الوزاري
	"registeration_id" serial PRIMARY KEY,
	"application_id" INTEGER UNIQUE NOT NULL,
	"academic_year_id" INT NOT NULL,
	"faculty" TEXT NOT NULL,
	"academic_degree" department_type NOT NULL,
	-- academic_program = department
	"department_id" INT NOT NULL,
	FOREIGN key ("application_id") REFERENCES "applications" ("application_id"),
	FOREIGN key ("academic_year_id") REFERENCES "academic_years" ("academic_year_id"),
	FOREIGN key ("department_id") REFERENCES "departments" ("department_id")
);

CREATE TABLE "attachments" (
	"attachment_id" serial PRIMARY KEY,
	"application_id" INTEGER NOT NULL,
	"type" TEXT NOT NULL,
	"attachment_url" TEXT NOT NULL,
	FOREIGN key ("application_id") REFERENCES "applications" ("application_id")
);

CREATE TABLE "addresses" (
	"address_id" serial PRIMARY KEY,
	"application_id" INTEGER NOT NULL,
	"full_address" TEXT NOT NULL,
	"country" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"type" address_type NOT NULL,
	FOREIGN key ("application_id") REFERENCES "applications" ("application_id")
);

CREATE TABLE "emergency_contacts" (
	"contact_id" serial PRIMARY KEY,
	"application_id" INTEGER UNIQUE NOT NULL,
	"name" TEXT NOT NULL,
	"address" TEXT,
	"phone_number" TEXT NOT NULL,
	"email" TEXT,
	FOREIGN key ("application_id") REFERENCES "applications" ("application_id")
);

CREATE TABLE "academic_qualifications" (
	"qualification_id" serial PRIMARY KEY,
	"application_id" INTEGER UNIQUE NOT NULL,
	"country" TEXT NOT NULL,
	"university" TEXT NOT NULL,
	"faculty" TEXT NOT NULL,
	"type" TEXT NOT NULL,
	"qualification" TEXT NOT NULL,
	"specialization" TEXT NOT NULL,
	"year" TEXT NOT NULL,
	"date" date NOT NULL,
	"credit_hours" BOOLEAN NOT NULL,
	"grade" TEXT NOT NULL,
	"gpa" TEXT NOT NULL,
	FOREIGN key ("application_id") REFERENCES "applications" ("application_id")
);

CREATE TABLE "admins" (
	"admin_id" serial PRIMARY KEY,
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

CREATE TABLE courses (
	course_id serial PRIMARY KEY,
	-- Probably has a definite length but eh
	code TEXT NOT NULL,
	title TEXT NOT NULL,
	-- Refers to a prerequisite course
	prerequisite INT DEFAULT NULL,
	total_hours INT
);

CREATE TABLE department_courses (
	course_id INT NOT NULL,
	department_id INT NOT NULL,
	is_compulsory BOOLEAN NOT NULL,
	FOREIGN key (course_id) REFERENCES courses (course_id),
	FOREIGN key (department_id) REFERENCES departments (department_id),
	PRIMARY KEY (course_id, department_id) -- Composite primary key
);

CREATE TABLE course_registrations (
	course_registration_id serial PRIMARY KEY,
	course_id INT NOT NULL,
	application_id INT NOT NULL,
	semester semester_type NOT NULL,
	-- May create a table for that later but lets leave it like that for now
	academic_year_id INT NOT NULL,
	-- May add a status (registered | completed | withdrawn) field
	FOREIGN key (course_id) REFERENCES courses (course_id),
	FOREIGN key (application_id) REFERENCES applications (application_id),
	FOREIGN key (academic_year_id) REFERENCES academic_years (academic_year_id)
);

CREATE TABLE course_results (
	result_id serial PRIMARY KEY,
	course_registration_id INT NOT NULL,
	grade INT NOT NULL,
	-- May add something like a computed property for (failed | passed)
	FOREIGN key (course_registration_id) REFERENCES course_registrations (course_registration_id)
);

-- Create views
CREATE VIEW admin_applications_list AS
SELECT
	a.application_id,
	s.full_name_ar AS student_name,
	r.academic_degree,
	-- TODO: Add real dep name
	d.title AS department,
	a.is_admin_accepted
FROM
	applications a
	JOIN students s USING (student_id)
	JOIN registerations r USING (application_id)
	JOIN departments d ON d.department_id = r.department_id;

CREATE VIEW "accepted_applications" AS
SELECT
	application_id,
	student_id
FROM
	applications
WHERE
	is_admin_accepted = TRUE;

-- Need to WHERE with application_id
CREATE VIEW "available_courses_for_application" AS
SELECT
	c.course_id,
	c.code,
	c.title,
	c.prerequisite,
	c.total_hours
FROM
	accepted_applications a
	JOIN registerations r ON r.application_id = a.application_id
	JOIN department_courses d_c ON d_c.department_id = r.department_id
	JOIN courses c ON c.course_id = d_c.course_id
WHERE
	r.academic_year_id = get_current_academic_year ();

-- TODO: Should be by semester
CREATE VIEW "courses_registered_for_application" AS
SELECT
	c.course_id,
	c.code,
	c.title,
	c.prerequisite,
	c.total_hours
FROM
	course_registrations c_r
	JOIN department_courses d_c ON d_c.course_id = c_r.course_id
	JOIN courses c ON c.course_id = c_r.course_id
	JOIN registerations r ON r.application_id = c_r.application_id
WHERE
	c_r.academic_year_id = get_current_academic_year ()
	AND d_c.department_id = r.department_id;

-- Create functions
CREATE FUNCTION get_current_academic_year () returns INT AS $$
DECLARE
    current_date DATE := CURRENT_DATE;
    current_year_id INT;
BEGIN
    SELECT academic_year_id INTO current_year_id
    FROM academic_years
    WHERE current_date BETWEEN start_date AND end_date;

    RETURN current_year_id;
END;
$$ language plpgsql;

-- Create indexes for foreign keys
CREATE INDEX "applications_student_id_idx" ON "applications" ("student_id");

CREATE INDEX "academic_qualifications_application_id_idx" ON "academic_qualifications" ("application_id");

-- Set table and column comments for Arabic support
comment ON TABLE "students" IS 'جدول الطلاب';

comment ON TABLE "registerations" IS 'That''s what the student/alumn want to apply for';

comment ON TABLE "emergency_contacts" IS 'Do I need more than an emergency contact? we use 1 to 1 so far';

comment ON COLUMN "students"."full_name_en" IS 'It''s a composite attribute that includes student name, dad, grandfather, family name';

comment ON COLUMN "students"."gender" IS 'True is male, false is female';

comment ON COLUMN "students"."full_name_ar" IS 'الاسم الكامل بالعربية';

comment ON COLUMN "students"."nationality" IS 'Should we use an enum, string or a json/another table';

comment ON COLUMN "students"."id_type" IS 'If he''s egyptian, it''ll use national ID, otherwise passport ID';

comment ON COLUMN "students"."id_authority" IS 'The city that issued your id';

comment ON COLUMN "students"."military_status" IS 'A string so far, may use an enum later';

comment ON COLUMN "academic_qualifications"."grade" IS 'Will later make it all a numeric and add a hashmap to conver it to grades if it''s not credit hours (GPA)';

-- Create a trigger for updated_at timestamps
CREATE
OR REPLACE function update_updated_at_column () returns trigger AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_students_updated_at before
UPDATE ON "students" FOR each ROW
EXECUTE function update_updated_at_column ();

CREATE TRIGGER update_students_updated_at before
UPDATE ON "admins" FOR each ROW
EXECUTE function update_updated_at_column ();
