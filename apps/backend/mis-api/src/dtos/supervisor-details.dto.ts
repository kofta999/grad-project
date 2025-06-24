import { supervisors } from "@/db/schema";
import { z } from "@hono/zod-openapi";
import { createSelectSchema } from "drizzle-zod";

export const SupervisorDetailsSchema = createSelectSchema(supervisors);

export type SupervisorDetailsDTO = z.infer<typeof SupervisorDetailsSchema>;
