-- All passwords are test123
-- Insert sample students
INSERT INTO "students" (
    "full_name_ar", "full_name_en", "gender", "email", "nationality",
    "image_url", "phone_no_main", "phone_no_sec", "fax", "id_type",
    "id_issuance_date", "id_number", "id_authority", "martial_status",
    "is_working", "job_type", "hashed_password", "sec_question",
    "sec_answer", "military_status", "dob", "updated_at"
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
INSERT INTO "applications" ("student_id")
VALUES
    (1),
    (2),
    (3);

-- Insert sample registrations
INSERT INTO "registerations" (
    "application_id", "academic_year", "faculty", "academic_degree", "academic_program"
)
VALUES
    (1, '2023/2024', 'Engineering', 'Bachelor', 'Computer Science'),
    (2, '2023/2024', 'Science', 'Master', 'Mechanical Engineering'),
    (3, '2023/2024', 'Arts', 'Bachelor', 'Graphic Design');

-- Insert sample attachments
INSERT INTO "attachments" (
    "application_id", "type", "attachment_url"
)
VALUES
    (1, 'resume', 'http://example.com/resume_mohamed.pdf'),
    (2, 'resume', 'http://example.com/resume_ahmed.pdf'),
    (3, 'portfolio', 'http://example.com/portfolio_sara.pdf');

-- Insert sample addresses
INSERT INTO "addresses" (
    "application_id", "full_address", "country", "city", "type"
)
VALUES
    (1, '123 Main St', 'Egypt', 'Cairo', 'permanent'),
    (1, '456 Second St', 'Egypt', 'Cairo', 'current'),
    (2, '789 Third St', 'Egypt', 'Alexandria', 'permanent'),
    (3, '101 Fourth St', 'Egypt', 'Giza', 'permanent');

-- Insert sample emergency_contacts
INSERT INTO "emergency_contacts" (
    "application_id", "name", "address", "phone_number", "email"
)
VALUES
    (1, 'Ahmed Ali', '456 Elm St, Cairo', '0112233445', 'ahmed.ali@example.com'),
    (2, 'Fatma Samir', '789 Pine St, Alexandria', '0223344556', 'fatma.samir@example.com'),
    (3, 'Mohamed Hassan', '101 Oak St, Giza', '0334455667', 'mohamed.hassan@example.com');

-- Insert sample academic_qualifications
INSERT INTO "academic_qualifications" (
    "application_id", "country", "university", "faculty", "type",
    "qualification", "specialization", "year", "date", "credit_hours", "grade", "gpa"
)
VALUES
    (1, 'Egypt', 'Cairo University', 'Engineering', 'Bachelor', 'BSc', 'Computer Science', '2020', '2020-06-30 00:00:00', TRUE, 'A', '3.8'),
    (2, 'Egypt', 'Alexandria University', 'Science', 'Master', 'MSc', 'Mechanical Engineering', '2022', '2022-07-15 00:00:00', TRUE, 'A+', '4.0'),
    (3, 'Egypt', 'Helwan University', 'Arts', 'Bachelor', 'BA', 'Graphic Design', '2019', '2019-05-20 00:00:00', TRUE, 'B', '3.5');


-- Insert sample admins
INSERT INTO "admins" (
    "full_name_ar", "full_name_en", "email", "hashed_password", "created_at", "updated_at"
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

-- Departments Table
INSERT INTO departments (code, title, type) VALUES
('EPS', 'دبلوم في نظم الطاقة الكهربية', 'diploma'),
('PE', 'دبلوم في إلكترونيات القوى', 'diploma');

-- Courses Table
INSERT INTO courses (code, title, prerequisite, total_hours) VALUES
('EMPE 501', 'مشروع', NULL, 3),
('EMPE 502', 'تخطيط وتصميم شبكات توزيع الطاقة الكهربية', NULL, 3),
('EMPE 503', 'نظم نقل الطاقة الكهربية', NULL, 3),
('EMPE 504', 'إدارة الأحمال والحفاظ على الطاقة', NULL, 3),
('EMPE 505', 'دراسة أداء نظم الطاقة الكهربية', NULL, 3),
('EMPE 506', 'التحكم الإلكتروني في دوائر التيار المتردد', NULL, 3),
('EMPE 507', 'الإلكترونيات الصناعية', NULL, 3),
('EMPE 508', 'التوافقيات في نظم الطاقة الكهربية', NULL, 3),
('EMPE 509', 'التحكم الإلكتروني في آلات التيار المتردد', NULL, 3),
('EMPE 510', 'Power System Protection', NULL, 3), -- Optional
('EMPE 511', 'Renewable Energy Systems', NULL, 3); -- Optional

-- Department_Courses Table
-- Electrical Power Systems (EPS) - Compulsory
INSERT INTO department_courses (course_id, department_id, is_compulsory) VALUES
((SELECT course_id FROM courses WHERE code = 'EMPE 501'), (SELECT department_id FROM departments WHERE code = 'EPS'), TRUE),
((SELECT course_id FROM courses WHERE code = 'EMPE 502'), (SELECT department_id FROM departments WHERE code = 'EPS'), TRUE),
((SELECT course_id FROM courses WHERE code = 'EMPE 503'), (SELECT department_id FROM departments WHERE code = 'EPS'), TRUE),
((SELECT course_id FROM courses WHERE code = 'EMPE 504'), (SELECT department_id FROM departments WHERE code = 'EPS'), TRUE),
((SELECT course_id FROM courses WHERE code = 'EMPE 505'), (SELECT department_id FROM departments WHERE code = 'EPS'), TRUE);

-- Power Electronics (PE) - Compulsory
INSERT INTO department_courses (course_id, department_id, is_compulsory) VALUES
((SELECT course_id FROM courses WHERE code = 'EMPE 501'), (SELECT department_id FROM departments WHERE code = 'PE'), TRUE),
((SELECT course_id FROM courses WHERE code = 'EMPE 506'), (SELECT department_id FROM departments WHERE code = 'PE'), TRUE),
((SELECT course_id FROM courses WHERE code = 'EMPE 507'), (SELECT department_id FROM departments WHERE code = 'PE'), TRUE),
((SELECT course_id FROM courses WHERE code = 'EMPE 508'), (SELECT department_id FROM departments WHERE code = 'PE'), TRUE),
((SELECT course_id FROM courses WHERE code = 'EMPE 509'), (SELECT department_id FROM departments WHERE code = 'PE'), TRUE);

-- Both Departments - Optional
INSERT INTO department_courses (course_id, department_id, is_compulsory) VALUES
((SELECT course_id FROM courses WHERE code = 'EMPE 510'), (SELECT department_id FROM departments WHERE code = 'EPS'), FALSE),
((SELECT course_id FROM courses WHERE code = 'EMPE 511'), (SELECT department_id FROM departments WHERE code = 'EPS'), FALSE),
((SELECT course_id FROM courses WHERE code = 'EMPE 510'), (SELECT department_id FROM departments WHERE code = 'PE'), FALSE),
((SELECT course_id FROM courses WHERE code = 'EMPE 511'), (SELECT department_id FROM departments WHERE code = 'PE'), FALSE);

-- Example inserts with application_id (assuming you have an 'applications' table)
INSERT INTO course_results (course_id, application_id, grade) VALUES
  ((SELECT course_id FROM courses WHERE code = 'EMPE 501'), 1, 85),  -- Application 1 in Project
  ((SELECT course_id FROM courses WHERE code = 'EMPE 502'), 1, 78),  -- Application 1 in Planning and Design...
  ((SELECT course_id FROM courses WHERE code = 'EMPE 503'), 1, 92),  -- Application 1 in Electrical Power Transmission...
  ((SELECT course_id FROM courses WHERE code = 'EMPE 501'), 2, 76),  -- Application 2 in Project
  ((SELECT course_id FROM courses WHERE code = 'EMPE 506'), 2, 88),  -- Application 2 in Electronic Control of AC Circuits
  ((SELECT course_id FROM courses WHERE code = 'EMPE 507'), 2, 65),  -- Application 2 in Industrial Electronics
  ((SELECT course_id FROM courses WHERE code = 'EMPE 510'), 2, 95),  -- Application 2 in Power System Protection (optional)
  ((SELECT course_id FROM courses WHERE code = 'EMPE 511'), 2, 70);  -- Application 2 in Renewable Energy Systems (optional)