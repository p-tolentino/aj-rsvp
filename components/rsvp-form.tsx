"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { RSVPFormData, RSVPFormSchema } from "@/lib/form-validation";
import { submitRSVP } from "@/app/actions";

export default function RSVPForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<RSVPFormData>({
    resolver: zodResolver(RSVPFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      guests: 1,
      message: "",
    },
    mode: "onChange",
  });

  const attendance = form.watch("attendance");

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);

    try {
      const result = await submitRSVP({
        ...data,
        guests: attendance === "attending" ? data.guests : 0,
      });

      if (!result.success) {
        if (result.error === "DUPLICATE") {
          toast.error("RSVP Already Exists", {
            description: result.message,
            icon: <AlertTriangle className="h-4 w-4" />,
            action: {
              label: "Contact us?",
              onClick: () => {
                toast.info("Please contact us if you need to update your RSVP");
              },
            },
          });
          return;
        }

        if (result.error === "VALIDATION") {
          toast.error("Validation Error", {
            description: "Please check all fields and try again",
          });
          return;
        }

        throw new Error(result.message);
      }

      toast.success("RSVP Submitted!", {
        description: "Thank you for confirming your attendance.",
        icon: <CheckCircle className="h-4 w-4" />,
      });

      setSubmitted(true);
      form.reset();

      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (error) {
      toast.error("Submission Failed", {
        description:
          error instanceof Error ? error.message : "Please try again later",
      });
      console.error("RSVP submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card
        className="border-primary/20 max-w-2xl mx-auto animate-fade-in"
        id="submitted"
      >
        <CardContent className="p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-emerald-500" />
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-4 text-secondary">
            Thank You for Your RSVP!
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Your response has been recorded and will be matched with our guest
            list. We&apos;re looking forward to celebrating with you!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-2">
      <Card className="border-primary/20 shadow-lg bg-card-subtle">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="space-y-2">
            <CardTitle className="text-2xl md:text-3xl font-serif font-semibold text-secondary">
              Confirm Your Attendance
            </CardTitle>
            <CardDescription className="text-base md:text-lg flex flex-col text-nowrap">
              To help us prepare thoughtfully, please RSVP on or before{" "}
              <span className="font-bold text-primary">March 1, 2026</span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pb-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name Field */}
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-secondary">
                      Full Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name exactly as on the invitation"
                        className="border-primary/20 focus:border-primary"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                    <p className="text-xs italic text-gray-400 mt-1">
                      This will be matched with our guest list for verification
                    </p>
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-secondary">
                      Email Address <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        className="border-primary/20 focus:border-primary"
                        {...field}
                        disabled={isSubmitting}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                    <p className="text-xs italic text-gray-400 mt-1">
                      We&apos;ll send a confirmation to this email
                    </p>
                  </FormItem>
                )}
              />

              {/* Attendance Field */}
              <FormField
                control={form.control}
                name="attendance"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-secondary text-base">
                      Will you be attending?{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col sm:flex-row gap-4"
                        disabled={isSubmitting}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="attending"
                            id="attending"
                            className="border-primary text-primary"
                          />
                          <Label
                            htmlFor="attending"
                            className="font-medium cursor-pointer flex items-center gap-2"
                          >
                            Yes, I&apos;ll be there!
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="not-attending"
                            id="not-attending"
                            className="border-primary text-primary"
                          />
                          <Label
                            htmlFor="not-attending"
                            className="font-medium cursor-pointer flex items-center gap-2"
                          >
                            No, I can&apos;t make it
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Guests Field (only show if attending) */}
              {attendance === "attending" && (
                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-secondary text-base">
                        Number of Guests <span className="text-red-500">*</span>{" "}
                        <span className="italic text-xs text-gray-400">
                          (including you)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field.value.toString()}
                          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                          disabled={isSubmitting}
                        >
                          {[1, 2].map((num) => (
                            <div key={num} className="relative">
                              <RadioGroupItem
                                value={num.toString()}
                                id={`guests-${num}`}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={`guests-${num}`}
                                className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:hover:text-primary cursor-pointer transition-all"
                              >
                                <span className="text-2xl font-bold">
                                  {num}
                                </span>
                                <span className="text-sm">
                                  {num === 1 ? "Person" : "People"}
                                </span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Message Field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-secondary">
                      Message for the Couple
                      <span className="italic text-gray-400"> (Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={`Share your well wishes${
                          attendance === "attending"
                            ? `, song requests, or dietary restrictions`
                            : ""
                        }...`}
                        className="border-primary/20 focus:border-primary min-h-[120px] resize-none"
                        {...field}
                        disabled={isSubmitting}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="flex justify-between text-xs italic text-gray-400 mt-1">
                      <span>Max 500 characters</span>
                      <span>{field.value?.length || 0}/500</span>
                    </div>
                  </FormItem>
                )}
              />

              {/* Important Note */}
              <div className="bg-card-gradient p-4 md:p-6 rounded-lg border border-primary/20">
                <div className="flex items-start gap-3">
                  <div>
                    <p className="text-sm md:text-base text-gray-600">
                      The final guest list will be provided to our wedding
                      coordinator ahead of time. We sincerely ask for your kind
                      cooperation in confirming your attendance in advance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-lg py-6 md:py-8 group relative overflow-hidden"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Submit RSVP</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
