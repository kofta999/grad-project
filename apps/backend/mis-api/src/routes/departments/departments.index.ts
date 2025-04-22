import * as routes from "./departments.routes";
import * as handlers from "./departments.handlers";
import { createRouter } from "@/lib/create-app";

const router = createRouter().openapi(
  routes.getAvailableDepartments,
  handlers.getAvailableDepartments
);

export default router;
