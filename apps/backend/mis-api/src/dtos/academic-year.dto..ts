import { z } from "@hono/zod-openapi";

export const AcademicYearSchema = z.object({
  academicYearId: z.number(),
  year: z.string(),
});

export type AcademicYearDTO = z.infer<typeof AcademicYearSchema>;
