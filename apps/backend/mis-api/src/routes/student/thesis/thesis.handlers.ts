import { AppRouteHandler } from "@/lib/types";
import { CheckThesisAvailabilityRoute, SubmitThesisRoute } from "./thesis.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { ThesisService } from "@/services/thesis.service";

// Create an instance of the service
const thesisService = new ThesisService();

export const checkThesisAvailability: AppRouteHandler<CheckThesisAvailabilityRoute> = async (c) => {
  // Must be there because of the middleware
  const studentId = c.var.session.get("id")!;

  try {
    const status = await thesisService.isThesisAvailable(studentId);

    if (status.available) {
      return c.json(status, HttpStatusCodes.OK);
    } else {
      return c.json(status, HttpStatusCodes.FORBIDDEN);
    }
  } catch (error) {
    console.error("Error checking thesis:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to check thesis";

    return c.json({ message: errorMessage }, HttpStatusCodes.NOT_FOUND);
  }
};

export const submitThesis: AppRouteHandler<SubmitThesisRoute> = async (c) => {
  // Must be there because of the middleware
  const studentId = c.var.session.get("id")!;
  const { attachmentUrl, title } = c.req.valid("json");

  try {
    await thesisService.submitThesis(studentId, title, attachmentUrl);
    return c.json({}, HttpStatusCodes.OK);
  } catch (error) {
    console.error("Error submitting thesis:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to submit thesis";

    return c.json({ message: errorMessage }, HttpStatusCodes.FORBIDDEN);
  }
};
