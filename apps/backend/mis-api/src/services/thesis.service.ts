import db from "@/db";
import { attachments, theses } from "@/db/schema";
import { sql } from "drizzle-orm";

type ThesisAvailability = { available: true } | { available: false; reason: string };

export interface IThesisService {
  isThesisAvailable(studentId: number): Promise<ThesisAvailability>;
  submitThesis(studentId: number, title: string, attachmentUrl: string): Promise<boolean>;
}

export class ThesisService implements IThesisService {
  /**
   * Checks if a student can submit a thesis
   * @param studentId The ID of the student
   * @returns Object indicating availability status and reason if not available
   */
  async isThesisAvailable(studentId: number): Promise<ThesisAvailability> {
    const applicationId = await this.getApplicationByStudentId(studentId);

    if (!applicationId) {
      throw new Error("Application not found");
    }

    try {
      await db.execute(sql`SELECT 1 FROM is_thesis_available(${applicationId})`);
      return { available: true };
    } catch (error) {
      console.error("Error checking thesis availability:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to check thesis availability";
      return { available: false, reason: errorMessage };
    }
  }

  /**
   * Submits a thesis for a student
   * @param studentId The ID of the student
   * @param title The title of the thesis
   * @param attachmentUrl The URL to the thesis document
   * @returns True if submission was successful
   */
  async submitThesis(studentId: number, title: string, attachmentUrl: string): Promise<boolean> {
    const applicationId = await this.getApplicationByStudentId(studentId);

    if (!applicationId) {
      throw new Error("Application not found");
    }

    try {
      // Transaction to ensure both insertions succeed or fail together
      return await db.transaction(async (tx) => {
        const result = await tx
          .insert(attachments)
          .values({ applicationId, type: "thesis", attachmentUrl })
          .returning();

        const attachment = result[0];

        await tx
          .insert(theses)
          .values({ applicationId, title, attachmentId: attachment.attachmentId });

        return true;
      });
    } catch (error) {
      console.error("Error submitting thesis:", error);
      throw error;
    }
  }

  /**
   * Helper method to get application by student ID
   * @param studentId The ID of the student
   * @returns Application ID if found
   */
  // TODO: Remove this
  private async getApplicationByStudentId(studentId: number): Promise<number | null> {
    const application = await db.query.applications.findFirst({
      where(f, { eq }) {
        return eq(f.studentId, studentId);
      },
      columns: { applicationId: true },
    });

    if (!application) {
      return null;
    }

    return application.applicationId;
  }
}
