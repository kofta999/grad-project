import { AppRouteHandler } from "@/lib/types";
import {
  CreateApplicationRoute,
  GetApplicationRoute,
  SaveApplicationAttachmentsRoute,
  GetCurrentAcademicYears as GetCurrentAcademicYearsRoute,
  GetAvailableDepartmentsRoute,
} from "./applications.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { StudentApplicationService } from "@/services/student-applications.service";

const studentApplicationService = new StudentApplicationService();

export const getCurrentAcademicYears: AppRouteHandler<GetCurrentAcademicYearsRoute> = async (c) => {
  const years = await studentApplicationService.getAvailableAcademicYears();

  return c.json(years, HttpStatusCodes.OK);
};

export const getAvailableDepartments: AppRouteHandler<GetAvailableDepartmentsRoute> = async (c) => {
  const { type } = c.req.valid("query");

  const departments = await studentApplicationService.getAvailableDepartments(type);

  return c.json(departments, HttpStatusCodes.OK);
};

export const createApplication: AppRouteHandler<CreateApplicationRoute> = async (c) => {
  let newApplicationData = c.req.valid("json");

  // Should be there because of middleware
  let studentId = c.var.session.get("id")!;

  const applicationId = await studentApplicationService.createApplication(
    studentId,
    newApplicationData
  );

  return c.json({ success: true, applicationId }, HttpStatusCodes.OK);
};

export const saveApplicationAttachments: AppRouteHandler<SaveApplicationAttachmentsRoute> = async (
  c
) => {
  const { applicationId, attachments } = c.req.valid("json");

  await studentApplicationService.saveApplicationAttachments({ applicationId, attachments });

  return c.json({ success: true, applicationId }, HttpStatusCodes.OK);
};

export const getApplication: AppRouteHandler<GetApplicationRoute> = async (c) => {
  const studentId = c.var.session.get("id")!;

  const application = await studentApplicationService.getApplication(studentId);

  if (!application) {
    return c.json({ message: "Application Not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json({ application }, HttpStatusCodes.OK);
};
