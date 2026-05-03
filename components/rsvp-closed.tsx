"use client";

import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";
import { CalendarX, Heart, Sparkles } from "lucide-react";
import Logo from "./logo";

export default function RSVPClosed() {
  return (
    <section className="flex flex-col items-center justify-center mx-auto px-4 pt-8 sm:pt-12 md:pt-16 overflow-hidden bg-[url(/bg-playlist-rsvp.png)] bg-cover bg-center w-full">
      <div id="rsvp" className="w-full max-w-7xl z-0">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 md:mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-8xl md:text-[180px] leading-none font-beautifully-delicious text-black px-4"
            >
              répondez s&apos;il vous plaît,
            </motion.h2>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-8 w-full px-4">
          {/* Closed Message Card */}
          <Card className="border-[#212122]/20 shadow-lg bg-card-subtle w-full max-w-2xl mx-auto">
            <CardContent className="p-6 sm:p-8 md:p-12 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center">
                    <CalendarX className="h-10 w-10 text-amber-600" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-[#212122]">
                    Hello!
                  </h3>

                  <p className="text-base sm:text-lg text-muted-foreground">
                    Our RSVP is now officially <strong>closed</strong> as we
                    have reached the deadline and are finalizing preparations
                    for the big day.
                  </p>

                  <p className="text-sm sm:text-base text-muted-foreground">
                    Please note that we can no longer make any adjustments to
                    the RSVP.
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-4 space-y-4">
                  <div className="flex items-start gap-3 text-left">
                    <Heart className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm sm:text-base text-gray-700">
                      <span className="font-semibold">
                        To those who have confirmed,
                      </span>{" "}
                      we can&apos;t wait to celebrate this special moment with
                      you.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 text-left">
                    <Sparkles className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm sm:text-base text-gray-700">
                      <span className="font-semibold">
                        To those who won&apos;t be able to join us,
                      </span>{" "}
                      please know that your love, prayers, and well wishes mean
                      so much to us.
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-amber-600 font-medium italic pt-4">
                  With love and gratitude 💛
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="w-screen">
        <Logo />
      </div>
    </section>
  );
}
