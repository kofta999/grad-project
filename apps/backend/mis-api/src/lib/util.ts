import { GradeType } from "./types";

export function formatAcademicYear(year: { startDate: string; endDate: string }) {
  return `${new Date(year.startDate).getFullYear()}-${new Date(year.endDate).getFullYear()}`;
}

export const removeApplicationId = <T extends { applicationId: unknown }>({
  applicationId,
  ...rest
}: T) => rest;

export function convertDegreeToGrade(degree: number): GradeType {
  const gradeScale: Array<{ min: number; grade: GradeType }> = [
    { min: 97, grade: "A+" },
    { min: 93, grade: "A" },
    { min: 89, grade: "A-" },
    { min: 84, grade: "B+" },
    { min: 80, grade: "B" },
    { min: 76, grade: "B-" },
    { min: 73, grade: "C+" },
    { min: 70, grade: "C" },
    { min: 67, grade: "C-" },
    { min: 64, grade: "D+" },
    { min: 60, grade: "D" },
    { min: 0, grade: "F" },
  ];

  for (const { min, grade } of gradeScale) {
    if (degree >= min) {
      return grade;
    }
  }

  return "F"; // Fallback
}
