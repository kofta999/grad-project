import db from "@/db";
import { courseResults } from "@/db/schema";
import { detailedCourseRegistrationsView as dcv } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { convertDegreeToGrade } from "@/lib/util";
import { RegisteredCourseDTO } from "@/dtos/registered-course.dto";
import { Semester } from "@/lib/types";

export interface ICourseService {
  getStudentRegisteredCourses(
    studentId: number,
    academicYearId: number,
    semester: Semester
  ): Promise<RegisteredCourseDTO[]>;
}

export class CourseService implements ICourseService {
  async getStudentRegisteredCourses(
    studentId: number,
    academicYearId: number,
    semester: Semester
  ): Promise<RegisteredCourseDTO[]> {
    const application = await db.query.applications.findFirst({
      where(f, { eq }) {
        return eq(f.studentId, studentId);
      },
      columns: { applicationId: true },
    });

    if (!application) {
      return [];
    }

    const courses = await db
      .select({
        courseId: dcv.courseId,
        code: dcv.code,
        title: dcv.title,
        prerequisite: dcv.prerequisite,
        totalHours: dcv.totalHours,
        grade: courseResults.grade,
        courseRegistrationId: dcv.courseRegistrationId,
      })
      .from(dcv)
      .leftJoin(courseResults, eq(dcv.courseRegistrationId, courseResults.courseRegistrationId))
      .where(
        and(
          eq(dcv.academicYearId, academicYearId),
          eq(dcv.semester, semester),
          eq(dcv.applicationId, application.applicationId)
        )
      );

    return courses.map((c) => ({
      ...c,
      grade: c.grade ? convertDegreeToGrade(c.grade) : null,
    }));
  }
}
