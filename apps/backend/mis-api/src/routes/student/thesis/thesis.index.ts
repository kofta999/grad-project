import { createRouter } from "@/lib/create-app";
import * as handlers from "./thesis.handlers";
import * as routes from "./thesis.routes";

const router = createRouter().openapi(
  routes.checkThesisAvailability,
  handlers.checkThesisAvailability,
);

export default router;
