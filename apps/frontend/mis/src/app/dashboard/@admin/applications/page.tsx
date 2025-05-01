"use client";
import { apiClient } from "@/lib/client";
import { useState } from "react";
import ApplicationsList from "./_components/application-list";
import { InferResponseType } from "@repo/mis-api";

type Application = InferResponseType<typeof apiClient.applications.$get>["data"][number];
type Pagination = InferResponseType<typeof apiClient.applications.$get>["pagination"];

type ApplicationsListType = {
  data: Application[];
  pagination: Pagination;
};

export default function ApplicationsPage() {
  const [applicationsResponse, setApplicationsResponse] = useState<ApplicationsListType>({
    data: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  });

  const getApplicationsList = async (nameAr: string, page: number) => {
    try {
      const res = await apiClient.applications.$get({
        query: { nameAr, page: page.toString() },
      });

      if (res.status === 200) {
        const result: ApplicationsListType = await res.json();
        setApplicationsResponse(result);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  return (
    <ApplicationsList
      applicationsResponse={applicationsResponse}
      setApplicationsResponse={setApplicationsResponse}
      getApplicationsList={getApplicationsList}
    />
  );
}
