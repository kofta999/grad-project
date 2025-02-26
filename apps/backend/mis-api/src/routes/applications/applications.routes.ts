import {
  acceptApplicationSchema,
  attachmentsSchema,
  registerStep2Schema,
  editStudentInfoSchema,
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

const tags = ["Applications"];

export const acceptApplication = createRoute({
  path: "/accept",
  method: "post",
  tags,
  middleware: [isAuthenticated, requireRole("admin")],
  request: {
    body: jsonContentRequired(acceptApplicationSchema, "Application schema"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Application accepted"),
      "Application accepted",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Application not found"),
      "Application not found",
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      createMessageObjectSchema("Application already accepted"),
      "Application already accepted",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(acceptApplicationSchema),
      "The validation error(s)",
    ),
  },
});

export const createApplication = createRoute({
  path: "/",
  method: "post",
  middleware: [isAuthenticated, requireRole("student")] as const,
  tags,
  request: {
    body: jsonContentRequired(registerStep2Schema, "Application data"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ applicationId: z.number() }),
      "Application completed",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(registerStep2Schema),
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

//test new commit 
export const editStudentInfoRoute = createRoute({
  path: "/edit-student-info",
  method: "put",
  middleware: [isAuthenticated, requireRole("student")],
  tags,
  request: {
    body: jsonContentRequired(editStudentInfoSchema, "Updated student information"),
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
    //I don't know if we will use this or no, but i noticed that is common in the nodejs community websites :D
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(editStudentInfoSchema),
      "Validation error"
    ),
  },
});


export type AcceptApplicationRoute = typeof acceptApplication;

export type CreateApplicationRoute = typeof createApplication;

export type SaveApplicationAttachmentsRoute = typeof saveApplicationAttachments;

export type EditStudentInfoRoute = typeof editStudentInfoRoute;

export type EditStudentInfoRouteTest = typeof editStudentInfoRoute;
