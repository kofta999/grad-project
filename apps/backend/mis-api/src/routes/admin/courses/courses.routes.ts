import { CourseSchema } from "@/dtos/registered-course.dto";
import { SEMESTERS } from "@/lib/constants";
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { requireRole } from "@/middlewares/requireRole";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { IdParamsSchema, createErrorSchema } from "stoker/openapi/schemas";

const tags = ["Admin"];

export const getApplicantRegisteredCourses = createRoute({
  path: "/list",
  method: "post",
  tags,
  middleware: [isAuthenticated, requireRole("admin")] as const,
  request: {
    body: jsonContentRequired(
      z.object({
        applicationId: z.number(),
        semester: z.enum(SEMESTERS),
        academicYearId: z.number(),
      }),
      "Params to get the courses"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(CourseSchema), "A list of all applicant's courses"),
    [HttpStatusCodes.BAD_REQUEST]: {
      description: "Error getting courses",
      content: {
        "application/json": { schema: z.object({ error: z.string() }) },
      },
    },
  },
});

export const getAvailableCoursesForApplication = createRoute({
  path: "/available/{applicationId}",
  method: "get",
  middleware: [isAuthenticated, requireRole("admin")],
  tags,
  request: {
    params: z.object({
      applicationId: z.coerce.number().openapi({
        param: {
          name: "applicationId",
          in: "path",
          required: true,
        },
        required: ["id"],
        example: 1,
      }),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(CourseSchema), "Available courses"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(z.object({ error: z.string() })),
      "Validation error"
    ),
    [HttpStatusCodes.BAD_REQUEST]: {
      description: "Error getting courses",
      content: {
        "application/json": { schema: z.object({ error: z.string() }) },
      },
    },
  },
});

export const registerCourse = createRoute({
  path: "/register",
  method: "post",
  tags,
  middleware: [isAuthenticated, requireRole("admin")],
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

export const deleteCourse = createRoute({
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

export type RegisterCourseRoute = typeof registerCourse;

export type GetAvailableCoursesRoute = typeof getAvailableCoursesForApplication;

export type GetApplicantRegisteredCoursesRoute = typeof getApplicantRegisteredCourses;

export type DeleteCourseRoute = typeof deleteCourse;
