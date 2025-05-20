import * as React from "react";
import { cn } from "@/lib/utils";

type SpacingWrapperProps = React.HTMLAttributes<HTMLDivElement>;

const SpacingWrapper = React.forwardRef<HTMLDivElement, SpacingWrapperProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-2 bg-gray-50 p-3 rounded-lg shadow-sm", className)}
        {...props}
      />
    );
  }
);

SpacingWrapper.displayName = "SpacingWrapper";

export { SpacingWrapper };
