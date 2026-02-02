"use client";

import { Card, CardContent } from "./ui/card";
import {
  MapPin,
  LandPlot as Golf,
  TreePine,
  Coffee,
  Utensils,
  Hotel,
  Star,
  Ticket,
  Wind,
} from "lucide-react";
import { motion } from "framer-motion";
import { GiChickenLeg, GiRunningShoe } from "react-icons/gi";

export default function VenuesGuide() {
  const venues = [
    {
      category: "Outdoor & Active",
      icon: "🌿",
      color: "border-primary/30",
      bgColor: "bg-primary/5",
      items: [
        {
          id: 1,
          title: "Practice Swings",
          location: "Southpoint Driving Range",
          description:
            "SouthPoint Driving Range, Promenade, Alabang, Muntinlupa",
          details:
            "Spacious outdoor driving range with professional-grade mats and clubs available for rent, ideal for golf practice",
          icon: Golf,
          imageColor: "bg-gradient-to-br from-primary/20 to-primary/5",
          imageUrl: "/venues/range.jpg",
          rotation: -2,
          highlight: false,
        },
        {
          id: 2,
          title: "Indoor Golf",
          location: "KGolf",
          description:
            "KGolf Alabang, G/F Unit 2&4, One Trium Tower, Filinvest Ave, Pacific Rim, Alabang, Muntinlupa",
          details:
            "State-of-the-art indoor golf simulator, perfect for a relaxed air-conditioned session",
          icon: Golf,
          imageColor: "bg-gradient-to-br from-primary/20 to-secondary/10",
          imageUrl: "/venues/kgolf.jpg",
          rotation: 1,
          highlight: false,
        },
        {
          id: 3,
          title: "Morning Runs & Walks",
          location: "Filinvest City",
          description:
            "Filinvest City Central Park, Filinvest City, Alabang, Muntinlupa",
          details:
            "Beautiful tree-lined avenues, wide roads, lots of greenery, and very safe which is perfect for morning exercise or evening strolls",
          icon: GiRunningShoe,
          imageColor: "bg-gradient-to-br from-secondary/20 to-primary/5",
          imageUrl: "/venues/filinvest.jpg",
          rotation: -1,
          highlight: false,
        },
      ],
    },
    {
      category: "Food & Coffee Spots",
      icon: "🍽️",
      color: "border-secondary/30",
      bgColor: "bg-secondary/5",
      items: [
        {
          id: 4,
          title: "Chicken Near Me - Alabang",
          location: "Our Own Chicken Shop!",
          description:
            "Chicken Near Me Alabang, 111, Civic Prime Building, Civic Dr., Muntinlupa ",
          details:
            "Yes, we own a chicken shop —no bones, all flavor! We commit to serving you crispy, juicy chicken packing with flavor with our homemade sauces",
          icon: GiChickenLeg,
          imageColor: "bg-gradient-to-br from-secondary/20 to-accent/10",
          imageUrl: "/venues/cnm.webp",
          highlight: true,
          rotation: 2,
        },
        {
          id: 5,
          title: "Westgate Alabang",
          location: "Lively Dining & Entertainment Hub",
          description: "Westgate Center, Filinvest Ave., Muntinlupa ",
          details:
            "A vibrant lifestyle center with plenty of dining options, bars, and casual hangout spots",
          icon: Coffee,
          imageColor: "bg-gradient-to-br from-accent/20 to-secondary/10",
          imageUrl: "/venues/westgate.jpg",
          rotation: -1,
          highlight: false,
        },
      ],
    },
    {
      category: "Where to Stay",
      icon: "🏨",
      color: "border-accent/30",
      bgColor: "bg-accent/5",
      items: [
        {
          id: 6,
          title: "Vivere Hotel",
          location: "Alabang",
          description:
            "Vivere Hotel, Filinvest City, 5102 Bridgeway Ave., Alabang, Muntinlupa ",
          details:
            "Our recommended hotel for comfort, convenience, and proximity to most venues",
          icon: Hotel,
          imageColor: "bg-gradient-to-br from-primary/20 to-accent/10",
          imageUrl: "/venues/vivere.jpg",
          rotation: 0,

          highlight: false,
        },
      ],
    },
  ];

  return (
    <section id="venues" className="py-16 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <MapPin className="h-6 w-6 md:h-10 md:w-10 text-primary" />
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground">
              Local Guide
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto md:text-nowrap">
            Our favorite spots in Alabang for your visit. Make the most of your
            time in the city!
          </p>
        </motion.div>

        <div className="space-y-16 max-w-6xl mx-auto">
          {venues.map((category, catIndex) => {
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.2 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-lg ${category.bgColor} border ${category.color}`}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
                      {category.category}
                    </div>
                    <div className="h-1 w-24 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full mt-2"></div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, itemIndex) => {
                    const ItemIcon = item.icon;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: itemIndex * 0.1 }}
                        className="relative h-full"
                      >
                        {/* Tape effect */}
                        <div className="tape-effect absolute inset-0 z-0"></div>

                        <Card
                          className={`${category.color} ${category.bgColor} border-2 shadow-lg hover:shadow-xl transition-all duration-300 h-full group overflow-hidden`}
                          style={{ transform: `rotate(${item.rotation}deg)` }}
                        >
                          <CardContent className="p-0 h-full flex flex-col">
                            <div
                              className={`relative h-40 ${item.imageColor} overflow-hidden`}
                            >
                              <div
                                className={`absolute inset-0 -z-50 flex flex-col items-center justify-center p-4 bg-cover bg-center`}
                                style={{
                                  backgroundImage: item.imageUrl
                                    ? `url(${item.imageUrl})`
                                    : "none",
                                }}
                              ></div>
                            </div>

                            {item.highlight && (
                              <div className="absolute top-3 left-3">
                                <div className="flex items-center gap-1 px-2 py-1 bg-background/20 backdrop-blur-sm rounded-full">
                                  <Ticket className="h-3 w-3 text-background" />
                                  <span className="text-xs font-medium text-background">
                                    Discount!
                                  </span>
                                </div>
                              </div>
                            )}

                            <div className="p-6 flex-1 flex flex-col">
                              <div className="mb-4">
                                <h3 className="text-xl font-serif font-semibold text-foreground mb-2 flex items-center gap-2">
                                  <div
                                    className={`p-1 rounded gap-4
                                        bg-primary/10`}
                                  >
                                    <ItemIcon className="h-6 w-6 text-primary" />
                                  </div>
                                  {item.title}
                                </h3>
                                <p className="text-foreground/80 text-sm mb-3">
                                  {item.description}
                                </p>
                                <p className="text-foreground/70 text-xs italic">
                                  {item.details}
                                </p>
                              </div>

                              {/* Special note for chicken shop */}
                              {item.highlight && (
                                <div className="mt-4 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                                  <p className="text-sm font-medium text-secondary text-center">
                                    Simply show your wedding invitation to enjoy
                                    a special discount from us!
                                  </p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
