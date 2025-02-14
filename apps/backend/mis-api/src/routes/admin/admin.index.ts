import { createRouter } from "@/lib/create-app";
import * as handlers from "./admin.handlers";
import * as routes from "./admin.routes";

const router = createRouter().openapi(
  routes.acceptApplication,
  handlers.acceptApplication,
);

export default router;
