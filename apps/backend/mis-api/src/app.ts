import createApp from "@/lib/create-app";
import index from "@/routes/index.route";
import auth from "@/routes/auth/auth.index";
import applications from "@/routes/applications/applications.index";
import configureOpenAPI from "./lib/configure-open-api";

const app = createApp();

// export const routes = [
//   index,
//   tasks,
// ]

configureOpenAPI(app);
// routes.forEach(route => app.route('/', route))

export const _app = app
  .route("", index)
  .route("/auth", auth)
  .route("/applications", applications);
export default app;
