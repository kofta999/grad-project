import createApp from "@/lib/create-app";
import index from "@/routes/index.route";
import academicYears from "@/routes/academic-years/academic-years.index";
import applications from "@/routes/applications/applications.index";
import auth from "@/routes/auth/auth.index";
import departments from "@/routes/departments/departments.index";
import enrollments from "@/routes/enrollments/enrollments.index";
import students from "@/routes/students/students.index";
import reports from "@/routes/reports/reports.index";
import courseResults from "@/routes/course-results/course-results.index";
import countries from "@/routes/countries/countries.index";
import configureOpenAPI from "./lib/configure-open-api";

const app = await createApp();

// export const routes = [
//   index,
//   tasks,
// ]

configureOpenAPI(app);
// routes.forEach(route => app.route('/', route))

export const _app = app
  .route("", index)
  .route("/auth", auth)
  .route("/students", students)
  .route("/applications", applications)
  .route("/enrollments", enrollments)
  .route("/course-results", courseResults)
  .route("/reports", reports)
  .route("/academic-years", academicYears)
  .route("/departments", departments)
  .route("/countries", countries);

export default app;
