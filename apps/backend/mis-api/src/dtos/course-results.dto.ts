import { z } from "@hono/zod-openapi";

export const SetCourseResultSchema = z.object({
  courseRegistrationId: z.number(),
  grade: z.number(),
});

export const CourseResultSchema = z.object({
  courseResultId: z.number(),
  courseRegistrationId: z.number(),
  grade: z.number(),
});

export type SetCourseResultDTO = z.infer<typeof SetCourseResultSchema>;
export type CourseResultDTO = z.infer<typeof CourseResultSchema>;
