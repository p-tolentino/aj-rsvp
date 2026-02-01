import React from "react";
import AdminDashboard from "./components/admin-dashboard";
import { createClient } from "@/lib/supabase/server";

export interface AdminProps {
  [key: string]: string;
}

const Admin: React.FC<AdminProps> = async ({}) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rsvps")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (
    <div className="">
      <AdminDashboard rsvps={data} />
    </div>
  );
};

export default Admin;
