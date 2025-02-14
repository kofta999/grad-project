import { acceptApplicationSchema } from "@/db/validators";
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { requireRole } from "@/middlewares/requireRole";
import { createRoute } from "@hono/zod-openapi";
import { jsonContentRequired, jsonContent } from "stoker/openapi/helpers";
import {
  createMessageObjectSchema,
  createErrorSchema,
} from "stoker/openapi/schemas";
import * as HttpStatusCodes from "stoker/http-status-codes";

const tags = ["Admin"];

export const acceptApplication = createRoute({
  path: "/applications/accept",
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

export type AcceptApplicationRoute = typeof acceptApplication;
