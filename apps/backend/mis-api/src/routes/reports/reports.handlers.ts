import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { ReportsService } from "@/services/reports.service";
import * as routes from "./reports.routes";

const reportsService = new ReportsService();

export const submitStudentReport: AppRouteHandler<routes.SubmitReportRoute> = async (c) => {
  const { studentId, attachmentUrl, title } = c.req.valid("json");

  try {
    await reportsService.submitReport(studentId, title, attachmentUrl);
    return c.json({ message: "Report submitted successfully" }, HttpStatusCodes.OK);
  } catch (error) {
    console.error("Error submitting report:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to submit report";

    return c.json({ message: errorMessage }, HttpStatusCodes.FORBIDDEN);
  }
};

export const getStudentReport: AppRouteHandler<routes.GetReportRoute> = async (c) => {
  const { studentId } = c.req.valid("json");

  const report = await reportsService.getReport(studentId);

  if (!report) {
    return c.json({ message: "Report Not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(report, HttpStatusCodes.OK);
};