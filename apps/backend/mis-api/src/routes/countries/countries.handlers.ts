import db from "@/db";
import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { GetCountryListRoute, GetCitiesForCountryRoute } from "./countries.routes";

export const getCountryList: AppRouteHandler<GetCountryListRoute> = async (c) => {
  const countries = await db.query.countries.findMany({
    columns: {
      countryId: true,

      nameAr: true,
    },

    orderBy: (f) => f.nameAr,
  });

  return c.json(countries, HttpStatusCodes.OK);
};

export const getCitiesForCountry: AppRouteHandler<GetCitiesForCountryRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const cities = await db.query.cities.findMany({
    columns: {
      cityId: true,

      nameAr: true,
    },

    where: (f, { eq }) => eq(f.countryId, id),

    orderBy: (f) => f.nameAr,
  });

  return c.json(cities, HttpStatusCodes.OK);
};
