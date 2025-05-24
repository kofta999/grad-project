import db from "@/db";
import { attachments, theses } from "@/db/schema";
import { GetThesisDTO } from "@/dtos/get-thesis.dto";
import { sql, eq } from "drizzle-orm";

type ThesisAvailability = { available: true } | { available: false; reason: string };

export interface IThesisService {
  isThesisAvailable(studentId: number): Promise<ThesisAvailability>;
  submitThesis(studentId: number, title: string, attachmentUrl: string): Promise<boolean>;
  getThesis(studentId: number): Promise<GetThesisDTO | null>;
}

export class ThesisService implements IThesisService {
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

  async getThesis(studentId: number): Promise<GetThesisDTO | null> {
    const applicationId = await this.getApplicationByStudentId(studentId);

    if (!applicationId) {
      return null;
    }

    const thesis = await db
      .select()
      .from(theses)
      .innerJoin(attachments, eq(attachments.attachmentId, theses.attachmentId))
      .where(eq(theses.applicationId, applicationId));

    if (thesis.length === 0) {
      return null;
    }

    return {
      applicationId: thesis[0].theses.applicationId,
      thesisId: thesis[0].theses.thesisId,
      title: thesis[0].theses.title,
      attachmentUrl: thesis[0].attachments.attachmentUrl,
      createdAt: thesis[0].theses.createdAt,
    };
  }
}
