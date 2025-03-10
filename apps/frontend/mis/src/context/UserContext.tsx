"use client";
import { createContext, useContext, useEffect, useState } from "react";

type UserType = {
  name: string;
  role: "student" | "admin";
};

export type UserContextType = {
  loggedInUser: UserType | null;
  setLoggedInUser: (user: UserType | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(() => {
    // This only runs on the client, so it's safe to access localStorage here
    const maybeUser = localStorage.getItem("loggedInUser");
    if (maybeUser) {
      try {
        return JSON.parse(maybeUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [loggedInUser]);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
