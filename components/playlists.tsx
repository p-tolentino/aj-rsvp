"use client";

import { Card, CardContent } from "./ui/card";
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
    <section className="mx-auto px-3 md:px-4 py-16 bg-[url(/bg-playlist-rsvp.png)] bg-cover bg-center w-full h-full">
      <div id="playlists" className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <h2 className="text-7xl md:text-[180px] leading-none font-beautifully-delicious text-black">
              Wedding Playlists
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {playlists1.map((playlist, index) => (
            <Card
              key={playlist.id}
              className="border-[#212122]/20 hover:border-[#212122]/40 transition-all duration-300 hover:shadow-lg overflow-hidden group bg-[#212122]"
            >
              <CardContent className="p-0">
                <div className="h-[380px] relative">
                  {!loadedIndexes.has(index) && (
                    <div className="absolute inset-0 bg-[#212122]-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#212122] mx-auto mb-2"></div>
                        <p className="text-sm text-white">
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
              className={`border-[#212122]/20 hover:border-[#212122]/40 transition-all duration-300 hover:shadow-lg overflow-hidden group bg-[#212122] ${
                index === 0 && "lg:col-start-2 lg:col-end-4"
              } ${index === 1 && "lg:col-start-4 lg:col-end-6"}`}
            >
              <CardContent className="p-0">
                <div className="h-[380px] relative">
                  {!loadedIndexes.has(index) && (
                    <div className="absolute inset-0 bg-[#212122]-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#212122] mx-auto mb-2"></div>
                        <p className="text-sm  text-white">
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
    </section>
  );
}
