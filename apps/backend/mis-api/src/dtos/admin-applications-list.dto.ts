import { adminApplicationsList } from "@/db/schema";
import { z } from "@hono/zod-openapi";
import { createSelectSchema } from "drizzle-zod";

export const AdminApplicationsListSchema = z.object({
  data: z.array(createSelectSchema(adminApplicationsList)),
  pagination: z.object({
    currentPage: z.number(),
    totalPages: z.number(),
    totalItems: z.number(),
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean(),
  }),
});

export type AdminApplicationsListDTO = z.infer<typeof AdminApplicationsListSchema>;
