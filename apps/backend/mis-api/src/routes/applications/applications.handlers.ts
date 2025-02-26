import { AppRouteHandler } from "@/lib/types";
import {
  AcceptApplicationRoute,
  CreateApplicationRoute,
  SaveApplicationAttachmentsRoute,
  EditStudentInfoRoute,
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
  students,
} from "@/db/schema";
import { eq } from "drizzle-orm";

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

export const editStudentInfo: AppRouteHandler<EditStudentInfoRoute> = async (
  c,
) => {
  const studentId = c.var.session.get("id");

  if (!studentId) {
    return c.json({ message: "Unauthorized" }, HttpStatusCodes.UNAUTHORIZED);
  }

  const updatedData = c.req.valid("json");

  const existingStudent = await db.query.students.findFirst({
    where(fields, operators) {
      return operators.eq(fields.studentId, studentId);
    },
    columns: { studentId: true },
  });

  if (!existingStudent) {
    return c.json({ message: "Student not found" }, HttpStatusCodes.NOT_FOUND);
  }

  await db
    .update(students)
    .set(updatedData)
    .where(eq(students.studentId, studentId));

  return c.json(
    { message: "Student info updated successfully" },
    HttpStatusCodes.OK,
  );
};
