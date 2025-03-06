import { createRouter } from "@/lib/create-app";
import applicationsRouter from "./applications/applications.index";
import coursesRouter from "./courses/courses.index";

const router = createRouter()
  .route("/applications", applicationsRouter)
  .route("/courses", coursesRouter);

export default router;
