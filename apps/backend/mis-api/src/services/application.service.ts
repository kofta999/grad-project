import db from "@/db";
import {
  applications,
  academicQualifications,
  emergencyContacts,
  registerations,
  academicYears,
  departments,
  addresses,
  countries,
} from "@/db/schema";
import { ApplicationDetailsDTO } from "@/dtos/application-details.dto";
import { formatAcademicYear, removeApplicationId } from "@/lib/util";
import { count, eq } from "drizzle-orm";

export interface IApplicationService {
  getApplicationByStudentId(studentId: number): Promise<ApplicationDetailsDTO | null>;
  getApplicationByApplicationId(applicationId: number): Promise<ApplicationDetailsDTO | null>;
  exists(applicationId: number): Promise<boolean>;
}

type GetApplicationByParams =
  | (typeof applications)["applicationId"]
  | (typeof applications)["studentId"];

export abstract class ApplicationService implements IApplicationService {
  private async getApplicationBy(
    field: GetApplicationByParams,
    fieldValue: number
  ): Promise<ApplicationDetailsDTO | null> {
    const a = applications;

    const applicationList = await db
      .select({
        application: {
          status: a.status,
          studentId: a.studentId,
          applicationId: a.applicationId,
        },
        qualification: removeApplicationId(academicQualifications),
        emergencyContact: removeApplicationId(emergencyContacts),
        registration: removeApplicationId(registerations),
        academicYear: academicYears,
        department: departments,
        qualificationCountry: countries,
      })
      .from(a)
      .innerJoin(addresses, eq(a.applicationId, addresses.applicationId))
      .innerJoin(academicQualifications, eq(a.applicationId, academicQualifications.applicationId))
      .innerJoin(countries, eq(academicQualifications.countryId, countries.countryId))
      .leftJoin(emergencyContacts, eq(a.applicationId, emergencyContacts.applicationId))
      .innerJoin(registerations, eq(a.applicationId, registerations.applicationId))
      .innerJoin(academicYears, eq(registerations.academicYearId, academicYears.academicYearId))
      .innerJoin(departments, eq(registerations.departmentId, departments.departmentId))
      .where(eq(field, fieldValue));

    if (applicationList.length === 0) return null;

    const {
      application,
      academicYear,
      registration,
      department,
      emergencyContact,
      qualification,
      qualificationCountry,
    } = applicationList[0];

    const attachmentsList = await db.query.attachments.findMany({
      where: (f, { eq }) => eq(f.applicationId, application.applicationId),
      columns: { applicationId: false },
    });

    const addressesList = await db.query.addresses.findMany({
      where: (f, { eq }) => eq(f.applicationId, application.applicationId),
      columns: { applicationId: false },
      with: { city: true, country: true },
    });

    return {
      ...application,
      emergencyContact,
      qualification: {
        ...qualification,
        country: qualificationCountry.nameAr,
      },
      registration: {
        registerationId: registration.registerationId,
        academicDegree: department.type,
        faculty: registration.faculty,
        academicYearId: academicYear.academicYearId,
        departmentId: registration.departmentId,
        academicYear: formatAcademicYear(academicYear),
        academicProgram: department.title,
      },
      attachments: attachmentsList,
      addresses: addressesList.map((addr) => ({
        ...addr,
        country: addr.country.nameAr,
        city: addr.city.nameAr,
      })),
    };
  }

  async getApplicationByStudentId(studentId: number): Promise<ApplicationDetailsDTO | null> {
    return this.getApplicationBy(applications.studentId, studentId);
  }

  async getApplicationByApplicationId(
    applicationId: number
  ): Promise<ApplicationDetailsDTO | null> {
    return this.getApplicationBy(applications.applicationId, applicationId);
  }

  async exists(applicationId: number): Promise<boolean> {
    const res = await db
      .select({ count: count() })
      .from(applications)
      .where(eq(applications.applicationId, applicationId));

    return res[0].count !== 0;
  }
}
