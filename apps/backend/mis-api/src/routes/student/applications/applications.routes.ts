import {
  attachmentsSchema,
  applicationSchema,
  studentApplicationDetailsSchema,
  editStudentInfoSchema,
  currentAcademicYearsSchema,
  applicantRegisteredCoursesRequestSchemaForStudent,
  applicantRegisteredCoursesResponseSchemaForStudent,
} from "@/db/validators";
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { requireRole } from "@/middlewares/requireRole";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  createErrorSchema,
  createMessageObjectSchema,
} from "stoker/openapi/schemas";
import { notFoundSchema } from "@/lib/constants";

const tags = ["Student"];

export const getCurrentAcademicYears = createRoute({
  path: "/currentAcademicYears",
  method: "get",
  middleware: [isAuthenticated, requireRole("student")],
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      currentAcademicYearsSchema,
      "An array of available academic years",
    ),
  },
});

export const getAvailableDepartments = createRoute({
  path: "/availableDepartments",
  method: "get",
  request: {
    query: z.object({
      // TODO: Abstract this enum across the app
      type: z.enum(["diploma", "master", "phd"]),
    }),
  },
  middleware: [isAuthenticated, requireRole("student")],
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(z.object({ departmentId: z.number(), title: z.string() })),
      "An array of available departments for this type",
    ),
  },
});

export const createApplication = createRoute({
  path: "/",
  method: "post",
  middleware: [isAuthenticated, requireRole("student")] as const,
  tags,
  request: {
    body: jsonContentRequired(applicationSchema, "Application data"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ applicationId: z.number() }),
      "Application completed",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(applicationSchema),
      "The validation error(s)",
    ),
  },
});

export const saveApplicationAttachments = createRoute({
  path: "/attachments",
  method: "post",
  middleware: [isAuthenticated, requireRole("student")] as const,
  tags,
  request: {
    body: jsonContentRequired(attachmentsSchema, "Attachment links with types"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ applicationId: z.number() }),
      "Attachments saved",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(attachmentsSchema),
      "The validation error(s)",
    ),
  },
});

export const getApplication = createRoute({
  path: "/",
  method: "get",
  middleware: [isAuthenticated, requireRole("student")],
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      studentApplicationDetailsSchema,
      "The application details",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Application not found",
    ),
  },
});

export type GetCurrentAcademicYears = typeof getCurrentAcademicYears;

export type GetAvailableDepartmentsRoute = typeof getAvailableDepartments;

export type CreateApplicationRoute = typeof createApplication;

export type SaveApplicationAttachmentsRoute = typeof saveApplicationAttachments;

export type GetApplicationRoute = typeof getApplication;
