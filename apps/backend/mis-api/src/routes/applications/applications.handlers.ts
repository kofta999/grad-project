import * as HttpStatusCodes from "stoker/http-status-codes";
import { AppRouteHandler } from "@/lib/types";
import {
  AcceptApplicationRoute,
  GetAllApplicationsRoute,
  GetApplicationAvailableCoursesRoute,
  GetApplicationDetailsRoute,
  GetApplicationRegisteredCoursesRoute,
  RejectApplicationRoute,
} from "./applications.routes";
import { AdminApplicationService } from "@/services/admin-application.service";
import { StudentService } from "@/services/student.service";
import { CourseService } from "@/services/course.service";

const adminApplicationService = new AdminApplicationService();
const courseService = new CourseService();

export const getAllApplications: AppRouteHandler<GetAllApplicationsRoute> = async (c) => {
  const applicationsList = await adminApplicationService.getAllApplications();
  return c.json(applicationsList, HttpStatusCodes.OK);
};

export const getApplicationDetails: AppRouteHandler<GetApplicationDetailsRoute> = async (c) => {
  const { id: applicationId } = c.req.valid("param");

  const application = await adminApplicationService.getApplicationByApplicationId(applicationId);

  if (!application) {
    return c.json({ message: "Application Not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(application, HttpStatusCodes.OK);
};

export const getApplicationRegisteredCourses: AppRouteHandler<
  GetApplicationRegisteredCoursesRoute
> = async (c) => {
  const { academicYearId, semester } = c.req.valid("query");
  const { id: applicationId } = c.req.valid("param");

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

export const getAvailableCoursesForApplication: AppRouteHandler<
  GetApplicationAvailableCoursesRoute
> = async (c) => {
  const applicationId = parseInt(c.req.param("id"), 10);

  try {
    const availableCourses = await courseService.getAvailableCoursesForApplication(applicationId);

    return c.json(availableCourses, HttpStatusCodes.OK);
  } catch (error) {
    console.error("Error getting available courses:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to get available courses";
    return c.json({ error: errorMessage }, HttpStatusCodes.BAD_REQUEST);
  }
};

export const acceptApplication: AppRouteHandler<AcceptApplicationRoute> = async (c) => {
  const { applicationId } = c.req.valid("json");

  const operationStatus = await adminApplicationService.acceptApplication(applicationId);

  if (operationStatus == null) {
    return c.json({ message: "Application not found" }, HttpStatusCodes.NOT_FOUND);
  }

  if (!operationStatus) {
    return c.json({ message: "Application already accepted" }, HttpStatusCodes.CONFLICT);
  }

  return c.json({ message: "Application accepted" }, HttpStatusCodes.OK);
};

export const rejectApplication: AppRouteHandler<RejectApplicationRoute> = async (c) => {
  const { applicationId, reason } = c.req.valid("json");

  try {
    // Assuming the service has a rejectApplication method
    const operationStatus = await adminApplicationService.rejectApplication(applicationId, reason);

    if (operationStatus == null) {
      return c.json({ message: "Application not found" }, HttpStatusCodes.NOT_FOUND);
    }

    if (!operationStatus) {
      return c.json({ message: "Application already rejected" }, HttpStatusCodes.CONFLICT);
    }

    return c.json({ message: "Application rejected" }, HttpStatusCodes.OK);
  } catch (error) {
    console.error("Error rejecting application:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to reject application";
    return c.json({ error: errorMessage }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
