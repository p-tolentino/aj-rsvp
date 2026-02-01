import { z } from "zod";

export const RSVPFormSchema = z.object({
  full_name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must be less than 100 characters." })
    .regex(/^[a-zA-Z\s.'-]+$/, {
      message: "Name can only contain letters, spaces, and basic punctuation",
    }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  attendance: z.enum(["attending", "not-attending"], {
    message: "Please choose an option.",
  }),
  guests: z.number(),
  message: z
    .string()
    .max(500, { message: "Message must be less than 500 characters" })
    .optional()
    .or(z.literal("")),
});

export type RSVPFormData = z.infer<typeof RSVPFormSchema>;
