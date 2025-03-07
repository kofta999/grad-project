import {
  applicantRegisteredCoursesRequestSchema,
  applicantRegisteredCoursesResponseSchema,
} from "@/db/validators";
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { requireRole } from "@/middlewares/requireRole";
import { createRoute } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";

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

export type GetApplicantRegisteredCoursesRoute =
  typeof getApplicantRegisteredCourses;
