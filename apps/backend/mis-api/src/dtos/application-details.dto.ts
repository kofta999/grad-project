import { z } from "zod";
import { APPLICATION_STATUSES, DEPARTMENT_TYPES } from "@/lib/constants";

export const ApplicationDetailsSchema = z.object({
  applicationId: z.number(),
  studentId: z.number(),
  status: z.enum(APPLICATION_STATUSES),
  addresses: z.array(
    z.object({
      addressId: z.number(),
      fullAddress: z.string(),
      countryId: z.number(),
      cityId: z.number(),
      country: z.string(),
      city: z.string(),
      type: z.enum(["permanent", "current"]),
    })
  ),
  qualification: z.object({
    qualificationId: z.number(),
    countryId: z.number(),
    country: z.string(),
    university: z.string(),
    faculty: z.string(),
    type: z.string(),
    qualification: z.string(),
    specialization: z.string(),
    year: z.string(),
    date: z.string(),
    creditHours: z.boolean(),
    grade: z.string(),
    gpa: z.number(),
  }),
  emergencyContact: z
    .object({
      contactId: z.number(),
      name: z.string(),
      address: z.string().nullable(),
      phoneNumber: z.string(),
      email: z.string().nullable(),
    })
    .nullable(),
  registration: z.object({
    registerationId: z.number(),
    departmentId: z.number(),
    academicYearId: z.number(),
    faculty: z.string(),
    academicYear: z.string(),
    academicDegree: z.enum(DEPARTMENT_TYPES),
    academicProgram: z.string(),
  }),
  supervisor: z
    .object({
      supervisorId: z.number(),
      name: z.string(),
      email: z.string(),
    })
    .nullable(),
  attachments: z.array(
    z.object({
      attachmentId: z.number(),
      type: z.string(),
      attachmentUrl: z.string(),
    })
  ),
});

export type ApplicationDetailsDTO = z.infer<typeof ApplicationDetailsSchema>;
