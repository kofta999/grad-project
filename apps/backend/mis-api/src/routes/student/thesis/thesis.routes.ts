import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { requireRole } from "@/middlewares/requireRole";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

const tags = ["Student"];

export const checkThesisAvailability = createRoute({
  path: "/check",
  method: "get",
  middleware: [isAuthenticated, requireRole("student")],
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ available: z.literal(true) }),
      "The thesis is available to upload",
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      z.object({ available: z.literal(false), reason: z.string() }),
      "The application did not meet the requirements to upload thesis",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Application not found"),
      "Application not found",
    ),
  },
});

export type CheckThesisAvailabilityRoute = typeof checkThesisAvailability;
