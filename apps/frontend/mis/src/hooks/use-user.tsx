import { apiClient } from "@/lib/client";
import { InferResponseType } from "@repo/mis-api";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/user-context";

type PersonalStudentData = InferResponseType<typeof apiClient.students.me.$get, 200>;
type ApplicationData = InferResponseType<
  typeof apiClient.students.me.applications.$get,
  200
>["application"];

export default function useUser() {
  const [personalData, setPersonalData] = useState<PersonalStudentData | null>(null);
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const { loggedInUser } = useUserContext();

  const getUserPersonalData = async () => {
    const res = await apiClient.students.me.$get();
    if (res.ok) {
      const data = await res.json();
      setPersonalData(data);
      return data;
    } else {
      setPersonalData(null);
      return null;
    }
  };

  const getUserApplicationData = async () => {
    const res = await apiClient.students.me.applications.$get();
    if (res.ok) {
      const data = await res.json();
      setApplicationData(data.application);
      return data;
    } else {
      setApplicationData(null);
      return null;
    }
  };

  useEffect(() => {
    if (loggedInUser?.role === "student") {
      getUserPersonalData();
      getUserApplicationData();
    }
  }, []);

  return {
    personalData,
    applicationData,
  };
}
