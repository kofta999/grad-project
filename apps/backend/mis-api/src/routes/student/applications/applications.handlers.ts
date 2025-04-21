import { AppRouteHandler } from "@/lib/types";
import {
  CreateApplicationRoute,
  GetApplicationRoute,
  SaveApplicationAttachmentsRoute,
  GetCurrentAcademicYears as GetCurrentAcademicYearsRoute,
  GetAvailableDepartmentsRoute,
} from "./applications.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";
import db from "@/db";
import {
  academicQualifications,
  academicYears,
  addresses,
  applications,
  attachments,
  departments,
  emergencyContacts,
  registerations,
} from "@/db/schema";
import { formatAcademicYear, removeApplicationId } from "@/lib/util";
import { eq } from "drizzle-orm";

export const getCurrentAcademicYears: AppRouteHandler<GetCurrentAcademicYearsRoute> = async (c) => {
  const years = await db.query.academicYears.findMany({
    where(f, { gte }) {
      return gte(f.startDate, new Date().toDateString());
    },
  });

  return c.json(
    years.map((year) => ({
      academicYearId: year.academicYearId,
      year: formatAcademicYear(year),
    })),
    HttpStatusCodes.OK
  );
};

export const getAvailableDepartments: AppRouteHandler<GetAvailableDepartmentsRoute> = async (c) => {
  const { type } = c.req.valid("query");

  const departments = await db.query.departments.findMany({
    columns: {
      departmentId: true,
      title: true,
    },
    where: (f, { eq }) => eq(f.type, type),
  });

  return c.json(departments, HttpStatusCodes.OK);
};

export const createApplication: AppRouteHandler<CreateApplicationRoute> = async (c) => {
  let { permanentAddress, currentAddress, qualification, emergencyContact, registration } =
    c.req.valid("json");

  // Should be there because of middleware
  let studentId = c.var.session.get("id")!;

  const newApplication = await db
    .insert(applications)
    .values({ studentId })
    .returning({ applicationId: applications.applicationId });

  const applicationId = newApplication[0].applicationId;

  await db.insert(addresses).values({ ...permanentAddress, applicationId, type: "permanent" });

  await db.insert(addresses).values({ ...currentAddress, applicationId, type: "current" });

  if (emergencyContact) {
    await db.insert(emergencyContacts).values({ ...emergencyContact, applicationId });
  }

  await db.insert(academicQualifications).values({ ...qualification, applicationId });

  await db.insert(registerations).values({ ...registration, applicationId });

  return c.json({ success: true, applicationId }, HttpStatusCodes.OK);
};

export const saveApplicationAttachments: AppRouteHandler<SaveApplicationAttachmentsRoute> = async (
  c
) => {
  const { applicationId, attachments: attachmentsArr } = c.req.valid("json");
  const promises = attachmentsArr.map((attachment) =>
    db.insert(attachments).values({ ...attachment, applicationId })
  );

  await Promise.all(promises);

  return c.json({ success: true, applicationId }, HttpStatusCodes.OK);
};

export const getApplication: AppRouteHandler<GetApplicationRoute> = async (c) => {
  const studentId = c.var.session.get("id")!;

  const _getApplication = async () => {
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
  };

  const application = await _getApplication();
  console.log(application);

  if (!application) {
    return c.json({ message: "Application Not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json({ application }, HttpStatusCodes.OK);
};
