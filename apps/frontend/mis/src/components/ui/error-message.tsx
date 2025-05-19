import * as React from "react";
import { cn } from "@/lib/utils";

type ErrorMessageProps = {
  message?: string;
  className?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  if (!message) return null;

  return <p className={cn("text-red-500 text-sm", className)}>{message}</p>;
};

export { ErrorMessage };
