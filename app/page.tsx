import Attire from "@/components/attire";
import Hero from "@/components/hero";
import PlaylistSection from "@/components/playlists";
import RSVPForm from "@/components/rsvp-form";
import MemoryScrapbook from "@/components/memories";
import Invitation from "@/components/invitation";
import Entourage from "@/components/entourage";
import Venues from "@/components/venues";
import FAQs from "@/components/faqs";
import LocalGuide from "@/components/local-guide";
import Registry from "@/components/registry";
import RSVPClosed from "@/components/rsvp-closed";

export default async function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <MemoryScrapbook />
      <Invitation />
      <Entourage />
      <Venues />
      <FAQs />
      <LocalGuide />
      <Attire />
      <Registry />
      <PlaylistSection />
      {process.env.NEXT_PUBLIC_RSVP_CLOSED === "true" ? (
        <RSVPClosed />
      ) : (
        <RSVPForm />
      )}
    </div>
  );
}
