import { Sparkles } from "lucide-react";
import Image from "next/image";
import Countdown from "./countdown";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-40">
      {/* Background Image with Overlays */}
      <div className="absolute inset-0 z-0">
        {/* Background Image - Use a wedding-themed image */}
        <div className="absolute inset-0 bg-cover bg-center blur-sm opacity-60 -mt-24">
          <video autoPlay loop muted src="/AJ.mp4" />
        </div>

        {/* Light Overlay on top for subtle film effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white" />

        {/* Overall slight white overlay to soften */}
        <div className="absolute inset-0 bg-secondary/40" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
          <Sparkles className="h-4 w-4 text-white" />
          <span className="text-sm font-medium text-white">Save the Date</span>
        </div>

        <h1 className="text-5xl font-serif font-bold mb-6 text-white drop-shadow-lg">
          <span className="block text-9xl text-white/95 mb-2 drop-shadow-md font-dancing">
            Anne & Jacob
          </span>
          June 20, 2026
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8 drop-shadow-md">
          Celebrate this once-in-a-lifetime moment with us.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Countdown />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/20 to-transparent" />
    </section>
  );
}
