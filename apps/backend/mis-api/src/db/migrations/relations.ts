import { relations } from "drizzle-orm/relations";
import {
  countries,
  cities,
  students,
  applications,
  registerations,
  academicYears,
  departments,
  attachments,
  addresses,
  emergencyContacts,
  academicQualifications,
  courses,
  courseRegistrations,
  courseResults,
  theses,
  departmentCourses,
} from "./schema";

export const citiesRelations = relations(cities, ({ one, many }) => ({
  country: one(countries, {
    fields: [cities.countryId],
    references: [countries.countryId],
  }),
  addresses: many(addresses),
}));

export const countriesRelations = relations(countries, ({ many }) => ({
  cities: many(cities),
  addresses: many(addresses),
}));

export const applicationsRelations = relations(applications, ({ one, many }) => ({
  student: one(students, {
    fields: [applications.studentId],
    references: [students.studentId],
  }),
  registerations: many(registerations),
  attachments: many(attachments),
  addresses: many(addresses),
  emergencyContacts: many(emergencyContacts),
  academicQualifications: many(academicQualifications),
  courseRegistrations: many(courseRegistrations),
  theses: many(theses),
}));

export const studentsRelations = relations(students, ({ many }) => ({
  applications: many(applications),
}));

export const registerationsRelations = relations(registerations, ({ one }) => ({
  application: one(applications, {
    fields: [registerations.applicationId],
    references: [applications.applicationId],
  }),
  academicYear: one(academicYears, {
    fields: [registerations.academicYearId],
    references: [academicYears.academicYearId],
  }),
  department: one(departments, {
    fields: [registerations.departmentId],
    references: [departments.departmentId],
  }),
}));

export const academicYearsRelations = relations(academicYears, ({ many }) => ({
  registerations: many(registerations),
  courseRegistrations: many(courseRegistrations),
}));

export const departmentsRelations = relations(departments, ({ many }) => ({
  registerations: many(registerations),
  departmentCourses: many(departmentCourses),
}));

export const attachmentsRelations = relations(attachments, ({ one, many }) => ({
  application: one(applications, {
    fields: [attachments.applicationId],
    references: [applications.applicationId],
  }),
  theses: many(theses),
}));

export const addressesRelations = relations(addresses, ({ one }) => ({
  application: one(applications, {
    fields: [addresses.applicationId],
    references: [applications.applicationId],
  }),
  country: one(countries, {
    fields: [addresses.countryId],
    references: [countries.countryId],
  }),
  city: one(cities, {
    fields: [addresses.cityId],
    references: [cities.cityId],
  }),
}));

export const emergencyContactsRelations = relations(emergencyContacts, ({ one }) => ({
  application: one(applications, {
    fields: [emergencyContacts.applicationId],
    references: [applications.applicationId],
  }),
}));

export const academicQualificationsRelations = relations(academicQualifications, ({ one }) => ({
  application: one(applications, {
    fields: [academicQualifications.applicationId],
    references: [applications.applicationId],
  }),
}));

export const courseRegistrationsRelations = relations(courseRegistrations, ({ one, many }) => ({
  course: one(courses, {
    fields: [courseRegistrations.courseId],
    references: [courses.courseId],
  }),
  application: one(applications, {
    fields: [courseRegistrations.applicationId],
    references: [applications.applicationId],
  }),
  academicYear: one(academicYears, {
    fields: [courseRegistrations.academicYearId],
    references: [academicYears.academicYearId],
  }),
  courseResults: many(courseResults),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  courseRegistrations: many(courseRegistrations),
  departmentCourses: many(departmentCourses),
}));

export const courseResultsRelations = relations(courseResults, ({ one }) => ({
  courseRegistration: one(courseRegistrations, {
    fields: [courseResults.courseRegistrationId],
    references: [courseRegistrations.courseRegistrationId],
  }),
}));

export const thesesRelations = relations(theses, ({ one }) => ({
  application: one(applications, {
    fields: [theses.applicationId],
    references: [applications.applicationId],
  }),
  attachment: one(attachments, {
    fields: [theses.attachmentId],
    references: [attachments.attachmentId],
  }),
}));

export const departmentCoursesRelations = relations(departmentCourses, ({ one }) => ({
  course: one(courses, {
    fields: [departmentCourses.courseId],
    references: [courses.courseId],
  }),
  department: one(departments, {
    fields: [departmentCourses.departmentId],
    references: [departments.departmentId],
  }),
}));
