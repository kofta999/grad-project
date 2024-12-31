import { pgTable, serial, text, boolean, timestamp, index, foreignKey, integer, pgEnum } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { sql } from "drizzle-orm"

export const addressType = pgEnum("address_type", ['permanent', 'current'])
export const identificationType = pgEnum("identification_type", ['national_id', 'passport'])
export const martialStatus = pgEnum("martial_status", ['single', 'married', 'married_with_dependents', 'divorced', 'widow', 'other'])


export const students = pgTable("students", {
  studentId: serial("student_id").notNull(),
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
  idIssuanceDate: timestamp("id_issuance_date", { mode: 'string' }).notNull(),
  idNumber: text("id_number").notNull(),
  idAuthority: text("id_authority").notNull(),
  martialStatus: martialStatus("martial_status"),
  isWorking: boolean("is_working").notNull(),
  jobType: text("job_type"),
  hashedPassword: text("hashed_password").notNull(),
  secQuestion: text("sec_question").notNull(),
  secAnswer: text("sec_answer").notNull(),
  militaryStatus: text("military_status").notNull(),
  dob: timestamp({ mode: 'string' }).notNull(),
  createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
});

export const applications = pgTable("applications", {
  applicationId: serial("application_id").notNull(),
  studentId: integer("student_id").notNull(),
}, (table) => {
  return {
    studentIdIdx: index("applications_student_id_idx").using("btree", table.studentId.asc().nullsLast()),
    applicationsStudentIdFkey: foreignKey({
      columns: [table.studentId],
      foreignColumns: [students.studentId],
      name: "applications_student_id_fkey"
    }),
  }
});

export const registerations = pgTable("registerations", {
  registerationId: serial("registeration_id").notNull(),
  applicationId: integer("application_id").notNull(),
  academicYear: text("academic_year").notNull(),
  faculty: text().notNull(),
  academicDegree: text("academic_degree").notNull(),
  academicProgram: text("academic_program").notNull(),
}, (table) => {
  return {
    registerationsApplicationIdFkey: foreignKey({
      columns: [table.applicationId],
      foreignColumns: [applications.applicationId],
      name: "registerations_application_id_fkey"
    }),
  }
});

export const emergencyContacts = pgTable("emergency_contacts", {
  contactId: serial("contact_id").notNull(),
  applicationId: integer("application_id").notNull(),
  name: text().notNull(),
  address: text(),
  phoneNumber: text("phone_number").notNull(),
  email: text(),
}, (table) => {
  return {
    emergencyContactsApplicationIdFkey: foreignKey({
      columns: [table.applicationId],
      foreignColumns: [applications.applicationId],
      name: "emergency_contacts_application_id_fkey"
    }),
  }
});

export const attachments = pgTable("attachments", {
  attachmentId: serial("attachment_id").notNull(),
  applicationId: integer("application_id").notNull(),
  type: text().notNull(),
  attachmentUrl: text("attachment_url").notNull(),
}, (table) => {
  return {
    attachmentsApplicationIdFkey: foreignKey({
      columns: [table.applicationId],
      foreignColumns: [applications.applicationId],
      name: "attachments_application_id_fkey"
    }),
  }
});

export const addresses = pgTable("addresses", {
  addressId: serial("address_id").notNull(),
  applicationId: integer("application_id").notNull(),
  houseNumber: text("house_number").notNull(),
  street: text().notNull(),
  city: text().notNull(),
  type: addressType().notNull(),
}, (table) => {
  return {
    addressesApplicationIdFkey: foreignKey({
      columns: [table.applicationId],
      foreignColumns: [applications.applicationId],
      name: "addresses_application_id_fkey"
    }),
  }
});

export const academicQualifications = pgTable("academic_qualifications", {
  qualificationId: serial("qualification_id").notNull(),
  applicationId: integer("application_id").notNull(),
  country: text().notNull(),
  university: text().notNull(),
  faculty: text().notNull(),
  type: text().notNull(),
  qualification: text().notNull(),
  specialization: text().notNull(),
  year: text().notNull(),
  date: timestamp({ mode: 'string' }).notNull(),
  creditHours: boolean("credit_hours").notNull(),
  grade: text().notNull(),
  gpa: text().notNull(),
}, (table) => {
  return {
    applicationIdIdx: index("academic_qualifications_application_id_idx").using("btree", table.applicationId.asc().nullsLast()),
    academicQualificationsApplicationIdFkey: foreignKey({
      columns: [table.applicationId],
      foreignColumns: [applications.applicationId],
      name: "academic_qualifications_application_id_fkey"
    }),
  }
});



// export const users = sqliteTable('users', {
//   id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
//   username: text().notNull().unique(),
//   password: text({ length: 20 }).notNull()
// })

// export const selectUsersSchema = createSelectSchema(users);
// export const insertUsersSchema = createInsertSchema(users,
//   { username: schema => schema.username.min(3), password: schema => schema.password.min(6) })
//   .omit({ id: true });


// export const tasks = sqliteTable('tasks', {
//   id: integer({ mode: 'number' })
//     .primaryKey({ autoIncrement: true }),
//   name: text()
//     .notNull(),
//   done: integer({ mode: 'boolean' })
//     .notNull()
//     .default(false),
//   createdAt: integer({ mode: 'timestamp' })
//     .$defaultFn(() => new Date()),
//   updatedAt: integer({ mode: 'timestamp' })
//     .$defaultFn(() => new Date())
//     .$onUpdate(() => new Date()),
// })

// export const selectTasksSchema = createSelectSchema(tasks)

// export const insertTasksSchema = createInsertSchema(tasks, { name: schema => schema.name.min(1).max(500) })
//   .required({ done: true })
//   .omit({
//     id: true,
//     createdAt: true,
//     updatedAt: true,
//   })

// export const patchTasksSchema = insertTasksSchema.partial()
