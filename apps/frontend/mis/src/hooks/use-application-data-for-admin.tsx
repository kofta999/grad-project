"use client";
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/client";
import { ApplicationType, StudentType } from "@/lib/types";

export default function useApplicationDataForAdmin(id: string) {
  const [application, setApplication] = useState<ApplicationType>();
  const [student, setStudent] = useState<StudentType>();

  const fetchData = async () => {
    const applicationRes = await apiClient.applications[":id"].$get({
      param: { id },
    });

    if (!applicationRes.ok) {
      throw new Error("Error fetching application");
    }

    const applicationData = await applicationRes.json();

    setApplication(applicationData);

    const studentId = applicationData?.studentId;
    const studentRes = await apiClient.students[":id"].$get({
      param: { id: studentId.toString() },
    });

    if (!studentRes.ok) {
      throw new Error("Error fetching student");
    }

    const studentData = await studentRes.json();

    setStudent(studentData);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return { application, student };
}
