import { z } from "@hono/zod-openapi";

export const AvailableAcademicYearsSchema = z.array(
  z.object({
    academicYearId: z.number(),
    year: z.string(),
  })
);

export type AvailableAcademicYearsDTO = z.infer<typeof AvailableAcademicYearsSchema>;
