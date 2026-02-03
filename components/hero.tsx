"use client";

import { Sparkles } from "lucide-react";
import Countdown from "./countdown";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-40 min-h-[90vh] md:min-h-[100vh]">
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/AJ.gif"
            alt="AJ Silver Monogram"
            preload
            unoptimized
            width={100}
            height={500}
            className="absolute w-full h-full object-cover blur-sm opacity-60 -mt-36 md:-mt-24"
          />
          <div
            className="absolute inset-0 z-10"
            onClick={(e) => e.preventDefault()}
            onTouchStart={(e) => e.preventDefault()}
            style={{ cursor: "default" }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white" />
        <div className="absolute inset-0 bg-secondary/40" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center ">
        <Link
          target="_blank"
          href="https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=NXZqdWZobzVyMTcwbDRobjJ0NGM5MHA1Y3UgcGhpbGlwbS50b2xlbnRpbm9AbQ&amp;tmsrc=philipm.tolentino%40gmail.com"
          className=""
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:scale-105 hover:bg-white/80 transition-all text-white hover:text-foreground">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Save the Date</span>
          </div>
        </Link>

        <h1 className="font-serif font-bold mb-6 text-white drop-shadow-lg">
          <span className="block text-5xl md:text-9xl text-white/95 mb-2 drop-shadow-md font-dancing">
            Anne & Jacob
          </span>
          <span className="block text-3xl md:text-5xl text-white/95 mb-2 drop-shadow-md font-dancing">
            June 20, 2026
          </span>
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8 drop-shadow-md">
          Celebrate this once-in-a-lifetime moment with us.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Countdown />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/20 to-transparent" />
    </section>
  );
}
