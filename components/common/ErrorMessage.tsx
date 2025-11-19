import { cn } from "@/lib/utils";
import React from "react";

const ErrorMessage = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn("text-mood-red text-sm mt-0.5", className)}>{children}</p>
  );
};

export default ErrorMessage;
