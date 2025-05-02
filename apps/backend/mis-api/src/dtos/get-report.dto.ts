import { z } from "@hono/zod-openapi";

export const GetReportSchema = z.object({
  reportId: z.number(),
  type: z.string(),
  title: z.string(),
  attachmentUrl: z.string(),
});

export type GetReportDTO = z.infer<typeof GetReportSchema>;