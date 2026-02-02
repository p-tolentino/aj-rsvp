import { Card, CardContent } from "./ui/card";
import {
  Clock,
  Wine,
  Utensils,
  Music,
  Heart,
  Church,
  PartyPopper,
} from "lucide-react";

const timelineItems = [
  {
    time: "7:30 AM",
    title: "Church Ceremony",
    description:
      "Sacred Heart of Jesus Parish, Don Jesus Blvd., Muntinlupa City",
    icon: Church,
    note: "Sacrament of Matrimony",
    highlight: true,
  },
  {
    time: "10:30 AM",
    title: "Cocktail Hour",
    description: "Brittany Palazzo, Daang Reyna, Almanza Dos, Las Piñas",
    icon: Wine,
    note: "Refreshments & Mingling",
  },
  {
    time: "12:00 NN",
    title: "Reception",
    description: "Brittany Palazzo, Daang Reyna, Almanza Dos, Las Piñas",
    icon: Utensils,
    note: "Lunch",
  },
  {
    time: "12:30 PM",
    title: "Program & Celebrations",
    description: "Brittany Palazzo, Daang Reyna, Almanza Dos, Las Piñas",
    icon: PartyPopper,
    note: "Toasts, Special performances, surprises and games",
  },
];

export default function Timeline() {
  return (
    <div id="timeline" className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <Clock className="h-6 w-6 md:h-10 md:w-10 text-primary" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary">
            Wedding Day Timeline
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Follow along our celebration from ceremony to after party
        </p>
      </div>

      <Card className="border-primary/20 bg-white bg-opacity-20">
        <CardContent className="p-6 md:p-8">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20" />

            {timelineItems.map((item, index) => (
              <div
                key={index}
                className="relative pl-12 md:pl-16 pb-10 last:pb-0"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute ${
                    item.highlight
                      ? `left-[9px] md:left-[13px]`
                      : `left-[13px] md:left-[17px]`
                  } top-0`}
                >
                  <div
                    className={`relative flex items-center justify-center ${
                      item.highlight
                        ? "w-8 h-8 md:w-10 md:h-10"
                        : "w-6 h-6 md:w-8 md:h-8"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 rounded-full ${
                        item.highlight
                          ? "bg-primary/20 animate-pulse"
                          : "bg-primary/10"
                      }`}
                    />
                    <div
                      className={`relative rounded-full border-2 ${
                        item.highlight
                          ? "border-primary bg-primary w-4 h-4 md:w-5 md:h-5"
                          : "border-primary/50 bg-background w-3 h-3 md:w-4 md:h-4"
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Time */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`px-3 py-1 rounded-full ${
                        item.highlight
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-secondary/5 border border-secondary/10"
                      }`}
                    >
                      <span
                        className={`text-sm font-medium ${
                          item.highlight ? "text-primary" : "text-secondary"
                        }`}
                      >
                        {item.time}
                      </span>
                    </div>
                    {item.highlight && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        Main Event
                      </span>
                    )}
                  </div>

                  {/* Icon and Title */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        item.highlight
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary/5 text-secondary"
                      }`}
                    >
                      <item.icon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div>
                      <h3
                        className={`text-xl md:text-2xl font-serif font-semibold ${
                          item.highlight ? "text-primary" : "text-secondary"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        {item.description}
                      </p>
                      {item.note && (
                        <p className="text-sm text-primary/80 mt-2 flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {item.note}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Connector line (except for last item) */}
                  {index < timelineItems.length - 1 && (
                    <div className="pt-4">
                      <div className="h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-xl bg-secondary/5 border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-serif font-semibold text-secondary mb-2">
                  A Special Request
                </h4>
                <p className="text-secondary/80 italic">
                  We&apos;d appreciate it if you could stay until the end of the
                  program — we&apos;ve prepared a little something special for
                  everyone who joined us.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
