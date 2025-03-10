import { apiClient } from "@/lib/client";
import { InferResponseType } from "@repo/mis-api";
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
  const maybeUser = localStorage.getItem("loggedInUser");
  let initialUser = null;
  try {
    initialUser = maybeUser ? JSON.parse(maybeUser) : null;
  } catch (error) {
    console.error(error);
  }

  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(
    initialUser,
  );

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
