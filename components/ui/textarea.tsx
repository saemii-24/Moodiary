"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  uiSize?: "sm" | "md" | "lg";
  variant?: "filled" | "outline";
  error?: string;
}

const sizeClasses: Record<NonNullable<TextareaProps["uiSize"]>, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-3 py-3 text-base",
  lg: "px-4 py-4 text-base md:text-lg",
};

const variantClasses: Record<NonNullable<TextareaProps["variant"]>, string> = {
  filled: "bg-gray-100 focus-visible:ring-mood-gray",
  outline: "bg-white border border-gray-300 focus-visible:ring-mood-gray",
};

function Textarea({
  className,
  uiSize = "md",
  variant = "filled",
  error,
  ...props
}: TextareaProps) {
  const ariaInvalid = props["aria-invalid"] ?? (!!error || undefined);
  return (
    <div className={cn("w-full", className)}>
      <textarea
        data-slot="textarea"
        aria-invalid={ariaInvalid}
        className={cn(
          // base
          "flex w-full rounded-md transition-colors shadow-xs outline-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-red-500 aria-invalid:focus-visible:ring-red-500",
          // prevent manual resize
          "resize-none",
          // size and variant
          sizeClasses[uiSize],
          variantClasses[variant]
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export { Textarea };
