import db from "@/db";
import { courseResults, students } from "@/db/schema";
import { AppRouteHandler } from "@/lib/types";
import { detailedCourseRegistrationsView as dcv } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import {
  EditStudentInfoRoute,
  GetApplicantRegisteredCourses,
} from "./student.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";

export const getApplicantRegisteredCourses: AppRouteHandler<
  GetApplicantRegisteredCourses
> = async (c) => {
  const { academicYearId, semester } = c.req.valid("query");
  const studentId = c.var.session.get("id");

  if (!studentId) {
    return c.json({ message: "Unauthorized" }, HttpStatusCodes.UNAUTHORIZED);
  }

  const application = await db.query.applications.findFirst({
    where(f, { eq }) {
      return eq(f.studentId, studentId);
    },
    columns: { applicationId: true },
  });

  if (!application) {
    return c.json(
      { message: "Application(Student) not found" },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  const courses = await db
    .select({
      courseId: dcv.courseId,
      code: dcv.code,
      title: dcv.title,
      prerequisite: dcv.prerequisite,
      totalHours: dcv.totalHours,
      grade: courseResults.grade,
    })
    .from(dcv)
    .leftJoin(
      courseResults,
      eq(dcv.courseRegistrationId, courseResults.courseRegistrationId),
    )
    .where(
      and(
        eq(dcv.academicYearId, academicYearId),
        eq(dcv.semester, semester),
        eq(dcv.applicationId, application.applicationId),
      ),
    );

  return c.json(courses, HttpStatusCodes.OK);
};

export const editStudentInfo: AppRouteHandler<EditStudentInfoRoute> = async (
  c,
) => {
  const studentId = c.var.session.get("id");

  if (!studentId) {
    return c.json({ message: "Unauthorized" }, HttpStatusCodes.UNAUTHORIZED);
  }

  const updatedData = c.req.valid("json");

  const existingStudent = await db.query.students.findFirst({
    where(fields, operators) {
      return operators.eq(fields.studentId, studentId);
    },
    columns: { studentId: true },
  });

  if (!existingStudent) {
    return c.json({ message: "Student not found" }, HttpStatusCodes.NOT_FOUND);
  }

  await db
    .update(students)
    .set(updatedData)
    .where(eq(students.studentId, studentId));

  return c.json(
    { message: "Student info updated successfully" },
    HttpStatusCodes.OK,
  );
};
