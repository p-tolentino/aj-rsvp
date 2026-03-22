"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const routes = [
  { name: "Our Story", href: "#story" },
  { name: "Entourage", href: "#entourage" },
  { name: "Venues", href: "#venues" },
  { name: "Timeline", href: "#timeline" },
  { name: "FAQs", href: "#faqs" },
  { name: "Local Guide", href: "#local-spots" },
  { name: "Attire", href: "#attire" },
  { name: "Registry", href: "#registry" },
  { name: "Paylists", href: "#playlists" },
  { name: "RSVP", href: "#rsvp" },
];

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
          className="text-white/80 hover:text-gray-400 transition-all hover:pl-2 block py-1"
        >
          {children}
        </Link>
      );
    }

    return (
      <Link
        href={href}
        className="text-white/80 hover:text-gray-400 transition-all hover:pl-2 block py-1"
      >
        {children}
      </Link>
    );
  };

  return (
    <footer className="border-t bg-[#353839] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="flex flex-col w-full text-center items-center md:text-start md:items-start">
            <Link href="/" className="flex items-center gap-2 h-12 w-12 mb-4">
              <Image
                src="/aj-logo-w.png"
                alt="A&J Wedding"
                height={600}
                width={600}
                preload
                className="w-full h-full object-cover"
              />
            </Link>
            <p className="text-gray-400 text-sm md:text-base">
              Join us as we celebrate our once-in-a-lifetime moment together.
            </p>
          </div>

          <div className="text-center md:text-start">
            <h3 className="text-lg font-serif font-semibold mb-4 text-gray-400">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {routes.map((route) => (
                <li key={route.href}>
                  <FooterLink href={route.href}>{route.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm md:text-base">
            © {new Date().getFullYear()}{" "}
            <span className="text-lg md:text-xl">A & J</span> Wedding. All
            rights reserved.
          </p>
          <p className="text-white/60 mt-2 text-sm md:text-base">
            <a
              href="https://www.ajthewedding.com"
              className="text-gray-400 hover:underline hover:text-gray-400/80 transition-all"
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
