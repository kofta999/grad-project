import { createRouter } from "@/lib/create-app";
import * as routes from "./students.routes";
import * as handlers from "./students.handlers";

const router = createRouter()
  // Profile routes
  .openapi(routes.getStudentDetails, handlers.getStudentDetails)

  // Course routes
  .openapi(routes.getRegisteredCourses, handlers.getRegisteredCourses)
  .openapi(routes.getRegisteredAcademicYears, handlers.getRegisteredAcademicYears)

  // Application routes
  .openapi(routes.getApplication, handlers.getApplication)
  .openapi(routes.createApplication, handlers.createApplication)
  .openapi(routes.updateApplication, handlers.updateApplication)
  // .openapi(routes.getApplicationById, handlers.getApplicationById) // To be implemented
  .openapi(routes.saveApplicationAttachments, handlers.saveApplicationAttachments)
  .openapi(routes.deleteApplicationAttachment, handlers.deleteApplicationAttachment) // To be implemented

  // Thesis routes
  .openapi(routes.checkThesisAvailability, handlers.checkThesisAvailability)
  .openapi(routes.getThesis, handlers.getThesis) // To be implemented
  .openapi(routes.submitThesis, handlers.submitThesis)

  // Admin Routes
  .openapi(routes.getStudentDetailsById, handlers.getStudentDetailsById)
  .openapi(routes.editStudentInfo, handlers.editStudentInfo);

export default router;
