import { InferResponseType } from "@repo/mis-api";
import { apiClient } from "./client";
import * as Yup from "yup";
import {
  ApplicationStep1Schema,
  ApplicationStep2Schema,
  ApplicationStep3Schema,
  RegisterStep1Schema,
  RegisterStep2Schema,
} from "./schemas";

export type StudentType = Required<
  InferResponseType<(typeof apiClient)["students"][":id"]["$get"], 200>
>;

// Instead of re-creating the types, we can use this utility Type provided by Hono
// This returns the response of GET /student/applications route
// 200 is for the status code's response, and ["application"] because the response is like {application: {...}}
export type ApplicationType = InferResponseType<
  (typeof apiClient.applications)[":id"]["$get"],
  200
>;

//nour
// shared base
type ThesisCore = {
  thesisId: number;
  applicationId: number;
  title: string;
  attachmentUrl: string;
};

export type SubmitThesisResponse = InferResponseType<typeof apiClient.students.me.thesis.$post> & ThesisCore;
export type ThesisResponse = InferResponseType<typeof apiClient.students.me.thesis.$get> & ThesisCore;
export type ThesisStatusResponse = InferResponseType<typeof apiClient.students.me.thesis.status.$get> &  {
  available: boolean; 
  reason?: string; 
};

export type SubmitThesisRequest = {
  title: string;
  attachmentUrl: string;
};

  
export type RegisterStep1Type = Yup.InferType<typeof RegisterStep1Schema>;
export type RegisterStep2Type = Yup.InferType<typeof RegisterStep2Schema>;
export type ApplicationStep1Type = Yup.InferType<typeof ApplicationStep1Schema>;
export type ApplicationStep2Type = Yup.InferType<typeof ApplicationStep2Schema>;
export type ApplicationStep3Type = Yup.InferType<typeof ApplicationStep3Schema>;
