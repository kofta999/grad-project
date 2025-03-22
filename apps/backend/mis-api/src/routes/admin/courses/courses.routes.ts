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
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

const tags = ["Admin"];

export const getApplicantRegisteredCourses = createRoute({
  path: "/list",
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
      "A list of all applicant's courses",
    ),
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
    [HttpStatusCodes.OK]: jsonContent(
      availableCoursesSchema,
      "Available courses",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(z.object({ error: z.string() })),
      "Validation error",
    ),
    // [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
    //   createErrorSchema(z.object({ error: z.string() })),
    //   "Server error",
    // ),
  },
});

export const registerCourse = createRoute({
  path: "/register",
  method: "post",
  tags,
  middleware: [isAuthenticated, requireRole("admin")],
  request: {
    body: jsonContentRequired(
      registerCourseSchema,
      "Params to register a course",
    ),
  },
  responses: {
    // @todo -> i will add more responses for later, first i will try to make it works🥲
    [HttpStatusCodes.CREATED]: {
      description: "Course registered successfully",
      content: {
        "application/json": { schema: z.object({ message: z.string() }) },
      },
    },
    [HttpStatusCodes.BAD_REQUEST]: {
      description: "Error registering course",
      content: {
        "application/json": { schema: z.object({ error: z.string() }) },
      },
    },
  },
});

export type RegisterCourseRoute = typeof registerCourse;

export type GetAvailableCoursesRoute = typeof getAvailableCoursesForApplication;

export type GetApplicantRegisteredCoursesRoute =
  typeof getApplicantRegisteredCourses;
