import { z } from "@hono/zod-openapi";

export const UpdateApplicationSchema = z.object({
  permanentAddress: z
    .object({
      fullAddress: z.string().optional(),
      countryId: z.number().optional(),
      cityId: z.number().optional(),
      // Note: type is omitted as specified in the original schema
    })
    .optional(),

  currentAddress: z
    .object({
      fullAddress: z.string().optional(),
      countryId: z.number().optional(),
      cityId: z.number().optional(),
      // Note: type is omitted as specified in the original schema
    })
    .optional(),

  emergencyContact: z
    .object({
      name: z.string().optional(),
      address: z.string().nullable().optional(),
      phoneNumber: z.string().optional(),
      email: z.string().nullable().optional(),
    })
    .optional(),

  qualification: z
    .object({
      countryId: z.number().optional(),
      university: z.string().optional(),
      faculty: z.string().optional(),
      type: z.string().optional(),
      qualification: z.string().optional(),
      specialization: z.string().optional(),
      year: z.string().optional(),
      date: z.string().optional(),
      creditHours: z.boolean().optional(),
      grade: z.string().optional(),
      gpa: z.number().optional(),
    })
    .optional(),

  registration: z
    .object({
      academicYearId: z.number().optional(),
      faculty: z.string().optional(),
      departmentId: z.number().optional(),
    })
    .optional(),
});

export type UpdateApplicationDTO = z.infer<typeof UpdateApplicationSchema>;
