"use client";

import { Heart, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const handleFooterLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const sectionId = href.replace("#", "");

      const element = document.getElementById(sectionId);
      if (element) {
        const header = document.querySelector("header");
        const headerHeight = header?.offsetHeight || 100;

        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        window.history.pushState(null, "", href);
      }
    }
    // If not on homepage, Link will handle navigation
  };

  const FooterLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    if (href.startsWith("#")) {
      return (
        <Link
          href={{ pathname: "/", hash: href }}
          onClick={(e) => {
            if (pathname === "/") {
              handleFooterLinkClick(e, href);
            }
          }}
          className="text-white/80 hover:text-primary transition-all hover:pl-2 block py-1"
        >
          {children}
        </Link>
      );
    }

    return (
      <Link
        href={href}
        className="text-white/80 hover:text-primary transition-all hover:pl-2 block py-1"
      >
        {children}
      </Link>
    );
  };

  return (
    <footer className="mt-20 border-t bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 justify-center md:jutify-start">
          <div>
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
              <Heart className="h-6 w-6 text-primary fill-primary" />
              <span className="text-xl font-serif font-semibold">
                A & J Wedding
              </span>
            </div>
            <p className="text-primary text-sm md:text-base">
              Join us as we celebrate our once-in-a-lifetime moment together.
            </p>
          </div>

          <div className="text-center md:text-start">
            <h3 className="text-lg font-serif font-semibold mb-4 text-primary">
              Quick Links
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li>
                <FooterLink href="#venues">Venues</FooterLink>
              </li>
              <li>
                <FooterLink href="#timeline">Timeline</FooterLink>
              </li>
              {/* <li>
                <FooterLink href="#entourage">Entourage</FooterLink>
              </li> */}
              <li>
                <FooterLink href="#attire">Attire</FooterLink>
              </li>
              <li>
                <FooterLink href="#playlists">Playlists</FooterLink>
              </li>
              <li>
                <FooterLink href="#rsvp">RSVP</FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm md:text-base">
            © {new Date().getFullYear()}{" "}
            <span className="text-lg md:text-xl font-serif font-semibold ">
              A & J
            </span>{" "}
            Wedding. All rights reserved.
          </p>
          <p className="text-white/60 mt-2 text-sm md:text-base">
            <a
              href="https://www.ajthewedding.com"
              className="text-primary hover:underline hover:text-primary/80 transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.ajthewedding.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
