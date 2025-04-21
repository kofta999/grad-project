import db from "@/db";
import {
  applications,
  addresses,
  emergencyContacts,
  academicQualifications,
  registerations,
  attachments,
} from "@/db/schema";
import { CreateApplicationDTO } from "@/dtos/create-application.dto";
import { SaveAttachmentsDTO } from "@/dtos/save-attachment.dto";
import { ApplicationService } from "./application.service";

export interface IStudentApplicationService {
  createApplication(studentId: number, application: CreateApplicationDTO): Promise<number>;
  saveApplicationAttachments(attachments: SaveAttachmentsDTO): Promise<void>;
}

export class StudentApplicationService
  extends ApplicationService
  implements IStudentApplicationService
{
  async createApplication(
    studentId: number,
    {
      permanentAddress,
      currentAddress,
      qualification,
      emergencyContact,
      registration,
    }: CreateApplicationDTO
  ): Promise<number> {
    const newApplication = await db
      .insert(applications)
      .values({ studentId })
      .returning({ applicationId: applications.applicationId });

    const applicationId = newApplication[0].applicationId;

    await db.insert(addresses).values({ ...permanentAddress, applicationId, type: "permanent" });

    await db.insert(addresses).values({ ...currentAddress, applicationId, type: "current" });

    if (emergencyContact) {
      await db.insert(emergencyContacts).values({ ...emergencyContact, applicationId });
    }

    await db.insert(academicQualifications).values({ ...qualification, applicationId });

    await db.insert(registerations).values({ ...registration, applicationId });

    return applicationId;
  }

  async saveApplicationAttachments({
    applicationId,
    attachments: newAttachments,
  }: SaveAttachmentsDTO): Promise<void> {
    const promises = newAttachments.map((attachment) =>
      db.insert(attachments).values({ ...attachment, applicationId })
    );

    await Promise.all(promises);
  }
}
