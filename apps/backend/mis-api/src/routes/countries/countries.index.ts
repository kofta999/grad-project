import { createRouter } from "@/lib/create-app";
import * as routes from "./countries.routes";
import * as handlers from "./countries.handlers";

const router = createRouter()
  .openapi(routes.getCountryList, handlers.getCountryList)
  .openapi(routes.getCitiesForCountry, handlers.getCitiesForCountry);

export default router;
