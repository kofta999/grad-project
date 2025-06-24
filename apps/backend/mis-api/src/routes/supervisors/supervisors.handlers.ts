import * as HttpStatusCodes from "stoker/http-status-codes";
import type { AppRouteHandler } from "@/lib/types";
import { SupervisorService } from "@/services/supervisor.service";
import type * as routes from "./supervisors.routes";

const supervisorService = new SupervisorService();

export const getSupervisorList: AppRouteHandler<routes.GetSupervisorListRoute> = async (c) => {
  const supervisorList = await supervisorService.getAllSupervisors();

  return c.json(supervisorList, HttpStatusCodes.OK);
};

export const getSupervisor: AppRouteHandler<routes.GetSupervisorRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const supervisor = await supervisorService.getSupervisor(id);

  if (!supervisor) {
    return c.json({ message: "Supervisor not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(supervisor, HttpStatusCodes.OK);
};

export const createSupervisor: AppRouteHandler<routes.CreateSupervisorRoute> = async (c) => {
  const supervisor = c.req.valid("json");

  const newSupervisor = await supervisorService.createSupervisor(supervisor);

  return c.json(newSupervisor, HttpStatusCodes.OK);
};
