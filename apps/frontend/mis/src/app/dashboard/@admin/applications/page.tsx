"use client";
import { apiClient } from "@/lib/client";
import { useEffect, useState } from "react";
import ApplicationsList from "./_components/application-list";
import { InferResponseType } from "@repo/mis-api";

type ApplicationsListType = InferResponseType<typeof apiClient.applications.$get>;

export default function ApplicationsPage() {
  const [applicationsList, setApplicationsList] = useState<ApplicationsListType>([]);

  const getApplicationsList = async () => {
    try {
      const res = await apiClient.applications.$get();

      if (res.status === 200) {
        const applications = await res.json();
        setApplicationsList(applications);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getApplicationsList();
  }, []);

  return <ApplicationsList applicationsList={applicationsList} setApplicationsList={setApplicationsList} />;
}
