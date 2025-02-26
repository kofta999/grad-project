"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ApplicationIdContextType {
  applicationId: number | null;
  setApplicationId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ApplicationIdContext = createContext<
  ApplicationIdContextType | undefined
>(undefined);

export const useApplicationIdContext = () => {
  const context = useContext(ApplicationIdContext);
  if (!context) {
    throw new Error(
      "useApplicationIdContext must be used within an ApplicationIdProvider",
    );
  }
  return context;
};

export const ApplicationIdProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [applicationId, setApplicationId] = useState<number | null>(() => {
    // Initialize state from localStorage
    const storedId = localStorage.getItem("applicationId");
    return storedId ? JSON.parse(storedId) : null;
  });

  useEffect(() => {
    // Update localStorage whenever applicationId changes
    if (applicationId !== null) {
      localStorage.setItem("applicationId", JSON.stringify(applicationId));
    } else {
      localStorage.removeItem("applicationId");
    }
  }, [applicationId]);

  return (
    <ApplicationIdContext.Provider value={{ applicationId, setApplicationId }}>
      {children}
    </ApplicationIdContext.Provider>
  );
};
