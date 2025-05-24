import { createRouter } from "@/lib/create-app";
import * as handlers from "./course-results.handlers";
import * as routes from "./course-results.routes";

const router = createRouter()
  .openapi(routes.setResult, handlers.setCourseResult)
  .openapi(routes.deleteResult, handlers.deleteCourseResult)
  .openapi(routes.getCourseResults, handlers.getCourseResults);

export default router;
