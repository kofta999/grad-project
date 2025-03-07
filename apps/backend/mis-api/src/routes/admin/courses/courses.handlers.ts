import { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import db from "@/db";
import { sql } from "drizzle-orm";
import { GetAvailableCoursesRoute } from "./courses.routes";

export const getAvailableCoursesForApplication: AppRouteHandler<GetAvailableCoursesRoute> = async (c) => {
  const application_id = c.req.param("application_id");

  try {
    const courses = await db.execute(
      sql`SELECT * FROM available_courses_for_application(${application_id})`
    );

    return c.json(
      {courses: courses.rows},
      HttpStatusCodes.OK
    );
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Failed to fetch courses" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
