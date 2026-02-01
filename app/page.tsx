import Countdown from "@/components/countdown";
import Attire from "@/components/attire";
import Hero from "@/components/hero";
import PlaylistSection from "@/components/playlists";
import RSVPForm from "@/components/rsvp-form";
import Timeline from "@/components/timeline";
import { Card, CardContent } from "@/components/ui/card";
import { getRSVPStats } from "./actions";
import VenuesGuide from "@/components/venues";

export default async function Home() {
  const stats = await getRSVPStats();

  return (
    <div className="flex flex-col gap-16 pb-16">
      <Hero />

      <section className="container mx-auto px-4">
        <VenuesGuide />
      </section>

      <section className="container mx-auto px-4">
        <Timeline />
      </section>

      {/*<section className="container mx-auto px-3 md:px-4">
         <Entourage /> 
      </section>*/}

      <section className="container mx-auto px-4">
        <Attire />
      </section>

      <section className="container mx-auto px-4">
        <Card className="border-primary/20 bg-gradient-to-br from-accent/30 to-background">
          <CardContent className="pt-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-semibold mb-4 text-secondary">
                Wedding Gifts
              </h2>
              <p className="text-muted-foreground mb-6">
                As we begin this new chapter of our lives, we feel truly blessed
                with all that we have. Your presence and prayers on our special
                day mean the world to us. However, should you still wish to give
                a gift, a small contribution toward our simple new beginning and
                shared dreams would be deeply appreciated.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4" id="rsvp">
        <RSVPForm />
      </section>

      <section className="container mx-auto px-3 md:px-4">
        <PlaylistSection />
      </section>
    </div>
  );
}
