import { createRouter } from "@/lib/create-app";
import * as handlers from "./applications.handlers";
import * as routes from "./applications.routes";

const router = createRouter()
  .openapi(routes.createApplication, handlers.createApplication)
  .openapi(
    routes.saveApplicationAttachments,
    handlers.saveApplicationAttachments,
  )
  .openapi(routes.getApplication, handlers.getApplication)
  .openapi(routes.editStudentInfo, handlers.editStudentInfo)
  .openapi(routes.getCurrentAcademicYears, handlers.getCurrentAcademicYears)
  .openapi(routes.getAvailableDepartments, handlers.getAvailableDepartments)
  .openapi(
    routes.getApplicantRegisteredCourses,
    handlers.getApplicantRegisteredCourses
  );

export default router;
