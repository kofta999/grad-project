import db from "@/db";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  academicQualifications,
  academicYears,
  addresses,
  adminApplicationsList,
  applications,
  attachments,
  emergencyContacts,
  registerations,
} from "@/db/schema";
import { AppRouteHandler } from "@/lib/types";
import { eq } from "drizzle-orm";
import {
  AcceptApplicationRoute,
  GetAllApplicationsRoute,
  GetApplicationDetailsRoute,
} from "./applications.routes";
import { z } from "zod";
import { adminApplicationDetailsSchema } from "@/db/validators";
import { formatAcademicYear, removeApplicationId } from "@/lib/util";

export const acceptApplication: AppRouteHandler<
  AcceptApplicationRoute
> = async (c) => {
  const { applicationId } = c.req.valid("json");

  const maybeApplication = await db.query.applications.findFirst({
    where(fields, operators) {
      return operators.eq(fields.applicationId, applicationId);
    },
    columns: {
      isAdminAccepted: true,
    },
  });

  if (!maybeApplication) {
    return c.json(
      { message: "Application not found" },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  if (maybeApplication.isAdminAccepted === true) {
    return c.json(
      { message: "Application already accepted" },
      HttpStatusCodes.CONFLICT,
    );
  }

  await db
    .update(applications)
    .set({ isAdminAccepted: true })
    .where(eq(applications.applicationId, applicationId));

  return c.json({ message: "Application accepted" }, HttpStatusCodes.OK);
};

export const getAllApplications: AppRouteHandler<
  GetAllApplicationsRoute
> = async (c) => {
  const results = await db.select().from(adminApplicationsList);

  return c.json(results, HttpStatusCodes.OK);
};

export const getApplicationDetails: AppRouteHandler<
  GetApplicationDetailsRoute
> = async (c) => {
  const { id: applicationId } = c.req.valid("param");
  const { fetch } = c.req.valid("query");
  let res: z.infer<typeof adminApplicationDetailsSchema> = {};

  const getApplication = async () => {
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
      })
      .from(a)
      .innerJoin(addresses, eq(a.applicationId, addresses.applicationId))
      .innerJoin(
        academicQualifications,
        eq(a.applicationId, academicQualifications.applicationId),
      )
      .innerJoin(
        emergencyContacts,
        eq(a.applicationId, emergencyContacts.applicationId),
      )
      .innerJoin(
        registerations,
        eq(a.applicationId, registerations.applicationId),
      )
      .innerJoin(
        academicYears,
        eq(registerations.academicYearId, academicYears.academicYearId),
      )
      .where(eq(a.applicationId, applicationId));

    if (applicationList.length === 0) return null;

    const attachmentsList = await db.query.attachments.findMany({
      where: (f, { eq }) => eq(f.applicationId, applicationId),
      columns: { applicationId: false },
    });

    const addressesList = await db.query.addresses.findMany({
      where: (f, { eq }) => eq(f.applicationId, applicationId),
      columns: { applicationId: false },
    });

    const { application, academicYear, registration, ...rest } =
      applicationList[0];

    return {
      ...application,
      ...rest,
      registration: {
        registerationId: registration.registerationId,
        academicDegree: registration.academicDegree,
        faculty: registration.faculty,
        academicYear: formatAcademicYear(academicYear),
      },
      attachments: attachmentsList,
      addresses: addressesList,
    };
  };

  const getStudent = async () =>
    db.query.students.findFirst({
      where: ({ studentId }, { eq }) =>
        eq(
          studentId,
          db
            .select({ studentId: applications.studentId })
            .from(applications)
            .where(eq(applications.applicationId, applicationId)),
        ),
      columns: {
        hashedPassword: false,
        secQuestion: false,
        secAnswer: false,
        updatedAt: false,
      },
    });

  if (fetch === "student" || fetch == "all") {
    const student = await getStudent();
    if (!student) {
      return c.json(
        { message: "Application Not found" },
        HttpStatusCodes.NOT_FOUND,
      );
    }

    res["student"] = student;
  }

  if (fetch === "application" || fetch == "all") {
    const application = await getApplication();

    if (!application) {
      return c.json(
        { message: "Application Not found" },
        HttpStatusCodes.NOT_FOUND,
      );
    }

    res["application"] = application;
  }

  return c.json(res, HttpStatusCodes.OK);
};
