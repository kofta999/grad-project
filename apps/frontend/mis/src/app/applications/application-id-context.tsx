"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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
  const [applicationId, setApplicationId] = useState<number | null>(null);

  return (
    <ApplicationIdContext.Provider value={{ applicationId, setApplicationId }}>
      {children}
    </ApplicationIdContext.Provider>
  );
};
