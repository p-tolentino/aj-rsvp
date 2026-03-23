"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { motion } from "framer-motion";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date("June 20, 2026 07:30:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      <Card className="flex flex-col items-center justify-center w-full border-none shadow-none bg-transparent text-center">
        <CardHeader className="p-4 sm:p-6 md:p-8 lg:p-10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-6xl sm:text-7xl lg:text-9xl font-beautifully-delicious text-black text-center"
          >
            Counting down to our special day
          </motion.h2>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 md:p-8 bg-transparent w-full text-center max-w-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                key={unit}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-black">
                  {value.toString().padStart(2, "0")}
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-wider text-black/60 mt-1 sm:mt-2">
                  {unit}
                </div>
              </motion.div>
            ))}
          </div>
          {/* <p className="text-center text-black/70 mt-6 sm:mt-8 text-sm sm:text-base">
            Kindly confirm your attendance by{" "}
            <span className="font-bold text-black">April 20, 2026 </span>
            so we can prepare your seat with love and care.
          </p> */}
        </CardContent>
      </Card>
    </div>
  );
}
