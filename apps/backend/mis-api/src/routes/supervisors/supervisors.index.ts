import { createRouter } from "@/lib/create-app";
import * as handlers from "./supervisors.handlers";
import * as routes from "./supervisors.routes";

const router = createRouter()
  .openapi(routes.createSupervisor, handlers.createSupervisor)
  .openapi(routes.getSupervisor, handlers.getSupervisor)
  .openapi(routes.getSupervisorList, handlers.getSupervisorList);

export default router;
