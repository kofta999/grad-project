import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  createMessageObjectSchema,
} from "stoker/openapi/schemas";
import { NotFoundSchema, adminMiddleware } from "@/lib/constants";
import { GetReportSchema } from "@/dtos/get-report.dto";

const tags = ["Reports"];

export const submitStudentReport = createRoute({
  path: "/addStudentReport",
  method: "post",
  middleware: adminMiddleware,
  tags,
  request: {
    body: jsonContentRequired(
      z.object({
        studentId: z.number(),
        title: z.string(),
        attachmentUrl: z.string()
      }),
      "Report submission data"
    )
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Report submitted successfully"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      createMessageObjectSchema("Failed to submit report"),
      "Failed to submit report"
    )
  }
});

export const getStudentReport = createRoute({
  path: "/getStudentReport",
  method: "get",
  middleware: adminMiddleware,
  tags,
  request: {
    body: jsonContentRequired(
      z.object({
        studentId: z.number()
      }),
      "Student ID"
    )
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      GetReportSchema,
      "Report details"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      NotFoundSchema,
      "Report not found"
    )
  }
});

export type SubmitReportRoute = typeof submitStudentReport;
export type GetReportRoute = typeof getStudentReport;