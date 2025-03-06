-- ELEC
-- DIPLOMA
-- إدخال بيانات الأقسام
INSERT INTO
	departments (
		code,
		title,
		type,
		courses_hours,
		compulsory_hours,
		thesis_hours
	)
VALUES
	(
		'DNQE',
		'دبلوم نظم القوى الكهربية',
		'diploma',
		24,
		15,
		0
	);

INSERT INTO
	departments (
		code,
		title,
		type,
		courses_hours,
		compulsory_hours,
		thesis_hours
	)
VALUES
	(
		'DEPE',
		'دبلوم إلكترونيات القوى الكهربية',
		'diploma',
		24,
		15,
		0
	);

-- الدبلوم يتطلب 24 ساعة معتمدة كحد أدنى، منها 15 ساعة معتمدة مقررات إجبارية، والباقي من المقررات الاختيارية.
-- إدخال بيانات المقررات الإجبارية لقسم DNQE
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('EMPE 501', 'المشروع', NULL, 3),
	(
		'EMPE 502',
		'تخطيط وتصميم نظم توزيع القوى الكهربية',
		NULL,
		3
	),
	('EMPE 503', 'نظم نقل القوى الكهربية', NULL, 3),
	(
		'EMPE 504',
		'إدارة الأحمال وترشيد الطاقة',
		NULL,
		3
	),
	(
		'EMPE 505',
		'دراسة أداء نظم القوى الكهربية',
		NULL,
		3
	);

-- إدخال بيانات المقررات الإجبارية لقسم DEPE
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	(
		'EMPE 506',
		'التحكم الإلكتروني في دوائر التيار المتردد',
		NULL,
		3
	),
	('EMPE 507', 'إلكترونيات صناعية', NULL, 3),
	(
		'EMPE 508',
		'التوافقيات في نظم القوى الكهربية',
		NULL,
		3
	),
	(
		'EMPE 509',
		'التحكم الإلكتروني في آلات التيار المتردد',
		NULL,
		3
	);

-- إدخال بيانات المقررات الاختيارية
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	(
		'EMPE 510',
		'تصميم وتحليل عازلات الجهد العالي',
		NULL,
		3
	),
	(
		'EMPE 511',
		'تطبيقات في هندسة الجهد العالي',
		NULL,
		3
	),
	('EMPE 512', 'أنظمة القياس الرقمية', NULL, 3),
	(
		'EMPE 513',
		'تطبيقات التحكم في نظم القوى',
		NULL,
		3
	),
	('EMPE 514', 'المكملات المبرمجة المتقدمة', NULL, 3),
	(
		'EMPE 515',
		'أجهزة القياس والوقاية والقطعة',
		NULL,
		3
	),
	(
		'EMPE 516',
		'التشغيل الاقتصادي لنظم القوى الكهربية',
		NULL,
		3
	),
	('EMPE 517', 'جودة القدرة الكهربية', NULL, 3),
	(
		'EMPE 518',
		'دراسة الشبكة للأحمال ذات الطابع الخاص',
		NULL,
		3
	),
	(
		'EMPE 519',
		'اقتصاديات توليد الطاقة الكهربية',
		NULL,
		3
	),
	(
		'EMPE 520',
		'تصميم النظم الكهربية للمباني',
		NULL,
		3
	),
	(
		'EMPE 521',
		'الطرق الحديثة للتحكم الإلكتروني في الآلات الكهربية',
		NULL,
		3
	),
	(
		'EMPE 522',
		'تطبيقات إلكترونيات القوى الحديثة في نظم القوى الكهربية',
		NULL,
		3
	),
	(
		'EMPE 523',
		'موضوعات مختارة في الآلات الكهربية',
		NULL,
		3
	),
	(
		'EMPE 524',
		'طرق المتعة والتعليم في الآلات الكهربية',
		NULL,
		3
	),
	(
		'EMPE 525',
		'اختيار وتوصيف نظم التحريك الكهربي',
		NULL,
		3
	),
	('EMPE 526', 'رياضيات', NULL, 3),
	('EMPE 527', 'بحوث العمليات', NULL, 3),
	('EMPE 528', 'الإدارة الهندسية', NULL, 3),
	('EMPE 529', 'تحليل البيانات', NULL, 3),
	(
		'EMPE 530',
		'التطبيقات الحديثة في نظم القوى الكهربية',
		NULL,
		3
	),
	('EMPE 531', 'الحاسبات والتحليل العددي', NULL, 3),
	('EMPE 532', 'الإحصاء وتحليل البيانات', NULL, 3);

-- ربط الأقسام بالمواد الإجبارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'DNQE'
	),
	course_id,
	TRUE
FROM
	courses
WHERE
	code IN (
		'EMPE 501',
		'EMPE 502',
		'EMPE 503',
		'EMPE 504',
		'EMPE 505'
	);

INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'DEPE'
	),
	course_id,
	TRUE
FROM
	courses
WHERE
	code IN (
		'EMPE 501',
		'EMPE 506',
		'EMPE 507',
		'EMPE 508',
		'EMPE 509'
	);

-- ربط الأقسام بالمواد الاختيارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'DNQE'
	),
	course_id,
	FALSE
FROM
	courses
WHERE
	code IN (
		'EMPE 510',
		'EMPE 511',
		'EMPE 512',
		'EMPE 513',
		'EMPE 514',
		'EMPE 515',
		'EMPE 516',
		'EMPE 517',
		'EMPE 518',
		'EMPE 519',
		'EMPE 520',
		'EMPE 521',
		'EMPE 522',
		'EMPE 523',
		'EMPE 524',
		'EMPE 525',
		'EMPE 526',
		'EMPE 527',
		'EMPE 528',
		'EMPE 529',
		'EMPE 530',
		'EMPE 531',
		'EMPE 532'
	);

INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'DEPE'
	),
	course_id,
	FALSE
FROM
	courses
WHERE
	code IN (
		'EMPE 510',
		'EMPE 511',
		'EMPE 512',
		'EMPE 513',
		'EMPE 514',
		'EMPE 515',
		'EMPE 516',
		'EMPE 517',
		'EMPE 518',
		'EMPE 519',
		'EMPE 520',
		'EMPE 521',
		'EMPE 522',
		'EMPE 523',
		'EMPE 524',
		'EMPE 525',
		'EMPE 526',
		'EMPE 527',
		'EMPE 528',
		'EMPE 529',
		'EMPE 530',
		'EMPE 531',
		'EMPE 532'
	);

-- MASTER
-- إدخال بيانات الأقسام
INSERT INTO
	departments (
		code,
		title,
		type,
		courses_hours,
		compulsory_hours,
		thesis_hours
	)
VALUES
	(
		'MSEEPE',
		'ماجستير العلوم الهندسية في القوى والآلات الكهربية',
		'master',
		24,
		12,
		18
	);

-- يدرس الطالب 42 ساعة معتمدة على الأقل، منها 24 ساعة مقررات و 18 ساعة رسالة.
-- من بين ال 24 ساعة مقررات، 12 ساعة مقررات إجبارية والباقي مقررات اختيارية.
-- إدخال بيانات المقررات الإجبارية لقسم MSEEPE
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	(
		'ELEC 600',
		'اخلاقيات البحث العلمي والسلوك المسئول',
		NULL,
		3
	),
	(
		'ELEC 601',
		'كتابة تقارير فنية ومهارات اتصال',
		NULL,
		3
	),
	(
		'ELEC 602',
		'دراسات بحثية وإحصاء وتحليل بيانات',
		NULL,
		3
	),
	(
		'EMPE 603',
		'دراسة متقدمة في الآلات الكهربية',
		NULL,
		3
	),
	(
		'EMPE 604',
		'تحليل وتصميم الآلات الكهربية',
		NULL,
		3
	);

-- إدخال بيانات المقررات الاختيارية لقسم MSEEPE
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	(
		'EMPE 605',
		'الأداء غير المتوازن للآلات الكهربية',
		NULL,
		3
	),
	('EMPE 606', 'الآلات الكهربية الخاصة', NULL, 3),
	('EMPE 607', 'هندسة الجهد العالي', NULL, 3),
	('EMPE 608', 'قياسات دقيقة', NULL, 3),
	('EMPE 609', 'المواد الكهربية', NULL, 3),
	(
		'EMPE 610',
		'تطبيقات إحصائية في هندسة القوى الكهربية',
		NULL,
		3
	),
	('EMPE 611', 'تحليل نظم القوى الكهربية', NULL, 3),
	(
		'EMPE 612',
		'التمثيل الديناميكي لأنظمة القوى الكهربية',
		NULL,
		3
	),
	(
		'EMPE 613',
		'التحكم في نظم القوى الكهربية',
		NULL,
		3
	),
	(
		'EMPE 614',
		'التشغيل الأمثل لأنظمة القوى الكهربية',
		NULL,
		3
	),
	('EMPE 615', 'تخطيط نظم القوى الكهربية', NULL, 3),
	(
		'EMPE 616',
		'دراسات خاصة في هندسة نظم القوى الكهربية',
		NULL,
		3
	),
	('EMPE 617', 'الجر والنقل الكهربي', NULL, 3),
	(
		'EMPE 618',
		'اقتصاديات وتشغيل نظم القوى الكهربية',
		NULL,
		3
	),
	('EMPE 619', 'تحويل الطاقة', NULL, 3),
	('EMPE 620', 'الكترونيات صناعية متقدمة', NULL, 3),
	(
		'EMPE 621',
		'تحليل وتصميم مكونات دوائر الكترونيات القوى',
		NULL,
		3
	),
	('EMPE 622', 'وقاية نظم القوى الكهربية', NULL, 3),
	(
		'EMPE 623',
		'التحليل الرقمي للمجالات الكهرومغناطيسية',
		NULL,
		3
	),
	(
		'EMPE 624',
		'الظواهر العابرة في نظم القوى الكهربية',
		NULL,
		3
	),
	(
		'EMPE 625',
		'تطبيقات الليزر في الهندسة الكهربية',
		NULL,
		3
	),
	(
		'EMPE 626',
		'طرق التصميم بالحاكم الرقمي الصناعي',
		NULL,
		3
	),
	('EMPE 627', 'نظم التحكم بالحاسب', NULL, 3),
	('EMPE 628', 'نظم التحكم الذكية', NULL, 3),
	(
		'EMPE 629',
		'ترشيد الطاقة والتعريفة الكهربية',
		NULL,
		3
	),
	(
		'EMPE 630',
		'دراسات متقدمة في هندسة النظم',
		NULL,
		3
	),
	(
		'EMPE 631',
		'دراسات متقدمة في بحوث العمليات',
		NULL,
		3
	),
	(
		'EMPE 632',
		'استخدام الذكاء الاصطناعي في معظم القوى الكهربية',
		NULL,
		3
	),
	(
		'EMPE 633',
		'النمذجة والتحكم في الإنسان الآلي',
		NULL,
		3
	),
	(
		'EMPE 634',
		'أنظمة الاتصالات المستخدمة في نظم القوى الكهربية',
		NULL,
		3
	);

-- ربط الأقسام بالمواد الإجبارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'MSEEPE'
	),
	course_id,
	TRUE
FROM
	courses
WHERE
	code IN (
		'ELEC 600',
		'ELEC 601',
		'ELEC 602',
		'EMPE 603',
		'EMPE 604'
	);

-- ربط الأقسام بالمواد الاختيارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'MSEEPE'
	),
	course_id,
	FALSE
FROM
	courses
WHERE
	code IN (
		'EMPE 605',
		'EMPE 606',
		'EMPE 607',
		'EMPE 608',
		'EMPE 609',
		'EMPE 610',
		'EMPE 611',
		'EMPE 612',
		'EMPE 613',
		'EMPE 614',
		'EMPE 615',
		'EMPE 616',
		'EMPE 617',
		'EMPE 618',
		'EMPE 619',
		'EMPE 620',
		'EMPE 621',
		'EMPE 622',
		'EMPE 623',
		'EMPE 624',
		'EMPE 625',
		'EMPE 626',
		'EMPE 627',
		'EMPE 628',
		'EMPE 629',
		'EMPE 630',
		'EMPE 631',
		'EMPE 632',
		'EMPE 633',
		'EMPE 634'
	);

-- إدخال بيانات الأقسام
INSERT INTO
	departments (
		code,
		title,
		type,
		courses_hours,
		compulsory_hours,
		thesis_hours
	)
VALUES
	(
		'MSEECE',
		'ماجستير العلوم الهندسية في الإلكترونيات',
		'master',
		24,
		12,
		18
	);

-- يدرس الطالب 42 ساعة معتمدة على الأقل، منها 24 ساعة مقررات و 18 ساعة رسالة.
-- من بين ال 24 ساعة مقررات، 12 ساعة مقررات إجبارية والباقي مقررات اختيارية.
--يمكن اختيار المقررات الاختيارية من مقررات هذا التخصص أو أي تخصص آخر بالقسم بعد موافقة المشرف الأكاديمي.
-- إدخال بيانات المقررات الإجبارية لقسم MSEECE
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	(
		'EECE 601',
		'الدوائر المتكاملة التناظرية',
		NULL,
		3
	),
	('EECE 602', 'الدوائر المتكاملة الرقمية', NULL, 3);

-- إدخال بيانات المقررات الاختيارية لقسم MSEECE
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('EECE 603', 'الكترونيات الحالة الصلبة', NULL, 3),
	('EECE 604', 'التصميم بمساعدة الحاسب', NULL, 3),
	('EECE 605', 'معالجة الاشارات الرقمية', NULL, 3),
	(
		'EECE 606',
		'تصميم الدوائر المتكاملة لترددات الراديو',
		NULL,
		3
	),
	('EECE 607', 'الالكترونيات الضوئية', NULL, 3),
	('EECE 608', 'الكترونيات الموجات الدقيقة', NULL, 3),
	(
		'EECE 609',
		'موضوعات مختارة في الالكترونيات',
		NULL,
		3
	);

-- ربط الأقسام بالمواد الإجبارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'MSEECE'
	),
	course_id,
	TRUE
FROM
	courses
WHERE
	code IN (
		'ELEC 600',
		'ELEC 601',
		'ELEC 602',
		'EECE 601',
		'EECE 602'
	);

-- ربط الأقسام بالمواد الاختيارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'MSEECE'
	),
	course_id,
	FALSE
FROM
	courses
WHERE
	code IN (
		'EECE 603',
		'EECE 604',
		'EECE 605',
		'EECE 606',
		'EECE 607',
		'EECE 608',
		'EECE 609'
	);

-- إدخال بيانات الأقسام
INSERT INTO
	departments (
		code,
		title,
		type,
		courses_hours,
		compulsory_hours,
		thesis_hours
	)
VALUES
	(
		'MSEEC',
		'ماجستير العلوم الهندسية في الاتصالات',
		'master',
		24,
		12,
		18
	);

-- يدرس الطالب 42 ساعة معتمدة على الأقل، منها 12 ساعة مقررات إجبارية من التخصص، ورسالة الماجستير (18 ساعة معتمدة)، و 12 ساعة معتمدة من المقررات الاختيارية للتخصص.
-- يمكن اختيار المقررات الاختيارية من مقررات هذا التخصص أو أي تخصص آخر بالقسم بعد موافقة المشرف الأكاديمي.
-- إدخال بيانات المقررات الإجبارية لقسم MSEEC
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	(
		'MATH 601',
		'موضوعات متقدمة في الرياضيات',
		NULL,
		3
	),
	('EECC 601', 'الاتصالات الرقمية', NULL, 3);

-- إدخال بيانات المقررات الاختيارية لقسم MSEEC
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('EECC 602', 'شبكات اتصال الحاسبات', NULL, 3),
	('EECC 603', 'نظرية المعلومات والتكويد', NULL, 3),
	(
		'EECC 604',
		'موضوعات في معالجة الإشارات الرقمية',
		NULL,
		3
	),
	(
		'EECC 605',
		'نظم الاتصالات بالأقمار الصناعية',
		NULL,
		3
	),
	(
		'EECC 606',
		'معالجة الإشارات الصوتية والمرئية',
		NULL,
		3
	),
	('EECC 607', 'نظم اتصالات المتحركات', NULL, 3),
	('EECC 608', 'تكنولوجيا الموجات الدقيقة', NULL, 3),
	('EECC 609', 'نظم الهوائيات المتقدمة', NULL, 3),
	(
		'EECC 610',
		'موضوعات مختارة في الاتصالات',
		NULL,
		3
	);

-- ربط الأقسام بالمواد الإجبارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'MSEEC'
	),
	course_id,
	TRUE
FROM
	courses
WHERE
	code IN (
		'ELEC 600',
		'ELEC 601',
		'ELEC 602',
		'MATH 601',
		'EECC 601'
	);

-- ربط الأقسام بالمواد الاختيارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'MSEEC'
	),
	course_id,
	FALSE
FROM
	courses
WHERE
	code IN (
		'EECC 602',
		'EECC 603',
		'EECC 604',
		'EECC 605',
		'EECC 606',
		'EECC 607',
		'EECC 608',
		'EECC 609',
		'EECC 610'
	);

-- إدخال بيانات الأقسام
INSERT INTO
	departments (
		code,
		title,
		type,
		courses_hours,
		compulsory_hours,
		thesis_hours
	)
VALUES
	(
		'MSEECMP',
		'ماجستير العلوم الهندسية في الحاسبات',
		'master',
		24,
		12,
		18
	);

-- يدرس الطالب 42 ساعة معتمدة على الأقل، منها 24 ساعة مقررات و 18 ساعة رسالة.
-- من بين ال 24 ساعة مقررات، 12 ساعة مقررات إجبارية من التخصص و 12 ساعة معتمدة من المقررات الاختيارية للتخصص.
--يجوز عند اللزوم استبدال 3 ساعات منها على الأكثر بمقررات من نفس المستوى بالقسم أو الأقسام الأخرى بشرط موافقة مجلس القسم.
-- إدخال بيانات المقررات الإجبارية لقسم MSEECMP
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('CMPE 603', 'شبكات حاسبات', NULL, 3),
	('CMPE 604', 'البنية المعاصرة للحاسب', NULL, 3);

-- إدخال بيانات المقررات الاختيارية لقسم MSEECMP
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	(
		'CMPE 605',
		'تحليل الصور والرؤية بالحاسب',
		NULL,
		3
	),
	(
		'CMPE 606',
		'النمذجة ومحاكاة نظم الحاسبات',
		NULL,
		3
	),
	('CMPE 607', 'نظم قواعد بيانات متقدم', NULL, 3),
	('CMPE 608', 'ذكاء الآلة 2', NULL, 3),
	(
		'CMPE 609',
		'نظرية البرمجة ولغات البرمجة',
		NULL,
		3
	),
	('CMPE 610', 'أمن الحاسبات', NULL, 3),
	(
		'CMPE 611',
		'شبكات الحاسبات اللاسلكية والمتحركة',
		NULL,
		3
	),
	(
		'CMPE 612',
		'موضوعات مختارة في تكنولوجيا العصبيات',
		NULL,
		3
	),
	(
		'CMPE 613',
		'موضوعات مختارة في هندسة المعلومات',
		NULL,
		3
	);

-- ربط الأقسام بالمواد الإجبارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'MSEECMP'
	),
	course_id,
	TRUE
FROM
	courses
WHERE
	code IN (
		'ELEC 600',
		'ELEC 601',
		'ELEC 602',
		'CMPE 603',
		'CMPE 604'
	);

-- ربط الأقسام بالمواد الاختيارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'MSEECMP'
	),
	course_id,
	FALSE
FROM
	courses
WHERE
	code IN (
		'CMPE 605',
		'CMPE 606',
		'CMPE 607',
		'CMPE 608',
		'CMPE 609',
		'CMPE 610',
		'CMPE 611',
		'CMPE 612',
		'CMPE 613'
	);

-- PHD
-- إدخال بيانات الأقسام
INSERT INTO
	departments (
		code,
		title,
		type,
		courses_hours,
		compulsory_hours,
		thesis_hours
	)
VALUES
	(
		'PHDPE',
		'دكتوراة الفلسفة في القوى والآلات الكهربية',
		'phd',
		18,
		9,
		36
	);

-- يتطلب البرنامج 54 ساعة معتمدة كحد أدنى، منها 9 ساعات مقررات إجبارية، و 9 ساعات مقررات اختيارية، و 36 ساعة لرسالة الدكتوراه.
-- يمكن لطالب الدكتوراه حضور مادة 602 (دراسات بحثية وإحصاء وتحليل بيانات) إذا لم يكن قد سبق له دراستها خلال 5 سنوات سابقة، وتُحسب ضمن ساعات المقررات الاختيارية.
-- إدخال بيانات المقررات الإجبارية لقسم PHDPE
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	(
		'EMPE 701',
		'دراسات متخصصة في هندسة القوى الكهربية',
		NULL,
		3
	),
	(
		'EMPE 702',
		'دراسات متقدمة في نظم القوى الكهربية 1',
		NULL,
		3
	),
	(
		'EMPE 703',
		'دراسات متقدمة في نظم القوى الكهربية 2',
		(SELECT course_id FROM courses WHERE code = 'EMPE 702'),
		3
	);

-- إدخال بيانات المقررات الاختيارية لقسم PHDPE
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	(
		'EMPE 704',
		'دراسات متقدمة في توليد واستخدام الطاقة الكهربية 1',
		NULL,
		3
	),
	(
		'EMPE 705',
		'دراسات متقدمة في توليد واستخدام الطاقة الكهربية 2',
		(SELECT course_id FROM courses WHERE code = 'EMPE 704'),
		3
	),
	(
		'EMPE 706',
		'دراسات متقدمة في هندسة الجهد العالي 1',
		NULL,
		3
	),
	(
		'EMPE 707',
		'دراسات متقدمة في هندسة الجهد العالي 2',
		(SELECT course_id FROM courses WHERE code = 'EMPE 706'),
		3
	),
	(
		'EMPE 708',
		'دراسات متقدمة في هندسة الآلات الكهربية ونظم التحريك 1',
		NULL,
		3
	),
	(
		'EMPE 709',
		'دراسات متقدمة في هندسة الآلات الكهربية ونظم التحريك 2',
		(SELECT course_id FROM courses WHERE code = 'EMPE 708'),
		3
	),
	(
		'EMPE 710',
		'دراسات متقدمة في نظم التحكم الآلي 1',
		NULL,
		3
	),
	(
		'EMPE 711',
		'دراسات متقدمة في نظم التحكم الآلي 2',
		(SELECT course_id FROM courses WHERE code = 'EMPE 710'),
		3
	),
	(
		'EMPE 712',
		'دراسات متقدمة في الكترونيات القوى 1',
		NULL,
		3
	),
	(
		'EMPE 713',
		'دراسات متقدمة في الكترونيات القوى 2',
		(SELECT course_id FROM courses WHERE code = 'EMPE 712'),
		3
	);

-- ربط الأقسام بالمواد الإجبارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'PHDPE'
	),
	course_id,
	TRUE
FROM
	courses
WHERE
	code IN ('EMPE 701', 'EMPE 702', 'EMPE 703');

-- ربط الأقسام بالمواد الاختيارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'PHDPE'
	),
	course_id,
	FALSE
FROM
	courses
WHERE
	code IN (
		'EMPE 704',
		'EMPE 705',
		'EMPE 706',
		'EMPE 707',
		'EMPE 708',
		'EMPE 709',
		'EMPE 710',
		'EMPE 711',
		'EMPE 712',
		'EMPE 713'
	);

-- إدخال بيانات الأقسام
INSERT INTO
	departments (
		code,
		title,
		type,
		courses_hours,
		compulsory_hours,
		thesis_hours
	)
VALUES
	(
		'PHDECE',
		'دكتوراة الفلسفة في الالكترونيات',
		'phd',
		12,
		3,
		38
	);

-- يتطلب البرنامج 12 ساعة معتمدة للمقررات (3 ساعات إجبارية و 9 ساعات اختيارية) و 48 ساعة لرسالة الدكتوراه، ليصبح المجموع 60 ساعة معتمدة.
-- إدخال بيانات المقررات الإجبارية لقسم PHDECE
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	(
		'EECE 700',
		'موضوعات في الدوائر المتكاملة الرقمية',
		NULL,
		3
	),
	(
		'EECE 701',
		'موضوعات في الدوائر المتكاملة التناظرية',
		NULL,
		3
	),
	(
		'EECE 702',
		'موضوعات في التصميم بمساعدة الحاسب',
		NULL,
		3
	);

-- إدخال بيانات المقررات الاختيارية لقسم PHDECE
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	(
		'EECE 703',
		'الكترونيات الحالة الصلبة للموجات الدقيقة',
		NULL,
		3
	),
	('EECE 704', 'دوائر الموجات الدقيقة', NULL, 3),
	(
		'EECE 705',
		'موضوعات مختارة في النبائط الإلكترونية',
		NULL,
		3
	),
	(
		'EECE 706',
		'موضوعات في تجهيز الاشارات الرقمية',
		NULL,
		3
	),
	(
		'EECE 707',
		'موضوعات في الدوائر المتكاملة واسعة النطاق',
		NULL,
		3
	),
	(
		'EECE 708',
		'الإلكترونيات الدقيقة في ترددات الراديو',
		NULL,
		3
	);

-- ربط الأقسام بالمواد الإجبارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'PHDECE'
	),
	course_id,
	TRUE
FROM
	courses
WHERE
	code IN ('EECE 700', 'EECE 701', 'EECE 702');

-- ربط الأقسام بالمواد الاختيارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'PHDECE'
	),
	course_id,
	FALSE
FROM
	courses
WHERE
	code IN (
		'EECE 703',
		'EECE 704',
		'EECE 705',
		'EECE 706',
		'EECE 707',
		'EECE 708'
	);

-- إدخال بيانات الأقسام
INSERT INTO
	departments (
		code,
		title,
		type,
		courses_hours,
		compulsory_hours,
		thesis_hours
	)
VALUES
	(
		'PHDEEC',
		'دكتوراة الفلسفة في الاتصالات',
		'phd',
		18,
		9,
		36
	);

-- يتطلب البرنامج 54 ساعة معتمدة كحد أدنى، منها 9 ساعات مقررات إجبارية، و 9 ساعات مقررات اختيارية أو مقررات من الماجستير (600 أو 700)، و 36 ساعة لرسالة الدكتوراه.
-- إدخال بيانات المقررات الإجبارية لقسم PHDEEC
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	(
		'EECC 700',
		'موضوعات متقدمة 1 في الاتصالات',
		NULL,
		3
	),
	('EECC 701', 'نظم الرادار والسونار', NULL, 3),
	('EECC 702', 'نظرية الكشف والتقدير', NULL, 3),
	('EECC 703', 'نظم الاتصالات الضوئية', NULL, 3);

-- إدخال بيانات المقررات الاختيارية لقسم PHDEEC
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	(
		'EECC 704',
		'الشبكات اللاسلكية التلقائية وشبكات المجسات',
		NULL,
		3
	),
	(
		'EECC 705',
		'التكنولوجيا المتقدمة في الموجات الدقيقة',
		NULL,
		3
	),
	('EECC 706', 'الاستشعار عن بعد', NULL, 3),
	(
		'EECC 707',
		'موضوعات متقدمة 2 في الاتصالات',
		NULL,
		3
	),
	(
		'EECC 708',
		'موضوعات متقدمة 3 في الاتصالات',
		NULL,
		3
	);

-- ربط الأقسام بالمواد الإجبارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'PHDEEC'
	),
	course_id,
	TRUE
FROM
	courses
WHERE
	code IN ('EECC 700', 'EECC 701', 'EECC 702', 'EECC 703');

-- ربط الأقسام بالمواد الاختيارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'PHDEEC'
	),
	course_id,
	FALSE
FROM
	courses
WHERE
	code IN (
		'EECC 704',
		'EECC 705',
		'EECC 706',
		'EECC 707',
		'EECC 708'
	);

-- إدخال بيانات الأقسام
INSERT INTO
	departments (
		code,
		title,
		type,
		courses_hours,
		compulsory_hours,
		thesis_hours
	)
VALUES
	(
		'PHDECMP',
		'دكتوراة الفلسفة في الحاسبات',
		'phd',
		36,
		9,
		18
	);

-- يتطلب البرنامج 54 ساعة معتمدة كحد أدنى، منها 18 ساعة رسالة، و 9 ساعات مقررات إجبارية من التخصص، وباقي الساعات مقررات اختيارية في التخصص.
-- يتعين على الطالب اجتياز متطلب الامتحان الشامل في التخصص بعدد 3 ساعات معتمدة (2 ساعة نظري + 2 ساعة عملي).
-- إدخال بيانات المقررات الإجبارية لقسم PHDECMP
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	(
		'CMPE 700',
		'تطبيقات علوم الحاسبات المتقدمة',
		NULL,
		3
	),
	('CMPE 701', 'لغات البرمجة المتقدمة', NULL, 3),
	(
		'CMPE 702',
		'موضوعات متقدمة في تكنولوجيا الحاسبات',
		NULL,
		3
	);

-- إدخال بيانات المقررات الاختيارية لقسم PHDECMP
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	(
		'CMPE 703',
		'موضوعات متقدمة في هندسة الحاسبات',
		NULL,
		3
	),
	(
		'CMPE 704',
		'موضوعات متقدمة في هندسة البرمجيات',
		NULL,
		3
	);

-- ربط الأقسام بالمواد الإجبارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'PHDECMP'
	),
	course_id,
	TRUE
FROM
	courses
WHERE
	code IN ('CMPE 700', 'CMPE 701', 'CMPE 702');

-- ربط الأقسام بالمواد الاختيارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'PHDECMP'
	),
	course_id,
	FALSE
FROM
	courses
WHERE
	code IN ('CMPE 703', 'CMPE 704');
