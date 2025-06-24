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

export const STATUS = {
  accepted: "مقبول",
  pending: "تحت المراجعة",
  rejected: "مرفوض",
};

export type StudentType = Required<
  InferResponseType<(typeof apiClient)["students"][":id"]["$get"], 200>
>;

export type ApplicationType = InferResponseType<
  (typeof apiClient.applications)[":id"]["$get"],
  200
>;

export type SubmitThesisResponse = InferResponseType<typeof apiClient.students.me.thesis.$post>;

export type ThesisResponse = InferResponseType<typeof apiClient.students.me.thesis.$get, 200>;
export type ThesisStatusResponse = InferResponseType<
  typeof apiClient.students.me.thesis.status.$get
>;


export type SubmitThesisRequest = {
  title: string;
  attachmentUrl: string;
  supervisorId: number; 
};

export type RegisterStep1Type = Yup.InferType<typeof RegisterStep1Schema>;
export type RegisterStep2Type = Yup.InferType<typeof RegisterStep2Schema>;
export type ApplicationStep1Type = Yup.InferType<typeof ApplicationStep1Schema>;
export type ApplicationStep2Type = Yup.InferType<typeof ApplicationStep2Schema>;
export type ApplicationStep3Type = Yup.InferType<typeof ApplicationStep3Schema>;

// reports
export type Report = {
  reportId: number;
  type: string;
  title: string;
  attachmentUrl: string;
};

export type ReportsResponse = Report[];

// supervisors
export interface Supervisor {
  supervisorId: number;
  name?: string; 
  fullNameAr: string;
  fullNameEn: string;
  email: string;
  imageUrl: string | null;
  isOutsider: boolean | null;
  createdAt: string;
  updatedAt?: string;
}

export interface SupervisorFormData {
  name: string;
  fullNameAr: string;
  fullNameEn: string;
  email: string;
  imageUrl: string | null;
  isOutsider: boolean;
}
