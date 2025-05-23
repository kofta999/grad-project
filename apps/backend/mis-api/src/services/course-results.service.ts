import db from "@/db";
import { courseResults } from "@/db/schema";
import { CourseResultDTO } from "@/dtos/course-results.dto";
import { eq } from "drizzle-orm";

export interface ICourseResultsService {
  setCourseResult(courseRegistrationId: number, grade: number): Promise<boolean>;
  updateCourseResult(courseResultId: number, grade: number): Promise<boolean>;
  deleteCourseResult(resultId: number): Promise<boolean>;
  getCourseResults(courseRegistrationId: number): Promise<CourseResultDTO[]>;
}

export class CourseResultsService implements ICourseResultsService {
  async setCourseResult(courseRegistrationId: number, grade: number): Promise<boolean> {
    try {
      if (grade < 0 || grade > 100) {
        throw new Error("Grade must be between 0 and 100");
      }

      await db.insert(courseResults).values({
        courseRegistrationId,
        grade,
      });

      return true;
    } catch (error) {
      console.error("Error setting course result:", error);
      throw error;
    }
  }

  async updateCourseResult(courseResultId: number, grade: number): Promise<boolean> {
    try {
      if (grade < 0 || grade > 100) {
        throw new Error("Grade must be between 0 and 100");
      }

      //finding existing record first
      const existingResult = await db
        .select()
        .from(courseResults)
        .where(eq(courseResults.courseResultId, courseResultId));

      if (existingResult.length > 0) {
        // update existing record
        await db
          .update(courseResults)
          .set({ grade })
          .where(eq(courseResults.courseResultId, courseResultId));
      } else {
        throw new Error("Not found");
      }

      return true;
    } catch (error) {
      console.error("Error setting course result:", error);
      throw error;
    }
  }

  async deleteCourseResult(resultId: number): Promise<boolean> {
    try {
      const result = await db
        .select({
          courseRegistrationId: courseResults.courseRegistrationId,
        })
        .from(courseResults)
        .where(eq(courseResults.courseResultId, resultId));

      if (result.length === 0) {
        throw new Error("Course result not found");
      }

      await db.delete(courseResults).where(eq(courseResults.courseResultId, resultId));

      return true;
    } catch (error) {
      console.error("Error deleting course result:", error);
      throw error;
    }
  }

  async getCourseResults(courseRegistrationId: number): Promise<CourseResultDTO[]> {
    try {
      const results = await db
        .select()
        .from(courseResults)
        .where(eq(courseResults.courseRegistrationId, courseRegistrationId));

      return results;
    } catch (error) {
      console.error("Error getting course results:", error);
      throw error;
    }
  }
}
