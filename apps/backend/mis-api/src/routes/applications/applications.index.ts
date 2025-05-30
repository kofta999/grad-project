import { createRouter } from "@/lib/create-app";
import * as handlers from "./applications.handlers";
import * as routes from "./applications.routes";

const router = createRouter()
  .openapi(routes.getAllApplications, handlers.getAllApplications)
  .openapi(routes.getApplicationDetails, handlers.getApplicationDetails)
  .openapi(routes.rejectApplication, handlers.rejectApplication)
  .openapi(routes.acceptApplication, handlers.acceptApplication)
  .openapi(routes.getApplicationAvailableCourses, handlers.getApplicationAvailableCourses)
  .openapi(routes.getApplicationRegisteredCourses, handlers.getApplicationRegisteredCourses);

export default router;
