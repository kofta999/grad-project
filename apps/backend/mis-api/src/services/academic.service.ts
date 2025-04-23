import db from "@/db";
import { academicYears, courseRegistrations } from "@/db/schema";
import { AcademicYearDTO } from "@/dtos/academic-year.dto.";
import { AvailableDepartmentsDTO } from "@/dtos/available-departments.dto";
import { DepartmentType } from "@/lib/types";
import { formatAcademicYear } from "@/lib/util";
import { and, eq } from "drizzle-orm";

export interface IAcademicService {
  getAvailableAcademicYears(): Promise<AcademicYearDTO[]>;
  getAvailableDepartments(type: DepartmentType): Promise<AvailableDepartmentsDTO>;
  getStudentRegisteredAcademicYears(studentId: number): Promise<AcademicYearDTO[]>;
}

export class AcademicService implements IAcademicService {
  async getAvailableAcademicYears(): Promise<AcademicYearDTO[]> {
    const years = await db.query.academicYears.findMany({
      where(f, { gte }) {
        return gte(f.startDate, new Date().toDateString());
      },
    });

    return years.map((year) => ({
      academicYearId: year.academicYearId,
      year: formatAcademicYear(year),
    }));
  }

  async getAvailableDepartments(type: DepartmentType): Promise<AvailableDepartmentsDTO> {
    const departments = await db.query.departments.findMany({
      columns: {
        departmentId: true,
        title: true,
      },
      where: (f, { eq }) => eq(f.type, type),
    });

    return departments;
  }

  async getStudentRegisteredAcademicYears(studentId: number): Promise<AcademicYearDTO[]> {
    const application = await db.query.applications.findFirst({
      where(f, { eq }) {
        return eq(f.studentId, studentId);
      },
      columns: { applicationId: true },
    });

    if (!application) {
      return [];
    }

    const years = await db
      .select({
        academicYear: academicYears,
      })
      .from(academicYears)
      .innerJoin(
        courseRegistrations,
        and(
          eq(courseRegistrations.academicYearId, academicYears.academicYearId),
          eq(courseRegistrations.applicationId, application.applicationId)
        )
      )
      .groupBy(academicYears.academicYearId);

    return years.map(({ academicYear: year }) => ({
      academicYearId: year.academicYearId,
      year: `${new Date(year.startDate).getFullYear()}-${new Date(year.endDate).getFullYear()}`,
    }));
  }
}
