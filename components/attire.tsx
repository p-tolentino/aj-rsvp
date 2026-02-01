import { Card, CardContent } from "./ui/card";
import { Shirt } from "lucide-react";
import { PiDress as Dress } from "react-icons/pi";

export default function Attire() {
  return (
    <div id="dresscode" className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-serif font-semibold mb-8 text-center text-secondary">
        Attire
      </h2>

      <Card className="border-primary/20 bg-card-subtle">
        <CardContent className="p-8">
          <p className="text-center text-muted-foreground mb-8">
            We kindly invite our dear guests to come in formal attire — if
            it&apos;s comfortable and convenient. <br />
            Please don&apos;t feel pressured; your presence and love are what
            truly make our celebration complete.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-secondary/20 bg-card-subtle">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <Dress className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-secondary">
                    For Ladies
                  </h3>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#7d9cb9]" />
                    <div className="w-3 h-3 rounded-full bg-[#1c2f4f]" />
                    <div className="w-3 h-3 rounded-full bg-[#020403]" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      Dusty to navy blue tones long or cocktail dresses
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 bg-card-subtle">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gray-50">
                    <Shirt className="h-5 w-5 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-secondary">
                    For Gentlemen
                  </h3>
                  <div className="w-3 h-3 rounded-full bg-[#020403]" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Black suits</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
