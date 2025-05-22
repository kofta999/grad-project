import env from "@/env";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import * as relations from "./relations";

const db = drizzle({
  connection: {
    connectionString: env.DATABASE_URL,
  },
  schema: { ...schema, ...relations },
});

export default db;
