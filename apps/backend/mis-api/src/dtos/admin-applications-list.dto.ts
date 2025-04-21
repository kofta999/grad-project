import { adminApplicationsList } from "@/db/schema";
import { z } from "@hono/zod-openapi";
import { createSelectSchema } from "drizzle-zod";

export const AdminApplicationsListSchema = z.array(createSelectSchema(adminApplicationsList));

export type AdminApplicationsListDTO = z.infer<typeof AdminApplicationsListSchema>;
