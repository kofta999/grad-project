import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { GetApplicantRegisteredCoursesRoute, GetAvailableCoursesRoute} from "./courses.routes";
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

    return c.json(
      {courses: courses.rows},
      HttpStatusCodes.OK
    );
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to fetch courses" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
