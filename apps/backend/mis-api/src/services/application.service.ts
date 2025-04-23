import db from "@/db";
import {
  applications,
  academicQualifications,
  emergencyContacts,
  registerations,
  academicYears,
  departments,
  addresses,
} from "@/db/schema";
import { ApplicationDetailsDTO } from "@/dtos/application-details.dto";
import { formatAcademicYear, removeApplicationId } from "@/lib/util";
import { eq } from "drizzle-orm";

export interface IApplicationService {
  getApplicationByStudentId(studentId: number): Promise<ApplicationDetailsDTO | null>;
  getApplicationByApplicationId(applicationId: number): Promise<ApplicationDetailsDTO | null>;
}

export abstract class ApplicationService implements IApplicationService {
  async getApplicationByStudentId(studentId: number): Promise<ApplicationDetailsDTO | null> {
    const a = applications;

    const applicationList = await db
      .select({
        application: {
          isAccepted: a.isAdminAccepted,
          studentId: a.studentId,
          applicationId: a.applicationId,
        },
        academicQualification: removeApplicationId(academicQualifications),
        emergencyContact: removeApplicationId(emergencyContacts),
        registration: removeApplicationId(registerations),
        academicYear: academicYears,
        department: departments,
      })
      .from(a)
      .innerJoin(addresses, eq(a.applicationId, addresses.applicationId))
      .innerJoin(academicQualifications, eq(a.applicationId, academicQualifications.applicationId))
      .leftJoin(emergencyContacts, eq(a.applicationId, emergencyContacts.applicationId))
      .innerJoin(registerations, eq(a.applicationId, registerations.applicationId))
      .innerJoin(academicYears, eq(registerations.academicYearId, academicYears.academicYearId))
      .innerJoin(departments, eq(registerations.departmentId, departments.departmentId))
      .where(eq(a.studentId, studentId));

    if (applicationList.length === 0) return null;

    const { application, academicYear, registration, department, ...rest } = applicationList[0];

    const attachmentsList = await db.query.attachments.findMany({
      where: (f, { eq }) => eq(f.applicationId, application.applicationId),
      columns: { applicationId: false },
    });

    const addressesList = await db.query.addresses.findMany({
      where: (f, { eq }) => eq(f.applicationId, application.applicationId),
      columns: { applicationId: false },
    });

    return {
      ...application,
      ...rest,
      registration: {
        registerationId: registration.registerationId,
        academicDegree: department.type,
        faculty: registration.faculty,
        academicYearId: academicYear.academicYearId,
        academicYear: formatAcademicYear(academicYear),
        academicProgram: department.title,
      },
      attachments: attachmentsList,
      addresses: addressesList,
    };
  }

  async getApplicationByApplicationId(
    applicationId: number
  ): Promise<ApplicationDetailsDTO | null> {
    const a = applications;

    const applicationList = await db
      .select({
        application: {
          isAccepted: a.isAdminAccepted,
          studentId: a.studentId,
          applicationId: a.applicationId,
        },
        academicQualification: removeApplicationId(academicQualifications),
        emergencyContact: removeApplicationId(emergencyContacts),
        registration: removeApplicationId(registerations),
        academicYear: academicYears,
        department: departments,
      })
      .from(a)
      .innerJoin(addresses, eq(a.applicationId, addresses.applicationId))
      .innerJoin(academicQualifications, eq(a.applicationId, academicQualifications.applicationId))
      .leftJoin(emergencyContacts, eq(a.applicationId, emergencyContacts.applicationId))
      .innerJoin(registerations, eq(a.applicationId, registerations.applicationId))
      .innerJoin(academicYears, eq(registerations.academicYearId, academicYears.academicYearId))
      .innerJoin(departments, eq(registerations.departmentId, departments.departmentId))
      .where(eq(a.applicationId, applicationId));

    if (applicationList.length === 0) return null;

    const { application, academicYear, registration, department, ...rest } = applicationList[0];

    const attachmentsList = await db.query.attachments.findMany({
      where: (f, { eq }) => eq(f.applicationId, application.applicationId),
      columns: { applicationId: false },
    });

    const addressesList = await db.query.addresses.findMany({
      where: (f, { eq }) => eq(f.applicationId, application.applicationId),
      columns: { applicationId: false },
    });

    return {
      ...application,
      ...rest,
      registration: {
        registerationId: registration.registerationId,
        academicDegree: department.type,
        faculty: registration.faculty,
        academicYearId: academicYear.academicYearId,
        academicYear: formatAcademicYear(academicYear),
        academicProgram: department.title,
      },
      attachments: attachmentsList,
      addresses: addressesList,
    };
  }
}
