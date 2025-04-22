import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { requireRole } from "@/middlewares/requireRole";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createErrorSchema } from "stoker/openapi/schemas";
import { DEPARTMENT_TYPES, NotFoundSchema } from "@/lib/constants";
import { AvailableDepartmentsSchema } from "@/dtos/available-departments.dto";
import { CreateApplicationSchema } from "@/dtos/create-application.dto";
import { AcademicYearSchema } from "@/dtos/academic-year.dto.";
import { SaveAttachmentsSchema } from "@/dtos/save-attachment.dto";
import { ApplicationDetailsSchema } from "@/dtos/application-details.dto";

const tags = ["Student"];

export const getCurrentAcademicYears = createRoute({
  path: "/currentAcademicYears",
  method: "get",
  middleware: [isAuthenticated, requireRole("student")],
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(AcademicYearSchema),
      "An array of available academic years"
    ),
  },
});

export const getAvailableDepartments = createRoute({
  path: "/availableDepartments",
  method: "get",
  request: {
    query: z.object({
      type: z.enum(DEPARTMENT_TYPES),
    }),
  },
  middleware: [isAuthenticated, requireRole("student")],
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      AvailableDepartmentsSchema,
      "An array of available departments for this type"
    ),
  },
});

export const createApplication = createRoute({
  path: "/",
  method: "post",
  middleware: [isAuthenticated, requireRole("student")] as const,
  tags,
  request: {
    body: jsonContentRequired(CreateApplicationSchema, "Application data"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ applicationId: z.number() }),
      "Application completed"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(CreateApplicationSchema),
      "The validation error(s)"
    ),
  },
});

export const saveApplicationAttachments = createRoute({
  path: "/attachments",
  method: "post",
  middleware: [isAuthenticated, requireRole("student")] as const,
  tags,
  request: {
    body: jsonContentRequired(SaveAttachmentsSchema, "Attachment links with types"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.object({ applicationId: z.number() }), "Attachments saved"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(SaveAttachmentsSchema),
      "The validation error(s)"
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
      z.object({ application: ApplicationDetailsSchema }),
      "The application details"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(NotFoundSchema, "Application not found"),
  },
});

export type GetCurrentAcademicYears = typeof getCurrentAcademicYears;

export type GetAvailableDepartmentsRoute = typeof getAvailableDepartments;

export type CreateApplicationRoute = typeof createApplication;

export type SaveApplicationAttachmentsRoute = typeof saveApplicationAttachments;

export type GetApplicationRoute = typeof getApplication;
