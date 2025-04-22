import { z } from "@hono/zod-openapi";

export const RegisteredCourseSchema = z.object({
  courseId: z.number(),
  code: z.string(),
  title: z.string(),
  prerequisite: z.number(),
  totalHours: z.number(),
  grade: z.string().nullable(),
  courseRegistrationId: z.number(),
});

export type RegisteredCourseDTO = z.infer<typeof RegisteredCourseSchema>;
