import { AdminApplicationsListDTO } from "@/dtos/admin-applications-list.dto";
import { StudentDetailsDTO } from "@/dtos/student-details.dto";
import { ApplicationService } from "./application.service";
import db from "@/db";
import { adminApplicationsList, applications } from "@/db/schema";
import { count, eq, ilike, sql } from "drizzle-orm";

export interface IAdminApplicationService {
  acceptApplication(applicationId: number): Promise<boolean | null>;
  getAllApplications(studentNameArQuery: string, page: number): Promise<AdminApplicationsListDTO>;
}

export class AdminApplicationService
  extends ApplicationService
  implements IAdminApplicationService
{
  private PAGE_LIMIT = 5 as const;

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

  async getAllApplications(
    studentNameArQuery: string,
    page: number
  ): Promise<AdminApplicationsListDTO> {
    const searchParam = `%${studentNameArQuery}%`;
    const whereQuery = sql`unaccent('arabic_unaccent', ${adminApplicationsList.studentName}) like unaccent('arabic_unaccent', ${searchParam})`;

    const totalCount = await db
      .select({ c: count() })
      .from(adminApplicationsList)
      .where(whereQuery);

    const totalPages = Math.ceil(totalCount[0].c / this.PAGE_LIMIT);

    const data = await db
      .select()
      .from(adminApplicationsList)
      .where(whereQuery)
      .offset(this.PAGE_LIMIT * (page - 1))
      .limit(this.PAGE_LIMIT)
      .orderBy(adminApplicationsList.studentName);

    return {
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCount[0].c,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
}
