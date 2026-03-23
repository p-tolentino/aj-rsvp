"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "./ui/separator";
import { ColorSwatch } from "./color-swatch";

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

export default function Attire() {
  return (
    <TooltipProvider>
      <section className="flex flex-col items-center w-full px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 lg:py-20 bg-[url(/bg-attire.png)] bg-cover bg-center">
        <span id="attire" />

        {/* Title Section */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 mt-8 sm:mt-12 md:mt-16 mb-6 sm:mb-8 md:mb-10 w-full max-w-7xl mx-auto justify-center items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-8xl xl:text-[180px] text-center lg:text-left font-beautifully-delicious text-black leading-tight"
          >
            Wedding Attire
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-center lg:text-left max-w-xl text-black"
          >
            We kindly invite our dear guests to come in formal attire — if
            it&apos;s comfortable and convenient. Please don&apos;t feel
            pressured; your presence and love are what truly make our
            celebration complete.
          </motion.p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-16 w-full max-w-7xl mx-auto">
          {/* Attire Details */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
              {/* Ladies */}
              <div className="flex flex-col gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-2">
                    Ladies
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl px-2">
                    Formal attire. Ladies in maxi to floor-length dresses are
                    warmly encouraged.
                  </p>
                </motion.div>
                <div className="flex justify-center">
                  <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
                    {colorReferences.ladies.map((colorRef, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <ColorSwatch key={index} {...colorRef} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <Separator className="bg-black bg-opacity-40" />

              {/* Gentlemen */}
              <div className="flex flex-col gap-4">
                <div className="text-center">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-2"
                  >
                    Gentlemen
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-base sm:text-lg md:text-xl"
                  >
                    Classic black suits with white long sleeves
                  </motion.p>
                </div>
                <div className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center"
                  >
                    {colorReferences.gentlemen.map((colorRef, index) => (
                      <ColorSwatch key={index} {...colorRef} />
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px]">
              <Image
                src="/image-attire.png"
                alt="attire"
                preload
                height={1000}
                width={1000}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
