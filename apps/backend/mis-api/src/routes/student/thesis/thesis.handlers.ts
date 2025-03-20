import { AppRouteHandler } from "@/lib/types";
import {
  CheckThesisAvailabilityRoute,
  SubmitThesisRoute,
} from "./thesis.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";
import db from "@/db";
import { sql } from "drizzle-orm";
import { attachments, theses } from "@/db/schema";

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

export const submitThesis: AppRouteHandler<SubmitThesisRoute> = async (c) => {
  // Must be there because of the middleware
  const studentId = c.var.session.get("id")!;
  const { attachmentUrl, title } = c.req.valid("json");

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
    const { applicationId } = application;
    const result = await db
      .insert(attachments)
      .values({ applicationId, type: "thesis", attachmentUrl })
      .returning();
    const attachment = result[0];

    await db
      .insert(theses)
      .values({ applicationId, title, attachmentId: attachment.attachmentId });

    return c.json({}, HttpStatusCodes.OK);
  } catch (error) {
    console.error("Error checking thesis:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to check thesis";

    return c.json({ message: errorMessage }, HttpStatusCodes.FORBIDDEN);
  }
};
