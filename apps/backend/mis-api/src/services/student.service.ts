import db from "@/db";
import { applications, students } from "@/db/schema";
import { StudentDetailsDTO } from "@/dtos/student-details.dto";
import { UpdateStudentDTO } from "@/dtos/update-student.dto";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export interface IStudentService {
  getStudentDetailsByStudentId(studentId: number): Promise<StudentDetailsDTO | null>;
  getStudentDetailsByApplicationId(applicationId: number): Promise<StudentDetailsDTO | null>;
  updateStudentInfo(studentId: number, data: UpdateStudentDTO): Promise<boolean>;
}

export class StudentService implements IStudentService {
  async getStudentDetailsByStudentId(studentId: number): Promise<StudentDetailsDTO | null> {
    const student = await db.query.students.findFirst({
      where: (f, { eq }) => eq(f.studentId, studentId),
      columns: {
        hashedPassword: false,
        secQuestion: false,
        secAnswer: false,
        updatedAt: false,
      },
    });

    if (!student) {
      return null;
    }

    return student;
  }

  async updateStudentInfo(studentId: number, data: UpdateStudentDTO): Promise<boolean> {
    const existingStudent = await db.query.students.findFirst({
      where(fields, operators) {
        return operators.eq(fields.studentId, studentId);
      },
      columns: { studentId: true },
    });

    if (!existingStudent) {
      return false;
    }

    if (data.hashedPassword) {
      data.hashedPassword = await bcrypt.hash(data.hashedPassword, 10);
    }

    await db.update(students).set(data).where(eq(students.studentId, studentId));
    return true;
  }

  async getStudentDetailsByApplicationId(applicationId: number): Promise<StudentDetailsDTO | null> {
    const student = await db.query.students.findFirst({
      where: ({ studentId }, { eq }) =>
        eq(
          studentId,
          db
            .select({ studentId: applications.studentId })
            .from(applications)
            .where(eq(applications.applicationId, applicationId))
        ),
      columns: {
        hashedPassword: false,
        secQuestion: false,
        secAnswer: false,
        updatedAt: false,
      },
    });

    if (!student) {
      return null;
    }

    return student;
  }
}
