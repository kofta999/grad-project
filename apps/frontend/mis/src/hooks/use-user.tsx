import { apiClient } from "@/lib/client";
import React, { useEffect, useState } from "react";
import { useUserContext } from "@/context/user-context";

export default function useUser() {
  const { loggedInUser } = useUserContext();
  const [personalData, setPersonalData] = useState<any>(null);
  const [applicationData, setApplicationData] = useState<any>(null);

  const getUserPersonalData = async () => {
    const res = await apiClient.students.me.$get();
    const data = await res.json();
    setPersonalData(data);
    return data;
  };

  const getUserApplicationData = async () => {
    const res = await apiClient.students.me.applications.$get();
    const data = await res.json();
    setApplicationData(data);
    return data;
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
