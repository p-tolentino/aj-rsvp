import type { Metadata } from "next";
import { WindSong } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import PageTransition from "@/components/page-transition";

const windSong = WindSong({
  weight: ["400"],
  variable: "--font-wind-song",
});

export const metadata: Metadata = {
  title: "A & J Wedding | June 20, 2026",
  description: "Join us as we celebrate our once-in-a-lifetime moment together",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`times-new-roman ${windSong.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col">
        <PageTransition />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <Toaster
          position="bottom-right"
          expand={true}
          richColors
          toastOptions={{
            duration: 5000,
            classNames: {
              toast:
                "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
              description: "group-[.toast]:text-muted-foreground",
              actionButton:
                "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
              cancelButton:
                "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            },
          }}
        />
      </body>
    </html>
  );
}
