import { pgTable, unique, serial, text, boolean, date, timestamp, index, foreignKey, integer, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const addressType = pgEnum("address_type", ['permanent', 'current'])
export const identificationType = pgEnum("identification_type", ['national_id', 'passport'])
export const martialStatus = pgEnum("martial_status", ['single', 'married', 'married_with_dependents', 'divorced', 'widow', 'other'])


export const students = pgTable("students", {
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
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => {
	return {
		studentsEmailKey: unique("students_email_key").on(table.email),
	}
});

export const applications = pgTable("applications", {
	applicationId: serial("application_id").primaryKey().notNull(),
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
	registerationId: serial("registeration_id").primaryKey().notNull(),
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
		registerationsApplicationIdKey: unique("registerations_application_id_key").on(table.applicationId),
	}
});

export const emergencyContacts = pgTable("emergency_contacts", {
	contactId: serial("contact_id").primaryKey().notNull(),
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
		emergencyContactsApplicationIdKey: unique("emergency_contacts_application_id_key").on(table.applicationId),
	}
});

export const attachments = pgTable("attachments", {
	attachmentId: serial("attachment_id").primaryKey().notNull(),
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
	addressId: serial("address_id").primaryKey().notNull(),
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
	gpa: text().notNull(),
}, (table) => {
	return {
		applicationIdIdx: index("academic_qualifications_application_id_idx").using("btree", table.applicationId.asc().nullsLast()),
		academicQualificationsApplicationIdFkey: foreignKey({
			columns: [table.applicationId],
			foreignColumns: [applications.applicationId],
			name: "academic_qualifications_application_id_fkey"
		}),
		academicQualificationsApplicationIdKey: unique("academic_qualifications_application_id_key").on(table.applicationId),
	}
});
