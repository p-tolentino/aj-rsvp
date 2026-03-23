"use client";

import { motion } from "framer-motion";
import Countdown from "./countdown";

import Image from "next/image";
import Logo from "./logo";

export default function Hero() {
  return (
    <section className="overflow-hidden min-h-[90vh] md:min-h-[100vh] bg-[url(/bg-hero.png)] bg-cover bg-center w-full flex flex-col pb-8">
      <Logo />

      <div
        id="story"
        className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-16"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col text-black text-7xl sm:text-9xl lg:text-[180px] lg:leading-none text-center font-beautifully-delicious"
        >
          <span>Two People met</span>
          <span className="-mt-9 ml-4 sm:-mt-16 sm:ml-6 lg:-mt-20 lg:ml-10 xl:-mt-24 xl:ml-10">
            in an event
          </span>
        </motion.h1>

        <div className="flex w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl items-center justify-between gap-4 sm:gap-6 md:gap-8 mb-6">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="text-lg sm:text-xl md:text-2xl font-medium"
          >
            SINCE
          </motion.span>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2 * 0.2 }}
            className="flex-1 flex justify-center"
          >
            <Image
              src="/image-hero.png"
              alt="sketch-couple"
              height={1000}
              width={1000}
              preload
              className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-60 h-full object-contain"
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 3 * 0.2 }}
            className="text-lg sm:text-xl md:text-2xl font-medium"
          >
            2021
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2 * 0.2 }}
          className="text-base sm:text-lg md:text-xl text-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-60 mb-6 sm:mb-8 w-full max-w-7xl mx-auto"
        >
          The room was filled with ambition, ideas, and voices that carried
          influence—but among all the invited speakers that day, Jacob and Anne
          stood unaware that their lives were about to quietly change. They were
          simply two professionals scheduled on the same program to give their
          speeches, exchanging polite glances and brief conversations in between
          sessions. Nothing about that moment seemed extraordinary—no grand
          music, no dramatic pause—just an ordinary event unfolding as expected.
          And yet, hidden within that simplicity was something neither of them
          could have predicted: that this seemingly routine encounter would
          become the beginning of a once-in-a-lifetime connection, the kind that
          doesn&apos;t just cross paths—but changes direction entirely.
        </motion.p>
      </div>

      <div className="flex flex-col gap-4 justify-center items-center px-4">
        <Countdown />
        {/* <div className="container relative z-10 mx-auto text-center">
          <Link
            target="_blank"
            href="https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=NXZqdWZobzVyMTcwbDRobjJ0NGM5MHA1Y3UgcGhpbGlwbS50b2xlbnRpbm9AbQ&amp;tmsrc=philipm.tolentino%40gmail.com"
            className="inline-block"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm border border-black/30 hover:scale-105 hover:bg-white/80 transition-all text-black hover:text-foreground">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm font-medium">
                Save the Date
              </span>
            </div>
          </Link>
        </div> */}
      </div>
    </section>
  );
}
