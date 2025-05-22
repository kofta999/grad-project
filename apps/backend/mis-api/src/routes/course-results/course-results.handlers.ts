import { AppRouteHandler } from "@/lib/types";
import { CourseResultsService } from "@/services/course-results.service";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  SetCourseResultRoute,
  DeleteCourseResultRoute,
  GetCourseResultsRoute,
  UpdateCourseResultRoute,
} from "./course-results.routes";

const courseResultsService = new CourseResultsService();

export const setCourseResult: AppRouteHandler<SetCourseResultRoute> = async (c) => {
  const { courseRegistrationId, grade } = c.req.valid("json");

  try {
    await courseResultsService.setCourseResult(courseRegistrationId, grade);
    return c.json({ message: "Course result set successfully" }, HttpStatusCodes.OK);
  } catch (error) {
    console.error("Error setting course result:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to set course result";
    return c.json({ error: errorMessage }, HttpStatusCodes.BAD_REQUEST);
  }
};

export const updateCourseResult: AppRouteHandler<UpdateCourseResultRoute> = async (c) => {
  const { resultId, grade } = c.req.valid("json");

  try {
    await courseResultsService.updateCourseResult(resultId, grade);
    return c.json({ message: "Course result updated successfully" }, HttpStatusCodes.OK);
  } catch (error) {
    console.error("Error setting course result:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to set course result";
    return c.json({ error: errorMessage }, HttpStatusCodes.BAD_REQUEST);
  }
};

export const deleteCourseResult: AppRouteHandler<DeleteCourseResultRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const courseResultId = parseInt(id);

  try {
    await courseResultsService.deleteCourseResult(courseResultId);
    return c.json({ message: "Course result deleted successfully" }, HttpStatusCodes.OK);
  } catch (error) {
    console.error("Error deleting course result:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to delete course result";
    return c.json({ error: errorMessage }, HttpStatusCodes.BAD_REQUEST);
  }
};

export const getCourseResults: AppRouteHandler<GetCourseResultsRoute> = async (c) => {
  const { courseRegistrationId } = c.req.valid("query");

  try {
    const results = await courseResultsService.getCourseResults(
      courseRegistrationId ? parseInt(courseRegistrationId) : undefined
    );
    const formattedResults = results.map((result) => ({
      courseResultId: result.resultId,
      courseRegistrationId: result.courseRegistrationId,
      grade: result.grade,
    }));
    return c.json(formattedResults, HttpStatusCodes.OK);
  } catch (error) {
    console.error("Error fetching course results:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch course results";
    return c.json({ error: errorMessage }, HttpStatusCodes.BAD_REQUEST);
  }
};
