"use client";

import { Card, CardContent } from "./ui/card";
import { Music2 } from "lucide-react";
import { useState } from "react";

const playlists = [
  {
    id: "ceremony",
    title: "Ceremony Processional",
    description: "Songs for walking down the aisle",
    url: "https://open.spotify.com/embed/playlist/37xB6PaLqiurR9krMMSBSd?utm_source=generator&theme=0",
  },
  {
    id: "cocktail",
    title: "Cocktail Hour",
    description: "Chill vibes for mingling",
    url: "https://open.spotify.com/embed/playlist/0mTxLY9BbTOHNPdNKnWsgQ?utm_source=generator&theme=0",
  },
  {
    id: "reception",
    title: "Reception Party",
    description: "Time to dance and celebrate",
    url: "https://open.spotify.com/embed/playlist/0TLGQYtq1FIJmp7k0cNKBG?utm_source=generator&theme=0",
  },
];

const playlists1 = [
  {
    id: "ceremony",
    title: "Ceremony Processional",
    description: "Songs for walking down the aisle",
    url: "https://open.spotify.com/embed/playlist/37xB6PaLqiurR9krMMSBSd?utm_source=generator&theme=0",
  },
  {
    id: "cocktail",
    title: "Cocktail Hour",
    description: "Chill vibes for mingling",
    url: "https://open.spotify.com/embed/playlist/0mTxLY9BbTOHNPdNKnWsgQ?utm_source=generator&theme=0",
  },
  {
    id: "reception",
    title: "Reception Party",
    description: "Time to dance and celebrate",
    url: "https://open.spotify.com/embed/playlist/0TLGQYtq1FIJmp7k0cNKBG?utm_source=generator&theme=0",
  },
];

const playlists2 = [
  {
    id: "romantic",
    title: "Romantic Dinner",
    description: "Love songs for dinner time",
    url: "https://open.spotify.com/embed/playlist/7fY7dZs860vluMTRtIOkZO?utm_source=generator&theme=0",
  },
  {
    id: "afterparty",
    title: "After Party",
    description: "Keep the celebration going",
    url: "https://open.spotify.com/embed/playlist/7cTVyShjaYEYlxiCCSTjLe?utm_source=generator&theme=0",
  },
];

export default function PlaylistSectionSimple() {
  const [loadedIndexes, setLoadedIndexes] = useState<Set<number>>(new Set());

  const handleIframeLoad = (index: number) => {
    setLoadedIndexes((prev) => new Set([...prev, index]));
  };

  return (
    <div id="playlists" className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <Music2 className="h-6 w-6 md:h-10 md:w-10 text-primary" />
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-secondary">
            Wedding Playlists
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Curated playlists for every moment of our special day
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {playlists1.map((playlist, index) => (
          <Card
            key={playlist.id}
            className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg overflow-hidden group"
          >
            <CardContent className="p-0">
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-sm font-medium text-primary mb-1">
                      {`0${index + 1}`}
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Music2 className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>

              <div className="h-[380px] relative">
                {!loadedIndexes.has(index) && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                      <p className="text-sm text-gray-500">
                        Loading playlist...
                      </p>
                    </div>
                  </div>
                )}
                <iframe
                  src={playlist.url}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="transition-transform duration-300"
                  title={playlist.title}
                  onLoad={() => handleIframeLoad(index)}
                  style={{
                    opacity: loadedIndexes.has(index) ? 1 : 0,
                    transition: "opacity 0.3s",
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 justify-center mt-10">
        {playlists2.map((playlist, index) => (
          <Card
            key={playlist.id}
            className={`border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg overflow-hidden group ${
              index === 0 && "lg:col-start-2 lg:col-end-4"
            } ${index === 1 && "lg:col-start-4 lg:col-end-6"}`}
          >
            <CardContent className="p-0">
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-sm font-medium text-primary mb-1">
                      {`0${index + 4}`}
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Music2 className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>

              <div className="h-[380px] relative">
                {!loadedIndexes.has(index) && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                      <p className="text-sm text-gray-500">
                        Loading playlist...
                      </p>
                    </div>
                  </div>
                )}
                <iframe
                  src={playlist.url}
                  width="100%"
                  height="100%"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="transition-transform duration-300"
                  title={playlist.title}
                  onLoad={() => handleIframeLoad(index)}
                  style={{
                    opacity: loadedIndexes.has(index) ? 1 : 0,
                    transition: "opacity 0.3s",
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
