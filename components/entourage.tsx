"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    title: "Fathers",
    names: ["Mr. Rustico A. Sepillo", "Mr. Eugene R. Tolentino"],
  },
  {
    title: "Mothers",
    names: ["Mrs. Jessica B. Sepillo", "Mrs. Julieta M. Tolentino"],
  },
  {
    title: "The Groom’s Side",
    names: [
      "Ms. Justinne M. Tolentino",
      "Ms. Pauline M. Tolentino",
      "Mr. Philip M. Tolentino",
    ],
    description: "To stand with us in celebration",
  },
  {
    title: "The Bride’s Side",
    names: [
      "Mrs. Mary Joy B. Sepillo-Manahan",
      "& Mr. Jay Pascual C. Manahan",
      " ",
      "Mr. Gerard Emmanuel B. Sepillo",
      "& Mrs. Christine F. Onsay-Sepillo",
    ],
    description: "To stand with us in celebration",
  },
];

const sponsors = [
  {
    title: "Ninongs",
    names: [
      "Mr. Edison Abella",
      "Mr. Ericson B. Atanacio",
      "Mr. Orlan A. Calayag",
      "Mr. Jeffrey L. Cisneros",
      "Mr. Nell Anthony R. Deogracias",
      "Mr. Jeffrey Ian C. Dy",
      "Mr. Rogelio D. Gevero Jr.",
      "Mr. Ryan M. Halili",
      "Mr. Armando A. Jasul",
      "Mr. Gregorio A. Marasigan",
    ],
  },
  {
    title: "Ninangs",
    names: [
      "Mrs. Sarah Jane O. Abella",
      "Mrs. Abigail T. Atanacio",
      "Mrs. Babylyn C. Calayag",
      "Mrs. Jennifer R. Cisneros",
      "Mrs. Sandra T. Deogracias",
      "Mrs. Merriam P. Dy",
      "Mrs. Ma. Nerida P. Gevero",
      "Mrs. Betsie May C. Halili",
      "Mrs. Lorelie A. Jasul",
      "Mrs. Bella C. Marasigan",
    ],
  },
];

const entourage = [
  {
    title: "Men of Honor",
    names: ["Mr. Vince Edward L. Pintac", "Mr. Riel Alphonsus C. Malibiran"],
  },
  {
    title: "Groomsmen",
    names: [
      "Mr. Carl David B. Aligaya",
      "Mr. Ryan Vincent L. Ancajas",
      "Mr. Justin V. Cadavillo",
      "Mr. Earle M. Calantuan",
      "Mr. Aaron O. Estinar",
      "Mr. Christopher Jorge P. Francisco",
      "Mr. Gem Jahn B. Herrera",
      "Mr. Lanz P. Naguit",
      "Mr. Mateo E. Siron",
      "Mr. Miguel Iñigo S. Vargas",
    ],
  },
  {
    title: "Maids of Honor",
    names: ["Ms. Marjorie Joyce V. Diaz", "Ms. Angelica Monique S. Agbay"],
  },
  {
    title: "Bridesmaids",
    names: [
      "Ms. Fatima L. Almirañez",
      "Ms. Angellie Thea C. Carreon",
      "Ms. Kaizen Joy M. Cariaga",
      "Ms. Marra D. Clara",
      "Ms. Novie Laurice T. Gonzales",
      "Ms. Rei Jezreel N. Lavarias",
      "Ms. Ivy Marien C. Magpantay",
      "Ms. Patrisha Rae M. Pascual",
      "Ms. Trisha Mhay C. Romasanta",
      "Ms. Hannah Whraxelle D. Tandoc",
    ],
  },
];

const symbols = {
  light: ["Mr. Efren A. Atienza", "Mrs. Miguela S. Atienza"],
  veil: ["Mr. Rico A. Araño", "Mrs. Yolanda B. Araño"],
  cord: ["Mr. Junjun A. Manadan", "Mrs. Ghelou V. Manadan"],
  faith: "KL Brent O. Sepillo",
  treasure: "M Cline O. Sepillo",
  commitment: "John Zachary S. Manahan",
  joy: ["A Zeya O. Sepillo", "Abcd Feigh O. Sepillo"],
};

export default function Entourage() {
  return (
    <section className="py-8 sm:py-12 md:py-16 mx-auto px-4 sm:px-6 md:px-8 bg-[url(/bg-entourage.png)] bg-cover bg-center flex w-full justify-center items-center text-black">
      <div id="entourage" className="max-w-7xl w-full">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-beautifully-delicious text-black px-4"
            >
              The special people who make our celebration complete
            </motion.h2>
          </div>
        </div>

        <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16">
          {/* Our Pillars of Strength */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center mb-4 sm:mb-6"
            >
              <h3 className="text-md sm:text-2xl md:text-3xl font-serif font-semibold text-black mb-2">
                Our Pillars of Strength
              </h3>
              <div className="w-20 sm:w-24 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
            </motion.div>

            {/* Parents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-2 max-w-2xl mx-auto text-xs sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8`}
            >
              <div className="flex flex-col text-center justify-center">
                {pillars[0].names.map((name, idx) => (
                  <p key={idx} className="text-black/90">
                    {name}
                  </p>
                ))}
              </div>
              <div className="flex flex-col text-center justify-center">
                {pillars[1].names.map((name, idx) => (
                  <p key={idx} className="text-black/90">
                    {name}
                  </p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`grid gap-6 sm:gap-8 grid-cols-2 md:grid-cols-2 max-w-3xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl`}
            >
              {/* The Groom's Side */}
              <div>
                <div className="text-center mb-3 sm:mb-4">
                  <h4 className="text-md sm:text-xl md:text-2xl font-serif font-semibold text-black mb-2">
                    The Groom&apos;s Side
                  </h4>
                  <div className="w-16 sm:w-20 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
                </div>
                <div className="flex flex-col text-center justify-center text-xs sm:text-lg md:text-xl lg:text-2xl">
                  {pillars[2].names.map((name, idx) => (
                    <p key={idx} className="text-black/90">
                      {name}
                    </p>
                  ))}
                </div>
              </div>

              {/* The Bride's Side */}
              <div>
                <div className="text-center mb-3 sm:mb-4">
                  <h4 className="text-md sm:text-xl md:text-2xl font-serif font-semibold text-black mb-2">
                    The Bride&apos;s Side
                  </h4>
                  <div className="w-16 sm:w-20 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
                </div>
                <div className="flex flex-col text-center justify-center text-[11.2px] leading-none sm:text-lg md:text-xl lg:text-2xl">
                  {pillars[3].names.map((name, idx) => (
                    <div key={name}>
                      <p key={name} className="text-black/90">
                        {name}
                      </p>
                      {idx === 1 && <br />}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sponsors */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center mb-4 sm:mb-6"
            >
              <h3 className="text-md sm:text-2xl md:text-3xl font-serif font-semibold text-black mb-2">
                To Stand as Witnesses to Our Vows
              </h3>
              <div className="w-20 sm:w-24 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-2 max-w-2xl mx-auto text-xs sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8`}
            >
              {/* Ninongs */}
              <div className="flex flex-col text-center justify-center">
                {sponsors[0].names.map((name, idx) => (
                  <p key={idx} className="text-black/90">
                    {name}
                  </p>
                ))}
              </div>
              {/* Ninangs */}
              <div className="flex flex-col text-center justify-center">
                {sponsors[1].names.map((name, idx) => (
                  <p key={idx} className="text-black/90">
                    {name}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Entourage */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {/* Left Column */}
            <div className="flex flex-col space-y-8 sm:space-y-10 md:space-y-12">
              {/* Men of Honor */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-3 sm:mb-4"
                >
                  <h4 className="text-md sm:text-xl md:text-2xl font-serif font-semibold text-black mb-2">
                    Men of Honor
                  </h4>
                  <div className="w-16 sm:w-20 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-xs sm:text-lg md:text-xl lg:text-2xl"
                >
                  <div className="flex flex-col text-center justify-center">
                    {entourage[0].names.map((name, idx) => (
                      <p key={idx} className="text-black/90">
                        {name}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Groomsmen */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-3 sm:mb-4 md:mt-0"
                >
                  <h4 className="text-md sm:text-xl md:text-2xl font-serif font-semibold text-black mb-2">
                    Groomsmen
                  </h4>
                  <div className="w-16 sm:w-20 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-xs sm:text-lg md:text-xl lg:text-2xl"
                >
                  <div className="flex flex-col text-center justify-center">
                    {entourage[1].names.map((name, idx) => (
                      <p key={idx} className="text-black/90">
                        {name}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col space-y-8 sm:space-y-10 md:space-y-12">
              {/* Maids of Honor */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-center mb-3 sm:mb-4"
                >
                  <h4 className="text-md sm:text-xl md:text-2xl font-serif font-semibold text-black mb-2">
                    Maids of Honor
                  </h4>
                  <div className="w-16 sm:w-20 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-xs sm:text-lg md:text-xl lg:text-2xl"
                >
                  <div className="flex flex-col text-center justify-center">
                    {entourage[2].names.map((name, idx) => (
                      <p key={idx} className="text-black/90">
                        {name}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Bridesmaids */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-center mb-3 sm:mb-4"
                >
                  <h4 className="text-md sm:text-xl md:text-2xl font-serif font-semibold text-black mb-2">
                    Bridesmaids
                  </h4>
                  <div className="w-16 sm:w-20 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-xs sm:text-lg md:text-xl lg:text-2xl"
                >
                  <div className="flex flex-col text-center justify-center">
                    {entourage[3].names.map((name, idx) => (
                      <p key={idx} className="text-black/90">
                        {name}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* To Light Our Path of Life */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center mb-3 sm:mb-4"
            >
              <h4 className="text-md sm:text-xl md:text-2xl font-serif font-semibold text-black mb-2">
                To Light Our Path of Life
              </h4>
              <div className="w-16 sm:w-20 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xs sm:text-lg md:text-xl lg:text-2xl"
            >
              <div className="flex flex-col text-center justify-center">
                {symbols.light.map((name, idx) => (
                  <p key={idx} className="text-black/90">
                    {name}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Symbols - 2 Columns (MD) */}
          <div className="md:grid hidden md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {/* Left Column */}
            <div className="flex flex-col space-y-8 sm:space-y-10 md:space-y-12 items-center">
              {/* Veil */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-3 sm:mb-4 max-w-lg"
                >
                  <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-semibold text-black mb-2">
                    To enfold us with veil to protect our marriage in prayer and
                    support.
                  </h4>
                  <div className="w-16 sm:w-20 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-lg"
                >
                  <div className="flex flex-col text-center justify-center">
                    {symbols.veil.map((name, idx) => (
                      <p key={idx} className="text-black/90">
                        {name}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Faith */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-center mb-3 sm:mb-4 max-w-lg"
                >
                  <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-semibold text-black mb-2">
                    To Carry the Symbol of Faith
                  </h4>
                  <div className="w-16 sm:w-20 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-lg"
                >
                  <div className="flex flex-col text-center justify-center text-black/90">
                    {symbols.faith}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col space-y-8 sm:space-y-10 md:space-y-12 items-center">
              {/* Cord */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-center mb-3 sm:mb-4 max-w-lg"
                >
                  <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-semibold text-black mb-2">
                    To entwine us with Cord bound in unity and accountability.
                  </h4>
                  <div className="w-16 sm:w-20 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-lg"
                >
                  <div className="flex flex-col text-center justify-center">
                    {symbols.cord.map((name, idx) => (
                      <p key={idx} className="text-black/90">
                        {name}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Treasure */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-center mb-3 sm:mb-4 max-w-lg"
                >
                  <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-semibold text-black mb-2">
                    To Carry the Symbol of Treasure
                  </h4>
                  <div className="w-16 sm:w-20 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-lg"
                >
                  <div className="flex flex-col text-center justify-center text-black/90">
                    {symbols.treasure}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Symbols - 1 Column (SM) */}
          <div className="grid grid-cols-1 md:hidden gap-8 sm:gap-10 md:gap-12">
            {/* Left Column */}
            <div className="flex flex-col space-y-8 sm:space-y-10 md:space-y-12">
              {/* Veil */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-3 sm:mb-4"
                >
                  <h4 className="text-md sm:text-lg md:text-xl lg:text-2xl font-serif font-semibold text-black mb-2">
                    To enfold us with veil to protect our marriage in prayer and
                    support.
                  </h4>
                  <div className="w-16 sm:w-20 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-xs sm:text-lg md:text-xl lg:text-2xl"
                >
                  <div className="flex flex-col text-center justify-center">
                    {symbols.veil.map((name, idx) => (
                      <p key={idx} className="text-black/90">
                        {name}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Cord */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-center mb-3 sm:mb-4"
                >
                  <h4 className="text-md sm:text-lg md:text-xl lg:text-2xl font-serif font-semibold text-black mb-2">
                    To entwine us with Cord bound in unity and accountability.
                  </h4>
                  <div className="w-16 sm:w-20 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-xs sm:text-lg md:text-xl lg:text-2xl"
                >
                  <div className="flex flex-col text-center justify-center">
                    {symbols.cord.map((name, idx) => (
                      <p key={idx} className="text-black/90">
                        {name}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col space-y-8 sm:space-y-10 md:space-y-12">
              {/* Faith */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-center mb-3 sm:mb-4"
                >
                  <h4 className="text-md sm:text-lg md:text-xl lg:text-2xl font-serif font-semibold text-black mb-2">
                    To Carry the Symbol of Faith
                  </h4>
                  <div className="w-16 sm:w-20 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-xs sm:text-lg md:text-xl lg:text-2xl"
                >
                  <div className="flex flex-col text-center justify-center text-black/90">
                    {symbols.faith}
                  </div>
                </motion.div>
              </div>

              {/* Treasure */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-center mb-3 sm:mb-4"
                >
                  <h4 className="text-md sm:text-lg md:text-xl lg:text-2xl font-serif font-semibold text-black mb-2">
                    To Carry the Symbol of Treasure
                  </h4>
                  <div className="w-16 sm:w-20 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="text-xs sm:text-lg md:text-xl lg:text-2xl"
                >
                  <div className="flex flex-col text-center justify-center text-black/90">
                    {symbols.treasure}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* 1 Column - Commitment & Joy */}
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {/* Commitment */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center mb-3 sm:mb-4"
              >
                <h4 className="text-md sm:text-lg md:text-xl lg:text-2xl font-serif font-semibold text-black mb-2">
                  To Carry the Symbol of Lifelong Commitment.
                </h4>
                <div className="w-16 sm:w-20 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-xs sm:text-lg md:text-xl lg:text-2xl"
              >
                <div className="flex flex-col text-center justify-center text-black/90">
                  {symbols.commitment}
                </div>
              </motion.div>
            </div>

            {/* Joy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-center mb-3 sm:mb-4"
              >
                <h4 className="text-md sm:text-lg md:text-xl lg:text-2xl font-serif font-semibold text-black mb-2">
                  To Sprinkle Our Path With Joy
                </h4>
                <div className="w-16 sm:w-20 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-xs sm:text-lg md:text-xl lg:text-2xl"
              >
                <div className="flex flex-col text-center justify-center">
                  {symbols.joy.map((name, idx) => (
                    <p key={idx} className="text-black/90">
                      {name}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
