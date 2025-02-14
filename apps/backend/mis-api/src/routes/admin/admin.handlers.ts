import db from "@/db";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { applications } from "@/db/schema";
import { AppRouteHandler } from "@/lib/types";
import { eq } from "drizzle-orm";
import { AcceptApplicationRoute } from "./admin.routes";

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
