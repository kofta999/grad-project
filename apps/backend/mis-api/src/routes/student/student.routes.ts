// Will use this for any routes that isn't worth of creating their own folder
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { requireRole } from "@/middlewares/requireRole";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, createMessageObjectSchema } from "stoker/openapi/schemas";
import { StudentDetailsSchema } from "@/dtos/student-details.dto";
import { CourseSchema } from "@/dtos/registered-course.dto";
import { SEMESTERS } from "@/lib/constants";
import { AcademicYearSchema } from "@/dtos/academic-year.dto.";

const tags = ["Student"];

export const getApplicantRegisteredCourses = createRoute({
  path: "/courses",
  method: "get",
  tags,
  middleware: [isAuthenticated, requireRole("student")] as const,
  request: {
    query: z.object({
      semester: z.enum(SEMESTERS),
      academicYearId: z.coerce.number(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(CourseSchema),
      "A list of all applicant's registered courses"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Application not found"),
      "Application not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized"
    ),
  },
});

export const getRegisteredAcademicYears = createRoute({
  path: "/courses/registeredAcademicYears",
  method: "get",
  middleware: [isAuthenticated, requireRole("student")],
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(AcademicYearSchema),
      "An array of available academic years"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Application not found"),
      "Application not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized"
    ),
  },
});

export const getStudentDetails = createRoute({
  path: "/",
  method: "get",
  middleware: [isAuthenticated, requireRole("student")],
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(StudentDetailsSchema, "Student details"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Student not found"),
      "Student not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized"
    ),
  },
});

export const editStudentInfo = createRoute({
  path: "/",
  method: "put",
  middleware: [isAuthenticated, requireRole("student")],
  tags,
  request: {
    body: jsonContentRequired(StudentDetailsSchema.partial(), "Updated student information"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Student info updated successfully"),
      "Success response"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Student not found"),
      "Student not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized"
    ),
    // I don't know if we will use this or no, but i noticed that is common in the nodejs community websites :D
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(StudentDetailsSchema.partial()),
      "Validation error"
    ),
  },
});

export type GetApplicantRegisteredCourses = typeof getApplicantRegisteredCourses;

export type GetRegisteredAcademicYearsRoute = typeof getRegisteredAcademicYears;

export type EditStudentInfoRoute = typeof editStudentInfo;

export type GetStudentDetailsRoute = typeof getStudentDetails;
