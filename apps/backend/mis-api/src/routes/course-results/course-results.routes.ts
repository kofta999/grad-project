import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { adminMiddleware } from "@/lib/constants";

const tags = ["Course Results"];

export const setCourseResult = createRoute({
  path: "/",
  method: "post",
  middleware: adminMiddleware,
  tags,
  summary: "Set Course Result",
  request: {
    body: jsonContent(
      z.object({
        courseRegistrationId: z.number(),
        grade: z.number(),
      }),
      "Course result data"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Course result set successfully"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({ error: z.string() }),
      "Error setting course result"
    ),
  },
});

export const updateCourseResult = createRoute({
  path: "/",
  method: "put",
  middleware: adminMiddleware,
  tags,
  summary: "Update Course Result",
  request: {
    body: jsonContent(
      z.object({
        resultId: z.number(),
        grade: z.number(),
      }),
      "Course result data"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Course result updated successfully"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({ error: z.string() }),
      "Error setting course result"
    ),
  },
});

export const deleteResult = createRoute({
  path: "/{id}",
  method: "delete",
  middleware: adminMiddleware,
  tags,
  summary: "Delete Course Result",
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Course result deleted successfully"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({ error: z.string() }),
      "Error deleting course result"
    ),
  },
});

export const getCourseResults = createRoute({
  path: "/",
  method: "get",
  middleware: adminMiddleware,
  tags,
  summary: "Get Course Results",
  request: {
    query: z.object({
      courseRegistrationId: z.string().optional(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(
        z.object({
          courseResultId: z.number(),
          courseRegistrationId: z.number(),
          grade: z.number(),
        })
      ),
      "Course results list"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({ error: z.string() }),
      "Error fetching course results"
    ),
  },
});

export type GetCourseResultsRoute = typeof getCourseResults;
export type SetCourseResultRoute = typeof setCourseResult;
export type UpdateCourseResultRoute = typeof updateCourseResult;
export type DeleteCourseResultRoute = typeof deleteResult;
