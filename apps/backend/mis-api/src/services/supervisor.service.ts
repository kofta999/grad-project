import db from "@/db";
import { supervisors } from "@/db/schema";
import { CreateSupervisorDTO } from "@/dtos/create-supervisor.dto";
import { SupervisorDetailsDTO } from "@/dtos/supervisor-details.dto";
import { SupervisorListDTO } from "@/dtos/supervisor-list.dto";

interface ISupervisorService {
  getAllSupervisors(): Promise<SupervisorListDTO>;
  getSupervisor(supervisorId: number): Promise<SupervisorDetailsDTO | null>;
  createSupervisor(supervisor: CreateSupervisorDTO): Promise<SupervisorDetailsDTO>;
}

export class SupervisorService implements ISupervisorService {
  async getAllSupervisors(): Promise<SupervisorListDTO> {
    const supervisors = await db.query.supervisors.findMany();

    return supervisors.map((s) => ({ name: s.fullNameAr, supervisorId: s.supervisorId }));
  }

  async getSupervisor(supervisorId: number): Promise<SupervisorDetailsDTO | null> {
    const supervisor = await db.query.supervisors.findFirst({
      where: (f, { eq }) => eq(f.supervisorId, supervisorId),
    });

    if (!supervisor) {
      return null;
    }

    return supervisor;
  }

  async createSupervisor(supervisor: CreateSupervisorDTO): Promise<SupervisorDetailsDTO> {
    const s = await db.insert(supervisors).values(supervisor).returning();

    return s[0];
  }
}
