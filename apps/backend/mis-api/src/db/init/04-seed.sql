-- All passwords are test123
-- Insert sample academic_years
INSERT INTO
	academic_years (start_date, end_date)
VALUES
	('2024-09-01', '2025-06-30'), -- Example academic year 2024-2025
	('2025-09-01', '2026-06-30');

-- Example academic year 2025-2026
-- Insert sample students
INSERT INTO
	"students" (
		"full_name_ar",
		"full_name_en",
		"gender",
		"email",
		"nationality",
		"image_url",
		"phone_no_main",
		"phone_no_sec",
		"fax",
		"id_type",
		"id_issuance_date",
		"id_number",
		"id_authority",
		"martial_status",
		"is_working",
		"job_type",
		"hashed_password",
		"sec_question",
		"sec_answer",
		"military_status",
		"dob",
		"updated_at"
	)
VALUES
	(
		'محمد علي',
		'Mohamed Ali',
		TRUE,
		'mohamed.ali@example.com',
		'Egyptian',
		'http://example.com/mohamed.jpg',
		'0123456789',
		'0987654321',
		'01234',
		'national_id',
		'2020-01-01 00:00:00',
		'123456789',
		'Cairo',
		'single',
		FALSE,
		NULL,
		'$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'What is your favorite color?',
		'Blue',
		'Completed',
		'1995-05-15 00:00:00',
		CURRENT_TIMESTAMP
	),
	(
		'أحمد سمير',
		'Ahmed Samir',
		TRUE,
		'ahmed.samir@example.com',
		'Egyptian',
		'http://example.com/ahmed.jpg',
		'0112233445',
		'0556677889',
		'05678',
		'passport',
		'2019-05-20 00:00:00',
		'A987654321',
		'Alexandria',
		'married',
		TRUE,
		'Full-time',
		'$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'What was your first pet''s name?',
		'Whiskers',
		'Exempted',
		'1994-08-22 00:00:00',
		CURRENT_TIMESTAMP
	),
	(
		'سارة حسن',
		'Sara Hassan',
		FALSE,
		'sara.hassan@example.com',
		'Egyptian',
		'http://example.com/sara.jpg',
		'0109988776',
		'0776655443',
		'03456',
		'national_id',
		'2021-03-15 00:00:00',
		'S123456789',
		'Giza',
		'single',
		FALSE,
		NULL,
		'$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		'What is your mother''s maiden name?',
		'Kamal',
		'Not Completed',
		'1996-12-05 00:00:00',
		CURRENT_TIMESTAMP
	);

-- Insert sample applications
INSERT INTO
	"applications" ("student_id", "is_admin_accepted")
VALUES
	(2, FALSE),
	(1, TRUE),
	(3, TRUE);

-- Insert sample registrations
INSERT INTO
	"registerations" (
		"application_id",
		"academic_year_id",
		"faculty",
		"academic_degree",
		"department_id"
	)
VALUES
	(1, 1, 'Engineering', 'diploma', 1),
	(2, 1, 'Science', 'master', 3),
	(3, 1, 'Arts', 'phd', 7);

-- Insert sample attachments
INSERT INTO
	"attachments" ("application_id", "type", "attachment_url")
VALUES
	(
		1,
		'resume',
		'http://example.com/resume_mohamed.pdf'
	),
	(
		2,
		'resume',
		'http://example.com/resume_ahmed.pdf'
	),
	(
		3,
		'portfolio',
		'http://example.com/portfolio_sara.pdf'
	);

-- Insert sample addresses
INSERT INTO
	"addresses" (
		"application_id",
		"full_address",
		"country_id",
		"city_id",
		"type"
	)
VALUES
	(1, '123 Main St', 59, 934, 'permanent'),
	(1, '456 Second St', 59, 934, 'current'),
	(
		2,
		'789 Third St',
		59,
		934,
		'permanent'
	),
	(3, '101 Fourth St', 59, 934, 'permanent');

-- Insert sample emergency_contacts
INSERT INTO
	"emergency_contacts" (
		"application_id",
		"name",
		"address",
		"phone_number",
		"email"
	)
VALUES
	(
		1,
		'Ahmed Ali',
		'456 Elm St, Cairo',
		'0112233445',
		'ahmed.ali@example.com'
	),
	(
		2,
		'Fatma Samir',
		'789 Pine St, Alexandria',
		'0223344556',
		'fatma.samir@example.com'
	),
	(
		3,
		'Mohamed Hassan',
		'101 Oak St, Giza',
		'0334455667',
		'mohamed.hassan@example.com'
	);

-- Insert sample academic_qualifications
INSERT INTO
	"academic_qualifications" (
		"application_id",
		"country",
		"university",
		"faculty",
		"type",
		"qualification",
		"specialization",
		"year",
		"date",
		"credit_hours",
		"grade",
		"gpa"
	)
VALUES
	(
		1,
		'Egypt',
		'Cairo University',
		'Engineering',
		'Bachelor',
		'BSc',
		'Computer Science',
		'2020',
		'2020-06-30 00:00:00',
		TRUE,
		'A',
		'3.8'
	),
	(
		2,
		'Egypt',
		'Alexandria University',
		'Science',
		'Master',
		'MSc',
		'Mechanical Engineering',
		'2022',
		'2022-07-15 00:00:00',
		TRUE,
		'A+',
		'4.0'
	),
	(
		3,
		'Egypt',
		'Helwan University',
		'Arts',
		'Bachelor',
		'BA',
		'Graphic Design',
		'2019',
		'2019-05-20 00:00:00',
		TRUE,
		'B',
		'3.5'
	);

-- Insert sample admins
INSERT INTO
	"admins" (
		"full_name_ar",
		"full_name_en",
		"email",
		"hashed_password",
		"created_at",
		"updated_at"
	)
VALUES
	(
		'أحمد عبد الله',
		'Ahmed Abdullah',
		'ahmed.abdullah@example.com',
		'$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		CURRENT_TIMESTAMP,
		CURRENT_TIMESTAMP
	),
	(
		'ليلى محمد',
		'Laila Mohamed',
		'laila.mohamed@example.com',
		'$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		CURRENT_TIMESTAMP,
		CURRENT_TIMESTAMP
	),
	(
		'يوسف علي',
		'Youssef Ali',
		'youssef.ali@example.com',
		'$2a$10$xxRUJhEPNZjZoKcmuQxXr.q/iCJPvZIWCYrxuSNjN61y27KLdr6Ve',
		CURRENT_TIMESTAMP,
		CURRENT_TIMESTAMP
	);

-- Register master's student (application 2) for master's level courses
INSERT INTO
    course_registrations (
        course_id,
        application_id,
        semester,
        academic_year_id
    )
VALUES
    (
        (SELECT course_id FROM courses WHERE code = 'ELEC 600'),
        2,
        'first',
        1
    ), -- Master's student registered for ELEC 600 (required master's course)
    (
        (SELECT course_id FROM courses WHERE code = 'ELEC 601'),
        2,
        'first',
        1
    ), -- Master's student registered for ELEC 601 (required master's course)
    (
        (SELECT course_id FROM courses WHERE code = 'EMPE 603'),
        2,
        'second',
        1
    ), -- Master's student registered for EMPE 603 (master's level course)
    (
        (SELECT course_id FROM courses WHERE code = 'EMPE 604'),
        2,
        'second',
        1
    ); -- Master's student registered for EMPE 604 (master's level course)

-- Register PhD student (application 3) for PhD level courses
INSERT INTO
    course_registrations (
        course_id,
        application_id,
        semester,
        academic_year_id
    )
VALUES
    (
        (SELECT course_id FROM courses WHERE code = 'EMPE 701'),
        3,
        'first',
        1
    ), -- PhD student registered for EMPE 701 (required PhD course)
    (
        (SELECT course_id FROM courses WHERE code = 'EMPE 702'),
        3,
        'first',
        1
    ), -- PhD student registered for EMPE 702 (required PhD course)
    (
        (SELECT course_id FROM courses WHERE code = 'EMPE 704'),
        3,
        'second',
        1
    ); -- PhD student registered for EMPE 704 (PhD elective course)

-- Insert grades for the registered courses
INSERT INTO
    course_results (course_registration_id, grade)
VALUES
    (1, 85), -- Application 2 got 85 in ELEC 600
    (2, 88), -- Application 2 got 88 in ELEC 601
    (3, 90), -- Application 2 got 90 in EMPE 603
    (5, 92), -- Application 3 got 92 in EMPE 701
    (7, 87); -- Application 3 got 87 in EMPE 704
-- Application 2 got 88 in EMPE 506
