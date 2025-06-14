import * as routes from "./academic-years.routes";
import * as handlers from "./academic-years.handlers";
import { createRouter } from "@/lib/create-app";

const router = createRouter().openapi(
  routes.getCurrentAcademicYears,
  handlers.getCurrentAcademicYears
);

export default router;
