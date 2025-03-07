import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { GetApplicantRegisteredCoursesRoute, GetAvailableCoursesRoute, RegisterCourseRoute} from "./courses.routes";
import db from "@/db";
import { detailedCourseRegistrationsView as dcv } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { sql } from "drizzle-orm";


export const getApplicantRegisteredCourses: AppRouteHandler<
  GetApplicantRegisteredCoursesRoute
> = async (c) => {
  const { academicYearId, semester, applicationId } = c.req.valid("json");

  const courses = await db
    .select({
      courseId: dcv.courseId,
      code: dcv.code,
      title: dcv.title,
      prerequisite: dcv.prerequisite,
      totalHours: dcv.totalHours,
    })
    .from(dcv)
    .where(
      and(
        eq(dcv.academicYearId, academicYearId),
        eq(dcv.semester, semester),
        eq(dcv.applicationId, applicationId),
      ),
    );

  return c.json(courses, HttpStatusCodes.OK);
};

export const getAvailableCoursesForApplication: AppRouteHandler<GetAvailableCoursesRoute> = async (c) => {
  const application_id = c.req.param("application_id");

  try {
    const courses = await db.execute(
      sql`SELECT * FROM available_courses_for_application(${application_id})`
    );

    return c.json({ courses: courses.rows }, HttpStatusCodes.OK);
  } catch (error) {
    console.error("Error fetching available courses:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch courses";

    return c.json({ error: errorMessage }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};


export const registerCourse: AppRouteHandler<RegisterCourseRoute> = async (c) => {
  const { applicationId, courseId, semester } = c.req.valid("json");
  try {
    await db.execute(
      sql`CALL register_course(${applicationId}, ${courseId}, ${semester})`
    );
    return c.json(
      { message: "Course registered successfully" },
      HttpStatusCodes.CREATED
    );
  } catch (error) {
    console.error("Error registering course:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to register course";
    return c.json({ error: errorMessage }, HttpStatusCodes.BAD_REQUEST);
  }
};

