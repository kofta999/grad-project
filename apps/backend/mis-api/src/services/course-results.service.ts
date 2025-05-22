import db from "@/db";
import { courseResults, courseRegistrations } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface ICourseResultsService {
  setCourseResult(courseRegistrationId: number, grade: number): Promise<boolean>;
  updateCourseResult(courseResultId: number, grade: number): Promise<boolean>;
  deleteCourseResult(resultId: number): Promise<boolean>;
  getCourseResults(courseRegistrationId?: number): Promise<{ resultId: number | null; courseRegistrationId: number; grade: number | null; }[]>;
}

export class CourseResultsService implements ICourseResultsService {
  async setCourseResult(courseRegistrationId: number, grade: number): Promise<boolean> {
    try {
      if (grade < 0 || grade > 100) {
        throw new Error("Grade must be between 0 and 100");
      }

      //finding existing record first
      const existingResult = await db
        .select()
        .from(courseResults)
        .where(eq(courseResults.courseRegistrationId, courseRegistrationId));

      if (existingResult) {
        throw new Error("Already exists");
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
        .where(eq(courseResults.resultId, courseResultId));

      if (existingResult.length > 0) {
        // update existing record
        await db
          .update(courseResults)
          .set({ grade })
          .where(eq(courseResults.resultId, courseResultId));
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
        .where(eq(courseResults.resultId, resultId));

      if (result.length === 0) {
        throw new Error("Course result not found");
      }

      await db.delete(courseResults).where(eq(courseResults.resultId, resultId));

      return true;
    } catch (error) {
      console.error("Error deleting course result:", error);
      throw error;
    }
  }

  async getCourseResults(courseRegistrationId?: number) {
    try {
      const query = db
        .select({
          resultId: courseResults.resultId,
          courseRegistrationId: courseRegistrations.courseRegistrationId,
          grade: courseResults.grade
        })
        .from(courseRegistrations)
        .leftJoin(courseResults, eq(courseResults.courseRegistrationId, courseRegistrations.courseRegistrationId));
      
      if (courseRegistrationId) {
        return await query.where(eq(courseRegistrations.courseRegistrationId, courseRegistrationId));
      }

      return await query;
    } catch (error) {
      console.error("Error getting course results:", error);
      throw error;
    }
  }
}
