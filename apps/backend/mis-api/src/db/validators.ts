import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { students } from "./schema";
import { z } from "zod";

// Won't use drizzle magic here because it's not worth omitting all fields for only email and pass
export const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be 6 characters or more"),
});

export const registerSchema = createInsertSchema(students).omit({
  studentId: true,
  createdAt: true,
  updatedAt: true,
});
