import { getServerApiClient } from "@/lib/client";
import ApplicationsList from "./_components/application-list";
import { notFound } from "next/navigation";

export default async function Page() {
  const apiClient = await getServerApiClient();
  const res = await apiClient.admin.applications.$get();
  console.log(res.status);

  if (!res.ok) {
    // TODO
    notFound();
  }

  const applicationsList = await res.json();

  return <ApplicationsList applicationsList={applicationsList} />;
}
