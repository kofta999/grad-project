import { createRouter } from "@/lib/create-app";
import * as handlers from "./courses.handlers";
import * as routes from "./courses.routes";

const router = createRouter()
  .openapi(
    routes.getApplicantRegisteredCourses,
    handlers.getApplicantRegisteredCourses,
  )
  .openapi(
    routes.getAvailableCoursesForApplication,
    handlers.getAvailableCoursesForApplication,
  )
  .openapi(routes.registerCourse, handlers.registerCourse);

export default router;
