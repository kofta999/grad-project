import { z } from "@hono/zod-openapi";

export const SaveAttachmentsSchema = z.object({
  applicationId: z.number(),
  attachments: z.array(
    z.object({
      type: z.string(),
      attachmentUrl: z.string(),
    })
  ),
});

export type SaveAttachmentsDTO = z.infer<typeof SaveAttachmentsSchema>;
