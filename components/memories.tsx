"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Heart, MapPin, Calendar, Camera } from "lucide-react";

const memories = [
  {
    id: 1,
    title: "First Coffee Date",
    location: "Alabang",
    date: "2018",
    description:
      "Where we first discovered our love for coffee... and each other",
    rotation: -2,
  },
  {
    id: 2,
    title: "Beach Sunset",
    location: "La Union",
    date: "2019",
    description: "Watching the sunset, dreaming of forever",
    rotation: 1,
  },
  {
    id: 3,
    title: "Home Adventures",
    location: "Our Place",
    date: "2020",
    description: "Finding joy in simple moments together",
    rotation: -1,
  },
  {
    id: 4,
    title: "The Proposal",
    location: "Tagaytay",
    date: "2023",
    description: "The beginning of forever",
    rotation: 2,
  },
];

export default function MemoryScrapbook() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Camera className="h-6 w-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
              Our <span className="handwritten text-primary">Memory Book</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pages from our story, collected over the years
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {memories.map((memory) => (
            <div
              key={memory.id}
              className="relative group"
              style={{ transform: `rotate(${memory.rotation}deg)` }}
            >
              {/* Tape effect */}
              <div className="tape-effect"></div>

              {/* Polaroid effect card */}
              <Card className="polaroid-effect hover:rotate-0 transition-transform duration-300 group-hover:shadow-2xl">
                <CardContent className="p-4 pt-6">
                  {/* Date */}
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      {memory.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                    {memory.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-secondary mb-3">
                    <MapPin className="h-3 w-3" />
                    {memory.location}
                  </div>

                  {/* Description */}
                  <p className="text-foreground/80 text-sm mb-4">
                    {memory.description}
                  </p>

                  {/* Photo placeholder with scrapbook colors */}
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded relative overflow-hidden border">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Heart className="h-10 w-10 text-primary/20" />
                    </div>
                    {/* Scrapbook corner */}
                    <div className="absolute top-2 right-2 w-8 h-8">
                      <div className="w-full h-full bg-gradient-to-bl from-transparent 50% to-white 50%"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Handwritten note */}
        <div className="max-w-2xl mx-auto mt-12 relative">
          <div className="tape-effect"></div>
          <div className="bg-white/95 p-6 rounded-xl border-2 border-primary/20 shadow-lg">
            <p className="text-center handwritten text-xl text-foreground">
              &quot;Every memory is a page in our story, and today we start a
              new chapter.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
