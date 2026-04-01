import AdminDashboard from "./components/admin-dashboard";
import { createClient } from "@/lib/supabase/server";

const Admin = async () => {
  const supabase = await createClient();
  // Fetch RSVPs
  const { data: rsvps, error: rsvpError } = await supabase
    .from("rsvps")
    .select("*")
    .order("created_at", { ascending: false });

  if (rsvpError) throw rsvpError;

  // Fetch guest list
  const { data: guestList, error: guestError } = await supabase
    .from("guest_list")
    .select("*");

  if (guestError) throw guestError;

  return (
    <div className="bg-[url(/bg-hero.png)] bg-contain bg-center">
      <AdminDashboard rsvps={rsvps} guestList={guestList} />
    </div>
  );
};

export default Admin;
