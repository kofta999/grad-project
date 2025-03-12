import {
  pgTable,
  unique,
  serial,
  text,
  boolean,
  date,
  timestamp,
  index,
  foreignKey,
  integer,
  primaryKey,
  pgView,
  pgEnum,
  real,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const addressType = pgEnum("address_type", ["permanent", "current"]);
export const departmentType = pgEnum("department_type", [
  "diploma",
  "master",
  "phd",
]);
export const identificationType = pgEnum("identification_type", [
  "national_id",
  "passport",
]);
export const martialStatus = pgEnum("martial_status", [
  "single",
  "married",
  "married_with_dependents",
  "divorced",
  "widow",
  "other",
]);
export const semesterType = pgEnum("semester_type", [
  "first",
  "second",
  "third",
]);

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
  (table) => {
    return {
      studentsEmailKey: unique("students_email_key").on(table.email),
    };
  },
);

export const applications = pgTable(
  "applications",
  {
    applicationId: serial("application_id").primaryKey().notNull(),
    studentId: integer("student_id").notNull(),
    isAdminAccepted: boolean("is_admin_accepted").default(false).notNull(),
  },
  (table) => {
    return {
      studentIdIdx: index("applications_student_id_idx").using(
        "btree",
        table.studentId.asc().nullsLast(),
      ),
      applicationsStudentIdFkey: foreignKey({
        columns: [table.studentId],
        foreignColumns: [students.studentId],
        name: "applications_student_id_fkey",
      }),
    };
  },
);

export const registerations = pgTable(
  "registerations",
  {
    registerationId: serial("registeration_id").primaryKey().notNull(),
    applicationId: integer("application_id").notNull(),
    academicYearId: integer("academic_year_id").notNull(),
    faculty: text().notNull(),
    academicDegree: departmentType("academic_degree").notNull(),
    departmentId: integer("department_id").notNull(),
  },
  (table) => {
    return {
      registerationsApplicationIdFkey: foreignKey({
        columns: [table.applicationId],
        foreignColumns: [applications.applicationId],
        name: "registerations_application_id_fkey",
      }),
      registerationsAcademicYearIdFkey: foreignKey({
        columns: [table.academicYearId],
        foreignColumns: [academicYears.academicYearId],
        name: "registerations_academic_year_id_fkey",
      }),
      registerationsDepartmentIdFkey: foreignKey({
        columns: [table.departmentId],
        foreignColumns: [departments.departmentId],
        name: "registerations_department_id_fkey",
      }),
      registerationsApplicationIdKey: unique(
        "registerations_application_id_key",
      ).on(table.applicationId),
    };
  },
);

export const academicYears = pgTable("academic_years", {
  academicYearId: serial("academic_year_id").primaryKey().notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
});

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
  (table) => {
    return {
      attachmentsApplicationIdFkey: foreignKey({
        columns: [table.applicationId],
        foreignColumns: [applications.applicationId],
        name: "attachments_application_id_fkey",
      }),
    };
  },
);

export const addresses = pgTable(
  "addresses",
  {
    addressId: serial("address_id").primaryKey().notNull(),
    applicationId: integer("application_id").notNull(),
    fullAddress: text("full_address").notNull(),
    country: text().notNull(),
    city: text().notNull(),
    type: addressType().notNull(),
  },
  (table) => {
    return {
      addressesApplicationIdFkey: foreignKey({
        columns: [table.applicationId],
        foreignColumns: [applications.applicationId],
        name: "addresses_application_id_fkey",
      }),
    };
  },
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
  (table) => {
    return {
      emergencyContactsApplicationIdFkey: foreignKey({
        columns: [table.applicationId],
        foreignColumns: [applications.applicationId],
        name: "emergency_contacts_application_id_fkey",
      }),
      emergencyContactsApplicationIdKey: unique(
        "emergency_contacts_application_id_key",
      ).on(table.applicationId),
    };
  },
);

export const academicQualifications = pgTable(
  "academic_qualifications",
  {
    qualificationId: serial("qualification_id").primaryKey().notNull(),
    applicationId: integer("application_id").notNull(),
    country: text().notNull(),
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
  (table) => {
    return {
      applicationIdIdx: index(
        "academic_qualifications_application_id_idx",
      ).using("btree", table.applicationId.asc().nullsLast()),
      academicQualificationsApplicationIdFkey: foreignKey({
        columns: [table.applicationId],
        foreignColumns: [applications.applicationId],
        name: "academic_qualifications_application_id_fkey",
      }),
      academicQualificationsApplicationIdKey: unique(
        "academic_qualifications_application_id_key",
      ).on(table.applicationId),
    };
  },
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
  (table) => {
    return {
      adminsEmailKey: unique("admins_email_key").on(table.email),
    };
  },
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
  (table) => {
    return {
      coursesCodeKey: unique("courses_code_key").on(table.code),
    };
  },
);

export const courseRegistrations = pgTable(
  "course_registrations",
  {
    courseRegistrationId: serial("course_registration_id")
      .primaryKey()
      .notNull(),
    courseId: integer("course_id").notNull(),
    applicationId: integer("application_id").notNull(),
    semester: semesterType().notNull(),
    academicYearId: integer("academic_year_id").notNull(),
  },
  (table) => {
    return {
      courseRegistrationsCourseIdFkey: foreignKey({
        columns: [table.courseId],
        foreignColumns: [courses.courseId],
        name: "course_registrations_course_id_fkey",
      }),
      courseRegistrationsApplicationIdFkey: foreignKey({
        columns: [table.applicationId],
        foreignColumns: [applications.applicationId],
        name: "course_registrations_application_id_fkey",
      }),
      courseRegistrationsAcademicYearIdFkey: foreignKey({
        columns: [table.academicYearId],
        foreignColumns: [academicYears.academicYearId],
        name: "course_registrations_academic_year_id_fkey",
      }),
    };
  },
);

export const courseResults = pgTable(
  "course_results",
  {
    resultId: serial("result_id").primaryKey().notNull(),
    courseRegistrationId: integer("course_registration_id").notNull(),
    grade: integer().notNull(),
  },
  (table) => {
    return {
      courseResultsCourseRegistrationIdFkey: foreignKey({
        columns: [table.courseRegistrationId],
        foreignColumns: [courseRegistrations.courseRegistrationId],
        name: "course_results_course_registration_id_fkey",
      }),
    };
  },
);

export const departmentCourses = pgTable(
  "department_courses",
  {
    courseId: integer("course_id").notNull(),
    departmentId: integer("department_id").notNull(),
    isCompulsory: boolean("is_compulsory").notNull(),
  },
  (table) => {
    return {
      departmentCoursesCourseIdFkey: foreignKey({
        columns: [table.courseId],
        foreignColumns: [courses.courseId],
        name: "department_courses_course_id_fkey",
      }),
      departmentCoursesDepartmentIdFkey: foreignKey({
        columns: [table.departmentId],
        foreignColumns: [departments.departmentId],
        name: "department_courses_department_id_fkey",
      }),
      departmentCoursesPkey: primaryKey({
        columns: [table.courseId, table.departmentId],
        name: "department_courses_pkey",
      }),
    };
  },
);
export const adminApplicationsList = pgView("admin_applications_list", {
  applicationId: integer("application_id"),
  studentName: text("student_name"),
  academicDegree: departmentType("academic_degree"),
  department: text(),
  isAdminAccepted: boolean("is_admin_accepted"),
}).as(
  sql`SELECT a.application_id, s.full_name_ar AS student_name, r.academic_degree, d.title AS department, a.is_admin_accepted FROM applications a JOIN students s USING (student_id) JOIN registerations r USING (application_id) JOIN departments d ON d.department_id = r.department_id`,
);

export const acceptedApplications = pgView("accepted_applications", {
  applicationId: integer("application_id"),
  studentId: integer("student_id"),
}).as(
  sql`SELECT applications.application_id, applications.student_id FROM applications WHERE applications.is_admin_accepted = true`,
);

export const detailedCourseRegistrationsView = pgView(
  "detailed_course_registrations_view",
  {
    courseId: integer("course_id").notNull(),
    code: text().notNull(),
    title: text().notNull(),
    prerequisite: integer().notNull(),
    totalHours: integer("total_hours").notNull(),
    academicYearId: integer("academic_year_id").notNull(),
    semester: semesterType().notNull(),
    applicationId: integer("application_id").notNull(),
  },
).as(
  sql`SELECT c.course_id, c.code, c.title, c.prerequisite, c.total_hours, c_r.academic_year_id, c_r.semester, c_r.application_id FROM course_registrations c_r JOIN department_courses d_c ON d_c.course_id = c_r.course_id JOIN courses c ON c.course_id = c_r.course_id JOIN registerations r ON r.application_id = c_r.application_id WHERE d_c.department_id = r.department_id`,
);
