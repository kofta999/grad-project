import db from "@/db";
import { applications, students } from "@/db/schema";
import { StudentDetailsDTO } from "@/dtos/student-details.dto";
import { eq } from "drizzle-orm";

export interface IStudentService {
  getStudentDetailsByStudentId(studentId: number): Promise<StudentDetailsDTO | null>;
  getStudentDetailsByApplicationId(
    applicationId: number
  ): Promise<(StudentDetailsDTO & { createdAt: string }) | null>;
  updateStudentInfo(studentId: number, data: Partial<StudentDetailsDTO>): Promise<boolean>;
}

export class StudentService implements IStudentService {
  async getStudentDetailsByStudentId(studentId: number): Promise<StudentDetailsDTO | null> {
    const student = await db.query.students.findFirst({
      where: (f, { eq }) => eq(f.studentId, studentId),
      columns: {
        hashedPassword: false,
        secQuestion: false,
        secAnswer: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!student) {
      return null;
    }

    return student;
  }

  async updateStudentInfo(studentId: number, data: Partial<StudentDetailsDTO>): Promise<boolean> {
    const existingStudent = await db.query.students.findFirst({
      where(fields, operators) {
        return operators.eq(fields.studentId, studentId);
      },
      columns: { studentId: true },
    });

    if (!existingStudent) {
      return false;
    }

    await db.update(students).set(data).where(eq(students.studentId, studentId));
    return true;
  }

  async getStudentDetailsByApplicationId(
    applicationId: number
  ): Promise<(StudentDetailsDTO & { createdAt: string }) | null> {
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
