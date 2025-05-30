import React from "react";
import { cn } from "@/lib/utils";

export const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("max-w-5xl mx-auto py-14 xl:py-5 px-4", className)} {...props} />
  )
);
Container.displayName = "Container";

export const ContainerTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-2xl font-bold text-center", className)} {...props} />
));
ContainerTitle.displayName = "ContainerTitle";
