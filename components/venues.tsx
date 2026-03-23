"use client";

import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Timeline from "./timeline";

export default function Venues() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[url(/bg-venues-itinerary.png)] bg-cover bg-center overflow-hidden w-full">
      {/* Venues */}
      <div
        id="venues"
        className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32"
      >
        {/* Church */}
        <div className="relative w-full px-4 sm:px-6 md:px-8">
          {/* Background Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-start w-full"
          >
            <Image
              src="/image-church.png"
              alt="Church"
              height={1000}
              width={1000}
              preload
              className="w-full sm:w-4/5 md:w-3/5 lg:w-2/3 xl:w-3/5 h-auto object-cover rounded-lg"
            />
          </motion.div>

          {/* Heading - Positioned relative to image */}
          <div className="relative -rotate-6 md:mt-8 md:absolute xl:-translate-y-1/2 z-10 left-14 -top-14 sm:left-40 sm:-top-28 md:left-[550px] md:top-5 lg:left-[330px] lg:top-[310px] xl:left-[310px] xl:top-[440px] 2xl:left-[350px] 2xl:top-[540px] ">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-7xl sm:text-8xl xl:text-9xl 2xl:text-[180px] text-start drop-shadow-md font-beautifully-delicious"
            >
              <span className="block">A Celebration</span>
              <span className="block -mt-10 sm:-mt-12 md:-mt-12 xl:-mt-16 2xl:-mt-24">
                Of Sacrament
              </span>
            </motion.h1>
          </div>

          {/* Venue Details */}
          <div className="md:mt-10 lg:absolute lg:right-0 lg:bottom-0 lg:mb-8 lg:mr-8 xl:right-44 xl:bottom-32">
            <div className="flex flex-col items-start space-y-3 sm:space-y-4 bg-transparent backdrop-blur-sm p-4 sm:p-6 rounded-lg lg:backdrop-blur-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 sm:gap-3 md:gap-4"
              >
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#383539] flex-shrink-0" />
                <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                  Sacred Heart of Jesus, Don Jesus Blvd., Alabang Hills
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 sm:gap-3 md:gap-4"
              >
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#383539] flex-shrink-0" />
                <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                  7:00 AM
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Reception */}
        <div className="relative w-full px-4 sm:px-6 md:px-8">
          {/* Background Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-end w-full"
          >
            <Image
              src="/image-reception.png"
              alt="Reception"
              height={1000}
              width={1000}
              preload
              className="w-full sm:w-4/5 md:w-3/5 lg:w-2/3 xl:w-3/5 h-auto object-cover rounded-lg"
            />
          </motion.div>

          {/* Heading - Positioned relative to image */}
          <div className="relative md:mt-8 md:absolute xl:-translate-y-1/2 z-10 -top-16 left-8 sm:left-52 sm:-top-24 md:left-12 md:top-0 lg:left-[330px] lg:top-[310px] xl:left-[750px] xl:top-[420px] 2xl:left-[950px] 2xl:top-[540px]">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-7xl sm:text-8xl xl:text-9xl 2xl:text-[180px] text-start drop-shadow-md font-beautifully-delicious"
            >
              <span className="block">Gathering of</span>
              <span className="block -mt-8 sm:-mt-12 md:-mt-12 xl:-mt-16 2xl:-mt-20">
                family & friends
              </span>
            </motion.h1>
          </div>

          {/* Venue Details */}
          <div className="mt-6 sm:mt-8 md:mt-10 lg:absolute lg:left-0 lg:bottom-0 lg:mb-8 lg:ml-8 xl:left-60 xl:bottom-32">
            <div className="flex flex-col items-end space-y-3 sm:space-y-4 backdrop-blur-sm p-4 sm:p-6 rounded-lg bg-transparent lg:backdrop-blur-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 sm:gap-3 md:gap-4"
              >
                <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-right">
                  Brittany Palazzo, Daang Reyna, Las Piñas
                </span>
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#383539] flex-shrink-0" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 sm:gap-3 md:gap-4"
              >
                <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                  10:30 AM
                </span>
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#383539] flex-shrink-0" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary */}
      <div className="mt-16 sm:mt-20 md:mt-28 lg:mt-36 xl:mt-44 w-full">
        <Timeline />
      </div>
    </section>
  );
}
