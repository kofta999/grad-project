import {
  applicantRegisteredCoursesRequestSchema,
  applicantRegisteredCoursesResponseSchema,
  availableCoursesSchema,
  registerCourseSchema,
} from "@/db/validators";
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { requireRole } from "@/middlewares/requireRole";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createErrorSchema } from "stoker/openapi/schemas";

const tags = ["Admin"];

export const getApplicantRegisteredCourses = createRoute({
  path: "/",
  method: "post",
  tags,
  middleware: [isAuthenticated, requireRole("admin")] as const,
  request: {
    body: jsonContentRequired(
      applicantRegisteredCoursesRequestSchema,
      "Params to get the courses",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      applicantRegisteredCoursesResponseSchema,
      "A list of all students with applications",
    ),
  },
});

  
  export const getAvailableCourses = createRoute({
    path: "/available/:application_id",
    method: "get",
    middleware: [isAuthenticated, requireRole("admin")],
    tags,
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        availableCoursesSchema,
        "Available courses",
      ),
      [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
        createErrorSchema(z.object({ error: z.string() })),
        "Validation error",
      ),
      [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
        createErrorSchema(z.object({ error: z.string() })),
        "Server error",
      ),
    },
  });
  
  export const registerCourseRoute = createRoute({
    path: "/register",
    method: "post",
    tags,
    middleware: [isAuthenticated, requireRole("admin")],
    request: {
      body: jsonContentRequired(
        registerCourseSchema,
        "Params to register a course"
      ),
    },
    responses: {
      // @todo -> i will add more responses for later, first i will try to make it works🥲
      [HttpStatusCodes.CREATED]: {
        description: "Course registered successfully",
        content: { "application/json": { schema: z.object({ message: z.string() }) } },
      },
      [HttpStatusCodes.BAD_REQUEST]: {
        description: "Error registering course",
        content: { "application/json": { schema: z.object({ error: z.string() }) } },
      },
    },
  });
  
export type RegisterCourseRoute = typeof registerCourseRoute;

export type GetAvailableCoursesRoute = typeof getAvailableCourses;

export type GetApplicantRegisteredCoursesRoute =
  typeof getApplicantRegisteredCourses;
