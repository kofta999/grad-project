import {
  acceptApplicationSchema,
  adminApplicationDetailsSchema,
  adminApplicationsListSchema,
} from "@/db/validators";
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { requireRole } from "@/middlewares/requireRole";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContentRequired, jsonContent } from "stoker/openapi/helpers";
import {
  createMessageObjectSchema,
  createErrorSchema,
  IdParamsSchema,
} from "stoker/openapi/schemas";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { NotFoundSchema } from "@/lib/constants";

const tags = ["Admin"];

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
      "Application accepted"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Application not found"),
      "Application not found"
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      createMessageObjectSchema("Application already accepted"),
      "Application already accepted"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(acceptApplicationSchema),
      "The validation error(s)"
    ),
  },
});

export const getAllApplications = createRoute({
  path: "/",
  method: "get",
  tags,
  middleware: [isAuthenticated, requireRole("admin")] as const,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      adminApplicationsListSchema,
      "A list of all students with applications"
    ),
  },
});

export const getApplicationDetails = createRoute({
  path: "/{id}",
  method: "get",
  request: {
    params: IdParamsSchema,
    query: z.object({
      fetch: z.enum(["student", "application", "all"]).default("all"),
    }),
  },
  tags,
  middleware: [isAuthenticated, requireRole("admin")] as const,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      adminApplicationDetailsSchema,
      "A list of all students with applications"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(NotFoundSchema, "Application not found"),
  },
});

export type AcceptApplicationRoute = typeof acceptApplication;

export type GetAllApplicationsRoute = typeof getAllApplications;

export type GetApplicationDetailsRoute = typeof getApplicationDetails;
