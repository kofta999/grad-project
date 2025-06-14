import { createRouter } from "@/lib/create-app";
import * as handlers from "./auth.handlers";
import * as routes from "./auth.routes";

const router = createRouter()
  .openapi(routes.register, handlers.register)
  .openapi(routes.login, handlers.login)
  .openapi(routes.logout, handlers.logout)
  .openapi(routes.upload, handlers.upload);

export default router;
