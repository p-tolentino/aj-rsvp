"use server";

import { RSVPFormSchema } from "@/lib/form-validation";
import { createClient, InsertRSVP } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function submitRSVP(formData: InsertRSVP) {
  const supabase = await createClient();

  try {
    const validatedData = RSVPFormSchema.parse(formData);

    // Check for existing RSVP
    const { data: existingRSVPs, error: checkError } = await supabase
      .from("rsvps")
      .select("full_name, email")
      .or(
        `full_name.eq.${validatedData.full_name},email.eq.${
          validatedData.email || ""
        }`,
      )
      .limit(1);

    if (checkError) {
      console.error("Error checking for duplicates:", checkError);
      throw new Error("Failed to check for existing RSVP");
    }

    if (existingRSVPs && existingRSVPs.length > 0) {
      const existing = existingRSVPs[0];
      let message = "An RSVP already exists";

      if (
        existing.full_name.toLowerCase() ===
        validatedData.full_name.toLowerCase()
      ) {
        message = "An RSVP with this name already exists";
      } else if (existing.email && existing.email === validatedData.email) {
        message = "An RSVP with this email already exists";
      }

      return {
        success: false,
        error: "DUPLICATE",
        message,
      };
    }

    const { data, error } = await supabase
      .from("rsvps")
      .insert([
        {
          full_name: validatedData.full_name.trim(),
          email: validatedData.email?.trim() || null,
          attendance: validatedData.attendance,
          guests: validatedData.guests,
          message: validatedData.message?.trim() || null,
        },
      ])
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return {
          success: false,
          error: "DUPLICATE",
          message:
            "An RSVP already exists with this name and email combination",
        };
      }
      throw error;
    }
    revalidatePath("/");

    return {
      success: true,
      data,
      message: "Thank you for your RSVP!",
    };
  } catch (error) {
    console.error("RSVP submission error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "VALIDATION",
        message: "Please check your form entries",
        details: error.message,
      };
    }

    return {
      success: false,
      error: "SERVER",
      message:
        "An error occurred while submitting your RSVP. Please try again.",
    };
  }
}

export async function getRSVPStats() {
  const supabase = await createClient();

  try {
    const { data: attending } = await supabase
      .from("rsvps")
      .select("guests")
      .eq("attendance", "attending");

    const { data: notAttending } = await supabase
      .from("rsvps")
      .select("id")
      .eq("attendance", "not-attending");

    const totalAttending =
      attending?.reduce((sum, item) => sum + item.guests, 0) || 0;
    const totalNotAttending = notAttending?.length || 0;
    const totalResponses = (attending?.length || 0) + totalNotAttending;

    return {
      totalAttending,
      totalNotAttending,
      totalResponses,
    };
  } catch (error) {
    console.error("Error fetching RSVP stats:", error);
    return {
      totalAttending: 0,
      totalNotAttending: 0,
      totalResponses: 0,
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
