"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ColorSwatchProps {
  color: string;
  name: string;
  image: string;
  description?: string;
}

export function ColorSwatch({
  color,
  name,
  image,
  description,
}: ColorSwatchProps) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip delayDuration={100} open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <button
          onClick={() => setOpen(!open)}
          className="group flex flex-col items-center gap-2 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-2"
        >
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-full shadow- border-3 border-white dark:border-gray-800 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-white"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm font-medium  group-hover:text-foreground transition-colors whitespace-nowrap">
            {name}
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="p-0 bg-background border-border shadow-2xl w-64 md:w-72 max-w-[calc(100vw-2rem)]"
        sideOffset={10}
      >
        <div className="relative h-40 md:h-44 w-full">
          <Image
            src={image}
            alt={`${name} dress example`}
            fill
            preload
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 256px, 288px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-t-lg" />
          <div className="absolute top-3 left-3">
            <div
              className="w-8 h-8 rounded-full shadow-lg border-2 border-white"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>

        <div className="p-4">
          <h4 className="font-serif font-semibold text-lg mb-1">{name}</h4>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
