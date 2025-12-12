"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface CarouselCardProps {
  items: React.ReactNode[]; // 슬라이드 목록
  className?: string;
  itemClassName?: string;
}

export default function CarouselCard({
  items,
  className,
  itemClassName,
}: CarouselCardProps) {
  return (
    <Carousel className={cn("w-full max-w-md mx-auto ", className)}>
      <CarouselContent className="py-4 h-full">
        {items.map((child, index) => (
          <CarouselItem key={index} className="basis-[80%] min-h-[10vh]">
            <div
              className={cn(
                "rounded-2xl p-6 flex h-full items-center justify-center  transition-all bg-gray-50",

                itemClassName
              )}
            >
              {child}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
