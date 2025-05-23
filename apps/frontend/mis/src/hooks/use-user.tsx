import { apiClient } from "@/lib/client";
import React, { useEffect, useState } from "react";

export default function useUser() {
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
    setApplicationData(data.application);
    return data;
  };

  useEffect(() => {
    getUserPersonalData();
    getUserApplicationData();
  }, []);

  return {
    personalData,
    applicationData,
  };
}
