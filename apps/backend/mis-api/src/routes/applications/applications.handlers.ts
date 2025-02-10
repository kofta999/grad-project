import { AppRouteHandler } from "@/lib/types";
import { AcceptApplicationRoute } from "./applications.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import db from "@/db";
import { applications } from "@/db/schema";
import { eq } from "drizzle-orm";

export const acceptApplication: AppRouteHandler<
  AcceptApplicationRoute
> = async (c) => {
  const { applicationId } = c.req.valid("json");

  const maybeApplication = await db.query.applications.findFirst({
    where(fields, operators) {
      return operators.eq(fields.applicationId, applicationId);
    },
    columns: {
      isAdminAccepted: true,
    },
  });

  if (!maybeApplication) {
    return c.json(
      { message: "Application not found" },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  if (maybeApplication.isAdminAccepted === true) {
    return c.json(
      { message: "Application already accepted" },
      HttpStatusCodes.CONFLICT,
    );
  }

  await db
    .update(applications)
    .set({ isAdminAccepted: true })
    .where(eq(applications.applicationId, applicationId));

  return c.json({ message: "Application accepted" }, HttpStatusCodes.OK);
};
