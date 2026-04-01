"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { GuestListEntry, RSVP, InsertRSVP } from "@/lib/types";
import { UpsertGuestFormData } from "@/components/guest-form";

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

    const { data: guest, error } = await supabase
      .from("guest_list")
      .select("*")
      .ilike("first_name", firstName.trim())
      .ilike("last_name", lastName.trim())
      .single();

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
  about_me: string | null;
  message: string | null;
  guest_list_id: string;
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
        about_me: data.about_me,
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
      const { data: verifiedGuest, error: fetchError } = await supabase
        .from("guest_list")
        .select("*")
        .eq("id", data.guest_list_id)
        .single();

      if (fetchError || !verifiedGuest) {
        console.error("Error fetching selected guests:", fetchError);
        return {
          success: false,
          error: "SERVER_ERROR",
          message: "Failed to fetch guest details.",
        };
      }

      const rsvp: InsertRSVP = {
        guest_list_id: data.guest_list_id,
        first_name: verifiedGuest.first_name,
        last_name: verifiedGuest.last_name,
        full_name: verifiedGuest.full_name,
        email: data.email,
        attendance: data.attendance,
        about_me: data.about_me,
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

export interface Guest {
  full_name: string;
  group_id: string;
  first_name?: string;
  last_name?: string;
  max_guests?: number;
}

export async function uploadGuestList(formData: FormData) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { error: "No file provided" };
    }

    if (!file.name.endsWith(".csv")) {
      return { error: "Only CSV files are allowed" };
    }

    // Parse CSV file
    const text = await file.text();
    const lines = text.split("\n");
    const headers = lines[0]
      .toLowerCase()
      .split(",")
      .map((h) => h.trim());

    // Validate required columns
    const requiredColumns = ["first_name", "last_name", "group_id"];
    const missingColumns = requiredColumns.filter(
      (col) => !headers.includes(col),
    );

    if (missingColumns.length > 0) {
      return {
        error: `Missing required columns: ${missingColumns.join(", ")}. Required columns: first_name, last_name, group_id`,
      };
    }

    // Parse data rows
    const uploadedGuests: Guest[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;

      const values = lines[i].split(",").map((v) => v.trim());
      const guest: any = {};

      headers.forEach((header, index) => {
        guest[header] = values[index] || "";
      });

      // Skip rows with missing first and last names
      if (!guest.first_name || !guest.last_name) {
        console.log(`Skipping row ${i + 1}: missing required fields`);
        continue;
      }

      // Combine first_name and last_name to create full_name
      const fullName = `${guest.first_name} ${guest.last_name}`.trim();

      uploadedGuests.push({
        full_name: fullName,
        group_id: guest.group_id,
        first_name: guest.first_name,
        last_name: guest.last_name,
      });
    }

    if (uploadedGuests.length === 0) {
      return {
        error:
          "No valid data found in CSV. Please ensure each row has first_name, last_name, and group_id.",
      };
    }

    // Calculate max_guests for each group_id
    const groupCounts: Record<string, number> = {};
    uploadedGuests.forEach((guest) => {
      groupCounts[guest.group_id] =
        guest.group_id !== "" ? (groupCounts[guest.group_id] || 0) + 1 : 1;
    });

    // Assign max_guests to each guest based on their group_id count
    uploadedGuests.forEach((guest) => {
      guest.max_guests = groupCounts[guest.group_id];
    });

    // Get Supabase client
    const supabase = await createClient();

    // Fetch existing guests
    const { data: existingGuests, error: fetchError } = await supabase
      .from("guest_list")
      .select("full_name, group_id");

    if (fetchError) {
      console.error("Error fetching existing guests:", fetchError);
      return { error: "Failed to fetch existing guests" };
    }

    // Create a Set of existing guest identifiers (full_name + group_id combination)
    const existingGuestKeys = new Set(
      existingGuests?.map(
        (guest) => `${guest.full_name.toLowerCase()}|${guest.group_id}`,
      ) || [],
    );

    // Filter out guests that already exist in the database based on full_name and group_id
    const newGuests = uploadedGuests.filter((guest) => {
      const key = `${guest.full_name.toLowerCase()}|${guest.group_id}`;
      return !existingGuestKeys.has(key);
    });

    if (newGuests.length === 0) {
      return {
        message:
          "No new guests to add. All guests from the CSV already exist in the database.",
        added: 0,
        total: uploadedGuests.length,
      };
    }

    // Prepare the data for insertion (only need full_name and group_id for the database)
    const guestsToInsert = newGuests.map((guest) => ({
      first_name: guest.first_name,
      last_name: guest.last_name,
      group_id: guest.group_id,
      max_guests: guest.max_guests,
    }));

    // Insert new guests
    const { data: insertedGuests, error: insertError } = await supabase
      .from("guest_list")
      .insert(guestsToInsert)
      .select();

    if (insertError) {
      console.error("Error inserting guests:", insertError);
      return { error: "Failed to add new guests" };
    }

    // Revalidate the dashboard path to refresh data
    revalidatePath("/guests");

    return {
      success: true,
      message: `Successfully added ${insertedGuests?.length} new guest(s) to the list.`,
      added: insertedGuests?.length || 0,
      skipped: uploadedGuests.length - (insertedGuests?.length || 0),
      total: uploadedGuests.length,
    };
  } catch (error) {
    console.error("Error processing guest list upload:", error);
    return { error: "Failed to process guest list upload" };
  }
}

export async function addGuest(guest: UpsertGuestFormData) {
  const supabase = await createClient();

  // Insert new guests
  const { data: insertedGuest, error: insertError } = await supabase
    .from("guest_list")
    .insert(guest)
    .select();

  if (insertError) {
    console.error("Error inserting guest:", insertError);
    return { error: "Failed to add new guest" };
  }

  // Revalidate the dashboard path to refresh data
  revalidatePath("/guests");

  return {
    success: true,
    message: `Successfully added new "${guest.first_name} ${guest.last_name}" ${guest.group_id && `(Group: ${guest.group_id}) `}to the guest list.`,
  };
}

export async function editGuest(
  guest: UpsertGuestFormData,
  guestId: string,
  attendance?: "attending" | "not-attending",
) {
  const supabase = await createClient();

  // Update guest
  const { data: updatedGuest, error: updateError } = await supabase
    .from("guest_list")
    .update(guest)
    .eq("id", guestId)
    .select();

  if (updateError) {
    console.error("Error updating guest:", updateError);
    return { error: "Failed to edit guest" };
  }

  if (attendance) {
    const { data: verifiedGuest, error: fetchError } = await supabase
      .from("guest_list")
      .select("*")
      .eq("id", guestId)
      .single();

    console.log(guestId);

    if (fetchError || !verifiedGuest) {
      console.error("Error fetching selected guests:", fetchError);
      return {
        success: false,
        error: "SERVER_ERROR",
        message: "Failed to fetch guest details.",
      };
    }

    const rsvp: InsertRSVP = {
      guest_list_id: verifiedGuest.id,
      first_name: verifiedGuest.first_name,
      last_name: verifiedGuest.last_name,
      full_name: verifiedGuest.full_name,
      email: "ADMIN",
      attendance: attendance,
      about_me: "",
      message: "",
      rsvp_for_guest_id: verifiedGuest.id,
      submitted_by_guest_id: null,
      is_verified_guest: true,
    };

    // Check for duplicate rsvp
    const { data: existing } = await supabase
      .from("rsvps")
      .select("*")
      .eq("guest_list_id", rsvp.guest_list_id)
      .single();

    if (existing) {
      const { data: updatedAttendance, error } = await supabase
        .from("rsvps")
        .update({ ...existing, attendance: attendance })
        .eq("id", existing.id)
        .select();

      if (error) {
        console.error("Error inserting RSVP:", error);
        return {
          success: false,
          error: "SERVER_ERROR",
          message: "Failed to submit RSVP. Please try again.",
        };
      }

      revalidatePath("/guests");
      return { success: true, message: `Successfully edited guest.` };
    }

    const { error } = await supabase.from("rsvps").insert(rsvp);

    if (error) {
      console.error("Error inserting RSVP:", error);
      return {
        success: false,
        error: "SERVER_ERROR",
        message: "Failed to edit RSVP. Please try again.",
      };
    }

    revalidatePath("/guests");
    return { success: true, message: `Successfully edited guest.` };
  }

  // Revalidate the dashboard path to refresh data
  revalidatePath("/guests");

  return {
    success: true,
    message: `Successfully edited guest.`,
  };
}

export async function deleteGuest(id: string) {
  const supabase = await createClient();

  const { data: existingRSVP } = await supabase
    .from("rsvps")
    .select("*")
    .eq("guest_list_id", id)
    .single();

  console.log(existingRSVP);

  if (existingRSVP) {
    const { data: deletedRSVP, error: deleteError } = await supabase
      .from("rsvps")
      .delete()
      .eq("id", existingRSVP.id)
      .select();
  }

  // Delete guest
  const { data: deletedGuest, error: deleteError } = await supabase
    .from("guest_list")
    .delete()
    .eq("id", id)
    .select();

  if (deleteError) {
    console.error("Error deleting guest:", deleteError);
    return { error: "Failed to delete guest" };
  }

  // Revalidate the dashboard path to refresh data
  revalidatePath("/guests");

  return {
    success: true,
    message: `Successfully deleted guest.`,
  };
}
