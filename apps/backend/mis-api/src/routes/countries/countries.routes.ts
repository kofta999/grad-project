import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { requireRole } from "@/middlewares/requireRole";
import { createRoute } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { IdParamsSchema } from "stoker/openapi/schemas";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { z } from "zod";
import { studentMiddleware } from "@/lib/constants";

const tags = ["Countries"];

export const getCountryList = createRoute({
  path: "/",
  summary: "Get Country List",
  method: "get",
  middleware: studentMiddleware,
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(z.object({ countryId: z.number(), nameAr: z.string() })),

      "An array of available countries"
    ),
  },
});

export const getCitiesForCountry = createRoute({
  path: "/{id}",
  method: "get",
  summary: "Get Cities for Country",
  request: {
    params: IdParamsSchema,
  },
  middleware: studentMiddleware,
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(z.object({ cityId: z.number(), nameAr: z.string() })),

      "An array of available cities for a country"
    ),
  },
});

export type GetCountryListRoute = typeof getCountryList;
export type GetCitiesForCountryRoute = typeof getCitiesForCountry;
