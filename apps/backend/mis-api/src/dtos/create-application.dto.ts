import { z } from "@hono/zod-openapi";

export const CreateApplicationSchema = z.object({
  permanentAddress: z.object({
    fullAddress: z.string(),
    countryId: z.number(),
    cityId: z.number(),
    // Note: type is omitted as specified in the original schema
  }),

  currentAddress: z.object({
    fullAddress: z.string(),
    countryId: z.number(),
    cityId: z.number(),
    // Note: type is omitted as specified in the original schema
  }),

  emergencyContact: z
    .object({
      name: z.string(),
      address: z.string().nullable(),
      phoneNumber: z.string(),
      email: z.string().nullable(),
    })
    .optional(),

  qualification: z.object({
    countryId: z.number(),
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

  registration: z.object({
    academicYearId: z.number(),
    faculty: z.string(),
    departmentId: z.number(),
  }),
});

export type CreateApplicationDTO = z.infer<typeof CreateApplicationSchema>;
