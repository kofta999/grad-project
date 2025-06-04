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


-- Generated SQL from File 2, conformed to File 1 schema requirements
-- Extra fields removed, courses deduplicated by code (first instance kept)

-- =============================================
-- DEPARTMENTS
-- =============================================
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
			'DCE',
			'دبلوم الهندسة الإنشائية',
			'diploma',
			24,
			15,
			3
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
			'DEM',
			'دبلوم الدراسات العليا في إدارة مشروعات التشييد',
			'diploma',
			24,
			15,
			3
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
			'DGM',
			'دبلوم الدراسات العليا في هندسة الجيوماتكس',
			'diploma',
			24,
			15,
			3
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
			'DHE',
			'دبلوم الدراسات العليا في الهندسة الصحية',
			'diploma',
			24,
			15,
			3
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
			'DRT',
			'دبلوم الدراسات العليا في هندسة الطرق والنقل',
			'diploma',
			24,
			15,
			3
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
			'DPE',
			'دبلوم الدراسات العليا في هندسة الموانئ',
			'diploma',
			24,
			15,
			3
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
			'MSC_SE',
			'ماجستير العلوم الهندسية في الهندسة الإنشائية',
			'master',
			42,
			12,
			18
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
			'CMP',
			'ماجستير العلوم الهندسية في إدارة مشروعات التشييد',
			'master',
			42,
			24,
			18
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
			'MGEO',
			'ماجستير العلوم الهندسية في هندسة الجيوماتكس',
			'master',
			24,
			12,
			18
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
			'MHE',
			'ماجستير العلوم الهندسية في الهندسة الصحية',
			'master',
			24,
			18,
			18
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
			'MRT',
			'ماجستير العلوم الهندسية في هندسة الطرق والنقل',
			'master',
			24,
			18,
			18
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
			'MWRE',
			'ماجستير العلوم الهندسية في هندسة الري والموارد المائية',
			'master',
			24,
			18,
			18
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
			'PHD_STR',
			'دكتوراه الفلسفة في الهندسة الإنشائية',
			'phd',
			18,
			9,
			36
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
			'PHD_CM',
			'دكتوراه الفلسفة في إدارة مشروعات التشييد',
			'phd',
			12,
			9,
			48
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
			'PHD_GEO',
			'دكتوراه الفلسفة في هندسة الجيوماتكس',
			'phd',
			18,
			9,
			48
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
			'PHD_HENG',
			'دكتوراه الفلسفة في الهندسة الصحية',
			'phd',
			18,
			9,
			54
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
			'PHD_RTE',
			'دكتوراه الفلسفة في هندسة الطرق والنقل',
			'phd',
			18,
			9,
			54
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
			'PHD_WRE',
			'دكتوراه الفلسفة في هندسة الري والموارد المائية',
			'phd',
			18,
			9,
			54
		);

-- =============================================
-- COURSES (Deduplicated, conformed schema)
-- =============================================
INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('UNR600', 'اخلاقيات البحث العلمي', NULL, 1);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('UNR501', 'التحليل الإنشائي', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV500', 'مشروع', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV501', 'تحليل منشآت متقدم', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV502', 'خواص واختبار المواد', NULL, 2);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV503',
			'المنشآت الخرسانية سابقة الإجهاد',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV504', 'سلوك المنشآت الجيولوجية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV505',
			'التحليل الإنشائي (1) للهندسة الإنشائية',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV506', 'ديناميكا المنشآت', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV507', 'التأهيل الهندسي', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV508', 'أسس تصميم المنشآت المعدنية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV509', 'الأساسات في الهندسة الإنشائية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV510', 'طرق ترميم وتدعيم المنشآت', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('UNR601', 'التحليل الإحصائي للبيانات', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV514', 'الادارة العامة في التشييد', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV515', 'تخطيط و مراقبة المشروعات', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV516', 'العطاءات و العقود', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV517', 'معدات التشييد', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV511', 'ضبط و تأكيد الجودة', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV512', 'الكباري الخرسانية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV513',
			'تصنيع و تركيب و صيانة المنشآت الحديدية',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV521', 'ضبط الأرصاد المساحية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV522', 'أساسيات الجيوديسيا', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV523', 'نظام تحديد المواقع العالمي', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV524', 'أساسيات المساحة التصويرية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV525', 'أساسيات المساحة البحرية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV526', 'مقدمة عن الاستشعار عن بعد', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV527', 'أساسيات نظم المعلومات الجغرافية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV528',
			'التحليل الإحصائي للأرصاد المساحية',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV529',
			'تطبيقات الحاسب الآلي في هندسة الجيوماتكس',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV530', 'مقدمة عن أسقاط الخرائط', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV549', 'الاحتمالات والإحصاء', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV531', 'نظم توزيع مياه الشرب', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV532', 'هندسة التحكم في التلوث البيئي', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV533',
			'إنشاء وصيانة نظم شبكات الصرف الصحي',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV534', 'عمليات الهندسة الصحية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV535', 'هندسة تنقية المياه', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV536', 'معالجة مياه الصرف الصحي', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV537', 'معالجة الحمأة', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV538', 'إدارة المخلفات الصلبة', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV539',
			'تصميم محطات معالجة المخلفات السائلة',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV540', 'مواد الطرق والخلطات البيتومينية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV541',
			'التطبيقات المتقدمة للحاسب في الطرق والمرور',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV542', 'هندسة السكك الحديدية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV543',
			'تطبيقات مختارة في هندسة الطرق والمرور',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV544', 'صيانة الطرق', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV545', 'النقل والموانئ', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV546', 'اقتصاديات النقل', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV547', 'هندسة الصرف', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV548', 'هندسة المطارات', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV550', 'الهندسة الهيدروليكية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV551', 'الهيدرولوجيا الهندسية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV552', 'هندسة الري والصرف', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV553', 'هندسة الشواطئ والموانئ', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV554', 'هيدروديناميكا', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV555', 'منشآت هيدروليكية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV556',
			'ميكانيكا الأمواج وعمليات نقل الرواسب',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV557', 'الملاحة الداخلية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV558', 'هندسة البيئة الساحلية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV601',
			'الابتكارات الخاصة بالمنشآت والتقنيات',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV602', 'الاحصاء في الهندسة الانشائية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV603', 'ديناميكا التربة', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV604',
			'التحليل العددي في الهندسة الانشائية (2)',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV605', 'طريقة العناصر المحددة', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV606', 'إدارة موارد', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV607', 'هندسة الرياح والزلازل', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV608',
			'الأكواد القياسية للمشروعات الإنشائية',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV609', 'طرق الاحصاء والاحتمالات', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV610', 'المواد المركبة', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('1UNR60', 'التحليل الإحصائي للبيانات', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV611', 'المحاسبة و الإدارة المالية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV612',
			'استخدام الذكاء الاصطناعي في إدارة مشروعات التشييد',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV613', 'إدارة و تطوير العقود', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV614', 'إدارة الجودة و إعداد القرار', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV615', 'السلوك التنظيمي', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV616', 'أسس الكتابة الفنية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV621', 'تحليل وضبط الأرصاد المساحية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV622', 'الجيوديسيا (1)', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV623', 'المساحة التصويرية (1)', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV624',
			'تطبيقات برمجة الحاسب الآلي في هندسة الجيوماتكس',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV625',
			'تطبيقات الاستشعار عن بعد',
			(SELECT course_id FROM courses WHERE code = 'CIV603'),
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV626', 'المساحة البحرية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV627',
			'تطبيقات نظم المعلومات الجغرافية',
			(SELECT course_id FROM courses WHERE code = 'CIV603'),
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV628',
			'جيوديسيا الأقمار الصناعية',
			(SELECT course_id FROM courses WHERE code = 'CIV602'),
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV629', 'تطبيقات إسقاط الخرائط', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV630', 'هيدروليكا الشبكات والمحطات', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV631', 'دراسات متقدمة في تنقية المياه', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV632',
			'دراسات متقدمة في معالجة مياه الصرف الصحي',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV633', 'كيمياء المياه', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV634', 'ميكروبيولوجي المياه', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV635', 'معالجة الحمأة الناتجة', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV636', 'تخطيط شبكات المرافق الاقتصادية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV637', 'النمذجة في تنقية مياه الشرب', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV638', 'التصميم الإنشائي للطرق', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV639', 'تخطيط النقل', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV640', 'كفاءة خطوط السكك الحديدية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV641', 'تصميم رصف المطارات', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV642',
			'تخطيط وتشغيل وإدارة النقل العام',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV643',
			'تطبيقات في عمليات إدارة وتنظيم المرور',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV644', 'تخطيط وتوقع مصادر الطرق', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV645',
			'تصميم وتحليل عناصر السكك الحديدية',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV646', 'ميكانيكا الموائع المتقدمة', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV647', 'تصميمات نظم الري والصرف', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV648', 'نظم موارد المياه', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV649', 'تصميم المنشآت البحرية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV650',
			'التقييم البيئي للمشروعات الساحلية',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV651', 'حركة الأمواج والتيارات البحرية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV652', 'هيدروليكا متقدمة', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV653', 'اقتصاديات إدارة الموارد المائية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV701', 'تحليل عددي متقدم', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV702',
			'موضوعات متقدمة في تحليل العناصر المحددة',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV703', 'طريقة العناصر الحدودية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV704', 'نظرية اللدونة', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV705', 'ديناميكا التربة والأساسات', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV706', 'نظرية القشريات', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV707', 'الطرق الحسابية لميكانيكا الكسر', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV708', 'إدارة أصول البنية التحتية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV709', 'إدارة التكاليف', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV710', 'التخطيط الاستراتيجي', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV711', 'إدارة الجودة والأمان', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV712', 'إدارة البيئة في صناعة التشييد', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV713', 'إدارة موارد المشروع', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV714', 'قوانين صناعة التشييد', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV721', 'نماذج سطح الأرض الرقمية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV722', 'الجيوديسيا (2)', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV723', 'المساحة التصويرية (2)', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV724',
			'موضوعات متقدمة في نظم تحديد المواقع العالمية',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV725',
			'موضوعات متقدمة في الاستشعار عن بعد',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV726',
			'موضوعات متقدمة في نظم المعلومات الجغرافية',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV727', 'شبكات مياه الشرب', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV728', 'شبكات الصرف الصحي', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV729', 'علوم بيئية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV730', 'إدارة وتشريعات بيئية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV731', 'تلوث المياه والتربة', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV732', 'الطرق المتقدمة في تنقية المياه', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV733', 'عمليات التشغيل', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV734', 'تحليل الطلب على النقل', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV735',
			'موضوعات متقدمة في هندسة الطرق والمطارات والمرور',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV736', 'معدات إنشاء الطرق والمطارات', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV737',
			'أساليب متطورة لتشغيل النقل العام',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV738', 'هندسة وتخطيط السكك الحديدية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV739', 'موضوعات متقدمة في السكك الحديدية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV740',
			'موضوعات متقدمة في عمليات إدارة وتنظيم المرور',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV741',
			'تطبيقات البرامج المتداولة في هندسة المياه والبيئة',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV742', 'الإدارة المتكاملة للمناطق الساحلية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV743', 'تصميم المنشآت البحرية (2)', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV744', 'تصميم السدود الصغيرة', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV745', 'حركة الملوثات بالمياه الجوفية', NULL, 3);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		(
			'CIV746',
			'الجريان غير المستقر بالمجاري المفتوحة والمغلقة',
			NULL,
			3
		);

INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('CIV747', 'محاكاة سريان المياه الجوفية', NULL, 3);

-- =============================================
-- DEPARTMENT_COURSES (Referential integrity maintained)
-- =============================================
INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'DCE'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN (
			'UNR600',
			'UNR501',
			'CIV500',
			'CIV501',
			'CIV502',
			'CIV503',
			'CIV504'
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
				code = 'DCE'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN (
			'CIV505',
			'CIV506',
			'CIV507',
			'CIV508',
			'CIV509',
			'CIV510'
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
				code = 'DEM'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN (
			'UNR600',
			'UNR601',
			'CIV500',
			'CIV514',
			'CIV515',
			'CIV516',
			'CIV517'
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
				code = 'DEM'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN (
			'CIV502',
			'CIV509',
			'CIV510',
			'CIV511',
			'CIV512',
			'CIV513'
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
				code = 'DGM'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN (
			'UNR600',
			'UNR601',
			'CIV500',
			'CIV521',
			'CIV522',
			'CIV523',
			'CIV524'
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
				code = 'DGM'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN (
			'CIV525',
			'CIV526',
			'CIV527',
			'CIV528',
			'CIV529',
			'CIV530'
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
				code = 'DHE'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN (
			'UNR600',
			'UNR601',
			'CIV500',
			'CIV549',
			'CIV531',
			'CIV532',
			'CIV533'
		);

-- Note: The original DHE elective department_courses was incomplete, so it's omitted.
-- Note: The original DRT compulsory department_courses was incomplete, so it's omitted.
INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'DPE'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN (
			'UNR600',
			'UNR601',
			'CIV500',
			'CIV550',
			'CIV551',
			'CIV552',
			'CIV553'
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
				code = 'DPE'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN (
			'CIV554',
			'CIV555',
			'CIV556',
			'CIV557',
			'CIV558'
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
				code = 'MSC_SE'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN (
			'UNR600',
			'UNR601',
			'CIV601',
			'CIV602',
			'CIV603',
			'CIV604'
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
				code = 'MSC_SE'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN (
			'CIV605',
			'CIV606',
			'CIV607',
			'CIV608',
			'CIV609',
			'CIV610',
			'CIV509',
			'CIV503',
			'CIV504'
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
				code = 'CMP'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN (
			'UNR600',
			'1UNR60',
			'CIV609',
			'CIV610',
			'CIV611',
			'CIV612'
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
				code = 'CMP'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN (
			'CIV613',
			'CIV614',
			'CIV615',
			'CIV616',
			'CIV607',
			'CIV608'
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
				code = 'MGEO'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN (
			'UNR600',
			'UNR601',
			'CIV621',
			'CIV622',
			'CIV623',
			'CIV624'
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
				code = 'MGEO'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN (
			'CIV625',
			'CIV626',
			'CIV627',
			'CIV628',
			'CIV629'
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
				code = 'MHE'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN (
			'UNR600',
			'UNR601',
			'CIV630',
			'CIV631',
			'CIV632',
			'CIV633'
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
				code = 'MHE'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN (
			'CIV634',
			'CIV635',
			'CIV636',
			'CIV637',
			'CIV622',
			'CIV625'
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
				code = 'MRT'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN (
			'UNR600',
			'UNR601',
			'CIV638',
			'CIV639',
			'CIV640',
			'CIV641'
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
				code = 'MRT'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN (
			'CIV642',
			'CIV643',
			'CIV644',
			'CIV645',
			'CIV622', -- This CIV622 is 'الجيوديسيا (1)'
			'CIV625'
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
				code = 'MWRE'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN (
			'UNR600',
			'UNR601',
			'CIV646',
			'CIV647',
			'CIV648',
			'CIV649'
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
				code = 'MWRE'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN (
			'CIV650',
			'CIV651',
			'CIV652',
			'CIV653',
			'CIV622',
			'CIV625'
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
				code = 'PHD_STR'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN ('CIV701', 'CIV702', 'CIV703');

INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'PHD_STR'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN ('CIV704', 'CIV705', 'CIV706', 'CIV707');

INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'PHD_CM'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN ('CIV708', 'CIV709', 'CIV710');

INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'PHD_CM'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN ('CIV711', 'CIV712', 'CIV713', 'CIV714');

INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'PHD_GEO'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN ('CIV721', 'CIV722', 'CIV723');

INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'PHD_GEO'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN ('CIV724', 'CIV725', 'CIV726');

INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'PHD_HENG'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN ('CIV727', 'CIV728', 'CIV729');

INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'PHD_HENG'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN ('CIV730', 'CIV731', 'CIV732', 'CIV733');

INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'PHD_RTE'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN ('CIV734', 'CIV735', 'CIV736');

INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'PHD_RTE'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN ('CIV737', 'CIV738', 'CIV739', 'CIV740');

INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'PHD_WRE'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN ('CIV741', 'CIV742', 'CIV743');

INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'PHD_WRE'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN ('CIV744', 'CIV745', 'CIV746', 'CIV747');




-- DIPLOMA

-- 1. إدخال بيانات القسم
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
		'DPM',
		'دبلوم في هندسة القوى الميكانيكية (محطات القوى والهندسة البخارية)',
		'diploma',
		24,
		18,
		3 -- بناءً على وجود مقرر "المشروع" (MPO 599) بساعات 3 ضمن المقررات الإجبارية
	);

-- 2. إدخال بيانات المقررات الإجبارية لبرنامج DPM
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('MPO501', 'انتقال الحرارة وتطبيقاتها', NULL, 3),
	('MPO502', 'ديناميكا حرارية وآلات احتراق', NULL, 3),
	('MPO503', 'ديناميكا الموائع ومحطات القوى الهيدروليكية', NULL, 3),
	('MPO504', 'أجهزة قياس والتحكم', NULL, 3),
	('MPO505', 'تطبيقات الحاسب', NULL, 3),
	('MPO599', 'المشروع', NULL, 3);

-- 3. إدخال بيانات المقررات الاختيارية لبرنامج DPM
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('MPO506', 'محطات القوى الحرارية واقتصادياتها', NULL, 3),
	('MPO507', 'التوربينات البخارية والغازية', NULL, 3),
	('MPO508', 'مراجل البخار', NULL, 3),
	('MPO509', 'موضوعات خاصة في محطات القوى والهندسة البخارية', NULL, 3),
	('MPO510', 'انتقال الحرارة المتقدم', NULL, 3),
	('MPO511', 'هندسة نووية', NULL, 3),
	('MPO512', 'تخزين واسترجاع الطاقة', NULL, 3),
	('MPO513', 'الطرق العددية في انتقال الحرارة', NULL, 3);

-- 4. ربط القسم بالمقررات الإجبارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'DPM'
	),
	course_id,
	TRUE
FROM
	courses
WHERE
	code IN (
		'MPO501',
		'MPO502',
		'MPO503',
		'MPO504',
		'MPO505',
		'MPO599'
	);

-- 5. ربط القسم بالمقررات الاختيارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'DPM'
	),
	course_id,
	FALSE
FROM
	courses
WHERE
	code IN (
		'MPO506',
		'MPO507',
		'MPO508',
		'MPO509',
		'MPO510',
		'MPO511',
		'MPO512',
		'MPO513'
	);




	-- 1. إدخال بيانات القسم الرئيسي
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
		'DPMD',
		'دبلوم في هندسة الإنتاج والتصميم الميكانيكي',
		'diploma',
		24,
		18,
		3 -- بناءً على وجود مقرر "المشروع" (MDP 599) بساعات 3 ضمن المقررات الإجبارية
	);

-- 2. إدخال بيانات المقررات الإجبارية لبرنامج DPMD
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('MDP501', 'استخدام الحاسبات في النظم الهندسية', NULL, 3),
	('MDP502', 'الإحصاء و تحليل البيانات', NULL, 3),
	('MDP503', 'التصميم بمساعدة الحاسب', NULL, 3),
	('MDP504', 'تريبولوجيا هندسية', NULL, 3),
	('MDP510', 'التصنيع بمساعدة الحاسب الآلي', NULL, 3),
	('MDP599', 'المشروع', NULL, 3);

-- 3. إدخال بيانات المقررات الاختيارية لبرنامج DPMD (تجميع من كل التخصصات الفرعية)
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	-- مقررات اختيارية لتخصص التصميم الميكانيكي
	('MDP517', 'الاهتزازات الميكانيكية وتطبيقاتها', NULL, 3),
	('MDP518', 'تحليل الاجهادات للأجسام المرنة', NULL, 3),
	('MDP519', 'التحليل التجريبي والعددي للإجهادات', NULL, 3),
	('MDP520', 'التصميم الأمثل', NULL, 3),
	('MDP521', 'طريقة العناصر المحدودة', NULL, 3),
	('MDP522', 'ميكانيكا الكسر وتحليل الانهيارات', NULL, 3),
	-- مقررات اختيارية لتخصص هندسة التصنيع
	('MDP505', 'هندسة السباكة', NULL, 3),
	('MDP506', 'هندسة اللحام', NULL, 3),
	('MDP507', 'هندسة القطع والتشكيل', NULL, 3),
	('MDP508', 'هندسة التشكيل', NULL, 3),
	('MDP509', 'هندسة المرشدات والقوالب', NULL, 3),
	('MDP511', 'هندسة العدد', NULL, 3),
	('MDP513', 'قياسات هندسية متقدمة', NULL, 3),
	-- مقررات اختيارية لتخصص هندسة المواد (بعضها قد يتكرر، لكن الأكواد مختلفة)
	('MDP512', 'هندسة المواد واختباراتها', NULL, 3),
	('MDP523', 'خواص المواد المتقدمة', NULL, 3),
	('MDP524', 'موضوعات متقدمة في هندسة الإنتاج والمواد', NULL, 3),
	('MDP525', 'المرونة التطبيقية', NULL, 3),
	('MDP526', 'اللدونة التطبيقية', NULL, 3),
	('MDP527', 'ميكانيكا المواد', NULL, 3),
	('MDP528', 'ميكانيكا الأجسام غير المرنة', NULL, 3),
	-- مقررات اختيارية لتخصص الهندسة الصناعية
	('MDP514', 'بحوث عمليات صناعية', NULL, 3),
	('MDP515', 'تخطيط ومراقبة الإنتاج', NULL, 3),
	('MDP529', 'اقتصاديات وتكاليف صناعية', NULL, 3),
	('MDP530', 'توكيد الجودة', NULL, 3),
	('MDP531', 'تقييم وتحسين أداء المنظومات الصناعية', NULL, 3),
	('MDP532', 'إدارة المشروعات الصناعية', NULL, 3),
	-- مقررات اختيارية لتخصص الميكاترونيك
	('MDP516', 'منظومات هيدروليكي ونيوماتيكي', NULL, 3),
	('MDP533', 'ديناميكا المنظومات', NULL, 3),
	('MDP534', 'التحكم التلقائي وتطبيقاتها', NULL, 3),
	('MDP535', 'هندسة الروبوتات', NULL, 3),
	('MDP536', 'الميكاترونيك', NULL, 3);


-- 4. ربط القسم بالمقررات الإجبارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'DPMD'
	),
	course_id,
	TRUE
FROM
	courses
WHERE
	code IN (
		'MDP501',
		'MDP502',
		'MDP503',
		'MDP504',
		'MDP510',
		'MDP599'
	);

-- 5. ربط القسم بالمقررات الاختيارية (تجميع لكل المقررات الاختيارية المذكورة)
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'DPMD'
	),
	course_id,
	FALSE
FROM
	courses
WHERE
	code IN (
		'MDP517',
		'MDP518',
		'MDP519',
		'MDP520',
		'MDP521',
		'MDP522',
		'MDP505',
		'MDP506',
		'MDP507',
		'MDP508',
		'MDP509',
		'MDP511',
		'MDP513',
		'MDP512',
		'MDP523',
		'MDP524',
		'MDP525',
		'MDP526',
		'MDP527',
		'MDP528',
		'MDP514',
		'MDP515',
		'MDP529',
		'MDP530',
		'MDP531',
		'MDP532',
		'MDP516',
		'MDP533',
		'MDP534',
		'MDP535',
		'MDP536'
	);




-- MASTER

	-- 1. إدخال بيانات القسم (برنامج ماجستير العلوم في هندسة القوى الميكانيكية)
INSERT INTO departments (
    code,
    title,
    type,
    courses_hours,
    compulsory_hours,
    thesis_hours
) VALUES (
    'MSM',
    'ماجستير العلوم في هندسة القوى الميكانيكية',
    'master',
    48,
    12,
    -- TODO
    0
);

-- 2. إدخال بيانات المقررات الإجبارية (جدول courses)
-- ملاحظة: لن يتم تضمين تفاصيل مثل ساعات النظري/العملي أو تفاصيل الدرجات
-- لأن سكيما جدول 'courses' الأصلية التي قدمتها لا تحتوي على هذه الحقول.
INSERT INTO courses (
    code,
    title,
    prerequisite,
    total_hours
) VALUES
('MPO601', 'نظرية القياسات الدقيقة', NULL, 3),
('MPO602', 'الطرق العددية في علوم الطاقة', NULL, 3),
('MPO603', 'ميكانيكا الموائع المتقدمة', NULL, 3),
('MPO604', 'السريان المضطرب', NULL, 3);

-- 3. إدخال بيانات المقررات الاختيارية (جدول courses)
INSERT INTO courses (
    code,
    title,
    prerequisite,
    total_hours
) VALUES
('MPO605', 'السريان ثنائي الطور', NULL, 3),
('MPO606', 'آلات توربينية', NULL, 3),
('MPO607', 'ديناميكا الغازات', NULL, 3),
('MPO608', 'الطرق العددية في ديناميكا الموائع', NULL, 3),
('MPO609', 'السريان المتغير مع الزمن', NULL, 3),
('MPO610', 'هندسة الموائع في حماية البيئة', NULL, 3),
('MPO611', 'السريان اللزج', NULL, 3),
('MPO612', 'ثيرموديناميكا متقدمة', NULL, 3),
('MPO613', 'أساسيات الاحتراق', NULL, 3),
('MPO614', 'طرق قياس الطاقة', NULL, 3),
('MPO615', 'نظرية محركات الاحتراق الترددية', NULL, 3),
('MPO616', 'نظرية التزييت', NULL, 3),
('MPO617', 'أساسيات تلوث الهواء', NULL, 3),
('MPO618', 'الحرائق والانفجارات', NULL, 3),
('MPO619', 'الطرق العددية في الاحتراق', NULL, 3),
('MPO620', 'التبريد والحرارة', NULL, 3),
('MPO621', 'الحمل الحراري', NULL, 3),
('MPO622', 'التوصيل الحراري', NULL, 3),
('MPO623', 'الإشعاع الحراري (1)', NULL, 3),
('MPO624', 'الإشعاع الحراري (2)', NULL, 3),
('MPO625', 'طاقة الشمس وتجميعها وتخزينها', NULL, 3),
('MPO626', 'استخدامات الطاقة الشمسية', NULL, 3),
('MPO627', 'محطات القوى', NULL, 3),
('MPO628', 'التبريد', NULL, 3),
('MPO629', 'الهندسة النووية', NULL, 3),
('MPO630', 'تخزين واسترجاع الطاقة', NULL, 3),
('MPO631', 'الطرق العددية في انتقال الحرارة', NULL, 3),
('MPO632', 'التصميم الحراري للمنظومات الإلكترونية', NULL, 3),
('MPO633', 'الميكرومترى المتقدم وتطبيقاته', NULL, 3),
('MPO634', 'منظومات التحكم الهيدروليكي والنيوماتيكي', NULL, 3),
('MPO635', 'التحكم التلقائي وتطبيقاته', NULL, 3),
('MPO636', 'الميكاترونيك', NULL, 3);

-- 4. ربط القسم بالمقررات الإجبارية
INSERT INTO department_courses (department_id, course_id, is_compulsory)
SELECT
    (SELECT department_id FROM departments WHERE code = 'MSM'),
    course_id,
    TRUE
FROM
    courses
WHERE
    code IN (
        'MPO601', 'MPO602', 'MPO603', 'MPO604'
    );

-- 5. ربط القسم بالمقررات الاختيارية
INSERT INTO department_courses (department_id, course_id, is_compulsory)
SELECT
    (SELECT department_id FROM departments WHERE code = 'MSM'),
    course_id,
    FALSE
FROM
    courses
WHERE
    code IN (
        'MPO605', 'MPO606', 'MPO607', 'MPO608', 'MPO609', 'MPO610', 'MPO611',
        'MPO612', 'MPO613', 'MPO614', 'MPO615', 'MPO616', 'MPO617', 'MPO618',
        'MPO619', 'MPO620', 'MPO621', 'MPO622', 'MPO623', 'MPO624', 'MPO625',
        'MPO626', 'MPO627', 'MPO628', 'MPO629', 'MPO630', 'MPO631', 'MPO632',
        'MPO633', 'MPO634', 'MPO635', 'MPO636'
    );




	-- 1. إدخال بيانات القسم (برنامج ماجستير العلوم في هندسة الإنتاج والتصميم الميكانيكي)
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
		'MPM',
		'برنامج ماجستير العلوم في هندسة الإنتاج والتصميم الميكانيكي',
		'master',
		24,
		12,
		24 -- بناءً على أن إجمالي الساعات 48 والمقررات 24
	);

-- 2. إدخال بيانات المقررات الإجبارية لبرنامج MPM
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('MDP601', 'تصميم بمساعدة الحاسب', NULL, 3),
	('MDP602', 'المترولوجيا الهندسية', NULL, 3),
	('MDP627', 'التحليل الإحصائي وتصميم التجارب', NULL, 3),
	('MDP628', 'القياسات الهندسية المتقدمة', NULL, 3);

-- 3. إدخال بيانات المقررات الاختيارية لبرنامج MPM (مقسمة حسب التخصصات)
-- تخصص التصميم الميكانيكي
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('MDP603', 'تصميم المنظومات الميكانيكية', NULL, 3),
	('MDP604', 'تصميم الأمثل', NULL, 3),
	('MDP618', 'الاهتزازات الميكانيكية', NULL, 3),
	('MDP624', 'طريقة العناصر المحدودة', NULL, 3);

-- تخصص هندسة التصنيع
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('MDP607', 'هندسة السباكة', NULL, 3),
	('MDP608', 'هندسة اللحام', NULL, 3),
	('MDP609', 'هندسة قطع المعادن', NULL, 3),
	('MDP610', 'هندسة تشكيل المعادن', NULL, 3),
	('MDP625', 'هندسة المرشات والمقيدات', NULL, 3),
	('MDP626', 'هندسة العدد', NULL, 3);

-- تخصص هندسة المواد
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('MDP605', 'هندسة المواد المتقدمة', NULL, 3),
	('MDP606', 'المواد المركبة المتقدمة', NULL, 3),
	('MDP611', 'موضوعات خاصة في هندسة الإنتاج والمواد', NULL, 3),
	('MDP622', 'المرونة التطبيقية', NULL, 3),
	('MDP623', 'اللدونة التطبيقية', NULL, 3);

-- تخصص الهندسة الصناعية
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('MDP612', 'بحوث عمليات صناعية متقدمة', NULL, 3),
	('MDP613', 'تخطيط ومراقبة العمليات الصناعية', NULL, 3),
	('MDP614', 'نمذجة وتحليل المنظومات الصناعية', NULL, 3),
	('MDP615', 'اقتصاديات وتكاليف صناعية', NULL, 3),
	('MDP616', 'ترشيد الجودة', NULL, 3);

-- تخصص الميكاترونيك
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('MDP617', 'منظومات التحكم الهيدروليكي والنيوماتيكي', NULL, 3),
	('MDP619', 'ديناميكا المنظومات', NULL, 3),
	('MDP620', 'هندسة الروبوتات', NULL, 3),
	('MDP621', 'ميكاترونيك', NULL, 3);

-- 4. ربط القسم بالمقررات الإجبارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'MPM'
	),
	course_id,
	TRUE
FROM
	courses
WHERE
	code IN ('MDP601', 'MDP602', 'MDP627', 'MDP628');

-- 5. ربط القسم بالمقررات الاختيارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'MPM'
	),
	course_id,
	FALSE
FROM
	courses
WHERE
	code IN (
		'MDP603',
		'MDP604',
		'MDP618',
		'MDP624',
		'MDP607',
		'MDP608',
		'MDP609',
		'MDP610',
		'MDP625',
		'MDP626',
		'MDP605',
		'MDP606',
		'MDP611',
		'MDP622',
		'MDP623',
		'MDP612',
		'MDP613',
		'MDP614',
		'MDP615',
		'MDP616',
		'MDP617',
		'MDP619',
		'MDP620',
		'MDP621'
	);









-- PHD


-- 1. إدخال بيانات القسم (برنامج دكتوراه الفلسفة في هندسة القوى الميكانيكية)
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
		'PHD_MPE',
		'برنامج دكتوراه الفلسفة في هندسة القوى الميكانيكية',
		'phd',
		12,
		6,
		42 -- 42 ساعة للأطروحة والامتحان الشامل
	);

-- 2. إدخال بيانات المقررات الإجبارية لبرنامج PHD_MPE
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('MPO701', 'انتقال الحرارة المتقدم', NULL, 3),
	('MPO702', 'طرق القياس المتقدمة', NULL, 3);

-- 3. إدخال بيانات المقررات الاختيارية لبرنامج PHD_MPE
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('MPO703', 'التحليل الإحصائي وتصميم التجارب', NULL, 3),
	('MPO704', 'ميكانيكا الموائع المتقدمة', NULL, 3),
	('MPO705', 'السريان المضطرب', NULL, 3),
	('MPO706', 'السريان ثنائي الطور', NULL, 3),
	('MPO707', 'آلات توربينية', NULL, 3),
	('MPO708', 'ديناميكا الغازات', NULL, 3),
	('MPO709', 'الطرق العددية في ديناميكا الموائع', NULL, 3),
	('MPO710', 'السريان المتغير مع الزمن', NULL, 3),
	('MPO711', 'هندسة الموائع في حماية البيئة', NULL, 3),
	('MPO712', 'السريان اللزج', NULL, 3),
	('MPO713', 'ترموديناميكا متقدمة', NULL, 3),
	('MPO714', 'أساسيات الاحتراق', NULL, 3),
	('MPO715', 'نظرية محركات الاحتراق الترددية', NULL, 3),
	('MPO716', 'نظرية التزييت', NULL, 3),
	('MPO717', 'أساسيات تلوث الهواء', NULL, 3),
	('MPO718', 'الحرائق والانفجارات', NULL, 3),
	('MPO719', 'الطرق العددية في الاحتراق', NULL, 3),
	('MPO720', 'التبريد بالامتزاز', NULL, 3),
	('MPO721', 'الحمل الحراري', NULL, 3),
	('MPO722', 'الترشيح الحراري', NULL, 3),
	('MPO723', 'الإشعاع الحراري (1)', NULL, 3),
	('MPO724', 'الإشعاع الحراري (2)', NULL, 3),
	('MPO725', 'ديناميكية الطاقة الشمسية وتجميعها وتخزينها', NULL, 3),
	('MPO726', 'استخدامات الطاقة الشمسية', NULL, 3),
	('MPO727', 'محطات القوى', NULL, 3),
	('MPO728', 'التبريد', NULL, 3),
	('MPO729', 'الهندسة النووية', NULL, 3),
	('MPO730', 'تخزين واسترجاع الطاقة', NULL, 3),
	('MPO731', 'الطرق العددية في انتقال الحرارة', NULL, 3),
	('MPO732', 'التصميم الحراري للمنظومات الإلكترونية', NULL, 3),
	('MPO733', 'الميكاترونيك المتقدم وتطبيقاته', NULL, 3),
	('MPO734', 'منظومات التحكم الهيدروليكي والنيوماتيكي', NULL, 3),
	('MPO735', 'التحكم التكيفي وتطبيقاته', NULL, 3),
	('MPO736', 'ميكاترونيك', NULL, 3),
	('MPO737', 'موضوعات خاصة مختارة', NULL, 3);

-- 4. ربط القسم بالمقررات الإجبارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'PHD_MPE'
	),
	course_id,
	TRUE
FROM
	courses
WHERE
	code IN ('MPO701', 'MPO702');

-- 5. ربط القسم بالمقررات الاختيارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'PHD_MPE'
	),
	course_id,
	FALSE
FROM
	courses
WHERE
	code IN (
		'MPO703',
		'MPO704',
		'MPO705',
		'MPO706',
		'MPO707',
		'MPO708',
		'MPO709',
		'MPO710',
		'MPO711',
		'MPO712',
		'MPO713',
		'MPO714',
		'MPO715',
		'MPO716',
		'MPO717',
		'MPO718',
		'MPO719',
		'MPO720',
		'MPO721',
		'MPO722',
		'MPO723',
		'MPO724',
		'MPO725',
		'MPO726',
		'MPO727',
		'MPO728',
		'MPO729',
		'MPO730',
		'MPO731',
		'MPO732',
		'MPO733',
		'MPO734',
		'MPO735',
		'MPO736',
		'MPO737'
	);







	-- 1. إدخال بيانات القسم (برنامج دكتوراه الفلسفة في هندسة الإنتاج والتصميم الميكانيكي)
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
		'PHD_IPDE',
		'برنامج دكتوراه الفلسفة في هندسة الإنتاج والتصميم الميكانيكي',
		'phd',
		12,
		6,
		42 -- 42 ساعة للأطروحة والامتحان الشامل
	);

-- 2. إدخال بيانات المقررات الإجبارية لبرنامج PHD_IPDE
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('MDP737', 'التحليل الإحصائي وتصميم التجارب', NULL, 3),
	('MDP738', 'تطبيقات الحاسب في التصميم الميكانيكي والإنتاج', NULL, 3);

-- 3. إدخال بيانات المقررات الاختيارية لبرنامج PHD_IPDE (مقسمة حسب التخصصات)
-- تخصص التصميم الميكانيكي
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('MDP702', 'التربولوجيا الهندسية', NULL, 3),
	('MDP703', 'تصميم المنظومات الميكانيكية', NULL, 3),
	('MDP704', 'التصميم الأمثل', NULL, 3),
	('MDP705', 'نمذجة الأشكال الهندسية', NULL, 3),
	('MDP706', 'موضوعات متقدمة في التصميم الميكانيكي', NULL, 3),
	('MDP723', 'الاهتزازات الميكانيكية', NULL, 3),
	('MDP724', 'ديناميكا المنظومات', NULL, 3),
	('MDP734', 'طريقة العناصر المحدودة', NULL, 3),
	('MDP735', 'ميكانيكا الكسر وتحليل الانهيارات', NULL, 3);

-- تخصص هندسة التصنيع
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('MDP709', 'هندسة السباكة', NULL, 3),
	('MDP710', 'هندسة اللحام', NULL, 3),
	('MDP711', 'هندسة قطع المعادن', NULL, 3),
	('MDP712', 'هندسة تشكيل المعادن', NULL, 3),
	('MDP713', 'موضوعات متقدمة في هندسة الإنتاج والمواد', NULL, 3),
	('MDP730', 'المرونة التطبيقية', NULL, 3),
	('MDP731', 'اللدونة التطبيقية', NULL, 3),
	('MDP732', 'ميكانيكا الجوامد', NULL, 3),
	('MDP733', 'ميكانيكا الأجسام غير المرنة', NULL, 3),
	('MDP739', 'هندسة المرشات والمقيدات', NULL, 3),
	('MDP740', 'هندسة العدد', NULL, 3);

-- تخصص هندسة المواد
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('MDP707', 'هندسة المواد المتقدمة', NULL, 3),
	('MDP708', 'المواد المركبة المتقدمة', NULL, 3),
	('MDP736', 'موضوعات متقدمة في ميكانيكا الجوامد', NULL, 3);

-- تخصص الهندسة الصناعية
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('MDP714', 'بحوث عمليات صناعية متقدمة', NULL, 3),
	('MDP715', 'تخطيط ومراقبة العمليات الصناعية', NULL, 3),
	('MDP716', 'نمذجة وتحليل المنظومات الصناعية', NULL, 3),
	('MDP717', 'اقتصاديات وتكاليف صناعية', NULL, 3),
	('MDP718', 'توكيد الجودة', NULL, 3),
	('MDP719', 'تقييم وتحسين أداء المنظومات الصناعية', NULL, 3),
	('MDP720', 'إدارة المشروعات الصناعية', NULL, 3),
	('MDP721', 'موضوعات متقدمة في الهندسة الصناعية', NULL, 3);

-- تخصص الميكاترونيك
INSERT INTO
	courses (code, title, prerequisite, total_hours)
VALUES
	('MDP722', 'منظومات التحكم الهيدروليكي والنيوماتيكي', NULL, 3),
	('MDP725', 'الديناميكا التحليلية', NULL, 3),
	('MDP726', 'التحكم التكيفي وتطبيقاته', NULL, 3),
	('MDP727', 'هندسة الروبوتات', NULL, 3),
	('MDP728', 'ميكاترونيك', NULL, 3),
	('MDP729', 'موضوعات متقدمة في ديناميكا المنظومات', NULL, 3);

-- 4. ربط القسم بالمقررات الإجبارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'PHD_IPDE'
	),
	course_id,
	TRUE
FROM
	courses
WHERE
	code IN ('MDP737', 'MDP738');

-- 5. ربط القسم بالمقررات الاختيارية
INSERT INTO
	department_courses (department_id, course_id, is_compulsory)
SELECT
	(
		SELECT
			department_id
		FROM
			departments
		WHERE
			code = 'PHD_IPDE'
	),
	course_id,
	FALSE
FROM
	courses
WHERE
	code IN (
		'MDP702',
		'MDP703',
		'MDP704',
		'MDP705',
		'MDP706',
		'MDP723',
		'MDP724',
		'MDP734',
		'MDP735',
		'MDP709',
		'MDP710',
		'MDP711',
		'MDP712',
		'MDP713',
		'MDP730',
		'MDP731',
		'MDP732',
		'MDP733',
		'MDP739',
		'MDP740',
		'MDP707',
		'MDP708',
		'MDP736',
		'MDP714',
		'MDP715',
		'MDP716',
		'MDP717',
		'MDP718',
		'MDP719',
		'MDP720',
		'MDP721',
		'MDP722',
		'MDP725',
		'MDP726',
		'MDP727',
		'MDP728',
		'MDP729'
	);

	
	
-- MASTER


-- 1. إدخال بيانات القسم
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
			'MBED',
			'ماجستير العلوم في العمارة والتصميم البيئي',
			'master',
			36,
			12,
			0
		);

-- 2. إدخال بيانات المقررات الإجبارية لبرنامج MBED
INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('ARCH601', 'منهجية بحث', NULL, 3),
		('ARCH602', 'الاتجاهات المعمارية المعاصرة في التصميم', NULL, 3),
		('ARCH603', 'الحاسب الآلي والمحاكاة المعمارية', NULL, 3),
		('ARCH604', 'الطاقة البيئية الحضرية', NULL, 3);

-- 3. إدخال بيانات المقررات الاختيارية لبرنامج MBED
INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('ARCH605', 'أسس النقد المعماري', NULL, 3),
		('ARCH606', 'هندسة القيمة في المشروعات المعمارية', NULL, 3),
		('ARCH607', 'التنمية الحضرية المستدامة', NULL, 3),
		('ARCH608', 'البحوث الإنسانية في العمارة', NULL, 3),
		('ARCH609', 'مقرر خاص 1', NULL, 3),
		('ARCH610', 'مقرر خاص 2', NULL, 3);

-- 4. ربط القسم بالمقررات الإجبارية
INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'MBED'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN (
			'UNR600',
			'UNR601',
			'ARCH601',
			'ARCH602',
			'ARCH603',
			'ARCH604'
		);

-- 5. ربط القسم بالمقررات الاختيارية
INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'MBED'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN (
			'ARCH605',
			'ARCH606',
			'ARCH607',
			'ARCH608',
			'ARCH609',
			'ARCH610'
		);





		-- 1. إدخال بيانات القسم
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
			'MUDP',
			'ماجستير العلوم في التصميم والتخطيط الحضري',
			'master',
			36,
			12,
			0
		);

-- 2. إدخال بيانات المقررات الإجبارية لبرنامج MUDP
INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('URPL601', 'تنمية المجتمعات العمرانية الجديدة', NULL, 3),
		('URPL602', 'النظريات الحديثة في التصميم الحضري', NULL, 3),
		('URPL603', 'مشروعات التصميم الحضرية وتنمية المجتمعات', NULL, 3);

-- 3. إدخال بيانات المقررات الاختيارية لبرنامج MUDP
INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('URPL604', 'دراسات السكان والمرافق بالمناطق العشوائية', NULL, 3),
		('URPL605', 'الحاسب الآلي ومحاكاة الفراغات الخارجية', NULL, 3),
		('URPL606', 'التصميم الحضري الإقليمي', NULL, 3),
		('URPL607', 'تطبيقات في تقييم الأثر البيئي', NULL, 3),
		('URPL608', 'مقرر خاص 1', NULL, 3),
		('URPL609', 'مقرر خاص 2', NULL, 3);

-- 4. ربط القسم بالمقررات الإجبارية
INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'MUDP'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN (
			'UNR600',
			'UNR601',
			'ARCH601',
			'URPL601',
			'URPL602',
			'URPL603'
		);

-- 5. ربط القسم بالمقررات الاختيارية
INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'MUDP'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN (
			'URPL604',
			'URPL605',
			'URPL606',
			'URPL607',
			'URPL608',
			'URPL609'
		);




-- PHD


-- 1. إدخال بيانات القسم
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
			'PHDEB',
			'دكتوراه الفلسفة في العمارة والتصميم البيئي',
			'phd',
			54,
			3,
			0 -- لم يتم تحديد ساعات الرسالة بشكل صريح كبند منفصل في الجدول، وهي شرط للبدء في الرسالة ضمن الـ 54 ساعة الإجمالية.
		);

-- 2. إدخال بيانات المقررات الإجبارية لبرنامج PHDEB
INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('ARCH701', 'بحوث التصميم المستدام', NULL, 3);

-- 3. إدخال بيانات المقررات الاختيارية لبرنامج PHDEB
INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('ARCH702', 'تطبيقات متقدمة للحاسب في التصميم البيئي', NULL, 3),
		('ARCH703', 'بحوث الاقتصاد البيئي وعولمة القيمة', NULL, 3),
		('ARCH704', 'بحوث الطاقة الجديدة والمتجددة', NULL, 3),
		('ARCH705', 'بحوث كفاءة الأداء البيئي للمشروعات', NULL, 3);

-- 4. ربط القسم بالمقررات الإجبارية
INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'PHDEB'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN ('ARCH701');

-- 5. ربط القسم بالمقررات الاختيارية
INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'PHDEB'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN (
			'ARCH702',
			'ARCH703',
			'ARCH704',
			'ARCH705'
		);






		-- 1. إدخال بيانات القسم
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
			'PHDUT',
			'دكتوراه الفلسفة في التصميم والتخطيط الحضري',
			'phd',
			54,
			3,
			0 -- لم يتم تحديد ساعات الرسالة بشكل صريح كبند منفصل في الجدول.
		);

-- 2. إدخال بيانات المقررات الإجبارية لبرنامج PHDUT
INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('URPL701', 'بحوث التصميم الحضري للمدينة', NULL, 3);

-- 3. إدخال بيانات المقررات الاختيارية لبرنامج PHDUT
INSERT INTO
		courses (code, title, prerequisite, total_hours)
VALUES
		('URPL702', 'تطبيقات متقدمة للحاسب في التصميم العمراني', NULL, 3),
		('URPL703', 'بحوث تنمية التجمعات العمرانية الجديدة', NULL, 3),
		('URPL704', 'بحوث في دراسات الإسكان والتنمية العمرانية', NULL, 3),
		('URPL705', 'بحوث عمران المناطق ذات القيمة', NULL, 3);

-- 4. ربط القسم بالمقررات الإجبارية
INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'PHDUT'
		),
		course_id,
		TRUE
FROM
		courses
WHERE
		code IN ('URPL701');

-- 5. ربط القسم بالمقررات الاختيارية
INSERT INTO
		department_courses (department_id, course_id, is_compulsory)
SELECT
		(
			SELECT
				department_id
			FROM
				departments
			WHERE
				code = 'PHDUT'
		),
		course_id,
		FALSE
FROM
		courses
WHERE
		code IN (
			'URPL702',
			'URPL703',
			'URPL704',
			'URPL705'
		);