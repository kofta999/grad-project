import { AppRouteHandler } from "@/lib/types";
import { AcademicService } from "@/services/academic.service";
import { GetCurrentAcademicYearsRoute } from "./academic-years.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";

const academicService = new AcademicService();

export const getCurrentAcademicYears: AppRouteHandler<GetCurrentAcademicYearsRoute> = async (c) => {
  const years = await academicService.getAvailableAcademicYears();
  return c.json(years, HttpStatusCodes.OK);
};
