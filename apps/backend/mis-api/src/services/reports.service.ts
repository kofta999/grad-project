import db from "@/db";
import { attachments, reports } from "@/db/schema";
import { GetReportDTO } from "@/dtos/get-report.dto";
import { eq } from "drizzle-orm";

export interface IReportsService {
  submitReport(studentId: number, title: string, attachmentUrl: string): Promise<boolean>;
  getReport(studentId: number): Promise<GetReportDTO | null>;
}

export class ReportsService implements IReportsService {
  async submitReport(studentId: number, title: string, attachmentUrl: string): Promise<boolean> {
    const applicationId = await this.getApplicationByStudentId(studentId);

    if (!applicationId) {
      throw new Error("Application not found");
    }

    try {
      return await db.transaction(async (tx) => {
        const result = await tx
          .insert(attachments)
          .values({ applicationId, type: "report", attachmentUrl })
          .returning();

        const attachment = result[0];

        await tx
          .insert(reports)
          .values({ applicationId, title, attachmentId: attachment.attachmentId });

        return true;
      });
    } catch (error) {
      console.error("Error submitting report:", error);
      throw error;
    }
  }

  async getReport(studentId: number): Promise<GetReportDTO | null> {
    const applicationId = await this.getApplicationByStudentId(studentId);

    if (!applicationId) {
      return null;
    }

    const report = await db
      .select()
      .from(reports)
      .innerJoin(attachments, eq(attachments.attachmentId, reports.attachmentId))
      .where(eq(reports.applicationId, applicationId));

    if (report.length === 0) {
      return null;
    }

    return {
      applicationId: report[0].reports.applicationId,
      reportId: report[0].reports.reportId,
      title: report[0].reports.title,
      attachmentUrl: report[0].attachments.attachmentUrl,
    };
  }

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