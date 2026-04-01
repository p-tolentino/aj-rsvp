export type GuestListEntry = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  full_name: string; // computed: first_name + last_name
  max_guests: number; // how many people this guest can RSVP for (including themselves)
  group_id?: string | null; // optional: for grouping related guests
};

export type RSVP = {
  id: string;
  created_at: string;
  guest_list_id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  attendance: "attending" | "not-attending";
  about_me?: string | null;
  message?: string | null;
  rsvp_for_guest_id?: string | null; // if RSVPing for someone else on the guest list
  submitted_by_guest_id: string | null;
  is_verified_guest: boolean; // true if name found on guest list
  group_id?: string;
};

export type InsertGuestListEntry = Omit<GuestListEntry, "id" | "created_at">;

export type InsertRSVP = Omit<RSVP, "id" | "created_at">;

// Form data types for the multi-step flow
export type Step1Data = {
  first_name: string;
  last_name: string;
};

export type Step2Data = {
  selected_guest_ids: string[]; // IDs of guests being RSVP'd for
};

export type Step3Data = {
  email: string;
  attendance: "attending" | "not-attending";
  message?: string;
};

export type CompleteRSVPData = Step1Data & Step2Data & Step3Data;
