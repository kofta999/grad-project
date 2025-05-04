import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { ReportsService } from "@/services/reports.service";
import * as routes from "./reports.routes";

const reportsService = new ReportsService();

export const submitReport: AppRouteHandler<routes.SubmitReportRoute> = async (c) => {
  const { type, attachmentUrl, title } = c.req.valid("json");

  try {
    const result = await reportsService.submitReport(type, title, attachmentUrl);
    if (result) {
      return c.json(
        { success: true, message: "Report submitted successfully" },
        HttpStatusCodes.OK
      );
    }
    return c.json({ message: "Failed to submit report" }, HttpStatusCodes.FORBIDDEN);
  } catch (error) {
    console.error("Error submitting report:", error);
    return c.json({ message: "Failed to submit report" }, HttpStatusCodes.FORBIDDEN);
  }
};

export const getReport: AppRouteHandler<routes.GetReportRoute> = async (c) => {
  const { type } = c.req.valid("query");

  const report = await reportsService.getReports(type);

  if (!report) {
    return c.json({ message: "Report Not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(report, HttpStatusCodes.OK);
};
