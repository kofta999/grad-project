import { createRouter } from "@/lib/create-app";
import * as handlers from "./applications.handlers";
import * as routes from "./applications.routes";

const router = createRouter()
  .openapi(routes.acceptApplication, handlers.acceptApplication)
  .openapi(routes.createApplication, handlers.createApplication)
  .openapi(
    routes.saveApplicationAttachments,
    handlers.saveApplicationAttachments,
  );

export default router;
