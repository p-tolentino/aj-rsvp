"use client";

import { motion } from "framer-motion";

export default function Registry() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[url(/bg-invitation-registry.png)] bg-cover bg-center overflow-hidden w-full">
      <div
        id="registry"
        className="relative flex items-center justify-center px-4 sm:px-6 md:px-8"
      >
        <div className="relative w-full max-w-lg mx-auto">
          {/* Sticky Note */}
          <div className="relative -rotate-3 transform transition-transform">
            {/* Note Background */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#FFF9E8] rounded-lg shadow-2xl p-8 sm:p-10 md:p-12 lg:p-16 border border-amber-200/50"
            >
              {/* Fold/tape effect */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-[#FFE8B5] rounded-b-lg shadow-sm"></div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-[#FFE0A0] rounded-b-lg"></div>

              {/* Subtle shadow line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-200/50 to-transparent"></div>

              {/* Content */}
              <div className="text-center space-y-4 sm:space-y-5 md:space-y-6">
                <h1 className="text-7xl sm:text-8xl md:text-[160px] md:leading-none drop-shadow-md font-beautifully-delicious text-[#212122]">
                  Registry
                </h1>
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl uppercase font-semibold text-[#212122]">
                  Your presence is the greatest gift of all.
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#212122]/80">
                    As we begin this new chapter of our lives, we feel truly
                    blessed with all that we have.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#212122]/80">
                    Your presence and prayers on our special day mean the world
                    to us. However, should you still wish to give a gift, a
                    small contribution toward our simple new beginning and
                    shared dreams would be deeply appreciated.
                  </p>
                </div>
              </div>

              {/* Decorative lines */}
              <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
