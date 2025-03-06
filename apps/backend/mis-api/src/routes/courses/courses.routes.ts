import {
    availableCoursesSchema,
  } from "@/db/validators";
  import { isAuthenticated } from "@/middlewares/isAuthenticated";
  import { requireRole } from "@/middlewares/requireRole";
  import { createRoute, z } from "@hono/zod-openapi";
  import { jsonContent } from "stoker/openapi/helpers";
  import * as HttpStatusCodes from "stoker/http-status-codes";
  import { createErrorSchema } from "stoker/openapi/schemas";
  
  const tags = ["Courses"];
  
  export const getAvailableCourses = createRoute({
    path: "/available/:application_id",
    method: "get",
    middleware: [isAuthenticated, requireRole("admin")],
    tags,
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        availableCoursesSchema,
        "Available courses",
      ),
      [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
        createErrorSchema(z.object({ error: z.string() })),
        "Validation error",
      ),
      [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
        createErrorSchema(z.object({ error: z.string() })),
        "Server error",
      ),
    },
  });
  
  export type GetAvailableCoursesRoute = typeof getAvailableCourses;
  