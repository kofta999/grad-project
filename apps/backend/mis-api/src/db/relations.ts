import { relations } from "drizzle-orm/relations";
import { students, applications, registerations, emergencyContacts, attachments, addresses, academicQualifications } from "./schema";

export const applicationsRelations = relations(applications, ({ one, many }) => ({
  student: one(students, {
    fields: [applications.studentId],
    references: [students.studentId]
  }),
  registerations: many(registerations),
  emergencyContacts: many(emergencyContacts),
  attachments: many(attachments),
  addresses: many(addresses),
  academicQualifications: many(academicQualifications),
}));

export const studentsRelations = relations(students, ({ many }) => ({
  applications: many(applications),
}));

export const registerationsRelations = relations(registerations, ({ one }) => ({
  application: one(applications, {
    fields: [registerations.applicationId],
    references: [applications.applicationId]
  }),
}));

export const emergencyContactsRelations = relations(emergencyContacts, ({ one }) => ({
  application: one(applications, {
    fields: [emergencyContacts.applicationId],
    references: [applications.applicationId]
  }),
}));

export const attachmentsRelations = relations(attachments, ({ one }) => ({
  application: one(applications, {
    fields: [attachments.applicationId],
    references: [applications.applicationId]
  }),
}));

export const addressesRelations = relations(addresses, ({ one }) => ({
  application: one(applications, {
    fields: [addresses.applicationId],
    references: [applications.applicationId]
  }),
}));

export const academicQualificationsRelations = relations(academicQualifications, ({ one }) => ({
  application: one(applications, {
    fields: [academicQualifications.applicationId],
    references: [applications.applicationId]
  }),
}));
