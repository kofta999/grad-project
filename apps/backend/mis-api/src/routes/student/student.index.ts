import { createRouter } from "@/lib/create-app";
import applicationsRouter from "./applications/applications.index";
import thesisRouter from "./thesis/thesis.index";
import * as routes from "./student.routes";
import * as handlers from "./student.handlers";

const router = createRouter()
  .openapi(routes.editStudentInfo, handlers.editStudentInfo)
  .openapi(
    routes.getApplicantRegisteredCourses,
    handlers.getApplicantRegisteredCourses,
  )
  .openapi(
    routes.getRegisteredAcademicYears,
    handlers.getRegisteredAcademicYears,
  )
  .openapi(routes.getStudentDetails, handlers.getStudentDetails)
  .route("/applications", applicationsRouter)
  .route("/thesis", thesisRouter);

export default router;
