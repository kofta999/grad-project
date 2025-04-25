import { createRouter } from "@/lib/create-app";
import * as routes from "./reports.routes";
import * as handlers from "./reports.handlers";

const router = createRouter()
  .openapi(routes.getStudentReport, handlers.getStudentReport).openapi(routes.submitStudentReport, handlers.submitStudentReport);

export default router;