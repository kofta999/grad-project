export function formatAcademicYear(year: {
  startDate: string;
  endDate: string;
}) {
  return `${new Date(year.startDate).getFullYear()}-${new Date(year.endDate).getFullYear()}`;
}

export const removeApplicationId = ({ applicationId, ...rest }: any) => rest;
