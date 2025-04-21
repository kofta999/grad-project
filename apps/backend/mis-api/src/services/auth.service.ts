import db from "@/db";
import bcrypt from "bcryptjs";
import { students } from "@/db/schema";
import { LoginUserDTO } from "@/dtos/login-user.dto";
import { RegisterStudentDTO } from "@/dtos/register-student.dto";
import { ROLES } from "@/lib/constants";

export interface IAuthService {
  register(studentData: RegisterStudentDTO): Promise<number>;
  login(
    userCredentials: LoginUserDTO
  ): Promise<{ userId: number; role: (typeof ROLES)[number]; nameAr: string }>;
}

export class AuthService implements IAuthService {
  async register(studentData: RegisterStudentDTO): Promise<number> {
    studentData.hashedPassword = await bcrypt.hash(studentData.hashedPassword, 10);

    const newStudents = await db
      .insert(students)
      .values(studentData)
      .returning({ studentId: students.studentId });

    return newStudents[0].studentId;
  }

  async login({ email, password, role }: LoginUserDTO): Promise<any> {
    let user;
    let userId;

    if (role === "student") {
      user = await db.query.students.findFirst({
        where(fields, operators) {
          return operators.eq(fields.email, email);
        },
        columns: {
          studentId: true,
          fullNameAr: true,
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
          fullNameAr: true,
          hashedPassword: true,
        },
      });

      userId = user?.adminId;
    }

    if (user && (await bcrypt.compare(password, user.hashedPassword))) {
      return { userId, role, nameAr: user.fullNameAr };
    } else {
      return null;
    }
  }
}
