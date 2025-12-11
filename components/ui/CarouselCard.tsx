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
    <Carousel className={cn("w-full max-w-md mx-auto", className)}>
      <CarouselContent className="py-4">
        {items.map((child, index) => (
          <CarouselItem key={index}>
            <div
              className={cn(
                "bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center text-center transition-all border border-neutral-200",
                "hover:shadow-xl hover:-translate-y-1",
                itemClassName
              )}
            >
              {child}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}
