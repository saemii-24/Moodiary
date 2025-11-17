import { cn } from "@/lib/utils";
import React from "react";

type TitleBaseProps = {
  className?: string;
  children: React.ReactNode;
};
const base = "font-semibold tracking-tight";
const Title = ({
  level = 1,
  children,
  className,
}: TitleBaseProps & { level?: 1 | 2 | 3 | 4 | 5 | 6 }) => {
  const Tag = `h${level}` as const;
  const sizeMap = {
    1: "text-3xl md:text-4xl",
    2: "text-2xl md:text-3xl",
    3: "text-xl md:text-2xl",
    4: "text-lg md:text-xl",
    5: "text-base md:text-lg",
    6: "text-sm md:text-base",
  } as const;
  return <Tag className={cn(base, sizeMap[level], className)}>{children}</Tag>;
};

export default Title;
