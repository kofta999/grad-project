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

CREATE TYPE "department_type" AS ENUM('diploma', 'master', 'phd');

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
	type department_type NOT NULL,
	courses_hours INT NOT NULL,
	compulsory_hours INT NOT NULL,
	thesis_hours INT NOT NULL
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
	-- TODO: I may not need that as the department has it all
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
	"gpa" REAL NOT NULL,
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
	code TEXT NOT NULL UNIQUE,
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

CREATE TABLE theses (
	thesis_id serial PRIMARY KEY,
	application_id INT NOT NULL UNIQUE,
	attachment_id INT NOT NULL,
	title TEXT NOT NULL,
	FOREIGN key (application_id) REFERENCES applications (application_id),
	FOREIGN key (attachment_id) REFERENCES attachments (attachment_id)
);

-- Create views
CREATE VIEW admin_applications_list AS
SELECT
	a.application_id,
	s.full_name_ar AS student_name,
	d.type as academic_degree,
	-- TODO: Add real dep name
	d.title AS department,
	a.is_admin_accepted
FROM
	applications a
	JOIN students s USING (student_id)
	JOIN registerations r USING (application_id)
	JOIN departments d ON d.department_id = r.department_id;

CREATE OR REPLACE VIEW "accepted_applications" AS
SELECT
    a.application_id,
    a.student_id,
    r.department_id,
    COALESCE(sum(
        CASE
            WHEN c_res.grade >= 60 THEN c.total_hours
            ELSE 0
        END
    ), 0) AS total_completed_hours,
    COALESCE(sum(
        CASE
            WHEN d_c.is_compulsory = TRUE
            AND c_res.grade >= 60 THEN c.total_hours
            ELSE 0
        END
    ), 0) AS completed_compulsory_hours
FROM
    applications a
    JOIN registerations r ON r.application_id = a.application_id
    LEFT JOIN course_registrations c_reg ON c_reg.application_id = a.application_id
    LEFT JOIN course_results c_res ON c_res.course_registration_id = c_reg.course_registration_id
    LEFT JOIN courses c ON c.course_id = c_reg.course_id
    LEFT JOIN department_courses d_c ON d_c.course_id = c_reg.course_id
        AND d_c.department_id = r.department_id
WHERE
    a.is_admin_accepted = TRUE
GROUP BY
    a.application_id,
    r.department_id;

-- WHERE it using
-- c_r.academic_year_id, c_r.semester, c_r.application_id
CREATE OR REPLACE VIEW detailed_course_registrations_view AS
SELECT
	c.course_id,
	c.code,
	c.title,
	c.prerequisite,
	c.total_hours,
	c_r.academic_year_id,
	c_r.semester,
	c_res.grade,
	c_r.application_id,
	c_r.course_registration_id
FROM
	course_registrations c_r
	JOIN department_courses d_c ON d_c.course_id = c_r.course_id
	JOIN courses c ON c.course_id = c_r.course_id
	JOIN registerations r ON r.application_id = c_r.application_id
	LEFT JOIN course_results c_res ON c_res.course_registration_id = c_r.course_registration_id
WHERE
	-- c_r.academic_year_id = get_current_academic_year ()
	d_c.department_id = r.department_id;

-- -- Need to WHERE with application_id
-- CREATE VIEW "available_courses_for_application" AS
-- SELECT
-- 	c.course_id,
-- 	c.code,
-- 	c.title,
-- 	c.prerequisite,
-- 	c.total_hours
-- FROM
-- 	accepted_applications a
-- 	JOIN registerations r ON r.application_id = a.application_id
-- 	JOIN department_courses d_c ON d_c.department_id = r.department_id
-- 	JOIN courses c ON c.course_id = d_c.course_id
-- WHERE
-- 	r.academic_year_id = get_current_academic_year ();
-- -- TODO: Should be by semester
-- CREATE VIEW "courses_registered_for_application" AS
-- SELECT
-- 	c.course_id,
-- 	c.code,
-- 	c.title,
-- 	c.prerequisite,
-- 	c.total_hours
-- FROM
-- 	course_registrations c_r
-- 	JOIN department_courses d_c ON d_c.course_id = c_r.course_id
-- 	JOIN courses c ON c.course_id = c_r.course_id
-- 	JOIN registerations r ON r.application_id = c_r.application_id
-- WHERE
-- 	c_r.academic_year_id = get_current_academic_year ()
-- 	AND d_c.department_id = r.department_id;
--
CREATE OR REPLACE function available_courses_for_application(p_application_id INT)
RETURNS TABLE (
    course_id INT,
    code TEXT,
    title TEXT,
    prerequisite INT,
    total_hours INT,
    course_registration_id INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.course_id,
        c.code,
        c.title,
        c.prerequisite,
        c.total_hours,
        c_r.course_registration_id
    FROM
        accepted_applications a
        JOIN registerations r ON r.application_id = a.application_id
        JOIN department_courses d_c ON d_c.department_id = r.department_id
        JOIN courses c ON c.course_id = d_c.course_id
        LEFT JOIN course_registrations c_r ON
            c_r.course_id = c.course_id
            AND c_r.application_id = a.application_id
            AND c_r.academic_year_id = get_current_academic_year()
        LEFT JOIN course_results c_res ON
            c_res.course_registration_id = c_r.course_registration_id
    WHERE
        r.academic_year_id = get_current_academic_year()
        AND a.application_id = p_application_id
        AND c_res.course_registration_id IS NULL;  -- Only include rows without a grade entry
END;
$$ language plpgsql;

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

CREATE
OR REPLACE function is_thesis_available (p_application_id INT) returns BOOLEAN language plpgsql AS $$
DECLARE
    v_department_id INT;
    v_required_hours INT;
    v_required_compulsory_hours INT;
    v_completed_compulsory_hours INT = 0;
    v_completed_hours INT = 0;
BEGIN
    -- First check if this is an accepted application
    IF NOT EXISTS (
        SELECT 1 FROM accepted_applications
        WHERE application_id = p_application_id
    ) THEN
	    RAISE EXCEPTION 'Application ID % is not found or not accepted', p_application_id;
	END IF;

    -- Get application data
    SELECT
        department_id,
        total_completed_hours,
        completed_compulsory_hours
    INTO
        v_department_id,
        v_completed_hours,
        v_completed_compulsory_hours
    FROM
        accepted_applications a
    WHERE
        a.application_id = p_application_id;

    -- Get department requirements
    SELECT
        courses_hours,
        compulsory_hours
    INTO
        v_required_hours,
        v_required_compulsory_hours
    FROM
        departments
    WHERE
        department_id = v_department_id;

	-- Check compulsory hours requirement
    IF COALESCE(v_completed_compulsory_hours, 0) < v_required_compulsory_hours THEN
        RAISE EXCEPTION 'Completed compulsory hours (%) is less than required compulsory hours (%) for thesis submission',
            v_completed_compulsory_hours, v_required_compulsory_hours;
    END IF;

    -- Check total hours requirement
    IF COALESCE(v_completed_hours, 0) < v_required_hours THEN
        RAISE EXCEPTION 'Completed hours (%) is less than required hours (%) for thesis submission',
            v_completed_hours, v_required_hours;
    END IF;

    RETURN TRUE;
END;
$$;

-- Create indexes for foreign keys
CREATE INDEX "applications_student_id_idx" ON "applications" ("student_id");

CREATE INDEX "academic_qualifications_application_id_idx" ON "academic_qualifications" ("application_id");

-- For registerations table
CREATE INDEX idx_registerations_application_id ON registerations (application_id);

CREATE INDEX idx_registerations_academic_year_id ON registerations (academic_year_id);

CREATE INDEX idx_registerations_department_id ON registerations (department_id);

-- For attachments table
CREATE INDEX idx_attachments_application_id ON attachments (application_id);

-- For addresses table
CREATE INDEX idx_addresses_application_id ON addresses (application_id);

-- For emergency_contacts table
-- (application_id already has UNIQUE constraint which creates an index)
-- For academic_qualifications table
-- (application_id already has UNIQUE constraint which creates an index)
-- For department_courses table
-- (Both columns are part of the PRIMARY KEY, which creates an index)
-- For course_registrations table
CREATE INDEX idx_course_registrations_course_id ON course_registrations (course_id);

CREATE INDEX idx_course_registrations_application_id ON course_registrations (application_id);

CREATE INDEX idx_course_registrations_academic_year_id ON course_registrations (academic_year_id);

-- Composite index for queries filtering by both semester and application_id
CREATE INDEX idx_course_registrations_app_semester ON course_registrations (application_id, semester);

-- For course_results table
CREATE INDEX idx_course_results_course_registration_id ON course_results (course_registration_id);

-- Index to help with queries that check for passing grades
CREATE INDEX idx_course_results_grade ON course_results (grade);

-- For courses table
-- (prerequisite field is queried in the register_course procedure)
CREATE INDEX idx_courses_prerequisite ON courses (prerequisite);

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

comment ON COLUMN "academic_qualifications"."grade" IS 'Will later make it all a numeric and add a hashmap to convert it to grades if it''s not credit hours (GPA)';

comment ON COLUMN "departments"."courses_hours" IS 'Is the hours required to complete before being able to submit a thesis';

comment ON COLUMN "departments"."compulsory_hours" IS 'Is the hours that must be registered from the compulsory courses, non-compulsory ones is courses_hours - this';

comment ON COLUMN "departments"."thesis_hours" IS 'Is the hours that doing thesis gives you';

-- Triggers
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

CREATE
OR REPLACE function thesis_availability_trigger () returns trigger language plpgsql AS $$
BEGIN
    PERFORM is_thesis_available(NEW.application_id);

    RETURN NEW;
END;
$$;

CREATE TRIGGER check_thesis_availability before insert ON theses FOR each ROW
EXECUTE function thesis_availability_trigger ();

CREATE
OR REPLACE function check_course_availability () returns trigger language plpgsql AS $$
DECLARE
    v_prerequisite INT;
    v_total_hours INT;
    v_course_hours INT;
    v_department_id INT;
    v_max_hours INT := 16; -- The maximum allowed hours per semester is 16
BEGIN

	-- Check if the application is accepted
	IF NOT EXISTS (
		SELECT 1
		FROM applications
		WHERE application_id = NEW.application_id AND is_admin_accepted = TRUE
	) THEN
		RAISE EXCEPTION 'Application is not yet accepted';
	END IF;

    -- Check if the course is already registered
    IF EXISTS (
        SELECT 1
        FROM course_registrations
        WHERE application_id = NEW.application_id
          AND course_id = NEW.course_id
          AND semester = NEW.semester
    ) THEN
        RAISE EXCEPTION 'Course is already registered for this application and semester';
    END IF;

    -- Check if the course has a prerequisite
    SELECT prerequisite INTO v_prerequisite
    FROM courses
    WHERE course_id = NEW.course_id;

    IF v_prerequisite IS NOT NULL THEN
        -- Check if the prerequisite course is completed
        IF NOT EXISTS (
            SELECT 1
            FROM course_registrations cr
            JOIN course_results crs ON cr.course_registration_id = crs.course_registration_id
            WHERE cr.application_id = NEW.application_id
              AND cr.course_id = v_prerequisite
              AND crs.grade >= 60 -- Assuming a passing grade is 60
        ) THEN
			-- TODO: Add which prerequisite course is it
            RAISE EXCEPTION 'Prerequisite course is not completed';
        END IF;
    END IF;

    -- Check if total hours + course hours is less than max hours for this semester
    SELECT SUM(c.total_hours) INTO v_total_hours
    FROM course_registrations cr
    JOIN courses c ON cr.course_id = c.course_id
    WHERE cr.application_id = NEW.application_id
      AND cr.semester = NEW.semester;

    SELECT total_hours INTO v_course_hours
    FROM courses
    WHERE course_id = NEW.course_id;

    IF (COALESCE(v_total_hours, 0) + v_course_hours) > v_max_hours THEN
        RAISE EXCEPTION 'Total hours exceed the maximum allowed hours for this semester';
    END IF;


    -- Check if the course is available for applicant's department
    SELECT department_id INTO v_department_id
    FROM registerations
    WHERE application_id = NEW.application_id;

    IF NOT EXISTS (
        SELECT 1
        FROM department_courses
        WHERE department_id = v_department_id
          AND course_id = NEW.course_id
    ) THEN
        RAISE EXCEPTION 'This course is not available for this academic program';
    END IF;

    -- Check if passed before or not
	IF EXISTS (
	   SELECT 1
		FROM course_results
		JOIN course_registrations USING (course_registration_id)
		WHERE course_registrations.course_id = NEW.course_id
		AND course_registrations.application_id = NEW.application_id
		-- Assume passing grade is 60
		AND grade >= 60
	) THEN
	   RAISE EXCEPTION 'Course is already passed before';
	END IF;

	-- Check if the course is registered before or not
	IF EXISTS (
	   SELECT 1
		FROM course_registrations
		WHERE course_registrations.course_id = NEW.course_id
		AND course_registrations.application_id = NEW.application_id
	) THEN
	   RAISE EXCEPTION 'Course is already registered in a previous semester';
	END IF;

	NEW.academic_year_id = get_current_academic_year();


	RETURN NEW;
    -- Insert into course_registrations
    -- INSERT INTO course_registrations (course_id, application_id, semester, academic_year_id)
    -- VALUES (NEW.course_id, NEW.application_id, NEW.semester, get_current_academic_year());

    -- RAISE NOTICE 'Course registered successfully';
END;
$$;

CREATE TRIGGER register_course_trigger before insert ON course_registrations FOR each ROW
EXECUTE function check_course_availability ();

CREATE TABLE "reports" (
    "report_id" serial PRIMARY KEY,
    "application_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "attachment_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("application_id") REFERENCES "applications" ("application_id"),
    FOREIGN KEY ("attachment_id") REFERENCES "attachments" ("attachment_id")
);
