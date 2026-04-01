"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { addGuest, editGuest, Guest } from "@/app/actions";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { useState } from "react";

export const UpsertGuestSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name is too long"),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name is too long"),
  group_id: z.string().optional(),
  attendance: z.enum(["attending", "not-attending"]).optional(),
});

export type UpsertGuestFormData = z.infer<typeof UpsertGuestSchema>;

const UpsertGuestForm = ({
  type = "add",
  guest,
  onSuccess,
}: {
  type?: string;
  guest?: any;
  onSuccess: (open: boolean) => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UpsertGuestFormData>({
    resolver: zodResolver(UpsertGuestSchema),
    defaultValues: {
      first_name: guest?.first_name || "",
      last_name: guest?.last_name || "",
      group_id: guest?.group_id || "",
      attendance: guest?.attendance || "",
    },
  });

  const handleSubmit = async (data: UpsertGuestFormData) => {
    setIsSubmitting(true);
    const guestDetails = {
      first_name: data.first_name,
      last_name: data.last_name,
      group_id: data.group_id?.toString(),
    };
    try {
      const result =
        type === "edit"
          ? await editGuest(guestDetails, guest.id, data.attendance)
          : await addGuest(guestDetails);

      if (result.success) {
        toast.success(result.message);
        onSuccess(false);
      } else if (result.error) {
        toast.error(
          result.error,
          result.message ? { description: result.message } : undefined,
        );
      }
    } catch (error) {
      toast.error(`Failed to ${type === "edit" ? "update" : "add"} guest`, {
        description: "Please try again or contact us for assistance.",
      });
      console.error("Operation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      <Form {...form}>
        <form className="space-y-4 sm:space-y-6">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#212122] font-bold text-sm sm:text-base">
                  First Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter guest's given name on invitation"
                    className="border-[#212122]/20 focus:border-[#212122] text-sm sm:text-base"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#212122] font-bold text-sm sm:text-base">
                  Last Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter guest's last name on invitation"
                    className="border-[#212122]/20 focus:border-[#212122] text-sm sm:text-base"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="group_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#212122] font-bold text-sm sm:text-base">
                  Group ID
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter guest's group ID"
                    className="border-[#212122]/20 focus:border-[#212122] text-sm sm:text-base"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          {type === "edit" && (
            <FormField
              control={form.control}
              name="attendance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#212122] font-bold text-sm sm:text-base">
                    Attendance
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                      disabled={isSubmitting}
                    >
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <RadioGroupItem
                          value="attending"
                          id="attending"
                          className="border-[#212122] text-[#212122]"
                        />
                        <Label
                          htmlFor="attending"
                          className="font-medium cursor-pointer flex items-center gap-2 text-sm sm:text-base"
                        >
                          Yes, I&apos;ll be there!
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <RadioGroupItem
                          value="not-attending"
                          id="not-attending"
                          className="border-[#212122] text-[#212122]"
                        />
                        <Label
                          htmlFor="not-attending"
                          className="font-medium cursor-pointer flex items-center gap-2 text-sm sm:text-base"
                        >
                          No, I can&apos;t make it
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs sm:text-sm" />
                </FormItem>
              )}
            />
          )}

          <Button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleSubmit(form.getValues());
            }}
            className="w-full bg-[#212122] hover:bg-[#212122]/90 text-base sm:text-lg py-5 sm:py-6 group relative overflow-hidden text-background"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <span className="relative z-10">
                  {type === "edit" ? `Update` : `Add`} Guest
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#212122]/0 via-[#212122]/10 to-[#212122]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpsertGuestForm;
