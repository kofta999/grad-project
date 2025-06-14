import type { ZodError } from "zod";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

const EnvSchema = z
  .object({
    NODE_ENV: z.string().default("development"),
    PORT: z.coerce.number().default(9999),
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
    CLIENT_URL: z.string().default("http://localhost:3002"),
    JWT_SECRET: z.string(),
  })
  .superRefine((input, ctx) => {
    if (input.NODE_ENV === "production" && !!input.DATABASE_AUTH_TOKEN) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: "string",
        received: "undefined",
        path: ["DATABASE_AUTH_TOKEN"],
        message: 'Must be set when NODE_ENV is "production"',
      });
    }
  });

export type env = z.infer<typeof EnvSchema>;

// eslint-disable-next-line import/no-mutable-exports, ts/no-redeclare
let env: env;

try {
  // eslint-disable-next-line node/prefer-global/process
  env = EnvSchema.parse(process.env);
} catch (e) {
  console.log(process.env);
  const error = e as ZodError;
  console.error("Invalid Env:");
  console.error(error.flatten().fieldErrors);
  // eslint-disable-next-line node/prefer-global/process
  process.exit(1);
}

export default env;
