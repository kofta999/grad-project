import { eq, sql } from "drizzle-orm";
import db from "@/db";
import { attachments, theses } from "@/db/schema";
import type { GetThesisDTO } from "@/dtos/get-thesis.dto";
import { AdminApplicationService } from "./admin-application.service";

type ThesisAvailability = { available: true } | { available: false; reason: string };

export interface IThesisService {
  isThesisAvailable(studentId: number): Promise<ThesisAvailability>;
  submitThesis(studentId: number, title: string, attachmentUrl: string): Promise<GetThesisDTO>;
  getThesis(studentId: number): Promise<GetThesisDTO | null>;
}

export class ThesisService implements IThesisService {
  applicationService = new AdminApplicationService();

  async isThesisAvailable(studentId: number): Promise<ThesisAvailability> {
    const application = await this.applicationService.getApplicationByStudentId(studentId);

    if (!application) {
      throw new Error("Application not found");
    }

    const { applicationId } = application;

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

  async submitThesis(
    studentId: number,
    title: string,
    attachmentUrl: string
  ): Promise<GetThesisDTO> {
    const application = await this.applicationService.getApplicationByStudentId(studentId);

    if (!application) {
      throw new Error("Application not found");
    }

    const { applicationId, supervisor } = application;

    if (!supervisor) {
      throw new Error("Supervisor not found");
    }

    try {
      // Transaction to ensure both insertions succeed or fail together
      return await db.transaction(async (tx) => {
        const attachment = await tx
          .insert(attachments)
          .values({ applicationId, type: "thesis", attachmentUrl })
          .returning();

        const thesis = await tx
          .insert(theses)
          .values({
            applicationId,
            title,
            attachmentId: attachment[0].attachmentId,
          })
          .returning();

        return {
          thesisId: thesis[0].thesisId,
          applicationId: thesis[0].applicationId,
          title: thesis[0].title,
          attachmentUrl: attachment[0].attachmentUrl,
          createdAt: thesis[0].createdAt,
          supervisor,
        };
      });
    } catch (error) {
      console.error("Error submitting thesis:", error);
      throw error;
    }
  }

  async getThesis(studentId: number): Promise<GetThesisDTO | null> {
    const application = await this.applicationService.getApplicationByStudentId(studentId);

    if (!application) {
      return null;
    }

    const { applicationId, supervisor } = application;

    if (!supervisor) {
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
      supervisor,
    };
  }
}
