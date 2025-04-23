import { GRADES } from "@/lib/constants";
import { z } from "@hono/zod-openapi";

export const CourseSchema = z.object({
  courseId: z.number(),
  code: z.string(),
  title: z.string(),
  prerequisite: z.number(),
  totalHours: z.number(),
  grade: z.enum(GRADES).nullable(),
  courseRegistrationId: z.number().nullable(),
});

export type CourseDTO = z.infer<typeof CourseSchema>;
