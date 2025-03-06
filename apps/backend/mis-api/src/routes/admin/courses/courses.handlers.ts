import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { GetApplicantRegisteredCoursesRoute } from "./courses.routes";
import db from "@/db";
import { detailedCourseRegistrationsView as dcv } from "@/db/schema";
import { and, eq } from "drizzle-orm";

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
