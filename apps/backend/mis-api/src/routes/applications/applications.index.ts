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
  .openapi(routes.editStudentInfoRoute, handlers.editStudentInfo);

export default router;
