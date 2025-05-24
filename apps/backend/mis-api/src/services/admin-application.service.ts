import { AdminApplicationsListDTO } from "@/dtos/admin-applications-list.dto";
import { ApplicationService } from "./application.service";
import db from "@/db";
import { adminApplicationsList, applications } from "@/db/schema";
import { count, desc, eq, SQL, sql } from "drizzle-orm";
import { ApplicationStatusType } from "@/lib/types";

type GetAllApplicationsParams = {
  studentNameArQuery?: string;
  page: number;
  status?: ApplicationStatusType;
  sortByName: "asc" | "desc";
};

export interface IAdminApplicationService {
  acceptApplication(applicationId: number): Promise<boolean | null>;
  rejectApplication(applicationId: number): Promise<boolean | null>;
  getAllApplications(options: GetAllApplicationsParams): Promise<AdminApplicationsListDTO>;
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
        status: true,
      },
    });

    if (!maybeApplication) {
      return null;
    }

    if (maybeApplication.status !== "pending") {
      return false;
    }

    await db
      .update(applications)
      .set({ status: "accepted" })
      .where(eq(applications.applicationId, applicationId));

    return true;
  }

  async rejectApplication(applicationId: number): Promise<boolean | null> {
    const maybeApplication = await db.query.applications.findFirst({
      where(fields, operators) {
        return operators.eq(fields.applicationId, applicationId);
      },
      columns: {
        status: true,
      },
    });

    if (!maybeApplication) {
      return null;
    }

    if (maybeApplication.status !== "pending") {
      return false;
    }

    await db
      .update(applications)
      .set({ status: "rejected" })
      .where(eq(applications.applicationId, applicationId));

    return true;
  }

  async getAllApplications({
    page,
    status,
    studentNameArQuery,
    sortByName,
  }: GetAllApplicationsParams): Promise<AdminApplicationsListDTO> {
    const searchParam = `%${studentNameArQuery}%`;
    const whereQuery: SQL[] = [];

    if (studentNameArQuery) {
      whereQuery.push(
        sql`unaccent('arabic_unaccent', ${adminApplicationsList.studentName}) like unaccent('arabic_unaccent', ${searchParam})`
      );
    }

    if (status != undefined) {
      whereQuery.push(eq(adminApplicationsList.status, status));
    }

    const totalCount = await db
      .select({ c: count() })
      .from(adminApplicationsList)
      .where(whereQuery.length > 0 ? sql.fromList(whereQuery) : undefined);

    const totalPages = Math.ceil(totalCount[0].c / this.PAGE_LIMIT);

    const data = await db
      .select()
      .from(adminApplicationsList)
      .where(whereQuery.length > 0 ? sql.fromList(whereQuery) : undefined)
      .offset(this.PAGE_LIMIT * (page - 1))
      .limit(this.PAGE_LIMIT)
      .orderBy(
        sortByName === "asc"
          ? adminApplicationsList.studentName
          : desc(adminApplicationsList.studentName)
      );

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
