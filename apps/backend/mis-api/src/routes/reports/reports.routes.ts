import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import { NotFoundSchema, adminMiddleware } from "@/lib/constants";
import { GetReportsSchema } from "@/dtos/get-reports.dto";

const tags = ["Reports"];

export const submitReport = createRoute({
  path: "/",
  method: "post",
  summary: "Submit Report",
  middleware: adminMiddleware,
  tags,
  request: {
    body: jsonContentRequired(
      z.object({
        type: z.string(),
        title: z.string(),
        attachmentUrl: z.string(),
      }),
      "Report submission data"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ success: z.boolean() }),
      "Report submitted successfully"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      createMessageObjectSchema("Failed to submit report"),
      "Failed to submit report"
    ),
  },
});

export const getReport = createRoute({
  path: "/",
  method: "get",
  summary: "Get Reports",
  middleware: adminMiddleware,
  request: {
    query: z.object({
      type: z.string().optional(),
    }),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(GetReportsSchema, "Report details"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(NotFoundSchema, "Report not found"),
  },
});

export type SubmitReportRoute = typeof submitReport;
export type GetReportRoute = typeof getReport;
