import { createRouter } from "@/lib/create-app";
import * as handlers from "./enrollments.handlers";
import * as routes from "./enrollments.routes";

const router = createRouter()
  .openapi(routes.enrollCourse, handlers.enrollCourse)
  .openapi(routes.withdrawCourse, handlers.withdrawCourse);

export default router;
