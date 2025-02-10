import { AppRouteHandler } from "@/lib/types";
import {
  AttachmentsRoute,
  LoginRoute,
  LogoutRoute,
  RegisterStage1Route,
  RegisterStage2Route,
  UploadRoute,
} from "./auth.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import db from "@/db";
import {
  academicQualifications,
  addresses,
  applications,
  emergencyContacts,
  registerations,
  students,
  attachments,
} from "@/db/schema";
import bcrypt from "bcryptjs";

export const registerStage1: AppRouteHandler<RegisterStage1Route> = async (
  c,
) => {
  let studentData = c.req.valid("json");
  // TODO: Handle image uploads

  studentData.hashedPassword = await bcrypt.hash(
    studentData.hashedPassword,
    10,
  );

  const newStudents = await db
    .insert(students)
    .values(studentData)
    .returning({ studentId: students.studentId });

  return c.json(
    { success: true, studentId: newStudents[0].studentId },
    HttpStatusCodes.OK,
  );
};

export const registerStage2: AppRouteHandler<RegisterStage2Route> = async (
  c,
) => {
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

export const saveAttachments: AppRouteHandler<AttachmentsRoute> = async (c) => {
  const { applicationId, attachments: attachmentsArr } = c.req.valid("json");
  const promises = attachmentsArr.map((attachment) =>
    db.insert(attachments).values({ ...attachment, applicationId }),
  );

  await Promise.all(promises);

  return c.json({ success: true, applicationId }, HttpStatusCodes.OK);
};

export const login: AppRouteHandler<LoginRoute> = async (c) => {
  const { email, password, role } = c.req.valid("json");
  let user;
  let userId;

  if (role === "student") {
    user = await db.query.students.findFirst({
      where(fields, operators) {
        return operators.eq(fields.email, email);
      },
      columns: {
        studentId: true,
        hashedPassword: true,
      },
    });

    userId = user?.studentId;
  } else if (role === "admin") {
    user = await db.query.admins.findFirst({
      where(fields, operators) {
        return operators.eq(fields.email, email);
      },
      columns: {
        adminId: true,
        hashedPassword: true,
      },
    });

    userId = user?.adminId;
  }

  if (!user) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED,
    );
  }

  if (!(await bcrypt.compare(password, user.hashedPassword))) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED,
    );
  }

  c.var.session.set("id", userId!);
  c.var.session.set("role", role);

  return c.json({}, HttpStatusCodes.OK);
};

export const logout: AppRouteHandler<LogoutRoute> = async (c) => {
  c.var.session.deleteSession();

  return c.json({}, HttpStatusCodes.OK);
};

export const upload: AppRouteHandler<UploadRoute> = async (c) => {
  const file = c.var.file;

  return c.json({ uploadUrl: file! }, HttpStatusCodes.OK);
};
