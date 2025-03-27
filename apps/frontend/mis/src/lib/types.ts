import { InferResponseType } from "@repo/mis-api";
import { apiClient } from "./client";

export type StudentType = Required<
  InferResponseType<(typeof apiClient.admin.applications)[":id"]["$get"], 200>
>["student"];

// Instead of re-creating the types, we can use this utility Type provided by Hono
// This returns the response of GET /student/applications route
// 200 is for the status code's response, and ["application"] because the response is like {application: {...}}
export type ApplicationType = InferResponseType<
  typeof apiClient.student.applications.$get,
  200
>["application"] &
  InferResponseType<
    (typeof apiClient.admin.applications)[":id"]["$get"],
    200
  >["application"];
