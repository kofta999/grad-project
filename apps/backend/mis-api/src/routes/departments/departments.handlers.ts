import { AppRouteHandler } from "@/lib/types";
import { AcademicService } from "@/services/academic.service";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as routes from "./departments.routes";

const academicService = new AcademicService();

export const getAvailableDepartments: AppRouteHandler<routes.GetAvailableDepartmentsRoute> = async (
  c
) => {
  const { type } = c.req.valid("query");
  const departments = await academicService.getAvailableDepartments(type);
  return c.json(departments, HttpStatusCodes.OK);
};
