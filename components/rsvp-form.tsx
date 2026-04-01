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
import { Checkbox } from "./ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Loader2,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  User,
  Users,
  Mail,
} from "lucide-react";
import {
  Step1FormData,
  Step1Schema,
  Step2FormData,
  Step2Schema,
  Step3FormData,
  Step3Schema,
} from "@/lib/form-validation";
import { verifyGuestName, submitCompleteRSVP } from "@/app/actions";
import Logo from "./logo";
import { deadline } from "./faqs";
import { motion } from "framer-motion";

type GuestInfo = {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  max_guests: number;
};

type RsvpStep = 1 | 2 | 3 | 4;

export default function MultiStepRSVPForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<RsvpStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [verifiedGuest, setVerifiedGuest] = useState<GuestInfo | null>(null);
  const [availableGuests, setAvailableGuests] = useState<GuestInfo[]>([]);
  const [existingRSVPs, setExistingRSVPs] = useState<string[]>([]);

  // Form data storage
  const [step1Data, setStep1Data] = useState<Step1FormData | null>(null);
  const [step2Data, setStep2Data] = useState<Step2FormData | null>(null);

  // Step 1 Form
  const step1Form = useForm<Step1FormData>({
    resolver: zodResolver(Step1Schema),
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });

  // Step 2 Form
  const step2Form = useForm<Step2FormData>({
    resolver: zodResolver(Step2Schema),
    defaultValues: {
      selected_guest_ids: [],
    },
  });

  // Step 3 Form
  const step3Form = useForm<Step3FormData>({
    resolver: zodResolver(Step3Schema),
    defaultValues: {
      email: "",
      attendance: undefined,
      message: "",
    },
  });

  const attendance = step3Form.watch("attendance");

  // Step 1: Name Verification
  const handleStep1Submit = async (data: Step1FormData) => {
    setIsSubmitting(true);
    try {
      const result = await verifyGuestName(data.first_name, data.last_name);

      setStep1Data(data);

      if (result.verified && result.guest) {
        setVerifiedGuest(result.guest);
        setExistingRSVPs(result.existingRSVPs || []);

        if (result.guest.max_guests > 1 && result.availableGuests) {
          const allGuestsRSVPd = result.availableGuests.every((g) =>
            result.existingRSVPs?.includes(g.id),
          );

          if (allGuestsRSVPd) {
            toast.error("All RSVPs Already Submitted", {
              description:
                "All guests in your group have already submitted their RSVPs. If you need to make changes, please contact us.",
              icon: <AlertTriangle className="h-4 w-4" />,
              duration: 5000,
            });
            setIsSubmitting(false);
            return;
          }

          setAvailableGuests(result.availableGuests);
          setCurrentStep(2);
        } else {
          if (result.existingRSVPs?.includes(result.guest.id)) {
            toast.error("RSVP Already Submitted", {
              description:
                "You have already submitted your RSVP. If you need to make changes, please contact us.",
              icon: <AlertTriangle className="h-4 w-4" />,
              duration: 5000,
            });
            setIsSubmitting(false);
            return;
          }

          setCurrentStep(3);
        }

        toast.success("Welcome!", {
          description: `Hello ${result.guest.first_name}! Please continue with your RSVP.`,
          icon: <CheckCircle className="h-4 w-4" />,
        });
      } else {
        setVerifiedGuest(null);

        toast.info("Guest Not Found", {
          description:
            "We couldn't find your name on our guest list. Please contact us if you have any concerns.",
        });
      }
    } catch (error) {
      toast.error("Verification Failed", {
        description: "Please try again or contact us for assistance.",
      });
      console.error("Name verification error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Guest Selection
  const handleStep2Submit = (data: Step2FormData) => {
    setStep2Data(data);
    setCurrentStep(3);
  };

  // Step 3/4: Personal Details & Submit
  const handleFinalSubmit = async (data: Step3FormData) => {
    setIsSubmitting(true);

    try {
      if (!step1Data) {
        throw new Error("Missing step 1 data");
      }

      const completeData = {
        first_name: step1Data.first_name,
        last_name: step1Data.last_name,
        email: data.email,
        attendance: data.attendance,
        about_me: data.about_me || null,
        message: data.message || null,
        guest_list_id: verifiedGuest?.id || "",
        selected_guest_ids: step2Data?.selected_guest_ids || [],
        is_verified_guest: !!verifiedGuest,
        submitter_guest_id: verifiedGuest?.id || null,
      };

      const result = await submitCompleteRSVP(completeData);

      if (!result.success) {
        if (result.error === "DUPLICATE") {
          toast.error("RSVP Already Exists", {
            description: result.message,
            icon: <AlertTriangle className="h-4 w-4" />,
          });
          return;
        }

        throw new Error(result.message);
      }

      toast.success("RSVP Submitted!", {
        description: "Thank you for confirming your attendance.",
        icon: <CheckCircle className="h-4 w-4" />,
      });

      document.getElementById("rsvp")?.scrollIntoView();

      setSubmitted(true);

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

  const goBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      if (verifiedGuest && verifiedGuest.max_guests > 1) {
        setCurrentStep(2);
      } else {
        setCurrentStep(1);
      }
    } else if (currentStep === 4) {
      setCurrentStep(1);
    }
  };

  if (submitted) {
    return (
      <section className="flex flex-col items-center justify-center mx-auto px-4 py-8 sm:py-12 md:py-16 overflow-hidden bg-[url(/bg-playlist-rsvp.png)] bg-cover bg-center w-full">
        <div className="w-full max-w-7xl z-0">
          <Card className="border-[#212122]/20 max-w-2xl mx-auto animate-fade-in">
            <CardContent className="p-6 sm:p-8 md:p-12 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-500" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold mb-3 sm:mb-4 text-[#212122]">
                Thank You for Your RSVP!
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-md mx-auto">
                Your response has been recorded.
                {attendance === "attending"
                  ? ` We're looking forward to
                celebrating with you!`
                  : ` Let's catch up some time!`}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="w-screen">
          <Logo />
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center mx-auto px-4 pt-8 sm:pt-12 md:pt-16 overflow-hidden bg-[url(/bg-playlist-rsvp.png)] bg-cover bg-center w-full">
      <div id="rsvp" className="w-full max-w-7xl z-0">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 md:mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-8xl md:text-[180px] leading-none font-beautifully-delicious text-black px-4"
            >
              répondez s&apos;il vous plaît,
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-black max-w-2xl mx-auto px-4"
          >
            To help us prepare thoughtfully, we kindly ask that you complete
            your RSVP on or before
            <span className="font-bold"> {deadline}.</span>
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-8 w-full px-4">
          {/* Notes */}
          <div className="flex flex-col space-y-4 w-full lg:w-[350px] text-center lg:text-start justify-center mb-6 lg:mb-0">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl"
            >
              For verification, the name on this invitation will be exactly
              matched with our website&apos;s guest list, together with the
              corresponding seat.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl"
            >
              The final list will be provided to our wedding coordinator ahead
              of time. We sincerely ask for your kind cooperation in confirming
              your attendance in advance. Your response truly means the world to
              us — thank you for being part of this very special moment in our
              lives.
            </motion.p>
          </div>

          {/* Actual Form */}
          <Card className="border-[#212122]/20 shadow-lg bg-card-subtle w-full max-w-2xl mx-auto">
            <CardHeader className="text-center space-y-3 sm:space-y-4 pb-4 sm:pb-6 px-4 sm:px-6">
              <div className="space-y-2 ">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-[#212122]">
                  {currentStep === 1 && "RSVP"}
                  {currentStep === 2 && "Who Are You RSVPing For?"}
                  {currentStep === 3 && "Confirm Your Attendance"}
                  {currentStep === 4 && "Complete Your RSVP"}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base md:text-lg flex flex-col text-[#212122]">
                  {currentStep === 1 && "Please enter your name to get started"}
                  {currentStep === 2 &&
                    "Select all guests you'd like to RSVP for"}
                  {currentStep === 3 && (
                    <>
                      To help us prepare thoughtfully, please RSVP on or before{" "}
                      <span className="font-bold text-[#212122]">
                        {deadline}
                      </span>
                    </>
                  )}
                  {currentStep === 4 && (
                    <>
                      To help us prepare thoughtfully, please RSVP on or before{" "}
                      <span className="font-bold text-[#212122]">
                        {deadline}
                      </span>
                    </>
                  )}
                </CardDescription>
              </div>

              {/* Step Indicator */}
              <div className="flex justify-center gap-2 pt-4">
                {[1, 2, 3].map((step) => {
                  const isActive = currentStep === step;
                  const isCompleted =
                    (step === 1 && step1Data) ||
                    (step === 2 && step2Data) ||
                    (step === 3 && submitted);
                  const shouldShow =
                    step === 1 ||
                    (step === 2 &&
                      verifiedGuest &&
                      verifiedGuest.max_guests > 1) ||
                    step === 3;

                  if (!shouldShow && currentStep !== 4) return null;

                  return (
                    <div
                      key={step}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-8 sm:w-10 md:w-12 bg-[#212122]"
                          : isCompleted
                            ? "w-6 sm:w-7 md:w-8 bg-[#212122]/60"
                            : "w-6 sm:w-7 md:w-8 bg-gray-200"
                      }`}
                    />
                  );
                })}
              </div>
            </CardHeader>

            <CardContent className="pb-6 sm:pb-8 px-4 sm:px-6">
              {/* STEP 1: Name Input */}
              {currentStep === 1 && (
                <Form {...step1Form}>
                  <form
                    onSubmit={step1Form.handleSubmit(handleStep1Submit)}
                    className="space-y-4 sm:space-y-6"
                  >
                    <FormField
                      control={step1Form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#212122] font-bold text-sm sm:text-base">
                            First Name <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your first name"
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
                      control={step1Form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#212122] font-bold text-sm sm:text-base">
                            Last Name <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your last name"
                              className="border-[#212122]/20 focus:border-[#212122] text-sm sm:text-base"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-[#212122] hover:bg-[#212122]/90 text-base sm:text-lg py-5 sm:py-6 group relative overflow-hidden text-background"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">Continue</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#212122]/0 via-[#212122]/10 to-[#212122]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}

              {/* STEP 2: Guest Selection */}
              {currentStep === 2 && (
                <Form {...step2Form}>
                  <form
                    onSubmit={step2Form.handleSubmit(handleStep2Submit)}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-blue-900">
                            You can RSVP for up to {verifiedGuest?.max_guests}{" "}
                            {verifiedGuest?.max_guests === 1
                              ? "person"
                              : "people"}
                          </p>
                          <p className="text-xs sm:text-sm text-blue-700 mt-1">
                            {existingRSVPs.length > 0 ? (
                              <>
                                {existingRSVPs.length}{" "}
                                {existingRSVPs.length === 1
                                  ? "guest has"
                                  : "guests have"}{" "}
                                already RSVPed. Select the remaining guests you
                                would like to RSVP for.
                              </>
                            ) : (
                              "Select yourself and/or others you would like to RSVP for"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <FormField
                      control={step2Form.control}
                      name="selected_guest_ids"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-[#212122] text-sm sm:text-base font-bold">
                            Select Guests{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <div className="space-y-2 sm:space-y-3 mt-3 sm:mt-4">
                            {availableGuests.map((guest) => {
                              const hasRSVP = existingRSVPs.includes(guest.id);

                              return (
                                <FormField
                                  key={guest.id}
                                  control={step2Form.control}
                                  name="selected_guest_ids"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={guest.id}
                                        className={`flex flex-row items-start space-x-2 sm:space-x-3 space-y-0 ${
                                          hasRSVP ? "opacity-50" : ""
                                        }`}
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              guest.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    guest.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== guest.id,
                                                    ),
                                                  );
                                            }}
                                            disabled={hasRSVP}
                                            className="mt-1"
                                          />
                                        </FormControl>
                                        <FormLabel
                                          className={`font-normal text-sm sm:text-base ${
                                            hasRSVP
                                              ? "cursor-not-allowed"
                                              : "cursor-pointer"
                                          } flex items-center gap-2 flex-1`}
                                        >
                                          <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                                          <span>{guest.full_name}</span>
                                          {guest.id === verifiedGuest?.id && (
                                            <span className="text-xs text-[#212122] font-medium">
                                              (You)
                                            </span>
                                          )}
                                          {hasRSVP && (
                                            <span className="text-[10px] sm:text-xs bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 rounded ml-auto">
                                              Already RSVPed
                                            </span>
                                          )}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              );
                            })}
                          </div>
                          <FormMessage className="text-red-500 text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-2 sm:gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={goBack}
                        className="flex-1 text-sm sm:text-base py-4 sm:py-5"
                      >
                        <ChevronLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-[#212122] hover:bg-[#212122]/90 text-sm sm:text-base py-4 sm:py-5 text-background"
                      >
                        Continue
                      </Button>
                    </div>
                  </form>
                </Form>
              )}

              {/* STEP 3/4: Personal Details & Attendance */}
              {(currentStep === 3 || currentStep === 4) && (
                <Form {...step3Form}>
                  <form
                    onSubmit={step3Form.handleSubmit(handleFinalSubmit)}
                    className="space-y-4 sm:space-y-6"
                  >
                    {/* Email */}
                    <FormField
                      control={step3Form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#212122] font-bold flex items-center gap-2 text-sm sm:text-base">
                            <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                            Email Address{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              className="border-[#212122]/20 focus:border-[#212122] text-sm sm:text-base"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs sm:text-sm" />
                          <p className="text-[10px] sm:text-xs italic text-gray-400 mt-1">
                            We&apos;ll send a confirmation to this email
                          </p>
                        </FormItem>
                      )}
                    />

                    {/* Attendance */}
                    <FormField
                      control={step3Form.control}
                      name="attendance"
                      render={({ field }) => (
                        <FormItem className="space-y-3 sm:space-y-4">
                          <FormLabel className="text-[#212122] font-bold text-sm sm:text-base">
                            Will you be attending?{" "}
                            <span className="text-red-500">*</span>
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

                    {/* About you */}
                    {attendance === "attending" && (
                      <FormField
                        control={step3Form.control}
                        name="about_me"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#212122] font-bold text-sm sm:text-base">
                              About you <span className="text-red-500"> *</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={`Kindly share something unique, interesting, or little-known about yourself—perhaps a fun fact, a hidden talent, or something not many people know about you.`}
                                className="border-[#212122]/20 focus:border-[#212122] min-h-[100px] sm:min-h-[120px] resize-none text-sm sm:text-base"
                                {...field}
                                disabled={isSubmitting}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Message */}
                    <FormField
                      control={step3Form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#212122] font-bold text-sm sm:text-base">
                            Message for the Couple
                            <span className="italic text-gray-400">
                              {" "}
                              (Optional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={`Kindly share a special memory you’ve had with either one of us, or together with both of us....`}
                              className="border-[#212122]/20 focus:border-[#212122] min-h-[100px] sm:min-h-[120px] resize-none text-sm sm:text-base"
                              {...field}
                              disabled={isSubmitting}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="bg-card-gradient p-3 sm:p-4 md:p-6 rounded-lg border border-[#212122]/20">
                      <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        The final guest list will be provided to our wedding
                        coordinator ahead of time. We sincerely ask for your
                        kind cooperation in confirming your attendance in
                        advance.
                      </p>
                    </div>

                    <div className="flex gap-2 sm:gap-3">
                      {currentStep !== 4 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={goBack}
                          className="flex-1 text-sm sm:text-base py-4 sm:py-5"
                        >
                          <ChevronLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Back
                        </Button>
                      )}
                      <Button
                        type="submit"
                        className={`${
                          currentStep === 4 ? "w-full" : "flex-1"
                        } bg-[#212122] hover:bg-[#212122]/90 text-sm sm:text-base py-4 sm:py-5 group relative overflow-hidden text-background`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <span className="relative z-10">Submit RSVP</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#212122]/0 via-[#212122]/10 to-[#212122]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="w-screen">
        <Logo />
      </div>
    </section>
  );
}
