-- TODO: Fix having conflict db names with docker config
-- CREATE DATABASE mis_db
-- WITH ENCODING 'UTF8'
-- LC_COLLATE='ar_AE.utf8' -- لضبط الترتيب باللغة العربية
-- LC_CTYPE='ar_AE.utf8' -- لضبط نوع الأحرف
-- LC_TIME = 'en_US.UTF-8' -- لضبط شكل التاريخ والوقت
-- TEMPLATE template0;
-- Set client encoding to UTF-8 for Arabic support
SET client_encoding = 'UTF8';

-- Create schemas for different parts of the application
CREATE SCHEMA IF NOT EXISTS common;     -- For common types and shared tables
CREATE SCHEMA IF NOT EXISTS students;   -- For student-related tables
CREATE SCHEMA IF NOT EXISTS academic;   -- For academic structures
CREATE SCHEMA IF NOT EXISTS courses;    -- For course-related tables
CREATE SCHEMA IF NOT EXISTS admin;      -- For administration tables
CREATE SCHEMA IF NOT EXISTS thesis;     -- For thesis-related tables

-- Create ENUMs in common schema
CREATE TYPE common.identification_type AS ENUM('national_id', 'passport');
CREATE TYPE common.address_type AS ENUM('permanent', 'current');
CREATE TYPE common.martial_status AS ENUM(
	'single', -- اعزب
	'married', -- متزوج
	'married_with_dependents', -- متزوج ويعول
	'divorced', -- مطلق
	'widow', -- أرمل
	'other' -- اخرى
);
CREATE TYPE common.department_type AS ENUM('diploma', 'master', 'phd');
CREATE TYPE common.semester_type AS ENUM('first', 'second', 'third');

-- Academic structure tables
CREATE TABLE academic.academic_years (
	academic_year_id serial PRIMARY KEY,
	start_date date NOT NULL,
	end_date date NOT NULL
);

CREATE TABLE academic.departments (
	department_id serial PRIMARY KEY,
	code TEXT NOT NULL,
	title TEXT NOT NULL,
	type common.department_type NOT NULL,
	courses_hours INT NOT NULL,
	compulsory_hours INT NOT NULL,
	thesis_hours INT NOT NULL
);

-- Student-related tables
CREATE TABLE students.students (
	student_id serial PRIMARY KEY,
	full_name_ar TEXT NOT NULL,
	full_name_en TEXT NOT NULL,
	gender BOOLEAN NOT NULL,
	email TEXT NOT NULL UNIQUE,
	nationality TEXT NOT NULL,
	image_url TEXT NOT NULL,
	phone_no_main TEXT NOT NULL,
	phone_no_sec TEXT,
	fax TEXT,
	id_type common.identification_type NOT NULL,
	id_issuance_date date NOT NULL,
	id_number TEXT NOT NULL,
	id_authority TEXT NOT NULL,
	martial_status common.martial_status,
	is_working BOOLEAN NOT NULL,
	job_type TEXT,
	hashed_password TEXT NOT NULL,
	sec_question TEXT NOT NULL,
	sec_answer TEXT NOT NULL,
	military_status TEXT NOT NULL,
	dob date NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students.applications (
	application_id serial PRIMARY KEY,
	student_id INTEGER NOT NULL,
	is_admin_accepted BOOL NOT NULL DEFAULT FALSE,
	FOREIGN key (student_id) REFERENCES students.students (student_id)
);

CREATE TABLE students.registerations (
	-- TODO: Add الترشيح الوزاري
	registeration_id serial PRIMARY KEY,
	application_id INTEGER UNIQUE NOT NULL,
	academic_year_id INT NOT NULL,
	faculty TEXT NOT NULL,
	-- TODO: I may not need that as the department has it all
	academic_degree common.department_type NOT NULL,
	-- academic_program = department
	department_id INT NOT NULL,
	FOREIGN key (application_id) REFERENCES students.applications (application_id),
	FOREIGN key (academic_year_id) REFERENCES academic.academic_years (academic_year_id),
	FOREIGN key (department_id) REFERENCES academic.departments (department_id)
);

CREATE TABLE students.attachments (
	attachment_id serial PRIMARY KEY,
	application_id INTEGER NOT NULL,
	type TEXT NOT NULL,
	attachment_url TEXT NOT NULL,
	FOREIGN key (application_id) REFERENCES students.applications (application_id)
);

CREATE TABLE students.addresses (
	address_id serial PRIMARY KEY,
	application_id INTEGER NOT NULL,
	full_address TEXT NOT NULL,
	country TEXT NOT NULL,
	city TEXT NOT NULL,
	type common.address_type NOT NULL,
	FOREIGN key (application_id) REFERENCES students.applications (application_id)
);

CREATE TABLE students.emergency_contacts (
	contact_id serial PRIMARY KEY,
	application_id INTEGER UNIQUE NOT NULL,
	name TEXT NOT NULL,
	address TEXT,
	phone_number TEXT NOT NULL,
	email TEXT,
	FOREIGN key (application_id) REFERENCES students.applications (application_id)
);

CREATE TABLE students.academic_qualifications (
	qualification_id serial PRIMARY KEY,
	application_id INTEGER UNIQUE NOT NULL,
	country TEXT NOT NULL,
	university TEXT NOT NULL,
	faculty TEXT NOT NULL,
	type TEXT NOT NULL,
	qualification TEXT NOT NULL,
	specialization TEXT NOT NULL,
	year TEXT NOT NULL,
	date date NOT NULL,
	credit_hours BOOLEAN NOT NULL,
	grade TEXT NOT NULL,
	gpa REAL NOT NULL,
	FOREIGN key (application_id) REFERENCES students.applications (application_id)
);

-- Admin tables
CREATE TABLE admin.admins (
	admin_id serial PRIMARY KEY,
	full_name_ar TEXT NOT NULL,
	full_name_en TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
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
	hashed_password TEXT NOT NULL,
	-- "sec_question" TEXT NOT NULL,
	-- "sec_answer" TEXT NOT NULL,
	-- "military_status" TEXT NOT NULL,
	-- "dob" DATE NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Course-related tables
CREATE TABLE courses.courses (
	course_id serial PRIMARY KEY,
	-- Probably has a definite length but eh
	code TEXT NOT NULL UNIQUE,
	title TEXT NOT NULL,
	-- Refers to a prerequisite course
	prerequisite INT DEFAULT NULL,
	total_hours INT
);

CREATE TABLE courses.department_courses (
	course_id INT NOT NULL,
	department_id INT NOT NULL,
	is_compulsory BOOLEAN NOT NULL,
	FOREIGN key (course_id) REFERENCES courses.courses (course_id),
	FOREIGN key (department_id) REFERENCES academic.departments (department_id),
	PRIMARY KEY (course_id, department_id) -- Composite primary key
);

CREATE TABLE courses.course_registrations (
	course_registration_id serial PRIMARY KEY,
	course_id INT NOT NULL,
	application_id INT NOT NULL,
	semester common.semester_type NOT NULL,
	-- May create a table for that later but lets leave it like that for now
	academic_year_id INT NOT NULL,
	-- May add a status (registered | completed | withdrawn) field
	FOREIGN key (course_id) REFERENCES courses.courses (course_id),
	FOREIGN key (application_id) REFERENCES students.applications (application_id),
	FOREIGN key (academic_year_id) REFERENCES academic.academic_years (academic_year_id)
);

CREATE TABLE courses.course_results (
	result_id serial PRIMARY KEY,
	course_registration_id INT NOT NULL,
	grade INT NOT NULL,
	-- May add something like a computed property for (failed | passed)
	FOREIGN key (course_registration_id) REFERENCES courses.course_registrations (course_registration_id)
);

-- Thesis tables
CREATE TABLE thesis.theses (
	thesis_id serial PRIMARY KEY,
	application_id INT NOT NULL UNIQUE,
	attachment_id INT NOT NULL,
	title TEXT NOT NULL,
	FOREIGN key (application_id) REFERENCES students.applications (application_id),
	FOREIGN key (attachment_id) REFERENCES students.attachments (attachment_id)
);

-- Create views in the appropriate schemas
CREATE OR REPLACE VIEW admin.applications_list AS
SELECT
	a.application_id,
	s.full_name_ar AS student_name,
	r.academic_degree,
	-- TODO: Add real dep name
	d.title AS department,
	a.is_admin_accepted
FROM
	students.applications a
	JOIN students.students s ON s.student_id = a.student_id
	JOIN students.registerations r ON r.application_id = a.application_id
	JOIN academic.departments d ON d.department_id = r.department_id;

CREATE OR REPLACE VIEW academic.accepted_applications AS
SELECT
	a.application_id,
	a.student_id,
	r.department_id,
	sum(c.total_hours) AS total_completed_hours,
	sum(
		CASE
			WHEN d_c.is_compulsory = TRUE THEN c.total_hours
			ELSE 0
		END
	) AS completed_compulsory_hours
FROM
	students.applications a
	JOIN students.registerations r ON r.application_id = a.application_id
	JOIN courses.course_registrations c_reg ON c_reg.application_id = a.application_id
	JOIN courses.course_results c_res ON c_res.course_registration_id = c_reg.course_registration_id
	JOIN courses.courses c ON c.course_id = c_reg.course_id
	JOIN courses.department_courses d_c ON d_c.course_id = c_reg.course_id
	AND d_c.department_id = r.department_id
WHERE
	a.is_admin_accepted = TRUE
	AND c_res.grade >= 50
GROUP BY
	a.application_id,
	r.department_id;

-- WHERE it using
-- c_r.academic_year_id, c_r.semester, c_r.application_id
CREATE OR REPLACE VIEW courses.detailed_course_registrations_view AS
SELECT
	c.course_id,
	c.code,
	c.title,
	c.prerequisite,
	c.total_hours,
	c_r.academic_year_id,
	c_r.semester,
	c_r.application_id,
	c_r.course_registration_id
FROM
	courses.course_registrations c_r
	JOIN courses.department_courses d_c ON d_c.course_id = c_r.course_id
	JOIN courses.courses c ON c.course_id = c_r.course_id
	JOIN students.registerations r ON r.application_id = c_r.application_id
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
CREATE OR REPLACE FUNCTION courses.available_courses_for_application(p_application_id INT) 
RETURNS SETOF courses.courses AS $$
BEGIN
				RETURN QUERY
				SELECT
								c.course_id,
								c.code,
								c.title,
								c.prerequisite,
								c.total_hours
				FROM
								academic.accepted_applications a
								JOIN students.registerations r ON r.application_id = a.application_id
								JOIN courses.department_courses d_c ON d_c.department_id = r.department_id
								JOIN courses.courses c ON c.course_id = d_c.course_id
				WHERE
								r.academic_year_id = academic.get_current_academic_year()
								AND a.application_id = p_application_id;
END;
$$ LANGUAGE plpgsql;

-- Create functions in appropriate schemas
CREATE OR REPLACE FUNCTION academic.get_current_academic_year() 
RETURNS INT AS $$
DECLARE
				current_date DATE := CURRENT_DATE;
				current_year_id INT;
BEGIN
				SELECT academic_year_id INTO current_year_id
				FROM academic.academic_years
				WHERE current_date BETWEEN start_date AND end_date;

				RETURN current_year_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION thesis.is_thesis_available(p_application_id INT) 
RETURNS BOOLEAN AS $$
DECLARE
				v_department_id INT;
				v_required_hours INT;
				v_required_compulsory_hours INT;
				v_completed_compulsory_hours INT = 0;
				v_completed_hours INT = 0;
BEGIN
				-- First check if this is an accepted application
				IF NOT EXISTS (
								SELECT 1 FROM academic.accepted_applications
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
								academic.accepted_applications a
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
								academic.departments
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
$$ LANGUAGE plpgsql;

-- Procedures
CREATE OR REPLACE PROCEDURE courses.register_course(
	p_application_id INT,
	p_course_id INT,
	p_semester common.semester_type
) AS $$
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
		FROM academic.accepted_applications
		WHERE application_id = p_application_id
	) THEN
		RAISE EXCEPTION 'Application is not yet accepted';
	END IF;

				-- Check if the course is already registered
				IF EXISTS (
								SELECT 1
								FROM courses.course_registrations
								WHERE application_id = p_application_id
										AND course_id = p_course_id
										AND semester = p_semester
				) THEN
								RAISE EXCEPTION 'Course is already registered for this application and semester';
				END IF;

				-- Check if the course has a prerequisite
				SELECT prerequisite INTO v_prerequisite
				FROM courses.courses
				WHERE course_id = p_course_id;

				IF v_prerequisite IS NOT NULL THEN
								-- Check if the prerequisite course is completed
								IF NOT EXISTS (
												SELECT 1
												FROM courses.course_registrations cr
												JOIN courses.course_results crs ON cr.course_registration_id = crs.course_registration_id
												WHERE cr.application_id = p_application_id
														AND cr.course_id = v_prerequisite
														AND crs.grade >= 50 -- Assuming a passing grade is 50
								) THEN
			-- TODO: Add which prerequisite course is it
												RAISE EXCEPTION 'Prerequisite course is not completed';
								END IF;
				END IF;

				-- Check if total hours + course hours is less than max hours for this semester
				SELECT SUM(c.total_hours) INTO v_total_hours
				FROM courses.course_registrations cr
				JOIN courses.courses c ON cr.course_id = c.course_id
				WHERE cr.application_id = p_application_id
						AND cr.semester = p_semester;

				SELECT total_hours INTO v_course_hours
				FROM courses.courses
				WHERE course_id = p_course_id;

				IF (COALESCE(v_total_hours, 0) + v_course_hours) > v_max_hours THEN
								RAISE EXCEPTION 'Total hours exceed the maximum allowed hours for this semester';
				END IF;


				-- Check if the course is available for applicant's department
				SELECT department_id INTO v_department_id
				FROM students.registerations
				WHERE application_id = p_application_id;

				IF NOT EXISTS (
								SELECT 1
								FROM courses.department_courses
								WHERE department_id = v_department_id
										AND course_id = p_course_id
				) THEN
								RAISE EXCEPTION 'This course is not available for this academic program';
				END IF;

				-- Check if passed before or not
	IF EXISTS (
				SELECT 1
		FROM courses.course_results
		JOIN courses.course_registrations USING (course_registration_id)
		WHERE courses.course_registrations.course_id = p_course_id
		AND courses.course_registrations.application_id = p_application_id
		-- Assume passing grade is 50
		AND grade >= 50
	) THEN
				RAISE WARNING 'Course is already passed before';
	END IF;

	-- Check if the course is registered before or not
	IF EXISTS (
				SELECT 1
		FROM courses.course_registrations
		WHERE courses.course_registrations.course_id = p_course_id
		AND courses.course_registrations.application_id = p_application_id
	) THEN
				RAISE WARNING 'Course is already registered in a previous semester';
	END IF;


				-- Insert into course_registrations
				INSERT INTO courses.course_registrations (course_id, application_id, semester, academic_year_id)
				VALUES (p_course_id, p_application_id, p_semester, academic.get_current_academic_year());

				RAISE NOTICE 'Course registered successfully';
END;
$$ LANGUAGE plpgsql;

-- Create indexes for foreign keys
CREATE INDEX idx_applications_student_id ON students.applications (student_id);
CREATE INDEX idx_academic_qualifications_application_id ON students.academic_qualifications (application_id);

-- For registerations table
CREATE INDEX idx_registerations_application_id ON students.registerations (application_id);
CREATE INDEX idx_registerations_academic_year_id ON students.registerations (academic_year_id);
CREATE INDEX idx_registerations_department_id ON students.registerations (department_id);

-- For attachments table
CREATE INDEX idx_attachments_application_id ON students.attachments (application_id);

-- For addresses table
CREATE INDEX idx_addresses_application_id ON students.addresses (application_id);

-- For emergency_contacts table
-- (application_id already has UNIQUE constraint which creates an index)
-- For academic_qualifications table
-- (application_id already has UNIQUE constraint which creates an index)
-- For department_courses table
-- (Both columns are part of the PRIMARY KEY, which creates an index)
-- For course_registrations table
CREATE INDEX idx_course_registrations_course_id ON courses.course_registrations (course_id);
CREATE INDEX idx_course_registrations_application_id ON courses.course_registrations (application_id);
CREATE INDEX idx_course_registrations_academic_year_id ON courses.course_registrations (academic_year_id);

-- Composite index for queries filtering by both semester and application_id
CREATE INDEX idx_course_registrations_app_semester ON courses.course_registrations (application_id, semester);

-- For course_results table
CREATE INDEX idx_course_results_course_registration_id ON courses.course_results (course_registration_id);

-- Index to help with queries that check for passing grades
CREATE INDEX idx_course_results_grade ON courses.course_results (grade);

-- For courses table
-- (prerequisite field is queried in the register_course procedure)
CREATE INDEX idx_courses_prerequisite ON courses.courses (prerequisite);

-- Set table and column comments for Arabic support
COMMENT ON TABLE students.students IS 'جدول الطلاب';
COMMENT ON TABLE students.registerations IS 'That''s what the student/alumn want to apply for';
COMMENT ON TABLE students.emergency_contacts IS 'Do I need more than an emergency contact? we use 1 to 1 so far';

COMMENT ON COLUMN students.students.full_name_en IS 'It''s a composite attribute that includes student name, dad, grandfather, family name';
COMMENT ON COLUMN students.students.gender IS 'True is male, false is female';
COMMENT ON COLUMN students.students.full_name_ar IS 'الاسم الكامل بالعربية';
COMMENT ON COLUMN students.students.nationality IS 'Should we use an enum, string or a json/another table';
COMMENT ON COLUMN students.students.id_type IS 'If he''s egyptian, it''ll use national ID, otherwise passport ID';
COMMENT ON COLUMN students.students.id_authority IS 'The city that issued your id';
COMMENT ON COLUMN students.students.military_status IS 'A string so far, may use an enum later';

COMMENT ON COLUMN students.academic_qualifications.grade IS 'Will later make it all a numeric and add a hashmap to convert it to grades if it''s not credit hours (GPA)';

COMMENT ON COLUMN academic.departments.courses_hours IS 'Is the hours required to complete before being able to submit a thesis';
COMMENT ON COLUMN academic.departments.compulsory_hours IS 'Is the hours that must be registered from the compulsory courses, non-compulsory ones is courses_hours - this';
COMMENT ON COLUMN academic.departments.thesis_hours IS 'Is the hours that doing thesis gives you';

-- Triggers
CREATE OR REPLACE FUNCTION common.update_updated_at_column() 
RETURNS trigger AS $$
BEGIN
				NEW.updated_at = CURRENT_TIMESTAMP;
				RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_students_updated_at 
BEFORE UPDATE ON students.students 
FOR EACH ROW
EXECUTE FUNCTION common.update_updated_at_column();

CREATE TRIGGER update_admins_updated_at 
BEFORE UPDATE ON admin.admins 
FOR EACH ROW
EXECUTE FUNCTION common.update_updated_at_column();

CREATE OR REPLACE FUNCTION thesis.thesis_availability_trigger() 
RETURNS trigger AS $$
BEGIN
				PERFORM thesis.is_thesis_available(NEW.application_id);
				RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_thesis_availability 
BEFORE INSERT ON thesis.theses 
FOR EACH ROW
EXECUTE FUNCTION thesis.thesis_availability_trigger();