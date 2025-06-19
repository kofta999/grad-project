-- ============================================================================
-- COMBINED SEED SQL (UPDATED)
-- This script includes:
-- 1. Original seed data (academic years, initial students, applications, etc.)
-- 2. 20 new students with varied application statuses.
-- 3. Related data for all applications (registrations for accepted, course data, etc.)
-- 4. Seed data for Supervisors.
-- 5. Updated Applications to include supervisor_id.
--
-- IMPORTANT ASSUMPTIONS:
-- - The 'departments' and 'courses' tables are ALREADY POPULATED from your separate courses.sql file.
-- - All primary key IDs (student_id, application_id, etc.) are auto-incrementing.
-- - Hashed password for 'test123' is '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve'.
-- - The 'application_status' ENUM is defined in your schema.
-- ============================================================================

-- ============================================================================
-- PART 1: ORIGINAL SEED DATA (MODIFIED FOR CONSISTENCY & NEW SCHEMA)
-- ============================================================================


set schema 'public';
SET search_path TO public;

-- Insert sample academic_years
INSERT INTO
	academic_years (start_date, end_date)
VALUES
	('2024-09-01', '2025-06-30'), -- Academic Year ID: 1
	('2025-09-01', '2026-06-30'); -- Academic Year ID: 2

-- Insert sample students (student_ids 1-4)
INSERT INTO
	"students" (
		"full_name_ar", "full_name_en", "gender", "email", "nationality", "image_url",
		"phone_no_main", "phone_no_sec", "fax", "id_type", "id_issuance_date", "id_number",
		"id_authority", "martial_status", "is_working", "job_type", "hashed_password",
		"sec_question", "sec_answer", "military_status", "dob", "updated_at"
	)
VALUES
	(
		'محمد علي', 'Mohamed Ali', TRUE, 'mohamed.ali@example.com', 'Egyptian', 'http://localhost:3002/avatar.jpg',
		'0123456789', '0987654321', '01234', 'national_id', '2020-01-01 00:00:00', '12345678901234',
		'Cairo', 'single', FALSE, NULL, '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'What is your favorite color?', 'Blue', 'Completed', '1995-05-15 00:00:00', CURRENT_TIMESTAMP
	), -- student_id 1
	(
		'أحمد سمير', 'Ahmed Samir', TRUE, 'ahmed.samir@example.com', 'Egyptian', 'http://localhost:3002/avatar.jpg',
		'0112233445', '0556677889', '05678', 'passport', '2019-05-20 00:00:00', 'A987654321',
		'Alexandria', 'married', TRUE, 'Full-time', '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'What was your first pet''s name?', 'Whiskers', 'Exempted', '1994-08-22 00:00:00', CURRENT_TIMESTAMP
	), -- student_id 2
	(
		'سارة حسن', 'Sara Hassan', FALSE, 'sara.hassan@example.com', 'Egyptian', 'http://localhost:3002/avatar.jpg',
		'0109988776', '0776655443', '03456', 'national_id', '2021-03-15 00:00:00', 'S1234567890123',
		'Giza', 'single', FALSE, NULL, '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'What is your mother''s maiden name?', 'Kamal', 'Not Completed', '1996-12-05 00:00:00', CURRENT_TIMESTAMP
	), -- student_id 3
    (
	    'طالب مستخدم', 'User Example', TRUE, 'user@example.com', 'Egyptian', 'http://localhost:3002/avatar.jpg',
	    '0123456780', '0987654320', '01235', 'national_id', '2020-01-01 00:00:00', '98765432109876',
	    'Cairo', 'single', FALSE, NULL, '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
	    'What is your favorite color?', 'Red', 'Completed', '1995-05-15 00:00:00', CURRENT_TIMESTAMP
	); -- student_id 4 (This student does not have an application in the original seed)

-- Insert sample supervisors (supervisor_ids 1-3)
INSERT INTO
    "supervisors" (
        "full_name_ar", "full_name_en", "email", "hashed_password"
    )
VALUES
    (
        'د. خالد محمود', 'Dr. Khaled Mahmoud', 'khaled.mahmoud@supervisor.example.com',
        '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve'
    ), -- supervisor_id 1
    (
        'د. علياء فتحي', 'Dr. Alyaa Fathy', 'alyaa.fathy@supervisor.example.com',
        '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve'
    ), -- supervisor_id 2
    (
        'د. إبراهيم يوسف', 'Dr. Ibrahim Youssef', 'ibrahim.youssef@supervisor.example.com',
        '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve'
    ); -- supervisor_id 3


-- Insert sample applications (application_ids 1-3)
-- Student 2 (Ahmed Samir), Student 1 (Mohamed Ali), Student 3 (Sara Hassan)
-- UPDATED to include supervisor_id
INSERT INTO
	"applications" ("student_id", "supervisor_id", "status")
VALUES
	(2, 1, 'accepted'), -- App ID 1 for Ahmed Samir (student_id 2), Supervisor 1
	(1, 2, 'accepted'), -- App ID 2 for Mohamed Ali (student_id 1), Supervisor 2 - SET TO ACCEPTED due to course data
	(3, 1, 'accepted'); -- App ID 3 for Sara Hassan (student_id 3), Supervisor 1 - SET TO ACCEPTED for consistency with registration data

-- Insert sample registrations for original students
INSERT INTO
	"registerations" (
		"application_id", "academic_year_id", "faculty", "department_id"
	)
VALUES
    -- App ID 1 (Ahmed Samir) -> Master MSEEPE
    (1, 2, 'facultyOfEngineering', (SELECT department_id FROM departments WHERE code = 'MSEEPE')),
	-- App ID 2 (Mohamed Ali) -> Master MSEEPE (based on his course registrations)
    (2, 1, 'facultyOfEngineering', (SELECT department_id FROM departments WHERE code = 'MSEEPE')),
	-- App ID 3 (Sara Hassan) -> PhD PHDPE
    (3, 1, 'facultyOfEngineering', (SELECT department_id FROM departments WHERE code = 'PHDPE'));

-- Insert sample attachments for original applications
INSERT INTO
	"attachments" ("application_id", "type", "attachment_url")
VALUES
	(1, 'resume', 'http://localhost:3002/orig_resume1.pdf'),
	(2, 'transcript', 'http://localhost:3002/orig_transcript2.pdf'),
	(3, 'portfolio', 'http://localhost:3002/orig_portfolio3.pdf');

-- Insert sample addresses for original applications
INSERT INTO
	"addresses" (
		"application_id", "full_address", "country_id", "city_id", "type"
	)
VALUES
	(1, '123 Original Main St', 59, 934, 'permanent'), (1, '456 Original Second St', 59, 934, 'current'),
	(2, '789 Original Third St', 59, 934, 'permanent'), (2, '789 Original Third St', 59, 934, 'current'),
	(3, '101 Original Fourth St', 59, 934, 'permanent'), (3, '101 Original Fourth St', 59, 934, 'current');

-- Insert sample emergency_contacts for original applications
INSERT INTO
	"emergency_contacts" (
		"application_id", "name", "address", "phone_number", "email"
	)
VALUES
	(1, 'Ahmed Ali Sr.', '456 Original Elm St, Cairo', '01100000001', 'ahmed.ali.sr@contact.com'),
	(2, 'Fatma Samir Sr.', '789 Original Pine St, Alexandria', '02200000002', 'fatma.samir.sr@contact.com'),
	(3, 'Mohamed Hassan Sr.', '101 Original Oak St, Giza', '03300000003', 'mohamed.hassan.sr@contact.com');

-- Insert sample academic_qualifications for original applications
INSERT INTO
	"academic_qualifications" (
		"application_id", "country_id", "university", "faculty", "type",
		"qualification", "specialization", "year", "date", "credit_hours", "grade", "gpa"
	)
VALUES
	( -- App 1 (Ahmed Samir, for Master MSEEPE)
		1, 53, 'Cairo University', 'Engineering', 'Bachelor',
		'BSc', 'Electrical Engineering', '2018', '2018-06-30 00:00:00', TRUE, 'a', '3.8'
	),
	( -- App 2 (Mohamed Ali, for Master MSEEPE)
		2, 54, 'Alexandria University', 'Engineering', 'Bachelor',
		'BSc', 'Mechanical Engineering', '2019', '2019-07-15 00:00:00', TRUE, 'aPlus', '3.9'
	),
	( -- App 3 (Sara Hassan, for PhD PHDPE)
		3, 55, 'Helwan University', 'Engineering', 'Master',
		'MSc', 'Power Systems', '2020', '2020-05-20 00:00:00', TRUE, 'a', '3.7'
	);

-- Insert sample admins
INSERT INTO
	"admins" (
		"full_name_ar", "full_name_en", "email", "hashed_password", "created_at", "updated_at"
	)
VALUES
	('أحمد عبد الله', 'Ahmed Abdullah', 'ahmed.abdullah@example.com', '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	('ليلى محمد', 'Laila Mohamed', 'laila.mohamed@example.com', '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	('يوسف علي', 'Youssef Ali', 'youssef.ali@example.com', '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Original Course Registrations for Mohamed Ali (application_id 2)
-- Assuming these will generate course_registration_ids 1-11 sequentially
INSERT INTO
    course_registrations (course_id, application_id, semester, academic_year_id)
VALUES
    ((SELECT course_id FROM courses WHERE code = 'ELEC 600'), 2, 'first', 1), -- CR_ID 1
    ((SELECT course_id FROM courses WHERE code = 'ELEC 601'), 2, 'first', 1), -- CR_ID 2
    ((SELECT course_id FROM courses WHERE code = 'ELEC 602'), 2, 'first', 1), -- CR_ID 3
    ((SELECT course_id FROM courses WHERE code = 'EMPE 603'), 2, 'first', 1), -- CR_ID 4
    ((SELECT course_id FROM courses WHERE code = 'EMPE 604'), 2, 'second', 1),-- CR_ID 5
    ((SELECT course_id FROM courses WHERE code = 'EMPE 605'), 2, 'second', 1),-- CR_ID 6
    ((SELECT course_id FROM courses WHERE code = 'EMPE 606'), 2, 'second', 1),-- CR_ID 7
    ((SELECT course_id FROM courses WHERE code = 'EMPE 607'), 2, 'first', 1), -- CR_ID 8 (Repeated semester, ok for example)
    ((SELECT course_id FROM courses WHERE code = 'EMPE 609'), 2, 'third', 1), -- CR_ID 9 (EMPE 608 from original file seems to be missing from courses file, changed to 609)
    ((SELECT course_id FROM courses WHERE code = 'EMPE 609'), 2, 'third', 1), -- CR_ID 10
    ((SELECT course_id FROM courses WHERE code = 'EMPE 610'), 2, 'third', 1); -- CR_ID 11

-- Original Course Results for Mohamed Ali
-- Referencing course_registration_ids 1-10
INSERT INTO
    course_results (course_registration_id, grade)
VALUES
    (1, 85),
    (2, 88),
    (3, 78),
    (4, 82),
    (5, 75),
    (6, 91),
    (7, 86),
    (8, 79),
    (9, 93),
    (10, 98);
    -- (11, 80); -- Result for 11th course if it was in original seed, user provided 10

-- ===========================================================================================
-- PART 2: INSERT 20 NEW STUDENTS (student_ids 5-24)
-- ===========================================================================================

INSERT INTO
	"students" (
		"full_name_ar", "full_name_en", "gender", "email", "nationality", "image_url",
		"phone_no_main", "phone_no_sec", "fax", "id_type", "id_issuance_date", "id_number",
		"id_authority", "martial_status", "is_working", "job_type", "hashed_password",
		"sec_question", "sec_answer", "military_status", "dob", "updated_at"
	)
VALUES
	-- Students 5-9: Will have NO applications
	(
		'عبدالرحمن خالد', 'Abdulrahman Khalid', TRUE, 'abdulrahman.k01@example.com', 'Egyptian', 'http://localhost:3002/avatar.jpg',
		'01010000005', NULL, NULL, 'national_id', '2020-01-01', '29501010100005',
		'Cairo', 'single', FALSE, NULL, '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Fav color?', 'Blue', 'Completed', '1995-01-01', CURRENT_TIMESTAMP
	), -- student_id 5
	(
		'محمد حسين', 'Mohamed Hussein', TRUE, 'mohamed.h02@example.com', 'Saudi Arabian', 'http://localhost:3002/avatar.jpg',
		'01010000006', NULL, NULL, 'passport', '2019-02-01', 'B00000006',
		'Riyadh', 'married', TRUE, 'Full-time', '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'First pet?', 'Lion', 'Not Applicable', '1992-02-01', CURRENT_TIMESTAMP
	), -- student_id 6
	(
		'علي أحمد', 'Ali Ahmed', TRUE, 'ali.a03@example.com', 'Egyptian', 'http://localhost:3002/avatar.jpg',
		'01010000007', NULL, NULL, 'national_id', '2021-03-01', '29803010100007',
		'Alexandria', 'single', FALSE, NULL, '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Mother name?', 'Fatma', 'Postponed', '1998-03-01', CURRENT_TIMESTAMP
	), -- student_id 7
	(
		'عمر فاروق', 'Omar Farouk', TRUE, 'omar.f04@example.com', 'Egyptian', 'http://localhost:3002/avatar.jpg',
		'01010000008', NULL, NULL, 'national_id', '2018-04-01', '29404010100008',
		'Giza', 'single', TRUE, 'Part-time', '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Fav book?', '1984', 'Completed', '1994-04-01', CURRENT_TIMESTAMP
	), -- student_id 8
	(
		'يوسف إبراهيم', 'Youssef Ibrahim', TRUE, 'youssef.i05@example.com', 'Jordanian', 'http://localhost:3002/avatar.jpg',
		'01010000009', NULL, NULL, 'passport', '2022-05-01', 'C00000009',
		'Amman', 'married', TRUE, 'Full-time', '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Fav sport?', 'Soccer', 'Not Applicable', '1990-05-01', CURRENT_TIMESTAMP
	), -- student_id 9

	-- Students 10-14: Will have REJECTED applications
	(
		'كريم صالح', 'Karim Saleh', TRUE, 'karim.s06@example.com', 'Egyptian', 'http://localhost:3002/avatar.jpg',
		'01010000010', NULL, NULL, 'national_id', '2017-06-01', '29306010100010',
		'Cairo', 'single', FALSE, NULL, '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Fav hobby?', 'Gaming', 'Exempted', '1993-06-01', CURRENT_TIMESTAMP
	), -- student_id 10
	(
		'طارق جمال', 'Tarek Gamal', TRUE, 'tarek.g07@example.com', 'Egyptian', 'http://localhost:3002/avatar.jpg',
		'01010000011', NULL, NULL, 'national_id', '2019-07-01', '29607010100011',
		'Luxor', 'single', TRUE, 'Freelance', '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Fav subject?', 'History', 'Completed', '1996-07-01', CURRENT_TIMESTAMP
	), -- student_id 11
	(
		'بلال فتحي', 'Belal Fathy', TRUE, 'belal.f08@example.com', 'Kuwaiti', 'http://localhost:3002/avatar.jpg',
		'01010000012', NULL, NULL, 'passport', '2020-08-01', 'D00000012',
		'Kuwait City', 'married', TRUE, 'Full-time', '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Childhood hero?', 'Batman', 'Not Applicable', '1991-08-01', CURRENT_TIMESTAMP
	), -- student_id 12
	(
		'سامر عدلي', 'Samer Adly', TRUE, 'samer.a09@example.com', 'Egyptian', 'http://localhost:3002/avatar.jpg',
		'01010000013', NULL, NULL, 'national_id', '2021-09-01', '29909010100013',
		'Aswan', 'single', FALSE, NULL, '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Fav animal?', 'Eagle', 'Postponed', '1999-09-01', CURRENT_TIMESTAMP
	), -- student_id 13
	(
		'فارس رمزي', 'Fares Ramzy', TRUE, 'fares.r10@example.com', 'Egyptian', 'http://localhost:3002/avatar.jpg',
		'01010000014', NULL, NULL, 'national_id', '2018-10-01', '29210010100014',
		'Port Said', 'single', TRUE, 'Part-time', '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Fav season?', 'Autumn', 'Completed', '1992-10-01', CURRENT_TIMESTAMP
	), -- student_id 14

	-- Students 15-19: Will have PENDING applications
	(
		'نور الهدى أحمد', 'Nour Elhoda Ahmed', FALSE, 'nour.a11@example.com', 'Egyptian', 'http://localhost:3002/avatar.jpg',
		'01010000015', NULL, NULL, 'national_id', '2017-11-01', '29511010200015',
		'Ismailia', 'single', TRUE, 'Full-time', '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Fav place?', 'Library', 'Not Applicable', '1995-11-01', CURRENT_TIMESTAMP
	), -- student_id 15
	(
		'فاطمة الزهراء علي', 'Fatima AlZahraa Ali', FALSE, 'fatima.a12@example.com', 'Egyptian', 'http://localhost:3002/avatar.jpg',
		'01010000016', NULL, NULL, 'national_id', '2019-12-01', '29612010200016',
		'Suez', 'married', FALSE, NULL, '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Fav song?', 'Classical', 'Not Applicable', '1996-12-01', CURRENT_TIMESTAMP
	), -- student_id 16
	(
		'آية الله محمود', 'Ayat Allah Mahmoud', FALSE, 'ayat.m13@example.com', 'Qatari', 'http://localhost:3002/avatar.jpg',
		'01010000017', NULL, NULL, 'passport', '2020-01-15', 'E00000017',
		'Doha', 'single', TRUE, 'Part-time', '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Fav drink?', 'Tea', 'Not Applicable', '1997-01-15', CURRENT_TIMESTAMP
	), -- student_id 17
	(
		'خديجة عمر', 'Khadija Omar', FALSE, 'khadija.o14@example.com', 'Egyptian', 'http://localhost:3002/avatar.jpg',
		'01010000018', NULL, NULL, 'national_id', '2021-02-15', '29802150200018',
		'Mansoura', 'single', FALSE, NULL, '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Fav author?', 'Taha Hussein', 'Not Applicable', '1998-02-15', CURRENT_TIMESTAMP
	), -- student_id 18
	(
		'زينب محمد', 'Zeinab Mohamed', FALSE, 'zeinab.m15@example.com', 'Bahraini', 'http://localhost:3002/avatar.jpg',
		'01010000019', NULL, NULL, 'passport', '2019-03-15', 'F00000019',
		'Manama', 'married', TRUE, 'Full-time', '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Fav movie?', 'Drama', 'Not Applicable', '1994-03-15', CURRENT_TIMESTAMP
	), -- student_id 19

	-- Students 20-24: Will have ACCEPTED applications
	(
		'منى هشام', 'Mona Hesham', FALSE, 'mona.h16@example.com', 'Egyptian', 'http://localhost:3002/avatar.jpg',
		'01010000020', NULL, NULL, 'national_id', '2020-04-15', '29904150200020',
		'Tanta', 'single', FALSE, NULL, '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Fav actor?', 'Ahmed Helmy', 'Not Applicable', '1999-04-15', CURRENT_TIMESTAMP
	), -- student_id 20
	(
		'هدى كمال', 'Hoda Kamal', FALSE, 'hoda.k17@example.com', 'Emirati', 'http://localhost:3002/avatar.jpg',
		'01010000021', NULL, NULL, 'passport', '2021-05-15', 'G00000021',
		'Dubai', 'single', TRUE, 'Part-time', '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Fav actress?', 'Hend Sabry', 'Not Applicable', '1997-05-15', CURRENT_TIMESTAMP
	), -- student_id 21
	(
		'رنا عاطف', 'Rana Atef', FALSE, 'rana.a18@example.com', 'Egyptian', 'http://localhost:3002/avatar.jpg',
		'01010000022', NULL, NULL, 'national_id', '2017-06-15', '29306150200022',
		'Cairo', 'married', TRUE, 'Full-time', '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Fav figure?', 'Hatshepsut', 'Not Applicable', '1993-06-15', CURRENT_TIMESTAMP
	), -- student_id 22
	(
		'دينا شريف', 'Dina Sherif', FALSE, 'dina.s19@example.com', 'Egyptian', 'http://localhost:3002/avatar.jpg',
		'01010000023', NULL, NULL, 'national_id', '2022-07-15', '30107150200023',
		'Alexandria', 'single', FALSE, NULL, '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Fav car?', 'Mercedes', 'Not Applicable', '2001-07-15', CURRENT_TIMESTAMP
	), -- student_id 23
	(
		'لما نبيل', 'Lama Nabil', FALSE, 'lama.n20@example.com', 'Lebanese', 'http://localhost:3002/avatar.jpg',
		'01010000024', NULL, NULL, 'passport', '2018-08-15', 'H00000024',
		'Beirut', 'single', TRUE, 'Part-time', '$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'Fav app?', 'Spotify', 'Not Applicable', '1998-08-15', CURRENT_TIMESTAMP
	); -- student_id 24


-- ===========================================================================================
-- PART 3: INSERT APPLICATIONS FOR 15 NEW STUDENTS (IDs 10-24)
-- Application IDs will be 4 through 18
-- UPDATED to include supervisor_id
-- ===========================================================================================

-- Rejected Applications (Students 10-14, New Application IDs 4-8)
INSERT INTO "applications" ("student_id", "supervisor_id", "status") VALUES
    (10, 1, 'rejected'), -- Karim, App ID 4, Supervisor 1
    (11, 2, 'rejected'), -- Tarek Gamal, App ID 5, Supervisor 2
    (12, 3, 'rejected'), -- Belal Fathy, App ID 6, Supervisor 3
    (13, 1, 'rejected'), -- Samer, App ID 7, Supervisor 1
    (14, 2, 'rejected'); -- Fares Ramzy, App ID 8, Supervisor 2

-- Pending Applications (Students 15-19, New Application IDs 9-13)
INSERT INTO "applications" ("student_id", "supervisor_id", "status") VALUES
    (15, 3, 'pending'),  -- Nour Elhoda, App ID 9, Supervisor 3
    (16, 1, 'pending'),  -- Fatima AlZahraa, App ID 10, Supervisor 1
    (17, 2, 'pending'),  -- Ayat Allah, App ID 11, Supervisor 2
    (18, 3, 'pending'),  -- Khadija Omar, App ID 12, Supervisor 3
    (19, 1, 'pending');  -- Zeinab, App ID 13, Supervisor 1

-- Accepted Applications (Students 20-24, New Application IDs 14-18)
INSERT INTO "applications" ("student_id", "supervisor_id", "status") VALUES
    (20, 2, 'accepted'), -- Mona Hesham, App ID 14, Supervisor 2
    (21, 3, 'accepted'), -- Hoda Kamal, App ID 15, Supervisor 3
    (22, 1, 'accepted'), -- Rana, App ID 16, Supervisor 1
    (23, 2, 'accepted'), -- Dina Sherif, App ID 17, Supervisor 2
    (24, 3, 'accepted'); -- Lama Nabil, App ID 18, Supervisor 3

-- ===========================================================================================
-- PART 4: INSERT SUPPORTING DATA FOR THE 15 NEW APPLICATIONS (IDs 4-18)
-- ===========================================================================================

-- Attachments (for new application_ids 4-18)
INSERT INTO "attachments" ("application_id", "type", "attachment_url") VALUES
    (4, 'transcript', 'http://localhost:3002/transcript_rej1.pdf'), (5, 'id_document', 'http://localhost:3002/id_rej2.pdf'),
    (6, 'resume', 'http://localhost:3002/resume_rej3.pdf'), (7, 'portfolio', 'http://localhost:3002/portfolio_rej4.pdf'),
    (8, 'transcript', 'http://localhost:3002/transcript_rej5.pdf'), (9, 'id_document', 'http://localhost:3002/id_pen1.pdf'),
    (10, 'resume', 'http://localhost:3002/resume_pen2.pdf'), (11, 'transcript', 'http://localhost:3002/transcript_pen3.pdf'),
    (12, 'portfolio', 'http://localhost:3002/portfolio_pen4.pdf'), (13, 'id_document', 'http://localhost:3002/id_pen5.pdf'),
    (14, 'resume', 'http://localhost:3002/resume_acc1.pdf'), (15, 'transcript', 'http://localhost:3002/transcript_acc2.pdf'),
    (16, 'id_document', 'http://localhost:3002/id_acc3.pdf'), (17, 'portfolio', 'http://localhost:3002/portfolio_acc4.pdf'),
    (18, 'resume', 'http://localhost:3002/resume_acc5.pdf');

-- Addresses (for new application_ids 4-18, one permanent and one current each)
INSERT INTO "addresses" ("application_id", "full_address", "country_id", "city_id", "type") VALUES
    (4, '10 Rejected St, Area 1', 59, 934, 'permanent'), (4, '10 Rejected St, Area 1', 59, 934, 'current'),
    (5, '20 Rejection Ave, District 2', 59, 100, 'permanent'), (5, '20 Rejection Ave, District 2', 59, 100, 'current'),
    (6, '30 Denied Rd, Zone 3', 60, 200, 'permanent'), (6, '30 Denied Rd, Zone 3', 60, 200, 'current'),
    (7, '40 Unsuccessful Ln, Block 4', 59, 934, 'permanent'), (7, '40 Unsuccessful Ln, Block 4', 59, 934, 'current'),
    (8, '50 NotAccepted Wy, Sector 5', 59, 100, 'permanent'), (8, '50 NotAccepted Wy, Sector 5', 59, 100, 'current'),
    (9, '60 Pending Pl, Unit 6', 59, 934, 'permanent'), (9, '60 Pending Pl, Unit 6', 59, 934, 'current'),
    (10, '70 Waiting Ct, Apt 7', 59, 100, 'permanent'), (10, '70 Waiting Ct, Apt 7', 59, 100, 'current'),
    (11, '80 Review St, Flat 8', 61, 300, 'permanent'), (11, '80 Review St, Flat 8', 61, 300, 'current'),
    (12, '90 Hold Ave, Suite 9', 59, 934, 'permanent'), (12, '90 Hold Ave, Suite 9', 59, 934, 'current'),
    (13, '100 Submitted Rd, Bldg 10', 62, 400, 'permanent'), (13, '100 Submitted Rd, Bldg 10', 62, 400, 'current'),
    (14, '110 Accepted St, Area A', 59, 934, 'permanent'), (14, '110 Accepted St, Area A', 59, 934, 'current'),
    (15, '120 Approved Ave, District B', 63, 500, 'permanent'), (15, '120 Approved Ave, District B', 63, 500, 'current'),
    (16, '130 Enrolled Rd, Zone C', 59, 934, 'permanent'), (16, '130 Enrolled Rd, Zone C', 59, 934, 'current'),
    (17, '140 Admitted Ln, Block D', 59, 100, 'permanent'), (17, '140 Admitted Ln, Block D', 59, 100, 'current'),
    (18, '150 Matriculated Wy, Sector E', 64, 600, 'permanent'), (18, '150 Matriculated Wy, Sector E', 64, 600, 'current');

-- Emergency Contacts (for new application_ids 4-18)
INSERT INTO "emergency_contacts" ("application_id", "name", "address", "phone_number", "email") VALUES
    (4, 'EC Karim', 'EC Address 1', '01020000004', 'ec.karim@contact.com'), (5, 'EC Tarek', 'EC Address 2', '01020000005', 'ec.tarek@contact.com'),
    (6, 'EC Belal', 'EC Address 3', '01020000006', 'ec.belal@contact.com'), (7, 'EC Samer', 'EC Address 4', '01020000007', 'ec.samer@contact.com'),
    (8, 'EC Fares', 'EC Address 5', '01020000008', 'ec.fares@contact.com'), (9, 'EC Nour', 'EC Address 6', '01020000009', 'ec.nour@contact.com'),
    (10, 'EC Fatima', 'EC Address 7', '01020000010', 'ec.fatima@contact.com'), (11, 'EC Ayat', 'EC Address 8', '01020000011', 'ec.ayat@contact.com'),
    (12, 'EC Khadija', 'EC Address 9', '01020000012', 'ec.khadija@contact.com'), (13, 'EC Zeinab', 'EC Address 10', '01020000013', 'ec.zeinab@contact.com'),
    (14, 'EC Mona', 'EC Address 11', '01020000014', 'ec.mona@contact.com'), (15, 'EC Hoda', 'EC Address 12', '01020000015', 'ec.hoda@contact.com'),
    (16, 'EC Rana', 'EC Address 13', '01020000016', 'ec.rana@contact.com'), (17, 'EC Dina', 'EC Address 14', '01020000017', 'ec.dina@contact.com'),
    (18, 'EC Lama', 'EC Address 15', '01020000018', 'ec.lama@contact.com');

-- Academic Qualifications (for new application_ids 4-18)
INSERT INTO "academic_qualifications" ("application_id", "country_id", "university", "faculty", "type", "qualification", "specialization", "year", "date", "credit_hours", "grade", "gpa") VALUES
    (4, 59, 'High School X', 'Science Section', 'HighSchool', 'Certificate', 'General Science', '2016', '2016-06-01', FALSE, 'c', '2.5'),
    (5, 59, 'Uni Y', 'Engineering', 'Bachelor', 'BSc', 'Electronics Eng.', '2018', '2018-07-01', TRUE, 'b', '3.1'),
    (6, 60, 'Uni Z', 'Engineering', 'Master', 'MSc', 'Power Engineering', '2019', '2019-08-01', TRUE, 'a', '3.6'),
    (7, 59, 'Tech School A', 'Technical Dept', 'Vocational', 'Diploma', 'Electronics Tech', '2020', '2020-09-01', FALSE, 'bPlus', '3.3'),
    (8, 59, 'Uni B', 'Computers & Info', 'Bachelor', 'BSc', 'Computer Science', '2017', '2017-10-01', TRUE, 'cPlus', '2.8'),
    (9, 59, 'Ain Shams Uni', 'Engineering', 'Bachelor', 'BSc', 'Electrical Power', '2016', '2016-11-01', TRUE, 'a', '3.7'),
    (10, 59, 'Cairo Uni', 'Engineering', 'Master', 'MSc', 'Electronics & Comm.', '2018', '2018-12-01', TRUE, 'aPlus', '3.9'),
    (11, 61, 'Qatar High School', 'Arts Section', 'HighSchool', 'Certificate', 'General Arts', '2019', '2019-01-15', FALSE, 'a', '3.8'),
    (12, 59, 'Alex Uni', 'Engineering', 'Bachelor', 'BSc', 'Communications Eng.', '2020', '2020-02-15', TRUE, 'b', '3.2'),
    (13, 62, 'Bahrain Uni', 'Engineering', 'Master', 'MSc', 'Telecom Systems', '2018', '2018-03-15', TRUE, 'a', '3.75'),
    (14, 59, 'Tanta Secondary', 'Commerce', 'HighSchool', 'Certificate', 'Business Admin', '2019', '2019-04-15', FALSE, 'aPlus', '3.95'),
    (15, 63, 'Zayed Uni', 'Engineering', 'Bachelor', 'BSc', 'Power Systems', '2020', '2020-05-15', TRUE, 'a', '3.85'),
    (16, 59, 'Helwan Uni', 'Engineering', 'Master', 'MSc', 'Advanced Power', '2016', '2016-06-15', TRUE, 'aPlus', '4.0'),
    (17, 59, 'AAST', 'Engineering', 'Bachelor', 'BSc', 'Electronics Design', '2021', '2021-07-15', TRUE, 'a', '3.7'),
    (18, 64, 'AUB', 'Engineering', 'Master', 'MSc', 'Computer Engineering', '2017', '2017-08-15', TRUE, 'a', '3.88');

    -- ===========================================================================================
    -- PART 5: INSERT REGISTRATIONS FOR NEW STUDENTS WITH APPLICATIONS (Application IDs 4-18)
    -- This includes students with 'rejected', 'pending', and 'accepted' statuses.
    -- NOTE: Registering students with 'rejected' or 'pending' status is atypical.
    -- ===========================================================================================
    INSERT INTO "registerations" ("application_id", "academic_year_id", "faculty", "department_id") VALUES
        -- Registrations for REJECTED new applications (App IDs 4-8)
        (4, 1, 'facultyOfEngineering', (SELECT department_id FROM departments WHERE code = 'DNQE')),   -- Karim (App 4, Student 10) -> Diploma DNQE (Hypothetical)
        (5, 1, 'facultyOfEngineering', (SELECT department_id FROM departments WHERE code = 'MSEECE')), -- Tarek (App 5, Student 11) -> Master MSEECE (Hypothetical)
        (6, 1, 'facultyOfEngineering', (SELECT department_id FROM departments WHERE code = 'PHDPE')),  -- Belal (App 6, Student 12) -> PhD PHDPE (Hypothetical)
        (7, 1, 'facultyOfEngineering', (SELECT department_id FROM departments WHERE code = 'DEPE')),   -- Samer (App 7, Student 13) -> Diploma DEPE (Hypothetical)
        (8, 1, 'facultyOfEngineering', (SELECT department_id FROM departments WHERE code = 'MSEECMP')),-- Fares (App 8, Student 14) -> Master MSEECMP (Hypothetical)

        -- Registrations for PENDING new applications (App IDs 9-13)
        (9, 1, 'facultyOfEngineering', (SELECT department_id FROM departments WHERE code = 'MSEEPE')), -- Nour (App 9, Student 15) -> Master MSEEPE (Hypothetical)
        (10, 1, 'facultyOfEngineering', (SELECT department_id FROM departments WHERE code = 'PHDECE')),-- Fatima (App 10, Student 16) -> PhD PHDECE (Hypothetical)
        (11, 1, 'facultyOfEngineering', (SELECT department_id FROM departments WHERE code = 'DNQE')),  -- Ayat (App 11, Student 17) -> Diploma DNQE (Hypothetical)
        (12, 1, 'facultyOfEngineering', (SELECT department_id FROM departments WHERE code = 'MSEEC')), -- Khadija (App 12, Student 18) -> Master MSEEC (Hypothetical)
        (13, 1, 'facultyOfEngineering', (SELECT department_id FROM departments WHERE code = 'PHDEEC')),-- Zeinab (App 13, Student 19) -> PhD PHDEEC (Hypothetical)

        -- Registrations for ACCEPTED new applications (App IDs 14-18) - As before
        (14, 1, 'facultyOfEngineering', (SELECT department_id FROM departments WHERE code = 'DEPE')),   -- Mona (App 14, Student 20) -> Diploma DEPE
        (15, 1, 'facultyOfEngineering', (SELECT department_id FROM departments WHERE code = 'MSEEPE')), -- Hoda (App 15, Student 21) -> Master MSEEPE
        (16, 1, 'facultyOfEngineering', (SELECT department_id FROM departments WHERE code = 'PHDPE')),  -- Rana (App 16, Student 22) -> PhD PHDPE
        (17, 1, 'facultyOfEngineering', (SELECT department_id FROM departments WHERE code = 'MSEECE')), -- Dina (App 17, Student 23) -> Master MSEECE
        (18, 1, 'facultyOfEngineering', (SELECT department_id FROM departments WHERE code = 'PHDECMP'));-- Lama (App 18, Student 24) -> PhD PHDECMP

-- ===========================================================================================
-- PART 6: INSERT COURSE REGISTRATIONS FOR THE 5 ACCEPTED NEW STUDENTS
-- Course Registration IDs will continue from where the original student's left off (e.g., start from 12)
-- ===========================================================================================

-- Student 20 (Mona, App ID 14), Department: DEPE (Diploma)
INSERT INTO "course_registrations" ("course_id", "application_id", "semester", "academic_year_id") VALUES
    ((SELECT course_id FROM courses WHERE code = 'EMPE 501'), 14, 'first', 1),
    ((SELECT course_id FROM courses WHERE code = 'EMPE 506'), 14, 'first', 1),
    ((SELECT course_id FROM courses WHERE code = 'EMPE 507'), 14, 'first', 1),
    ((SELECT course_id FROM courses WHERE code = 'EMPE 510'), 14, 'second', 1),
    ((SELECT course_id FROM courses WHERE code = 'EMPE 526'), 14, 'second', 1);

-- Student 21 (Hoda, App ID 15), Department: MSEEPE (Master)
INSERT INTO "course_registrations" ("course_id", "application_id", "semester", "academic_year_id") VALUES
    ((SELECT course_id FROM courses WHERE code = 'ELEC 600'), 15, 'first', 1),
    ((SELECT course_id FROM courses WHERE code = 'ELEC 601'), 15, 'first', 1),
    ((SELECT course_id FROM courses WHERE code = 'EMPE 603'), 15, 'second', 1),
    ((SELECT course_id FROM courses WHERE code = 'EMPE 605'), 15, 'second', 1),
    ((SELECT course_id FROM courses WHERE code = 'EMPE 611'), 15, 'third', 1);

-- Student 22 (Rana, App ID 16), Department: PHDPE (PhD)
INSERT INTO "course_registrations" ("course_id", "application_id", "semester", "academic_year_id") VALUES
    ((SELECT course_id FROM courses WHERE code = 'EMPE 701'), 16, 'first', 1),
    ((SELECT course_id FROM courses WHERE code = 'EMPE 702'), 16, 'first', 1),
    ((SELECT course_id FROM courses WHERE code = 'EMPE 704'), 16, 'second', 1);

-- Student 23 (Dina, App ID 17), Department: MSEECE (Master)
INSERT INTO "course_registrations" ("course_id", "application_id", "semester", "academic_year_id") VALUES
    ((SELECT course_id FROM courses WHERE code = 'ELEC 600'), 17, 'first', 1),
    ((SELECT course_id FROM courses WHERE code = 'EECE 601'), 17, 'first', 1),
    ((SELECT course_id FROM courses WHERE code = 'EECE 603'), 17, 'second', 1);

-- Student 24 (Lama, App ID 18), Department: PHDECMP (PhD)
INSERT INTO "course_registrations" ("course_id", "application_id", "semester", "academic_year_id") VALUES
    ((SELECT course_id FROM courses WHERE code = 'CMPE 700'), 18, 'first', 1),
    ((SELECT course_id FROM courses WHERE code = 'CMPE 701'), 18, 'first', 1),
    ((SELECT course_id FROM courses WHERE code = 'CMPE 703'), 18, 'second', 1);

-- ===========================================================================================
-- PART 7: INSERT COURSE RESULTS FOR THE NEW ACCEPTED STUDENTS' REGISTERED COURSES
-- Using subqueries to robustly find course_registration_id
-- ===========================================================================================

-- Grades for Mona (App ID 14)
INSERT INTO "course_results" ("course_registration_id", "grade") VALUES
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 14 AND c.code = 'EMPE 501' ORDER BY cr.course_registration_id DESC LIMIT 1), 85),
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 14 AND c.code = 'EMPE 506' ORDER BY cr.course_registration_id DESC LIMIT 1), 90),
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 14 AND c.code = 'EMPE 507' ORDER BY cr.course_registration_id DESC LIMIT 1), 78),
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 14 AND c.code = 'EMPE 510' ORDER BY cr.course_registration_id DESC LIMIT 1), 92),
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 14 AND c.code = 'EMPE 526' ORDER BY cr.course_registration_id DESC LIMIT 1), 88);

-- Grades for Hoda (App ID 15)
INSERT INTO "course_results" ("course_registration_id", "grade") VALUES
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 15 AND c.code = 'ELEC 600' ORDER BY cr.course_registration_id DESC LIMIT 1), 95),
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 15 AND c.code = 'ELEC 601' ORDER BY cr.course_registration_id DESC LIMIT 1), 89),
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 15 AND c.code = 'EMPE 603' ORDER BY cr.course_registration_id DESC LIMIT 1), 91),
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 15 AND c.code = 'EMPE 605' ORDER BY cr.course_registration_id DESC LIMIT 1), 80),
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 15 AND c.code = 'EMPE 611' ORDER BY cr.course_registration_id DESC LIMIT 1), 87);

-- Grades for Rana (App ID 16)
INSERT INTO "course_results" ("course_registration_id", "grade") VALUES
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 16 AND c.code = 'EMPE 701' ORDER BY cr.course_registration_id DESC LIMIT 1), 92),
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 16 AND c.code = 'EMPE 702' ORDER BY cr.course_registration_id DESC LIMIT 1), 94),
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 16 AND c.code = 'EMPE 704' ORDER BY cr.course_registration_id DESC LIMIT 1), 88);

-- Grades for Dina (App ID 17)
INSERT INTO "course_results" ("course_registration_id", "grade") VALUES
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 17 AND c.code = 'ELEC 600' ORDER BY cr.course_registration_id DESC LIMIT 1), 75),
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 17 AND c.code = 'EECE 601' ORDER BY cr.course_registration_id DESC LIMIT 1), 82),
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 17 AND c.code = 'EECE 603' ORDER BY cr.course_registration_id DESC LIMIT 1), 85);

-- Grades for Lama (App ID 18)
INSERT INTO "course_results" ("course_registration_id", "grade") VALUES
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 18 AND c.code = 'CMPE 700' ORDER BY cr.course_registration_id DESC LIMIT 1), 96),
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 18 AND c.code = 'CMPE 701' ORDER BY cr.course_registration_id DESC LIMIT 1), 93),
    ((SELECT cr.course_registration_id FROM course_registrations cr JOIN courses c ON cr.course_id = c.course_id WHERE cr.application_id = 18 AND c.code = 'CMPE 703' ORDER BY cr.course_registration_id DESC LIMIT 1), 89);
