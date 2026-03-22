"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Map,
  MapMarker,
  MarkerContent,
  MapRoute,
  MarkerLabel,
  MapControls,
  MarkerTooltip,
  MarkerPopup,
  MapRef,
} from "@/components/ui/map";
import { Loader2, Clock, Route, Navigation, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const start = {
  name: "Sacred Heart of Jesus Parish",
  label: "Church",
  category: "Wedding Ceremony",
  image: "/image-church.jpg",
  time: "07:00 AM - 10:30 AM",
  mapHref:
    "https://www.google.com/maps/dir//Sacred+Heart+of+Jesus+Parish,+Don+Jesus+Blvd,+Cupang,+Muntinlupa,+Metro+Manila/@14.4029305,121.0063707,14z/data=!4m9!4m8!1m0!1m5!1m1!1s0x3397d029b5a03d63:0x3255defb80fa4af5!2m2!1d121.0421069!2d14.4348041!3e2?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D",
  externalHref: "https://www.facebook.com/shjpmunti/",
  lng: 121.04212114746923,
  lat: 14.434948,
};

const stopA = {
  name: "Stop A",
  lng: 121.0452623462478,
  lat: 14.423363793276781,
};

const stopB = {
  name: "Stop B",
  lng: 121.03620176822562,
  lat: 14.423100495267565,
};

const stopC = {
  name: "Stop C",
  lng: 121.0099431313266,
  lat: 14.370000699876549,
};

const end = {
  name: "Brittany Palazzo",
  label: "Reception",
  category: "Celebrations",
  image: "/image-reception.jpg",
  time: "10:30 AM - 11:00 PM",
  mapHref:
    "https://www.google.com/maps/dir/Sacred+Heart+of+Jesus+Parish,+Don+Jesus+Blvd,+Cupang,+Muntinlupa,+Metro+Manila/Brittany+Palazzo,+Daang+Reyna,+Almanza+Dos,+Las+Piñas,+Metro+Manila/@14.4028863,120.9857705,13z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x3397d029b5a03d63:0x3255defb80fa4af5!2m2!1d121.0421069!2d14.4348041!1m5!1m1!1s0x3397d147bed25779:0xbdcaa3786692ff!2m2!1d121.0086585!2d14.3704009!3e2?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D",
  externalHref: "https://brittanypalazzo.com/",
  lng: 121.00865864876175,
  lat: 14.370409907200182,
};

interface RouteData {
  coordinates: [number, number][];
  duration: number; // seconds
  distance: number; // meters
}

interface VenueRoutesProps {
  flyToTarget?: [number, number] | null;
}

function formatDuration(seconds: number): string {
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours}h ${remainingMins}m`;
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

export function VenueRoutes({ flyToTarget }: VenueRoutesProps) {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (!flyToTarget || !mapRef.current) return;
    mapRef.current.flyTo({
      center: flyToTarget,
      zoom: 15,
      duration: 1000,
    });
  }, [flyToTarget]);

  useEffect(() => {
    async function fetchRoutes() {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${stopA.lng},${stopA.lat};${stopB.lng},${stopB.lat};${stopC.lng},${stopC.lat};${end.lng},${end.lat}?overview=full&geometries=geojson&alternatives=2`,
        );
        const data = await response.json();

        if (data.routes?.length > 0) {
          const routeData: RouteData[] = data.routes.map(
            (route: {
              geometry: { coordinates: [number, number][] };
              duration: number;
              distance: number;
            }) => ({
              coordinates: route.geometry.coordinates,
              duration: route.duration,
              distance: route.distance,
            }),
          );
          setRoutes(routeData);
        }
      } catch (error) {
        console.error("Failed to fetch routes:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRoutes();
  }, []);

  // Sort routes: non-selected first, selected last (renders on top)
  const sortedRoutes = routes
    .map((route, index) => ({ route, index }))
    .sort((a, b) => {
      if (a.index === selectedIndex) return 1;
      if (b.index === selectedIndex) return -1;
      return 0;
    });

  return (
    <div className="h-full w-full relative border rounded-lg">
      <Map
        center={[121.03122948776966, 14.400500754238415]}
        zoom={12}
        theme="light"
        ref={mapRef}
      >
        {sortedRoutes.map(({ route, index }) => {
          const isSelected = index === selectedIndex;
          return (
            <MapRoute
              key={index}
              coordinates={route.coordinates}
              color={isSelected ? "#383539" : "#94a3b8"}
              width={isSelected ? 6 : 5}
              opacity={isSelected ? 1 : 0.6}
              onClick={() => setSelectedIndex(index)}
            />
          );
        })}

        <MapMarker longitude={start.lng} latitude={start.lat}>
          <MarkerContent>
            <div className="size-5 rounded-full bg-[#383539] border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform" />
            <MarkerLabel position="top">{start.label}</MarkerLabel>
          </MarkerContent>
          <MarkerPopup className="p-0 w-62">
            <div className="relative h-32 overflow-hidden rounded-t-md">
              <Image
                fill
                src={start.image}
                alt={start.name}
                className="object-cover"
              />
            </div>
            <div className="space-y-2 p-3">
              <div>
                <span className="text-xs font-medium text-[#383539] uppercase tracking-wide">
                  {start.category}
                </span>
                <h3 className="font-semibold text-foreground leading-tight">
                  {start.name}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-[#383539]">
                <Clock className="size-3.5" />
                <span>{start.time}</span>
              </div>
              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  className="flex-1 h-8 bg-[#383539] text-white"
                >
                  <Link
                    href={start.mapHref}
                    target="_blank"
                    className="flex items-center"
                  >
                    <Navigation className="size-3.5 mr-1.5" />
                    Directions
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-[#383539] hover:text-white"
                >
                  <Link href={start.externalHref} target="_blank">
                    <ExternalLink className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </MarkerPopup>
        </MapMarker>

        <MapMarker longitude={end.lng} latitude={end.lat}>
          <MarkerContent>
            <MarkerContent>
              <div className="size-5 rounded-full bg-[#383539] border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform" />
              <MarkerLabel position="bottom">{end.label}</MarkerLabel>
            </MarkerContent>
            <MarkerPopup className="p-0 w-62">
              <div className="relative h-32 overflow-hidden rounded-t-md">
                <Image
                  fill
                  src={end.image}
                  alt={end.name}
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 p-3">
                <div>
                  <span className="text-xs font-medium text-[#383539] uppercase tracking-wide">
                    {end.category}
                  </span>
                  <h3 className="font-semibold text-foreground leading-tight">
                    {end.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[#383539]">
                  <Clock className="size-3.5" />
                  <span>{end.time}</span>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    className="flex-1 h-8 bg-[#383539] text-white"
                  >
                    <Link
                      href={end.mapHref}
                      target="_blank"
                      className="flex items-center"
                    >
                      <Navigation className="size-3.5 mr-1.5" />
                      Directions
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-[#383539] hover:text-white"
                  >
                    <Link href={end.externalHref} target="_blank">
                      <ExternalLink className="size-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </MarkerPopup>
          </MarkerContent>
        </MapMarker>
      </Map>

      {routes.length > 0 && (
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {routes.map((route, index) => {
            const isActive = index === selectedIndex;
            const isFastest = index === 0;
            return (
              <Button
                key={index}
                variant={isActive ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedIndex(index)}
                className={`justify-start gap-3 ${isActive ? "bg-[#383539]/50 text-white" : "bg-[#383539]/30 text-white"}`}
              >
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  <span className="font-medium">
                    {formatDuration(route.duration)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs opacity-80">
                  <Route className="size-3" />
                  {formatDistance(route.distance)}
                </div>
                {isFastest && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    Fastest
                  </span>
                )}
              </Button>
            );
          })}
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
