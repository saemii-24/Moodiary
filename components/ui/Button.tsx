"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-black/85",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
        ghost: "bg-transparent hover:bg-gray-100",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        link: "underline-offset-4 hover:underline text-black",
        moodPink: "bg-mood-pink text-black hover:brightness-95",
        moodPeach: "bg-mood-peach text-black hover:brightness-95",
        moodCream: "bg-mood-cream text-black hover:brightness-95",
        moodRed: "bg-mood-red text-white hover:brightness-95",
        moodCoral: "bg-mood-coral text-white hover:brightness-95",
        moodLight: "bg-mood-light text-black hover:brightness-95",
        kakao: "bg-[#FEE500] text-[#181600] hover:brightness-95",
        apple: "bg-black text-white hover:bg-black/80",
        email: "bg-white border border-gray-300 text-gray-900 hover:bg-gray-50",
      },
      size: {
        sm: "h-8 px-3 py-1 text-xs",
        md: "h-9 px-4",
        lg: "h-10 px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
