import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  GetApplicantRegisteredCoursesRoute,
  GetAvailableCoursesRoute,
  RegisterCourseRoute,
} from "./courses.routes";
import db from "@/db";
import {
  courseRegistrations,
  courses,
  detailedCourseRegistrationsView as dcv,
} from "@/db/schema";
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

export const getAvailableCoursesForApplication: AppRouteHandler<
  GetAvailableCoursesRoute
> = async (c) => {
  const applicationId = c.req.param("applicationId");

  const availableCourses = await db.execute<typeof courses.$inferSelect>(
    sql`SELECT * FROM available_courses_for_application(${applicationId})`,
  );

  return c.json(availableCourses.rows, HttpStatusCodes.OK);
};

export const registerCourse: AppRouteHandler<RegisterCourseRoute> = async (
  c,
) => {
  const { applicationId, courseId, semester } = c.req.valid("json");
  try {
    const registeredCourse = await db
      .insert(courseRegistrations)
      .values({
        courseId,
        applicationId,
        semester,
        // The trigger will add it manually
        academicYearId: 0,
      })
      .returning();

    return c.json(
      {
        message: "Course registered successfully",
        courseRegistrationId: registeredCourse[0].courseRegistrationId,
      },
      HttpStatusCodes.CREATED,
    );
  } catch (error) {
    console.error("Error registering course:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to register course";
    return c.json({ error: errorMessage }, HttpStatusCodes.BAD_REQUEST);
  }
};
