import type { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import type {
  DeleteCourseRoute,
  GetApplicantRegisteredCoursesRoute,
  GetAvailableCoursesRoute,
  RegisterCourseRoute,
} from "./courses.routes";
import { CourseService } from "@/services/course.service";

// Create an instance of the service
const courseService = new CourseService();

export const getApplicantRegisteredCourses: AppRouteHandler<
  GetApplicantRegisteredCoursesRoute
> = async (c) => {
  const { academicYearId, semester, applicationId } = c.req.valid("json");

  try {
    const courses = await courseService.getApplicantRegisteredCourses(
      applicationId,
      academicYearId,
      semester
    );

    return c.json(courses, HttpStatusCodes.OK);
  } catch (error) {
    console.error("Error getting registered courses:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to get registered courses";
    return c.json({ error: errorMessage }, HttpStatusCodes.BAD_REQUEST);
  }
};

export const getAvailableCoursesForApplication: AppRouteHandler<GetAvailableCoursesRoute> = async (
  c
) => {
  const applicationId = parseInt(c.req.param("applicationId"), 10);

  try {
    const availableCourses = await courseService.getAvailableCoursesForApplication(applicationId);

    return c.json(availableCourses, HttpStatusCodes.OK);
  } catch (error) {
    console.error("Error getting available courses:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to get available courses";
    return c.json({ error: errorMessage }, HttpStatusCodes.BAD_REQUEST);
  }
};

export const registerCourse: AppRouteHandler<RegisterCourseRoute> = async (c) => {
  const { applicationId, courseId, semester } = c.req.valid("json");

  try {
    const courseRegistrationId = await courseService.registerCourse(
      applicationId,
      courseId,
      semester
    );

    return c.json(
      {
        message: "Course registered successfully",
        courseRegistrationId: courseRegistrationId,
      },
      HttpStatusCodes.CREATED
    );
  } catch (error) {
    console.error("Error registering course:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to register course";
    return c.json({ error: errorMessage }, HttpStatusCodes.BAD_REQUEST);
  }
};

export const deleteCourse: AppRouteHandler<DeleteCourseRoute> = async (c) => {
  const { id } = c.req.valid("param");

  try {
    await courseService.deleteCourseRegistration(id);

    c.status(HttpStatusCodes.NO_CONTENT);
    return c.json({});
  } catch (error) {
    console.error("Error deleting course:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to delete course";
    return c.json({ error: errorMessage }, HttpStatusCodes.BAD_REQUEST);
  }
};
