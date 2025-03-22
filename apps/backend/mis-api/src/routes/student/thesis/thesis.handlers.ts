import { AppRouteHandler } from "@/lib/types";
import { CheckThesisAvailabilityRoute } from "./thesis.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";
import db from "@/db";
import { sql } from "drizzle-orm";

export const checkThesisAvailability: AppRouteHandler<
  CheckThesisAvailabilityRoute
> = async (c) => {
  // Must be there because of the middleware
  const studentId = c.var.session.get("id")!;

  const application = await db.query.applications.findFirst({
    where(f, { eq }) {
      return eq(f.studentId, studentId);
    },
    columns: { applicationId: true },
  });

  if (!application) {
    return c.json(
      { message: "Application not found" },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  try {
    await db.execute(
      sql`SELECT 1 FROM is_thesis_available(${application.applicationId})`,
    );

    // Don't ask me why I did this, it needs that `as` for it to work
    return c.json({ available: true as true }, HttpStatusCodes.OK);
  } catch (error) {
    console.error("Error checking thesis:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to check thesis";

    return c.json(
      { available: false as false, reason: errorMessage },
      HttpStatusCodes.FORBIDDEN,
    );
  }
};
