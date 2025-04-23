import createApp from "@/lib/create-app";
import index from "@/routes/index.route";
import academicYears from "@/routes/academic-years/academic-years.index";
import applications from "@/routes/applications/applications.index";
import auth from "@/routes/auth/auth.index";
import departments from "@/routes/departments/departments.index";
import enrollments from "@/routes/enrollments/enrollments.index";
import students from "@/routes/students/students.index";

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
  .route("/academic-years", academicYears)
  .route("/applications", applications)
  .route("/auth", auth)
  .route("/departments", departments)
  .route("/enrollments", enrollments)
  .route("/students", students);

export default app;
