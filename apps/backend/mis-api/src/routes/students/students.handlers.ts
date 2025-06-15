import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { StudentService } from "@/services/student.service";
import { AcademicService } from "@/services/academic.service";
import { CourseService } from "@/services/course.service";
import { ThesisService } from "@/services/thesis.service";
import { StudentApplicationService } from "@/services/student-application.service";
import * as routes from "./students.routes";
import { StorageService } from "@/services/storage.service";

// Initialize services
const studentService = new StudentService();
const academicService = new AcademicService();
const courseService = new CourseService();
const thesisService = new ThesisService();
const studentApplicationService = new StudentApplicationService();
const storageService = new StorageService();

// Profile handlers
export const getStudentDetails: AppRouteHandler<routes.GetStudentDetailsRoute> = async (c) => {
  const studentId = c.var.user.userId;

  if (!studentId) {
    return c.json({ message: "Unauthorized" }, HttpStatusCodes.UNAUTHORIZED);
  }

  const student = await studentService.getStudentDetailsByStudentId(studentId);

  if (!student) {
    return c.json({ message: "Student not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(student, HttpStatusCodes.OK);
};

// Course handlers
export const getRegisteredCourses: AppRouteHandler<routes.GetRegisteredCourses> = async (c) => {
  const { academicYearId, semester } = c.req.valid("query");
  const studentId = c.var.user.userId;

  if (!studentId) {
    return c.json({ message: "Unauthorized" }, HttpStatusCodes.UNAUTHORIZED);
  }

  const courses = await courseService.getStudentRegisteredCourses(
    studentId,
    academicYearId,
    semester
  );

  return c.json(courses, HttpStatusCodes.OK);
};

export const getRegisteredAcademicYears: AppRouteHandler<
  routes.GetRegisteredAcademicYearsRoute
> = async (c) => {
  const studentId = c.var.user.userId;

  if (!studentId) {
    return c.json({ message: "Unauthorized" }, HttpStatusCodes.UNAUTHORIZED);
  }

  const academicYears = await academicService.getStudentRegisteredAcademicYears(studentId);

  return c.json(academicYears, HttpStatusCodes.OK);
};

// Application handlers
export const createApplication: AppRouteHandler<routes.CreateApplicationRoute> = async (c) => {
  let newApplicationData = c.req.valid("json");
  // Should be there because of middleware
  let studentId = c.var.user.userId;

  const applicationId = await studentApplicationService.createApplication(
    studentId,
    newApplicationData
  );

  return c.json({ success: true, applicationId }, HttpStatusCodes.OK);
};

export const updateApplication: AppRouteHandler<routes.UpdateApplicationRoute> = async (c) => {
  let updatedApplicationData = c.req.valid("json");
  // Should be there because of middleware
  let studentId = c.var.user.userId;

  const application = await studentApplicationService.getApplicationByStudentId(studentId);

  if (!application) {
    return c.json({ message: "Application not found" }, HttpStatusCodes.NOT_FOUND);
  }

  if (application.status === "accepted") {
    return c.json({ message: "Application already accepted" }, HttpStatusCodes.FORBIDDEN);
  }

  if (application.status === "rejected") {
    return c.json({ message: "Application was rejected" }, HttpStatusCodes.FORBIDDEN);
  }

  await studentApplicationService.updateApplication(
    application.applicationId,
    updatedApplicationData
  );

  return c.json({ success: true, applicationId: application.applicationId }, HttpStatusCodes.OK);
};

export const saveApplicationAttachments: AppRouteHandler<
  routes.SaveApplicationAttachmentsRoute
> = async (c) => {
  const studentId = c.var.user.userId;
  const { applicationId } = c.req.valid("param");
  const attachments = c.req.valid("json").attachments;

  const isOwned = studentApplicationService.isOwned(applicationId, studentId);

  if (!isOwned) {
    return c.json({ message: "Cannot save this attachment" }, 403);
  }

  await studentApplicationService.saveApplicationAttachments({
    applicationId,
    attachments,
  });

  return c.json({ success: true, applicationId }, HttpStatusCodes.OK);
};

export const getApplication: AppRouteHandler<routes.GetApplicationRoute> = async (c) => {
  const studentId = c.var.user.userId;
  const application = await studentApplicationService.getApplicationByStudentId(studentId);

  if (!application) {
    return c.json({ message: "Application Not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json({ application }, HttpStatusCodes.OK);
};

export const deleteApplicationAttachment: AppRouteHandler<
  routes.DeleteApplicationAttachmentRoute
> = async (c) => {
  const studentId = c.var.user.userId;
  const { applicationId, attachmentId } = c.req.valid("param");

  const application = await studentApplicationService.getApplicationByStudentId(studentId);

  if (!application) {
    return c.json({ message: "Application not found" }, HttpStatusCodes.NOT_FOUND);
  }

  if (application.status === "accepted") {
    return c.json({ message: "Application already accepted" }, HttpStatusCodes.FORBIDDEN);
  }

  if (application.applicationId !== applicationId) {
    return c.json({ message: "Cannot delete this attachment" }, 403);
  }

  const attachment = await studentApplicationService.deleteApplicationAttachment(
    applicationId,
    attachmentId
  );

  try {
    await storageService.deleteFile(attachment.attachmentUrl);
  } catch (error) {
    console.error(error);
  }

  c.status(HttpStatusCodes.NO_CONTENT);

  return c.json({});
};

// Thesis handlers
export const checkThesisAvailability: AppRouteHandler<routes.CheckThesisAvailabilityRoute> = async (
  c
) => {
  const studentId = c.var.user.userId;

  try {
    const status = await thesisService.isThesisAvailable(studentId);

    if (status.available) {
      return c.json(status, HttpStatusCodes.OK);
    } else {
      return c.json(status, HttpStatusCodes.FORBIDDEN);
    }
  } catch (error) {
    console.error("Error checking thesis:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to check thesis";

    return c.json({ message: errorMessage }, HttpStatusCodes.NOT_FOUND);
  }
};

export const submitThesis: AppRouteHandler<routes.SubmitThesisRoute> = async (c) => {
  const studentId = c.var.user.userId;
  const { attachmentUrl, title } = c.req.valid("json");

  try {
    const thesis = await thesisService.submitThesis(studentId, title, attachmentUrl);
    return c.json(thesis, HttpStatusCodes.OK);
  } catch (error) {
    console.error("Error submitting thesis:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to submit thesis";

    return c.json({ message: errorMessage }, HttpStatusCodes.FORBIDDEN);
  }
};

export const getThesis: AppRouteHandler<routes.GetThesisRoute> = async (c) => {
  const studentId = c.var.user.userId;

  const thesis = await thesisService.getThesis(studentId);

  if (!thesis) {
    return c.json({ message: "Thesis Not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(thesis, HttpStatusCodes.OK);
};

export const getStudentDetailsById: AppRouteHandler<routes.GetStudentDetailsById> = async (c) => {
  const studentId = c.req.valid("param")["id"];

  const student = await studentService.getStudentDetailsByStudentId(studentId);

  if (!student) {
    return c.json({ message: "Student not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(student, HttpStatusCodes.OK);
};

export const editStudentInfo: AppRouteHandler<routes.EditStudentInfoRoute> = async (c) => {
  const studentId = c.req.valid("param")["id"];

  if (!studentId) {
    return c.json({ message: "Unauthorized" }, HttpStatusCodes.UNAUTHORIZED);
  }

  const updatedData = c.req.valid("json");
  const success = await studentService.updateStudentInfo(studentId, updatedData);

  if (!success) {
    return c.json({ message: "Student not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json({ message: "Student info updated successfully" }, HttpStatusCodes.OK);
};
