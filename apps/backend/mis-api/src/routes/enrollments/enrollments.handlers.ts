import { AppRouteHandler } from "@/lib/types";
import { EnrollCourseRoute, WithdrawCourseRoute } from "./enrollments.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { CourseService } from "@/services/course.service";

const courseService = new CourseService();

export const enrollCourse: AppRouteHandler<EnrollCourseRoute> = async (c) => {
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

export const withdrawCourse: AppRouteHandler<WithdrawCourseRoute> = async (c) => {
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
