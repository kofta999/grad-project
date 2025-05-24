import { createRouter } from "@/lib/create-app";
import * as handlers from "./reports.handlers";
import * as routes from "./reports.routes";

const router = createRouter()
  .openapi(routes.getReport, handlers.getReport)
  .openapi(routes.submitReport, handlers.submitReport);

export default router;
