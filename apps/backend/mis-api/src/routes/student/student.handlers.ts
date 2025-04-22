import { AppRouteHandler } from "@/lib/types";
import {
  EditStudentInfoRoute,
  GetApplicantRegisteredCourses,
  GetRegisteredAcademicYearsRoute,
  GetStudentDetailsRoute,
} from "./student.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { StudentService } from "@/services/student.service";
import { AcademicService } from "@/services/academic.service";
import { CourseService } from "@/services/course.service";

const studentService = new StudentService();
const academicService = new AcademicService();
const courseService = new CourseService();

export const getApplicantRegisteredCourses: AppRouteHandler<GetApplicantRegisteredCourses> = async (
  c
) => {
  const { academicYearId, semester } = c.req.valid("query");
  const studentId = c.var.session.get("id");

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

export const getRegisteredAcademicYears: AppRouteHandler<GetRegisteredAcademicYearsRoute> = async (
  c
) => {
  const studentId = c.var.session.get("id");

  if (!studentId) {
    return c.json({ message: "Unauthorized" }, HttpStatusCodes.UNAUTHORIZED);
  }

  const academicYears = await academicService.getStudentRegisteredAcademicYears(studentId);

  return c.json(academicYears, HttpStatusCodes.OK);
};

export const editStudentInfo: AppRouteHandler<EditStudentInfoRoute> = async (c) => {
  const studentId = c.var.session.get("id");

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

export const getStudentDetails: AppRouteHandler<GetStudentDetailsRoute> = async (c) => {
  const studentId = c.var.session.get("id");

  if (!studentId) {
    return c.json({ message: "Unauthorized" }, HttpStatusCodes.UNAUTHORIZED);
  }

  const student = await studentService.getStudentDetailsByStudentId(studentId);

  if (!student) {
    return c.json({ message: "Student not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(student, HttpStatusCodes.OK);
};
