import { createRouter } from "@/lib/create-app";
import applicationsRouter from "./applications/applications.index";
import thesisRouter from "./thesis/thesis.index";

const router = createRouter()
  .route("/applications", applicationsRouter)
  .route("/thesis", thesisRouter);

export default router;
