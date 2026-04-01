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
  about_me: z.string().optional().or(z.literal("")),
  message: z.string().optional().or(z.literal("")),
});

export type Step3FormData = z.infer<typeof Step3Schema>;

export const CompleteRSVPSchema =
  Step1Schema.merge(Step2Schema).merge(Step3Schema);

export type CompleteRSVPFormData = z.infer<typeof CompleteRSVPSchema>;
