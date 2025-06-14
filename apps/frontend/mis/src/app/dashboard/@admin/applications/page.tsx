"use client";
import { apiClient } from "@/lib/client";
import { useState } from "react";
import ApplicationsList from "@/components/application/application-list";
import { InferResponseType } from "@repo/mis-api";

type Application = InferResponseType<typeof apiClient.applications.$get>["data"][number];
type Pagination = InferResponseType<typeof apiClient.applications.$get>["pagination"];

type ApplicationsListType = {
  data: Application[];
  pagination: Pagination;
};

export default function Page() {
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

  const getApplicationsList = async (
    nameAr: string,
    page: number,
    status?: string,
    sortName?: string
  ) => {
    try {
      const res = await apiClient.applications.$get({
        query: {
          nameAr,
          page: page.toString(),
          status: status?.toString(),
          sortName: sortName?.toString(),
        },
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
