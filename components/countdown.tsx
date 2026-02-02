"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";

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
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-serif font-semibold mb-8 text-center text-background">
        Counting Down to Our Special Day
      </h2>
      <Card className="border-primary/20 bg-white/60">
        <CardContent className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary">
                  {value.toString().padStart(2, "0")}
                </div>
                <div className="text-sm uppercase tracking-wider text-secondary/60 mt-2">
                  {unit}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-secondary/70 mt-8">
            Kindly confirm your attendance by{" "}
            <span className="font-bold text-primary">March 20, 2026 </span>
            so we can prepare your seat with love and care.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
