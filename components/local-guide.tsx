"use client";

import { Card, CardContent } from "./ui/card";
import {
  LandPlot as Golf,
  Coffee,
  Hotel,
  Ticket,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { GiChickenLeg, GiRunningShoe } from "react-icons/gi";

export default function LocalGuide() {
  const venues = [
    {
      category: "Outdoor & Active",
      color: "border-[#f5edd9]/30",
      bgColor: "bg-[#f5edd9]/80",
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
          href: "https://www.google.com/maps/dir//SouthPoint+Driving+Range,+Promenade,+Alabang,+Muntinlupa,+1781+Metro+Manila/@14.4143629,121.0307399,17z/data=!4m17!1m7!3m6!1s0x3397d04aed18b38f:0xe164a9d325b08ef3!2sSouthPoint+Driving+Range!8m2!3d14.4143578!4d121.0356108!16s%2Fg%2F1thl2z33!4m8!1m0!1m5!1m1!1s0x3397d04aed18b38f:0xe164a9d325b08ef3!2m2!1d121.0356108!2d14.4143578!3e0?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D",
          amenities: [],
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
          href: "https://www.google.com/maps/dir//KGolf+Alabang,+G%2FF+Unit+2%264,+One+Trium+Tower,+Filinvest+Ave,+Pacific+Rim,+Alabang,+Muntinlupa,+1780+Metro+Manila/@14.4143629,121.0307399,17z/data=!3m1!4b1!4m9!4m8!1m0!1m5!1m1!1s0x3397d10035d65b6b:0x96a89357d8752d5!2m2!1d121.0335178!2d14.4191625!3e0?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D",
          amenities: [],
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
          href: "https://www.google.com/maps/dir//Filinvest+City+Central+Park,+Central+Park,+Filinvest+City,+Alabang,+Muntinlupa,+Metro+Manila/@14.4143629,121.0307399,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x3397d1e62bc43ea1:0x89854f5d6f88f8f2!2m2!1d121.0353775!2d14.4169435!3e0?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D",
          amenities: [],
        },
      ],
    },
    {
      category: "Food & Coffee Spots",
      icon: "🍽️",
      color: "border-[#f5edd9]/30",
      bgColor: "bg-[#f5edd9]/80",
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
          href: "https://www.google.com/maps/dir//Chicken+Near+Me+-+Alabang,+111,+Building+Civic+Dr,+Muntinlupa,+1781+Metro+Manila/@14.4143629,121.0307399,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x3397d10037fcfd85:0xf692bea4405bef0d!2m2!1d121.0434925!2d14.4181073!3e0?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D",
          amenities: [],
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
          href: "https://www.google.com/maps/dir//Westgate+Center,+Filinvest+Ave,+City,+Muntinlupa,+1781+Metro+Manila/@14.4144136,121.0357382,16.75z/data=!4m9!4m8!1m0!1m5!1m1!1s0x3397d03343f23c69:0xfd1c591af0bda086!2m2!1d121.0339804!2d14.4216573!3e0?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D",
          amenities: [],
        },
      ],
    },
    {
      category: "Where to Stay",
      icon: "🏨",
      color: "border-[#f5edd9]/30",
      bgColor: "bg-[#f5edd9]/80",
      items: [
        {
          id: 6,
          title: "Vivere Hotel",
          location: "Alabang",
          description:
            "Vivere Hotel, Filinvest City, 5102 Bridgeway Ave., Alabang, Muntinlupa",
          details:
            "Our recommended hotel for comfort, convenience, and proximity to most venues",
          icon: Hotel,
          imageColor: "bg-gradient-to-br from-primary/20 to-accent/10",
          imageUrl: "/venues/vivere.jpg",
          amenities: [
            "Rooftop Pool (The Nest)",
            "Spa & Wellness Center",
            "Fitness Center",
            "24-hour Room Service",
            "Free WiFi",
          ],
          rotation: -2,
          highlight: false,
          href: "https://www.google.com/maps/dir//Vivere+Hotel,+Filinvest+City,+5102+Bridgeway+Ave,+Alabang,+Muntinlupa,+1781+Metro+Manila/@14.4144136,121.0357382,16.75z/data=!4m9!4m8!1m0!1m5!1m1!1s0x3397d0369f8ed3e7:0x92584a7829e912ab!2m2!1d121.0393331!2d14.4199724!3e0?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D",
        },
        {
          id: 7,
          title: "Acacia Hotel",
          location: "Alabang",
          description: "Commerce Avenue, Alabang",

          details:
            "Elegant hotel with modern Filipino hospitality and convenient location",
          icon: Hotel,
          imageColor: "bg-gradient-to-br from-secondary/20 to-primary/10",
          imageUrl: "/venues/acacia.jpg",
          amenities: [
            "Rooftop Pool",
            "Fitness Center",
            "Restaurant & Bar",
            "Free WiFi",
            "Free Parking",
          ],
          rotation: 1,
          highlight: false,
          href: "https://www.google.com/maps/dir//Acacia+Hotel+Manila,+5400+E+Asia+Dr,+Alabang,+Muntinlupa,+1781+Metro+Manila/@14.4144136,121.0357382,16.75z/data=!3m1!4b1!4m9!4m8!1m0!1m5!1m1!1s0x3397d03492e0f54b:0x25e6cc09b1497bc2!2m2!1d121.0352505!2d14.4206417!3e0?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D",
        },
        {
          id: 8,
          title: "Azumi Boutique Hotel",
          location: "Alabang",
          description: "Madrigal Business Park, Alabang",
          details:
            "Modern minimalist hotel perfect for the contemporary traveler",
          icon: Hotel,
          imageColor: "bg-gradient-to-br from-accent/20 to-secondary/10",
          imageUrl: "/venues/azumi.jpg",
          amenities: [
            "Rooftop 360 Bar",
            "Swimming Pool",
            "Fitness Center",
            "Co-working Space",
            "Free WiFi",
            "Free Parking",
          ],
          rotation: -1,
          highlight: false,
          href: "https://www.google.com/maps/dir//Azumi+Boutique+Hotel,+Alabang+Manila,+Phase+3,+2205+Market+Street,+Madrigal+Business+Park,+Alabang,+Muntinlupa,+1780+Metro+Manila/@14.4144136,121.0357382,16.75z/data=!4m9!4m8!1m0!1m5!1m1!1s0x3397d1cf26d95555:0xe9496ead8565b45c!2m2!1d121.0275872!2d14.4272306!3e0?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D",
        },
        {
          id: 9,
          title: "Hop Inn Hotel",
          location: "Alabang-Zapote Road, Las Piñas",
          description: "Alabang-Zapote Road, Las Piñas",
          details:
            "Budget-friendly hotel with clean, comfortable rooms and reliable service",
          icon: Hotel,
          imageColor: "bg-gradient-to-br from-primary/20 to-secondary/5",
          imageUrl: "/venues/hop-inn.jpg",
          amenities: [
            "24/7 Security",
            "Free High-Speed WiFi",
            "Air Conditioning",
            "Parking Available",
            "24-hour Front Desk",
          ],
          rotation: 2,
          highlight: false,
          href: "https://www.google.com/maps/dir//Hop+Inn+Hotel+Alabang,+Lot+2+Block+4+Phase+3,+Market+Street,+Madrigal+Business+Park,+New+Alabang+Village,+Muntinlupa,+1780+Metro+Manila/@14.4144136,121.0357382,16.75z/data=!4m9!4m8!1m0!1m5!1m1!1s0x3397d1d2070cdf53:0xe8f427f079f7d6b8!2m2!1d121.0282581!2d14.4280495!3e0?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D",
        },
      ],
    },
  ];

  const handleVenueClick = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-16 relative bg-[url(/bg-local-guide.png)] bg-cover bg-center overflow-hidden w-full h-full">
      <div id="local-spots" className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2">
            <h2 className="text-8xl md:text-[180px] leading-none font-beautifully-delicious text-foreground">
              Local Guide
            </h2>
          </div>
          <p className="text-lg md:text-xl text-muted-black max-w-2xl mx-auto md:text-nowrap">
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
                  <div>
                    <div className="text-6xl md:text-9xl font-beautifully-delicious text-foreground">
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
                        className="relative h-full group"
                      >
                        {/* Tape effect */}
                        <div className="tape-effect absolute inset-0 z-0"></div>

                        <Card
                          className={`${category.color} ${category.bgColor} border-2 shadow-lg hover:shadow-xl transition-all duration-300 h-full group overflow-hidden rounded-none cursor-pointer hover:scale-[1.02]`}
                          style={{ transform: `rotate(${item.rotation}deg)` }}
                          onClick={() => handleVenueClick(item.href)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleVenueClick(item.href);
                            }
                          }}
                          title="Show on Google Maps"
                        >
                          <CardContent className="p-0 h-full flex flex-col">
                            <div
                              className={`relative h-40 ${item.imageColor} overflow-hidden`}
                            >
                              <div
                                className={`absolute inset-0 ${item.imageColor} bg-cover bg-center transition-transform duration-300`}
                                style={{
                                  backgroundImage: item.imageUrl
                                    ? `url(${item.imageUrl})`
                                    : "none",
                                }}
                              ></div>
                            </div>

                            {item.highlight && (
                              <div className="absolute top-3 left-3">
                                <div className="flex items-center gap-1 px-2 py-1 bg-[#f5edd9]/20 backdrop-blur-sm rounded-full">
                                  <Ticket className="h-3 w-3 text-background" />
                                  <span className="text-xs font-medium text-background">
                                    Discount!
                                  </span>
                                </div>
                              </div>
                            )}

                            <div className="absolute inset-0 bg-black/0 group-hover:backdrop-blur-md transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <div className="bg-white/90 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg transform transition-all duration-300">
                                <ExternalLink className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium text-primary">
                                  Show on Google Maps
                                </span>
                              </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                              <div className="mb-4">
                                <h3 className="text-xl font-serif font-semibold text-foreground mb-2 flex items-center gap-2">
                                  <div className={`p-1 rounded gap-4`}>
                                    <ItemIcon className="h-6 w-6 text-[#b18a27]" />
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

                              {item.amenities.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-xs font-semibold text-foreground/70 mb-2">
                                    Amenities:
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {item.amenities.map((amenity, idx) => (
                                      <span
                                        key={idx}
                                        className="text-xs px-2 py-1 bg-white/50 rounded-full text-foreground/70"
                                      >
                                        {amenity}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Special note for chicken shop */}
                              {item.highlight && (
                                <div className="mt-4 p-3 bg-[#f5edd9]/10 rounded-lg border border-secondary/20">
                                  <p className="text-sm font-medium text-foreground text-center">
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
