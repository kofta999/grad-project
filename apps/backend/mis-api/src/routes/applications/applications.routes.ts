import {
  acceptApplicationSchema,
  attachmentsSchema,
  applicationSchema,
  studentApplicationDetailsSchema,
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

const tags = ["Applications"];

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

export type CreateApplicationRoute = typeof createApplication;

export type SaveApplicationAttachmentsRoute = typeof saveApplicationAttachments;

export type GetApplicationRoute = typeof getApplication;
