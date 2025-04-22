import { SEMESTERS } from "@/lib/constants";
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { requireRole } from "@/middlewares/requireRole";
import { createRoute } from "@hono/zod-openapi";
import { jsonContentRequired, jsonContent } from "stoker/openapi/helpers";
import { IdParamsSchema } from "stoker/openapi/schemas";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { z } from "zod";

const tags = ["Enrollments"];
const adminMiddleware = [isAuthenticated, requireRole("admin")];

export const enrollCourse = createRoute({
  path: "/",
  method: "post",
  tags,
  middleware: adminMiddleware,
  request: {
    body: jsonContentRequired(
      z.object({
        applicationId: z.number().int().positive(),
        courseId: z.number().int().positive(),
        semester: z.enum(SEMESTERS),
      }),
      "Params to register a course"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      z.object({ courseRegistrationId: z.number() }),
      "Course registered successfully"
    ),
    [HttpStatusCodes.BAD_REQUEST]: {
      description: "Error registering course",
      content: {
        "application/json": { schema: z.object({ error: z.string() }) },
      },
    },
  },
});

export const withdrawCourse = createRoute({
  path: "/{id}",
  method: "delete",
  tags,
  request: {
    params: IdParamsSchema,
  },
  middleware: [isAuthenticated, requireRole("admin")],
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Course deleted successfully",
    },
    [HttpStatusCodes.BAD_REQUEST]: {
      description: "Error deleting course",
      content: {
        "application/json": { schema: z.object({ error: z.string() }) },
      },
    },
  },
});

export type EnrollCourseRoute = typeof enrollCourse;

export type WithdrawCourseRoute = typeof withdrawCourse;
