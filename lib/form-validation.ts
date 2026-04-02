import { z } from "zod";

export const Step1Schema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name is too long"),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name is too long"),
});

export type Step1FormData = z.infer<typeof Step1Schema>;

// Helper function to check if string is not just whitespace
const isMeaningfulContent = (value: string, minLength: number = 20) => {
  const trimmed = value.trim();

  // Check minimum length
  if (trimmed.length < minLength) return false;

  // Check if it's just repeated characters (e.g., "aaaaaa")
  const uniqueChars = new Set(trimmed.toLowerCase());
  if (uniqueChars.size === 1) return false;

  // Check if it's just the same word repeated
  const words = trimmed.split(/\s+/);
  const uniqueWords = new Set(words.map((w) => w.toLowerCase()));
  if (words.length > 3 && uniqueWords.size === 1) return false;

  return true;
};

export const GuestDetailsSchema = z.object({
  guest_id: z.string(),
  full_name: z.string(),
  about_me: z
    .string()
    .min(1, "Help us get to know you better!")
    .refine((val) => val.trim().length > 0, {
      message:
        "Please share something about this guest (cannot be empty or just spaces).",
    })
    .refine((val) => val.trim().length >= 10, {
      message:
        "Please share something about this guest (not counting spaces at the beginning or end).",
    })
    .refine(
      (val) => {
        const trimmed = val.trim();
        // Check if it's just repeated characters
        const uniqueChars = new Set(trimmed.toLowerCase());
        if (uniqueChars.size === 1) return false;
        return true;
      },
      {
        message: "Please avoid repeated characters.",
      },
    ),
  message: z.string().optional(),
});

export type GuestDetails = z.infer<typeof GuestDetailsSchema>;

export const Step2Schema = z.object({
  selected_guest_ids: z
    .array(z.string())
    .min(1, "Please select at least one person to RSVP for"),
});

export type Step2FormData = z.infer<typeof Step2Schema>;

export const Step3Schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  attendance: z.enum(["attending", "not-attending"], {
    message: "Please choose an option.",
  }),
  guest_details: z.array(GuestDetailsSchema),
});

export type Step3FormData = z.infer<typeof Step3Schema>;

export const CompleteRSVPSchema =
  Step1Schema.merge(Step2Schema).merge(Step3Schema);

export type CompleteRSVPFormData = z.infer<typeof CompleteRSVPSchema>;
