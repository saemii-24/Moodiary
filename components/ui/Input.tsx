"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// variant: filled(회색 배경) | outline(테두리만, 흰 배경)
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  uiSize?: "sm" | "md" | "lg";
  variant?: "filled" | "outline";
  error?: string; // 에러 메시지 전달 시 aria-invalid 자동 설정 용도
}

const sizeClasses: Record<NonNullable<InputProps["uiSize"]>, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

const variantClasses: Record<NonNullable<InputProps["variant"]>, string> = {
  filled: "bg-gray-100  focus-visible:ring-mood-gray",
  outline: "bg-white border border-gray-300 focus-visible:ring-mood-gray",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      uiSize = "md",
      variant = "filled",
      error,
      ...props
    },
    ref
  ) => {
    const ariaInvalid = props["aria-invalid"] ?? (!!error || undefined);
    return (
      <div className={cn("w-full", className)}>
        <input
          type={type}
          ref={ref}
          aria-invalid={ariaInvalid}
          className={cn(
            "flex w-full rounded-md transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            "placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
            "aria-invalid:border-red-500 aria-invalid:focus-visible:ring-red-500",
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
);
Input.displayName = "Input";

export default Input;
