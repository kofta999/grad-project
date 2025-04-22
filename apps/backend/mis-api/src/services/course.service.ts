import db from "@/db";
import { courseRegistrations, detailedCourseRegistrationsView as dcv } from "@/db/schema";
import { CourseDTO } from "@/dtos/registered-course.dto";
import { Semester } from "@/lib/types";
import { convertDegreeToGrade } from "@/lib/util";
import { and, eq, sql } from "drizzle-orm";

export interface ICourseService {
  getStudentRegisteredCourses(
    studentId: number,
    academicYearId: number,
    semester: Semester
  ): Promise<CourseDTO[]>;

  getApplicantRegisteredCourses(
    applicationId: number,
    academicYearId: number,
    semester: Semester
  ): Promise<CourseDTO[]>;

  getAvailableCoursesForApplication(applicationId: number): Promise<CourseDTO[]>;

  registerCourse(applicationId: number, courseId: number, semester: Semester): Promise<number>;

  deleteCourseRegistration(courseRegistrationId: number): Promise<boolean>;
}

export class CourseService implements ICourseService {
  async getStudentRegisteredCourses(
    studentId: number,
    academicYearId: number,
    semester: Semester
  ): Promise<CourseDTO[]> {
    const application = await db.query.applications.findFirst({
      where(f, { eq }) {
        return eq(f.studentId, studentId);
      },
      columns: { applicationId: true },
    });

    if (!application) {
      return [];
    }

    return this.getApplicantRegisteredCourses(application.applicationId, academicYearId, semester);
  }

  async getApplicantRegisteredCourses(
    applicationId: number,
    academicYearId: number,
    semester: Semester
  ): Promise<CourseDTO[]> {
    const courses = await db
      .select({
        courseId: dcv.courseId,
        code: dcv.code,
        title: dcv.title,
        prerequisite: dcv.prerequisite,
        totalHours: dcv.totalHours,
        grade: dcv.grade,
        courseRegistrationId: dcv.courseRegistrationId,
      })
      .from(dcv)
      .where(
        and(
          eq(dcv.academicYearId, academicYearId),
          eq(dcv.semester, semester),
          eq(dcv.applicationId, applicationId)
        )
      );

    return courses.map((c) => ({
      ...c,
      grade: c.grade ? convertDegreeToGrade(c.grade) : null,
    }));
  }

  async getAvailableCoursesForApplication(applicationId: number): Promise<CourseDTO[]> {
    const availableCourses = await db.execute(
      sql`SELECT * FROM available_courses_for_application(${applicationId})`
    );

    // Convert the raw query results to our DTO format
    // I know the types
    return availableCourses.rows.map((c) => ({
      courseId: c.course_id as number,
      code: c.code as string,
      title: c.title as string,
      prerequisite: c.prerequisite as number,
      totalHours: c.total_hours as number,
      grade: null,
      courseRegistrationId: c.course_registration_id as number,
    }));
  }

  async registerCourse(
    applicationId: number,
    courseId: number,
    semester: Semester
  ): Promise<number> {
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

      return registeredCourse[0].courseRegistrationId;
    } catch (error) {
      console.error("Error registering course:", error);
      throw error;
    }
  }

  async deleteCourseRegistration(courseRegistrationId: number): Promise<boolean> {
    try {
      await db
        .delete(courseRegistrations)
        .where(eq(courseRegistrations.courseRegistrationId, courseRegistrationId));
      return true;
    } catch (error) {
      console.error("Error deleting course registration:", error);
      // Enhance error handling by checking for foreign key violations
      // @ts-ignore
      if (error.code && error.code === "23503") {
        throw new Error("This course is already passed, mustn't be deleted");
      }
      throw error;
    }
  }
}
