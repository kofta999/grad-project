import db from "@/db";
import { reports } from "@/db/schema";
import { GetReportDTO } from "@/dtos/get-report.dto";
import { eq } from "drizzle-orm";

export interface IReportsService {
  submitReport(type: string, title: string, attachmentUrl: string): Promise<boolean>;
  getReport(type: string): Promise<GetReportDTO | null>;
}

export class ReportsService implements IReportsService { 
  async submitReport(type: string, title: string, attachmentUrl: string): Promise<boolean> {
    try {
      await db
        .insert(reports)
        .values({ type, title, attachmentUrl });
      return true;
    } catch (error) {
      console.error("Error submitting report:", error);
      throw error;
    }
  }

  async getReport(type: string): Promise<GetReportDTO | null> {
    const report = await db
      .select()
      .from(reports)
      .where(eq(reports.type, type));
    if (report.length === 0) {
      return null;
    }
    return {
      reportId: report[0].reportId,
      type: report[0].type,
      title: report[0].title,
      attachmentUrl: report[0].attachmentUrl,
    };
  }
}