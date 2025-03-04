import { relations } from "drizzle-orm/relations";
import { applications, registerations, emergencyContacts, attachments, addresses, academicQualifications, students, courses, courseRegistrations, courseResults, departmentCourses, departments } from "./schema";

export const registerationsRelations = relations(registerations, ({one}) => ({
	application: one(applications, {
		fields: [registerations.applicationId],
		references: [applications.applicationId]
	}),
}));

export const applicationsRelations = relations(applications, ({one, many}) => ({
	registerations: many(registerations),
	emergencyContacts: many(emergencyContacts),
	attachments: many(attachments),
	addresses: many(addresses),
	academicQualifications: many(academicQualifications),
	student: one(students, {
		fields: [applications.studentId],
		references: [students.studentId]
	}),
	courseRegistrations: many(courseRegistrations),
}));

export const emergencyContactsRelations = relations(emergencyContacts, ({one}) => ({
	application: one(applications, {
		fields: [emergencyContacts.applicationId],
		references: [applications.applicationId]
	}),
}));

export const attachmentsRelations = relations(attachments, ({one}) => ({
	application: one(applications, {
		fields: [attachments.applicationId],
		references: [applications.applicationId]
	}),
}));

export const addressesRelations = relations(addresses, ({one}) => ({
	application: one(applications, {
		fields: [addresses.applicationId],
		references: [applications.applicationId]
	}),
}));

export const academicQualificationsRelations = relations(academicQualifications, ({one}) => ({
	application: one(applications, {
		fields: [academicQualifications.applicationId],
		references: [applications.applicationId]
	}),
}));

export const studentsRelations = relations(students, ({many}) => ({
	applications: many(applications),
}));

export const courseRegistrationsRelations = relations(courseRegistrations, ({one, many}) => ({
	course: one(courses, {
		fields: [courseRegistrations.courseId],
		references: [courses.courseId]
	}),
	application: one(applications, {
		fields: [courseRegistrations.applicationId],
		references: [applications.applicationId]
	}),
	courseResults: many(courseResults),
}));

export const coursesRelations = relations(courses, ({many}) => ({
	courseRegistrations: many(courseRegistrations),
	departmentCourses: many(departmentCourses),
}));

export const courseResultsRelations = relations(courseResults, ({one}) => ({
	courseRegistration: one(courseRegistrations, {
		fields: [courseResults.courseRegistrationId],
		references: [courseRegistrations.courseRegistrationId]
	}),
}));

export const departmentCoursesRelations = relations(departmentCourses, ({one}) => ({
	course: one(courses, {
		fields: [departmentCourses.courseId],
		references: [courses.courseId]
	}),
	department: one(departments, {
		fields: [departmentCourses.departmentId],
		references: [departments.departmentId]
	}),
}));

export const departmentsRelations = relations(departments, ({many}) => ({
	departmentCourses: many(departmentCourses),
}));