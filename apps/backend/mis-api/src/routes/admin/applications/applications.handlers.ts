import * as HttpStatusCodes from "stoker/http-status-codes";
import { AppRouteHandler } from "@/lib/types";
import {
  AcceptApplicationRoute,
  GetAllApplicationsRoute,
  GetApplicationDetailsRoute,
} from "./applications.routes";
import { z } from "zod";
import { adminApplicationDetailsSchema } from "@/db/validators";
import { AdminApplicationService } from "@/services/admin-application.service";
import { ApplicationDetailsDTO } from "@/dtos/application-details.dto";
import { StudentDetailsDTO } from "@/dtos/student-details.dto";
import { StudentService } from "@/services/student.service";

const adminApplicationService = new AdminApplicationService();
const studentService = new StudentService();

export const acceptApplication: AppRouteHandler<AcceptApplicationRoute> = async (c) => {
  const { applicationId } = c.req.valid("json");

  const operationStatus = await adminApplicationService.acceptApplication(applicationId);

  if (operationStatus == null) {
    return c.json({ message: "Application not found" }, HttpStatusCodes.NOT_FOUND);
  }

  if (!operationStatus) {
    return c.json({ message: "Application already accepted" }, HttpStatusCodes.CONFLICT);
  }

  return c.json({ message: "Application accepted" }, HttpStatusCodes.OK);
};

export const getAllApplications: AppRouteHandler<GetAllApplicationsRoute> = async (c) => {
  const applicationsList = await adminApplicationService.getAllApplications();

  return c.json(applicationsList, HttpStatusCodes.OK);
};

export const getApplicationDetails: AppRouteHandler<GetApplicationDetailsRoute> = async (c) => {
  const { id: applicationId } = c.req.valid("param");
  const { fetch } = c.req.valid("query");
  let res: {
    application?: ApplicationDetailsDTO;
    student?: StudentDetailsDTO & { createdAt: string };
  } = {};

  if (fetch === "student" || fetch == "all") {
    const student = await studentService.getStudentDetailsByApplicationId(applicationId);
    if (!student) {
      return c.json({ message: "Application Not found" }, HttpStatusCodes.NOT_FOUND);
    }

    res.student = student;
  }

  if (fetch === "application" || fetch == "all") {
    const application = await adminApplicationService.getApplicationByApplicationId(applicationId);

    if (!application) {
      return c.json({ message: "Application Not found" }, HttpStatusCodes.NOT_FOUND);
    }

    res.application = application;
  }

  return c.json(res, HttpStatusCodes.OK);
};
