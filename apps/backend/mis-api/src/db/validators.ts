import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {
  academicQualifications,
  addresses,
  emergencyContacts,
  registerations,
  students,
} from "./schema";
import { z } from "zod";

// Won't use drizzle magic here because it's not worth omitting all fields for only email and pass
export const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be 6 characters or more"),
});

export const registerStep1Schema = createInsertSchema(students).omit({
  studentId: true,
  createdAt: true,
  updatedAt: true,
});

export const registerStep2Schema = z.object({
  permanentAddress: createInsertSchema(addresses).omit({
    addressId: true,
    applicationId: true,
    type: true,
  }),
  currentAddress: createInsertSchema(addresses).omit({
    addressId: true,
    applicationId: true,
    type: true,
  }),
  emergencyContact: createInsertSchema(emergencyContacts)
    .omit({ applicationId: true, contactId: true })
    .optional(),
  qualification: createInsertSchema(academicQualifications).omit({
    applicationId: true,
    qualificationId: true,
  }),
  registration: createInsertSchema(registerations).omit({
    registerationId: true,
    applicationId: true,
  }),
});
