import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { AcademicYearSchema } from "@/dtos/academic-year.dto.";
import { studentMiddleware } from "@/lib/constants";

const tags = ["Academic Years"];

export const getCurrentAcademicYears = createRoute({
  path: "/",
  method: "get",
  middleware: studentMiddleware,
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(AcademicYearSchema),
      "An array of available academic years"
    ),
  },
});

export type GetCurrentAcademicYearsRoute = typeof getCurrentAcademicYears;
