"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { GuestListEntry, RSVP, InsertRSVP } from "@/lib/types";

type VerifyGuestResult = {
  verified: boolean;
  guest?: GuestListEntry;
  availableGuests?: GuestListEntry[];
  existingRSVPs?: string[]; // Array of guest_list_ids that already have RSVPs
  message?: string;
};

export async function verifyGuestName(
  firstName: string,
  lastName: string,
): Promise<VerifyGuestResult> {
  try {
    const supabase = await createClient();

    console.log(firstName, lastName);

    const { data: guest, error } = await supabase
      .from("guest_list")
      .select("*")
      .ilike("first_name", firstName.trim())
      .ilike("last_name", lastName.trim())
      .single();

    console.log(guest);

    if (error || !guest) {
      return {
        verified: false,
        message: "Guest not found on the list",
      };
    }

    let availableGuests: GuestListEntry[] = [guest];

    if (guest.max_guests > 1) {
      if (guest.group_id) {
        const { data: groupGuests } = await supabase
          .from("guest_list")
          .select("*")
          .eq("group_id", guest.group_id)
          .order("first_name");

        if (groupGuests && groupGuests.length > 0) {
          availableGuests = groupGuests;
        }
      } else {
        availableGuests = [guest];
      }
    }

    // Check which guests already have RSVPs
    const guestIds = availableGuests.map((g) => g.id);
    const { data: existingRSVPs } = await supabase
      .from("rsvps")
      .select("rsvp_for_guest_id")
      .in("rsvp_for_guest_id", guestIds)
      .not("rsvp_for_guest_id", "is", null);

    const existingRSVPIds =
      existingRSVPs?.map((r) => r.rsvp_for_guest_id) || [];

    console.log(guest, availableGuests, existingRSVPIds);

    return {
      verified: true,
      guest,
      availableGuests,
      existingRSVPs: existingRSVPIds,
    };
  } catch (error) {
    console.error("Error verifying guest name:", error);
    return {
      verified: false,
      message: "An error occurred during verification",
    };
  }
}

type SubmitRSVPData = {
  first_name: string;
  last_name: string;
  email: string;
  attendance: "attending" | "not-attending";
  message: string | null;
  guest_list_id: string | null;
  selected_guest_ids: string[];
  is_verified_guest: boolean;
  submitter_guest_id: string | null;
};

type SubmitRSVPResult = {
  success: boolean;
  message?: string;
  error?: "DUPLICATE" | "VALIDATION" | "SERVER_ERROR";
};

export async function submitCompleteRSVP(
  data: SubmitRSVPData,
): Promise<SubmitRSVPResult> {
  try {
    const supabase = await createClient();

    console.log(data);

    // If guest is verified and has selected multiple guests, create multiple RSVPs
    if (data.is_verified_guest && data.selected_guest_ids.length > 0) {
      // First, fetch the actual guest details for each selected guest
      const { data: selectedGuests, error: fetchError } = await supabase
        .from("guest_list")
        .select("*")
        .in("id", data.selected_guest_ids);

      if (fetchError || !selectedGuests) {
        console.error("Error fetching selected guests:", fetchError);
        return {
          success: false,
          error: "SERVER_ERROR",
          message: "Failed to fetch guest details.",
        };
      }

      // Create an RSVP for each selected guest
      const rsvps: InsertRSVP[] = selectedGuests.map((guest) => ({
        guest_list_id: guest.id,
        first_name: guest.first_name,
        last_name: guest.last_name,
        full_name: guest.full_name,
        email: data.email,
        attendance: data.attendance,
        message: data.message,
        rsvp_for_guest_id: guest.id,
        submitted_by_guest_id: data.submitter_guest_id, // Track who submitted
        is_verified_guest: true,
      }));

      // Check for duplicates
      for (const rsvp of rsvps) {
        const { data: existing } = await supabase
          .from("rsvps")
          .select("id")
          .eq("guest_list_id", rsvp.guest_list_id)
          .single();

        if (existing) {
          return {
            success: false,
            error: "DUPLICATE",
            message: "An RSVP already exists for one or more selected guests.",
          };
        }
      }

      // Insert all RSVPs
      const { error } = await supabase.from("rsvps").insert(rsvps);

      if (error) {
        console.error("Error inserting RSVPs:", error);
        return {
          success: false,
          error: "SERVER_ERROR",
          message: "Failed to submit RSVP. Please try again.",
        };
      }
    } else {
      // Single RSVP
      const rsvp: InsertRSVP = {
        guest_list_id: data.guest_list_id,
        first_name: data.first_name,
        last_name: data.last_name,
        full_name: `${data.first_name} ${data.last_name}`,
        email: data.email,
        attendance: data.attendance,
        message: data.message,
        rsvp_for_guest_id: data.submitter_guest_id,
        submitted_by_guest_id: data.submitter_guest_id,
        is_verified_guest: true,
      };

      // Check for duplicate by email
      const { data: existing } = await supabase
        .from("rsvps")
        .select("id")
        .eq("email", data.email)
        .single();

      if (existing) {
        return {
          success: false,
          error: "DUPLICATE",
          message: "An RSVP with this email already exists.",
        };
      }

      const { error } = await supabase.from("rsvps").insert(rsvp);

      if (error) {
        console.error("Error inserting RSVP:", error);
        return {
          success: false,
          error: "SERVER_ERROR",
          message: "Failed to submit RSVP. Please try again.",
        };
      }
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    return {
      success: false,
      error: "SERVER_ERROR",
      message: "An unexpected error occurred.",
    };
  }
}

export async function getAllRSVPs() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching all RSVPs:", error);
    return { success: false, error: "Failed to fetch RSVPs" };
  }
}
