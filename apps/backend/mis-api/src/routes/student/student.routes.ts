// Will use this for any routes that isn't worth of creating their own folder
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { requireRole } from "@/middlewares/requireRole";
import { createRoute } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import {
  createErrorSchema,
  createMessageObjectSchema,
} from "stoker/openapi/schemas";
import {
  applicantRegisteredCoursesRequestSchemaForStudent,
  applicantRegisteredCoursesResponseSchemaForStudent,
  editStudentInfoSchema,
} from "@/db/validators";

const tags = ["Student"];

export const getApplicantRegisteredCourses = createRoute({
  path: "/courses",
  method: "get",
  tags,
  middleware: [isAuthenticated, requireRole("student")] as const,
  request: {
    query: applicantRegisteredCoursesRequestSchemaForStudent,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      applicantRegisteredCoursesResponseSchemaForStudent,
      "A list of all applicant's registered courses",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Application not found"),
      "Application not found",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized",
    ),
  },
});

export const editStudentInfo = createRoute({
  path: "/",
  method: "put",
  middleware: [isAuthenticated, requireRole("student")],
  tags,
  request: {
    body: jsonContentRequired(
      editStudentInfoSchema,
      "Updated student information",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Student info updated successfully"),
      "Success response",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Student not found"),
      "Student not found",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized",
    ),
    // I don't know if we will use this or no, but i noticed that is common in the nodejs community websites :D
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(editStudentInfoSchema),
      "Validation error",
    ),
  },
});

export type GetApplicantRegisteredCourses =
  typeof getApplicantRegisteredCourses;

export type EditStudentInfoRoute = typeof editStudentInfo;
