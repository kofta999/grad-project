import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  date,
  foreignKey,
  index,
  integer,
  pgEnum,
  pgTable,
  pgView,
  primaryKey,
  real,
  serial,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const addressType = pgEnum("address_type", ["permanent", "current"]);
export const applicationStatus = pgEnum("application_status", ["pending", "accepted", "rejected"]);
export const departmentType = pgEnum("department_type", ["diploma", "master", "phd"]);
export const identificationType = pgEnum("identification_type", ["national_id", "passport"]);
export const martialStatus = pgEnum("martial_status", [
  "single",
  "married",
  "married_with_dependents",
  "divorced",
  "widow",
  "other",
]);
export const semesterType = pgEnum("semester_type", ["first", "second", "third"]);

export const countries = pgTable("countries", {
  countryId: serial("country_id").primaryKey().notNull(),
  nameAr: varchar("name_ar", { length: 255 }).notNull(),
  nameEn: varchar("name_en", { length: 255 }).notNull(),
  code: varchar({ length: 10 }).notNull(),
});

export const cities = pgTable(
  "cities",
  {
    cityId: serial("city_id").primaryKey().notNull(),
    nameEn: varchar("name_en", { length: 255 }).notNull(),
    nameAr: varchar("name_ar", { length: 255 }).notNull(),
    code: varchar({ length: 10 }).notNull(),
    countryId: integer("country_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.countryId],
      foreignColumns: [countries.countryId],
      name: "cities_country_id_fkey",
    }),
  ]
);

export const academicYears = pgTable("academic_years", {
  academicYearId: serial("academic_year_id").primaryKey().notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
});

export const students = pgTable(
  "students",
  {
    studentId: serial("student_id").primaryKey().notNull(),
    fullNameAr: text("full_name_ar").notNull(),
    fullNameEn: text("full_name_en").notNull(),
    gender: boolean().notNull(),
    email: text().notNull(),
    nationality: text().notNull(),
    imageUrl: text("image_url").notNull(),
    phoneNoMain: text("phone_no_main").notNull(),
    phoneNoSec: text("phone_no_sec"),
    fax: text(),
    idType: identificationType("id_type").notNull(),
    idIssuanceDate: date("id_issuance_date").notNull(),
    idNumber: text("id_number").notNull(),
    idAuthority: text("id_authority").notNull(),
    martialStatus: martialStatus("martial_status"),
    isWorking: boolean("is_working").notNull(),
    jobType: text("job_type"),
    hashedPassword: text("hashed_password").notNull(),
    secQuestion: text("sec_question").notNull(),
    secAnswer: text("sec_answer").notNull(),
    militaryStatus: text("military_status").notNull(),
    dob: date().notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("idx_students_first_name_ar_normalized").using(
      "btree",
      sql`normalize_arabic_text(full_name_ar)`
    ),
    unique("students_email_key").on(table.email),
  ]
);

export const reports = pgTable("reports", {
  reportId: serial("report_id").primaryKey().notNull(),
  type: text().notNull(),
  title: text().notNull(),
  attachmentUrl: text("attachment_url").notNull(),
});

export const supervisors = pgTable(
  "supervisors",
  {
    supervisorId: serial("supervisor_id").primaryKey().notNull(),
    fullNameAr: text("full_name_ar").notNull(),
    fullNameEn: text("full_name_en").notNull(),
    email: text().notNull(),
    hashedPassword: text("hashed_password").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [unique("supervisors_email_key").on(table.email)]
);

export const applications = pgTable(
  "applications",
  {
    applicationId: serial("application_id").primaryKey().notNull(),
    studentId: integer("student_id").notNull(),
    supervisorId: integer("supervisor_id").notNull(),
    status: applicationStatus().default("pending").notNull(),
  },
  (table) => [
    index("applications_student_id_idx").using(
      "btree",
      table.studentId.asc().nullsLast().op("int4_ops")
    ),
    foreignKey({
      columns: [table.studentId],
      foreignColumns: [students.studentId],
      name: "applications_student_id_fkey",
    }),
    foreignKey({
      columns: [table.supervisorId],
      foreignColumns: [supervisors.supervisorId],
      name: "applications_supervisor_id_fkey",
    }),
  ]
);

export const registerations = pgTable(
  "registerations",
  {
    registerationId: serial("registeration_id").primaryKey().notNull(),
    applicationId: integer("application_id").notNull(),
    academicYearId: integer("academic_year_id").notNull(),
    faculty: text().notNull(),
    departmentId: integer("department_id").notNull(),
  },
  (table) => [
    index("idx_registerations_academic_year_id").using(
      "btree",
      table.academicYearId.asc().nullsLast().op("int4_ops")
    ),
    index("idx_registerations_application_id").using(
      "btree",
      table.applicationId.asc().nullsLast().op("int4_ops")
    ),
    index("idx_registerations_department_id").using(
      "btree",
      table.departmentId.asc().nullsLast().op("int4_ops")
    ),
    foreignKey({
      columns: [table.applicationId],
      foreignColumns: [applications.applicationId],
      name: "registerations_application_id_fkey",
    }),
    foreignKey({
      columns: [table.academicYearId],
      foreignColumns: [academicYears.academicYearId],
      name: "registerations_academic_year_id_fkey",
    }),
    foreignKey({
      columns: [table.departmentId],
      foreignColumns: [departments.departmentId],
      name: "registerations_department_id_fkey",
    }),
    unique("registerations_application_id_key").on(table.applicationId),
  ]
);

export const departments = pgTable("departments", {
  departmentId: serial("department_id").primaryKey().notNull(),
  code: text().notNull(),
  title: text().notNull(),
  type: departmentType().notNull(),
  coursesHours: integer("courses_hours").notNull(),
  compulsoryHours: integer("compulsory_hours").notNull(),
  thesisHours: integer("thesis_hours").notNull(),
});

export const attachments = pgTable(
  "attachments",
  {
    attachmentId: serial("attachment_id").primaryKey().notNull(),
    applicationId: integer("application_id").notNull(),
    type: text().notNull(),
    attachmentUrl: text("attachment_url").notNull(),
  },
  (table) => [
    index("idx_attachments_application_id").using(
      "btree",
      table.applicationId.asc().nullsLast().op("int4_ops")
    ),
    foreignKey({
      columns: [table.applicationId],
      foreignColumns: [applications.applicationId],
      name: "attachments_application_id_fkey",
    }),
  ]
);

export const addresses = pgTable(
  "addresses",
  {
    addressId: serial("address_id").primaryKey().notNull(),
    applicationId: integer("application_id").notNull(),
    fullAddress: text("full_address").notNull(),
    countryId: integer("country_id").notNull(),
    cityId: integer("city_id").notNull(),
    type: addressType().notNull(),
  },
  (table) => [
    index("idx_addresses_application_id").using(
      "btree",
      table.applicationId.asc().nullsLast().op("int4_ops")
    ),
    foreignKey({
      columns: [table.applicationId],
      foreignColumns: [applications.applicationId],
      name: "addresses_application_id_fkey",
    }),
    foreignKey({
      columns: [table.countryId],
      foreignColumns: [countries.countryId],
      name: "addresses_country_id_fkey",
    }),
    foreignKey({
      columns: [table.cityId],
      foreignColumns: [cities.cityId],
      name: "addresses_city_id_fkey",
    }),
  ]
);

export const emergencyContacts = pgTable(
  "emergency_contacts",
  {
    contactId: serial("contact_id").primaryKey().notNull(),
    applicationId: integer("application_id").notNull(),
    name: text().notNull(),
    address: text(),
    phoneNumber: text("phone_number").notNull(),
    email: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.applicationId],
      foreignColumns: [applications.applicationId],
      name: "emergency_contacts_application_id_fkey",
    }),
    unique("emergency_contacts_application_id_key").on(table.applicationId),
  ]
);

export const academicQualifications = pgTable(
  "academic_qualifications",
  {
    qualificationId: serial("qualification_id").primaryKey().notNull(),
    applicationId: integer("application_id").notNull(),
    countryId: integer("country_id").notNull(),
    university: text().notNull(),
    faculty: text().notNull(),
    type: text().notNull(),
    qualification: text().notNull(),
    specialization: text().notNull(),
    year: text().notNull(),
    date: date().notNull(),
    creditHours: boolean("credit_hours").notNull(),
    grade: text().notNull(),
    gpa: real().notNull(),
  },
  (table) => [
    index("academic_qualifications_application_id_idx").using(
      "btree",
      table.applicationId.asc().nullsLast().op("int4_ops")
    ),
    foreignKey({
      columns: [table.applicationId],
      foreignColumns: [applications.applicationId],
      name: "academic_qualifications_application_id_fkey",
    }),
    foreignKey({
      columns: [table.countryId],
      foreignColumns: [countries.countryId],
      name: "academic_qualifications_country_id_fkey",
    }),
    unique("academic_qualifications_application_id_key").on(table.applicationId),
  ]
);

export const courses = pgTable(
  "courses",
  {
    courseId: serial("course_id").primaryKey().notNull(),
    code: text().notNull(),
    title: text().notNull(),
    prerequisite: integer(),
    totalHours: integer("total_hours"),
  },
  (table) => [
    index("idx_courses_prerequisite").using(
      "btree",
      table.prerequisite.asc().nullsLast().op("int4_ops")
    ),
    unique("courses_code_key").on(table.code),
  ]
);

export const courseRegistrations = pgTable(
  "course_registrations",
  {
    courseRegistrationId: serial("course_registration_id").primaryKey().notNull(),
    courseId: integer("course_id").notNull(),
    applicationId: integer("application_id").notNull(),
    semester: semesterType().notNull(),
    academicYearId: integer("academic_year_id").notNull(),
  },
  (table) => [
    index("idx_course_registrations_academic_year_id").using(
      "btree",
      table.academicYearId.asc().nullsLast().op("int4_ops")
    ),
    index("idx_course_registrations_app_semester").using(
      "btree",
      table.applicationId.asc().nullsLast().op("int4_ops"),
      table.semester.asc().nullsLast().op("int4_ops")
    ),
    index("idx_course_registrations_application_id").using(
      "btree",
      table.applicationId.asc().nullsLast().op("int4_ops")
    ),
    index("idx_course_registrations_course_id").using(
      "btree",
      table.courseId.asc().nullsLast().op("int4_ops")
    ),
    foreignKey({
      columns: [table.courseId],
      foreignColumns: [courses.courseId],
      name: "course_registrations_course_id_fkey",
    }),
    foreignKey({
      columns: [table.applicationId],
      foreignColumns: [applications.applicationId],
      name: "course_registrations_application_id_fkey",
    }),
    foreignKey({
      columns: [table.academicYearId],
      foreignColumns: [academicYears.academicYearId],
      name: "course_registrations_academic_year_id_fkey",
    }),
  ]
);

export const courseResults = pgTable(
  "course_results",
  {
    courseResultId: serial("course_result_id").primaryKey().notNull(),
    courseRegistrationId: integer("course_registration_id").notNull(),
    grade: integer().notNull(),
  },
  (table) => [
    index("idx_course_results_course_registration_id").using(
      "btree",
      table.courseRegistrationId.asc().nullsLast().op("int4_ops")
    ),
    index("idx_course_results_grade").using("btree", table.grade.asc().nullsLast().op("int4_ops")),
    foreignKey({
      columns: [table.courseRegistrationId],
      foreignColumns: [courseRegistrations.courseRegistrationId],
      name: "course_results_course_registration_id_fkey",
    }),
  ]
);

export const admins = pgTable(
  "admins",
  {
    adminId: serial("admin_id").primaryKey().notNull(),
    fullNameAr: text("full_name_ar").notNull(),
    fullNameEn: text("full_name_en").notNull(),
    email: text().notNull(),
    hashedPassword: text("hashed_password").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [unique("admins_email_key").on(table.email)]
);

export const theses = pgTable(
  "theses",
  {
    thesisId: serial("thesis_id").primaryKey().notNull(),
    applicationId: integer("application_id").notNull(),
    attachmentId: integer("attachment_id").notNull(),
    title: text().notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.applicationId],
      foreignColumns: [applications.applicationId],
      name: "theses_application_id_fkey",
    }),
    foreignKey({
      columns: [table.attachmentId],
      foreignColumns: [attachments.attachmentId],
      name: "theses_attachment_id_fkey",
    }),
    unique("theses_application_id_key").on(table.applicationId),
  ]
);

export const departmentCourses = pgTable(
  "department_courses",
  {
    courseId: integer("course_id").notNull(),
    departmentId: integer("department_id").notNull(),
    isCompulsory: boolean("is_compulsory").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.courseId],
      foreignColumns: [courses.courseId],
      name: "department_courses_course_id_fkey",
    }),
    foreignKey({
      columns: [table.departmentId],
      foreignColumns: [departments.departmentId],
      name: "department_courses_department_id_fkey",
    }),
    primaryKey({
      columns: [table.courseId, table.departmentId],
      name: "department_courses_pkey",
    }),
  ]
);
export const adminApplicationsList = pgView("admin_applications_list", {
  applicationId: integer("application_id"),
  studentName: text("student_name"),
  academicDegree: departmentType("academic_degree"),
  department: text(),
  status: applicationStatus(),
}).as(
  sql`SELECT a.application_id, s.full_name_ar AS student_name, d.type AS academic_degree, d.title AS department, a.status FROM applications a JOIN students s USING (student_id) JOIN registerations r USING (application_id) JOIN departments d ON d.department_id = r.department_id`
);

export const acceptedApplications = pgView("accepted_applications", {
  applicationId: integer("application_id"),
  studentId: integer("student_id"),
  departmentId: integer("department_id"),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  totalCompletedHours: bigint("total_completed_hours", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  completedCompulsoryHours: bigint("completed_compulsory_hours", {
    mode: "number",
  }),
}).as(
  sql`SELECT a.application_id, a.student_id, r.department_id, COALESCE(sum( CASE WHEN c_res.grade >= 60 THEN c.total_hours ELSE 0 END), 0::bigint) AS total_completed_hours, COALESCE(sum( CASE WHEN d_c.is_compulsory = true AND c_res.grade >= 60 THEN c.total_hours ELSE 0 END), 0::bigint) AS completed_compulsory_hours FROM applications a JOIN registerations r ON r.application_id = a.application_id LEFT JOIN course_registrations c_reg ON c_reg.application_id = a.application_id LEFT JOIN course_results c_res ON c_res.course_registration_id = c_reg.course_registration_id LEFT JOIN courses c ON c.course_id = c_reg.course_id LEFT JOIN department_courses d_c ON d_c.course_id = c_reg.course_id AND d_c.department_id = r.department_id WHERE a.status = 'accepted'::application_status GROUP BY a.application_id, r.department_id`
);

export const detailedCourseRegistrationsView = pgView("detailed_course_registrations_view", {
  courseId: integer("course_id"),
  code: text(),
  title: text(),
  prerequisite: integer(),
  totalHours: integer("total_hours"),
  academicYearId: integer("academic_year_id"),
  semester: semesterType(),
  grade: integer(),
  applicationId: integer("application_id"),
  courseRegistrationId: integer("course_registration_id"),
}).as(
  sql`SELECT c.course_id, c.code, c.title, c.prerequisite, c.total_hours, c_r.academic_year_id, c_r.semester, c_res.grade, c_r.application_id, c_r.course_registration_id FROM course_registrations c_r JOIN department_courses d_c ON d_c.course_id = c_r.course_id JOIN courses c ON c.course_id = c_r.course_id JOIN registerations r ON r.application_id = c_r.application_id LEFT JOIN course_results c_res ON c_res.course_registration_id = c_r.course_registration_id WHERE d_c.department_id = r.department_id`
);
