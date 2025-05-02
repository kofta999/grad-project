import db from "@/db";
import { reports } from "@/db/schema";
import { GetReportsDTO } from "@/dtos/get-reports.dto";
import { eq } from "drizzle-orm";

export interface IReportsService {
  submitReport(type: string, title: string, attachmentUrl: string): Promise<boolean>;
  getReports(type?: string): Promise<GetReportsDTO>;
}

export class ReportsService implements IReportsService {
  async submitReport(type: string, title: string, attachmentUrl: string): Promise<boolean> {
    try {
      await db.insert(reports).values({ type, title, attachmentUrl });
      return true;
    } catch (error) {
      console.error("Error submitting report:", error);
      throw error;
    }
  }

  async getReports(type?: string): Promise<GetReportsDTO> {
    if (type) {
      return db.select().from(reports).where(eq(reports.type, type));
    }

    return db.select().from(reports);
  }
}
