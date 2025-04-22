import { AdminApplicationsListDTO } from "@/dtos/admin-applications-list.dto";
import { StudentDetailsDTO } from "@/dtos/student-details.dto";
import { ApplicationService } from "./application.service";
import db from "@/db";
import { adminApplicationsList, applications } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface IAdminApplicationService {
  acceptApplication(applicationId: number): Promise<boolean | null>;
  getAllApplications(): Promise<AdminApplicationsListDTO>;
}

export class AdminApplicationService
  extends ApplicationService
  implements IAdminApplicationService
{
  async acceptApplication(applicationId: number): Promise<boolean | null> {
    const maybeApplication = await db.query.applications.findFirst({
      where(fields, operators) {
        return operators.eq(fields.applicationId, applicationId);
      },
      columns: {
        isAdminAccepted: true,
      },
    });

    if (!maybeApplication) {
      return null;
    }

    if (maybeApplication.isAdminAccepted === true) {
      return false;
    }

    await db
      .update(applications)
      .set({ isAdminAccepted: true })
      .where(eq(applications.applicationId, applicationId));

    return true;
  }

  async getAllApplications(): Promise<AdminApplicationsListDTO> {
    return db.select().from(adminApplicationsList);
  }
}
