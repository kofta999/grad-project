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
  }
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
        table.studentId.asc().nullsLast()
      ),
      applicationsStudentIdFkey: foreignKey({
        columns: [table.studentId],
        foreignColumns: [students.studentId],
        name: "applications_student_id_fkey",
      }),
    };
  }
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
  (table) => {
    return {
      idxRegisterationsAcademicYearId: index("idx_registerations_academic_year_id").using(
        "btree",
        table.academicYearId.asc().nullsLast()
      ),
      idxRegisterationsApplicationId: index("idx_registerations_application_id").using(
        "btree",
        table.applicationId.asc().nullsLast()
      ),
      idxRegisterationsDepartmentId: index("idx_registerations_department_id").using(
        "btree",
        table.departmentId.asc().nullsLast()
      ),
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
      registerationsApplicationIdKey: unique("registerations_application_id_key").on(
        table.applicationId
      ),
    };
  }
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
      idxAttachmentsApplicationId: index("idx_attachments_application_id").using(
        "btree",
        table.applicationId.asc().nullsLast()
      ),
      attachmentsApplicationIdFkey: foreignKey({
        columns: [table.applicationId],
        foreignColumns: [applications.applicationId],
        name: "attachments_application_id_fkey",
      }),
    };
  }
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
  (table) => {
    return {
      idxAddressesApplicationId: index("idx_addresses_application_id").using(
        "btree",
        table.applicationId.asc().nullsLast()
      ),
      addressesApplicationIdFkey: foreignKey({
        columns: [table.applicationId],
        foreignColumns: [applications.applicationId],
        name: "addresses_application_id_fkey",
      }),
    };
  }
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
      emergencyContactsApplicationIdKey: unique("emergency_contacts_application_id_key").on(
        table.applicationId
      ),
    };
  }
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
  }
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
      idxCoursesPrerequisite: index("idx_courses_prerequisite").using(
        "btree",
        table.prerequisite.asc().nullsLast()
      ),
      coursesCodeKey: unique("courses_code_key").on(table.code),
    };
  }
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
  (table) => {
    return {
      idxCourseRegistrationsAcademicYearId: index(
        "idx_course_registrations_academic_year_id"
      ).using("btree", table.academicYearId.asc().nullsLast()),
      idxCourseRegistrationsAppSemester: index("idx_course_registrations_app_semester").using(
        "btree",
        table.applicationId.asc().nullsLast(),
        table.semester.asc().nullsLast()
      ),
      idxCourseRegistrationsApplicationId: index("idx_course_registrations_application_id").using(
        "btree",
        table.applicationId.asc().nullsLast()
      ),
      idxCourseRegistrationsCourseId: index("idx_course_registrations_course_id").using(
        "btree",
        table.courseId.asc().nullsLast()
      ),
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
  }
);

export const courseResults = pgTable(
  "course_results",
  {
    courseResultId: serial("course_result_id").primaryKey().notNull(),
    courseRegistrationId: integer("course_registration_id").notNull(),
    grade: integer().notNull(),
  },
  (table) => {
    return {
      idxCourseResultsCourseRegistrationId: index(
        "idx_course_results_course_registration_id"
      ).using("btree", table.courseRegistrationId.asc().nullsLast()),
      idxCourseResultsGrade: index("idx_course_results_grade").using(
        "btree",
        table.grade.asc().nullsLast()
      ),
      courseResultsCourseRegistrationIdFkey: foreignKey({
        columns: [table.courseRegistrationId],
        foreignColumns: [courseRegistrations.courseRegistrationId],
        name: "course_results_course_registration_id_fkey",
      }),
    };
  }
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
  }
);
export const adminApplicationsList = pgView("admin_applications_list", {
  applicationId: integer("application_id").notNull(),
  studentName: text("student_name").notNull(),
  academicDegree: departmentType("academic_degree").notNull(),
  department: text().notNull(),
  isAdminAccepted: boolean("is_admin_accepted").notNull(),
}).as(
  sql`SELECT a.application_id, s.full_name_ar AS student_name, r.academic_degree, d.title AS department, a.is_admin_accepted FROM applications a JOIN students s USING (student_id) JOIN registerations r USING (application_id) JOIN departments d ON d.department_id = r.department_id`
);

export const acceptedApplications = pgView("accepted_applications", {
  applicationId: integer("application_id").notNull(),
  departmentId: integer("department_id"),
  studentId: integer("student_id").notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  totalCompletedHours: bigint("total_completed_hours", {
    mode: "number",
  }).notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  completedCompulsoryHours: bigint("completed_compulsory_hours", {
    mode: "number",
  }).notNull(),
}).as(
  sql`SELECT a.application_id, a.student_id, r.department_id, sum(c.total_hours) AS total_completed_hours, sum( CASE WHEN d_c.is_compulsory = true THEN c.total_hours ELSE 0 END) AS completed_compulsory_hours FROM applications a JOIN registerations r ON r.application_id = a.application_id JOIN course_registrations c_reg ON c_reg.application_id = a.application_id JOIN course_results c_res ON c_res.course_registration_id = c_reg.course_registration_id JOIN courses c ON c.course_id = c_reg.course_id JOIN department_courses d_c ON d_c.course_id = c_reg.course_id AND d_c.department_id = r.department_id WHERE a.is_admin_accepted = true AND c_res.grade >= 50 GROUP BY a.application_id, r.department_id`
);

export const detailedCourseRegistrationsView = pgView("detailed_course_registrations_view", {
  courseId: integer("course_id").notNull(),
  code: text().notNull(),
  title: text().notNull(),
  prerequisite: integer().notNull(),
  totalHours: integer("total_hours").notNull(),
  academicYearId: integer("academic_year_id").notNull(),
  semester: semesterType().notNull(),
  grade: integer().notNull(),
  applicationId: integer("application_id").notNull(),
  courseRegistrationId: integer("course_registration_id").notNull(),
}).as(
  sql`SELECT c.course_id, c.code, c.title, c.prerequisite, c.total_hours, c_r.academic_year_id, c_r.semester, c_res.grade, c_r.application_id, c_r.course_registration_id FROM course_registrations c_r JOIN department_courses d_c ON d_c.course_id = c_r.course_id JOIN courses c ON c.course_id = c_r.course_id JOIN registerations r ON r.application_id = c_r.application_id LEFT JOIN course_results c_res ON c_res.course_registration_id = c_r.course_registration_id WHERE d_c.department_id = r.department_id`
);

export const reports = pgTable("reports", {
  reportId: serial("report_id").primaryKey(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  attachmentUrl: text("attachment_url").notNull(),
});
