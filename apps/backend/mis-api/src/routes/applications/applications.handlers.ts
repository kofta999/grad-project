import { AppRouteHandler } from "@/lib/types";
import {
  CreateApplicationRoute,
  GetApplicationRoute,
  SaveApplicationAttachmentsRoute,
} from "./applications.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import db from "@/db";
import {
  academicQualifications,
  addresses,
  applications,
  attachments,
  emergencyContacts,
  registerations,
} from "@/db/schema";

export const createApplication: AppRouteHandler<
  CreateApplicationRoute
> = async (c) => {
  let {
    permanentAddress,
    currentAddress,
    qualification,
    emergencyContact,
    registration,
  } = c.req.valid("json");

  // Should be there because of middleware
  let studentId = c.var.session.get("id")!;

  const newApplication = await db
    .insert(applications)
    .values({ studentId })
    .returning({ applicationId: applications.applicationId });

  const applicationId = newApplication[0].applicationId;

  await db
    .insert(addresses)
    .values({ ...permanentAddress, applicationId, type: "permanent" });

  await db
    .insert(addresses)
    .values({ ...currentAddress, applicationId, type: "current" });

  if (emergencyContact) {
    await db
      .insert(emergencyContacts)
      .values({ ...emergencyContact, applicationId });
  }

  await db
    .insert(academicQualifications)
    .values({ ...qualification, applicationId });

  await db.insert(registerations).values({ ...registration, applicationId });

  return c.json({ success: true, applicationId }, HttpStatusCodes.OK);
};

export const saveApplicationAttachments: AppRouteHandler<
  SaveApplicationAttachmentsRoute
> = async (c) => {
  const { applicationId, attachments: attachmentsArr } = c.req.valid("json");
  const promises = attachmentsArr.map((attachment) =>
    db.insert(attachments).values({ ...attachment, applicationId }),
  );

  await Promise.all(promises);

  return c.json({ success: true, applicationId }, HttpStatusCodes.OK);
};

export const getApplication: AppRouteHandler<GetApplicationRoute> = async (
  c,
) => {
  const studentId = c.var.session.get("id")!;

  const application = await db.query.applications.findFirst({
    where(f, { eq }) {
      return eq(f.studentId, studentId);
    },
    columns: { studentId: false },
    orderBy({ applicationId }, { desc }) {
      return desc(applicationId);
    },
  })!;

  if (!application) {
    return c.json(
      { message: "Application Not found" },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  const applicationId = application.applicationId;

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

  if (academicQualification && emergencyContact && registration) {
    return c.json(
      {
        application: {
          isAccepted: application.isAdminAccepted,
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
  }

  return c.json(
    { message: "Application Not found" },
    HttpStatusCodes.NOT_FOUND,
  );
};
