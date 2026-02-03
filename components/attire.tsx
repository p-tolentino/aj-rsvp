"use client";

import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Shirt } from "lucide-react";
import { PiDress as Dress } from "react-icons/pi";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ColorSwatchProps {
  color: string;
  name: string;
  image: string;
  description?: string;
}

function ColorSwatch({ color, name, image, description }: ColorSwatchProps) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip delayDuration={100} open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <button
          onClick={() => setOpen(!open)}
          className="group flex flex-col items-center gap-2 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-2"
        >
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-full shadow- border-3 border-white dark:border-gray-800 transition-all duration-300 group-hover:shadow-2xl"
            style={{ backgroundColor: color }}
          />
          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
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

export default function Attire() {
  const colorReferences = {
    ladies: [
      {
        color: "#7d9cb9",
        name: "Dusty Blue",
        image: "/attire/dustyblue.webp",
      },
      {
        color: "#1c2f4f",
        name: "Navy Blue",
        image: "/attire/navyblue.webp",
      },
      {
        color: "#020403",
        name: "Black",
        image: "/attire/black.webp",
      },
    ],
    gentlemen: [
      {
        color: "#020403",
        name: "Black",
        image: "/attire/black.webp",
      },
    ],
  };

  return (
    <TooltipProvider>
      <section id="attire" className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-5">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-secondary">
            Attire
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            We kindly invite our dear guests to come in formal attire — if
            it&apos;s comfortable and convenient.
          </p>
          <p className="text-muted-foreground italic">
            Please don&apos;t feel pressured; your presence and love are what
            truly make our celebration complete.
          </p>
        </div>

        <Card className="border-0 overflow-hidden">
          <CardContent className="p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Ladies */}
              <Card className="border-secondary/20 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-900/50 dark:to-gray-800/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 inline-flex self-start">
                      <Dress className="h-7 w-7 text-blue-500 dark:text-blue-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-serif font-bold text-secondary mb-2">
                        Ladies
                      </h3>
                      <p className="text-muted-foreground">
                        Long or cocktail dresses
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-center gap-6 md:gap-8 flex-wrap">
                      {colorReferences.ladies.map((colorRef, index) => (
                        <ColorSwatch key={index} {...colorRef} />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gentlemen */}
              <Card className="border-secondary/20 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-900/50 dark:to-gray-800/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-gray-200 dark:bg-gray-800/20 inline-flex self-start">
                      <Shirt className="h-7 w-7 text-[#333333] dark:text-gray-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-serif font-bold text-secondary mb-2">
                        Gentlemen
                      </h3>
                      <p className="text-muted-foreground">
                        Classic black suits with white long sleeves
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-center">
                      {colorReferences.gentlemen.map((colorRef, index) => (
                        <ColorSwatch key={index} {...colorRef} />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </section>
    </TooltipProvider>
  );
}
