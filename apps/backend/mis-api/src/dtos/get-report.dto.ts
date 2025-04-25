import { z } from "@hono/zod-openapi";

export const GetReportSchema = z.object({
  reportId: z.number(),
  applicationId: z.number(),
  title: z.string(),
  attachmentUrl: z.string(),
});

export type GetReportDTO = z.infer<typeof GetReportSchema>;