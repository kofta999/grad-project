import { createRouter } from "@/lib/create-app";
import * as handlers from "./auth.handlers";
import * as routes from "./auth.routes";

const router = createRouter()
  .openapi(routes.registerStage1, handlers.registerStage1)
  .openapi(routes.registerStage2, handlers.registerStage2)
  .openapi(routes.saveAttachments, handlers.saveAttachments)
  .openapi(routes.login, handlers.login)
  .openapi(routes.logout, handlers.logout)
  .openapi(routes.upload, handlers.upload);

export default router;
