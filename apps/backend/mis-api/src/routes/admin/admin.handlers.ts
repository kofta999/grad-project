import db from "@/db";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { adminApplicationsList, applications } from "@/db/schema";
import { AppRouteHandler } from "@/lib/types";
import { eq } from "drizzle-orm";
import {
  AcceptApplicationRoute,
  GetAllApplicationsRoute,
  GetApplicationDetailsRoute,
} from "./admin.routes";

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
  console.log(c.req.param());
  const { id: applicationId } = c.req.valid("param");

  // Will use a naive, not performant approach for simplicity
  const application = await db.query.applications.findFirst({
    where(f, { eq }) {
      return eq(f.applicationId, applicationId);
    },
    columns: { applicationId: false },
  })!;

  if (!application) {
    return c.json(
      { message: "Application Not found" },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  const student = await db.query.students.findFirst({
    where({ studentId }, { eq }) {
      return eq(studentId, application.studentId);
    },
    columns: {
      hashedPassword: false,
      secAnswer: false,
      secQuestion: false,
      updatedAt: false,
    },
  });

  const addresses = await db.query.addresses.findMany({
    where(f, { eq }) {
      return eq(f.applicationId, applicationId);
    },
    columns: { applicationId: false },
  });

  const academicQualification = await db.query.academicQualifications.findFirst(
    {
      where(f, { eq }) {
        return eq(f.applicationId, applicationId);
      },
    },
  );

  const emergencyContact = await db.query.emergencyContacts.findFirst({
    where(f, { eq }) {
      return eq(f.applicationId, applicationId);
    },
    columns: { applicationId: false },
  })!;

  const registration = await db.query.registerations.findFirst({
    where(f, { eq }) {
      return eq(f.applicationId, applicationId);
    },
    columns: { applicationId: false },
  })!;

  const attachments = await db.query.attachments.findMany({
    where(f, { eq }) {
      return eq(f.applicationId, applicationId);
    },
    columns: { applicationId: false },
  })!;

  if (student && academicQualification && emergencyContact && registration) {
    return c.json(
      {
        student,
        application: {
          isAdminAccepted: application.isAdminAccepted,
          applicationId,
          academicQualification,
          addresses,
          attachments,
          emergencyContact,
          registration,
        },
      },
      HttpStatusCodes.OK,
    );
  } else {
    return c.json(
      { message: "Application Not found" },
      HttpStatusCodes.NOT_FOUND,
    );
  }
};
