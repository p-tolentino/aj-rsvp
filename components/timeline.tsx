"use client";

import Image from "next/image";
import { Separator } from "./ui/separator";
import { VenueRoutes } from "./ui/venue-routes";
import { useState } from "react";

const venueCoords: Record<number, [number, number]> = {
  0: [121.04212114746923, 14.434948], // Church
  1: [121.00865864876175, 14.370409907200182], // Reception
};

const timelineItems = [
  {
    time: "7:00 AM",
    title: "Sacrament of Matrimony",
    venue: "Sacred Heart of Jesus Parish, Don Jesus Blvd., Muntinlupa City",
    imageUrl: "/image-rings.png",
    description: "Wedding Ceremony",
    highlight: true,
    latlng: venueCoords[0],
  },
  {
    time: "10:30 AM",
    title: "Cocktail Hour",
    venue: "Brittany Palazzo, Daang Reyna, Almanza Dos, Las Piñas",
    imageUrl: "/image-cocktail.png",
    description: "Refreshments & Mingling",
    latlng: venueCoords[1],
  },
  {
    time: "11:30 AM",
    title: "Program & Celebrations",
    venue: "Brittany Palazzo, Daang Reyna, Almanza Dos, Las Piñas",
    imageUrl: "/image-dance.png",
    description: "Toasts, Special performances, surprises and games",
    latlng: venueCoords[1],
  },
];

export default function Timeline() {
  const [flyToTarget, setFlyToTarget] = useState<[number, number] | null>(null);

  return (
    <div id="timeline" className="flex flex-col items-center h-full">
      <div className="text-center px-4 sm:px-6 md:px-8 mb-8 sm:mb-12 md:mb-16">
        <h1 className="text-8xl md:text-9xl 2xl:text-[180px] drop-shadow-md font-beautifully-delicious">
          The Itinerary
        </h1>
      </div>
      <div className="flex flex-col items-center md:flex-row w-full justify-around px-10">
        {/* Itinerary */}
        <div className="max-w-4xl mx-auto mb-6 space-y-12 sm:space-y-16 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col w-full">
              {timelineItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setFlyToTarget(item.latlng)}
                  className="flex flex-col w-full group"
                >
                  {/* Timeline Item */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 md:gap-8 group-hover:scale-105 group-hover:cursor-pointer transition-all">
                    {/* Image */}
                    <div className="flex justify-center items-center flex-shrink-0">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          width={100}
                          height={100}
                          preload
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center sm:text-left">
                      {/* Program Title */}
                      <div className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
                        {item.time} | {item.title}
                      </div>
                      {/* Program Description */}
                      <div className="text-sm sm:text-base md:text-lg text-gray-600">
                        {item.venue}
                      </div>
                      {item.description && (
                        <div className="text-xs sm:text-sm text-gray-500 mt-1">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  {index !== timelineItems.length - 1 && (
                    <div className="flex justify-center sm:justify-start sm:ml-28 md:ml-32 my-4 sm:my-0">
                      <Separator
                        className="bg-black w-[1px] h-12 sm:h-16 md:h-20 lg:h-24 py-0"
                        orientation="vertical"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex items-center w-full md:w-1/2 bg-[#f5f5f5] rounded-lg shadow-lg">
          <div className="h-[300px] sm:h-[450px] md:h-[550px] p-6 w-full rounded-lg flex items-center justify-center">
            <VenueRoutes flyToTarget={flyToTarget} />
          </div>
        </div>
      </div>

      {/* Special Note */}
      <div className="text-center py-4 sm:py-6">
        <h4 className="text-7xl 2xl:text-9xl font-beautifully-delicious mb-4 sm:mb-6">
          A Special Note
        </h4>
        <p className="text-xl sm:text-2xl md:text-3xl italic px-4 sm:px-8 md:px-12">
          We&apos;d appreciate it if you could stay until the end of the program
          — we&apos;ve prepared a little something special for everyone who
          joined us.
        </p>
      </div>
    </div>
  );
}
