"use client";

import { Heart, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  const handleLinkClick = (
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
        closeMenu();
      }
    }
    // If not on homepage, Link will handle navigation
  };

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    if (href.startsWith("#")) {
      // Hash link needs special handling
      return (
        <Link
          href={{ pathname: "/", hash: href }}
          onClick={(e) => {
            if (pathname === "/") {
              handleLinkClick(e, href);
            }
          }}
          className="text-sm font-medium text-secondary hover:text-primary transition-colors hover:scale-105"
        >
          {children}
        </Link>
      );
    }

    // Regular link
    return (
      <Link
        href={href}
        className="text-sm font-medium text-secondary hover:text-primary transition-colors hover:scale-105"
      >
        {children}
      </Link>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-5 w-5 md:h-6 md:w-6 text-primary fill-primary" />
              <span className="text-lg md:text-xl font-serif font-semibold text-secondary">
                A & J
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <NavLink href="#venues">Venues</NavLink>
              <NavLink href="#timeline">Timeline</NavLink>
              {/* <NavLink href="#entourage">Entourage</NavLink> */}
              <NavLink href="#attire">Attire</NavLink>
              <NavLink href="#playlists">Playlists</NavLink>
              <Link href="/#rsvp" className="inline-block">
                <Button className="bg-primary hover:bg-primary/90 text-white text-sm px-4 py-2 transform transition-transform hover:scale-105">
                  RSVP Now
                </Button>
              </Link>
            </nav>

            <div className="flex items-center gap-2 md:hidden">
              <Link href="/#rsvp">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-white text-xs px-3 py-1"
                >
                  RSVP
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="h-8 w-8 text-secondary"
              >
                {isMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-40 md:hidden animate-slide-down">
          <div className="bg-white border-b shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href={{ pathname: "/", hash: "#venues" }}
                  onClick={(e) => {
                    if (pathname === "/") {
                      handleLinkClick(e, "#venues");
                    }
                    closeMenu();
                  }}
                  className="text-sm font-medium text-secondary py-2 hover:text-primary transition-colors hover:pl-2"
                >
                  Venues
                </Link>
                <Link
                  href={{ pathname: "/", hash: "#timeline" }}
                  onClick={(e) => {
                    if (pathname === "/") {
                      handleLinkClick(e, "#timeline");
                    }
                    closeMenu();
                  }}
                  className="text-sm font-medium text-secondary py-2 hover:text-primary transition-colors hover:pl-2"
                >
                  Timeline
                </Link>
                <Link
                  href={{ pathname: "/", hash: "#attire" }}
                  onClick={(e) => {
                    if (pathname === "/") {
                      handleLinkClick(e, "#attire");
                    }
                    closeMenu();
                  }}
                  className="text-sm font-medium text-secondary py-2 hover:text-primary transition-colors hover:pl-2"
                >
                  Attire
                </Link>
                <Link
                  href={{ pathname: "/", hash: "#rsvp" }}
                  onClick={(e) => {
                    if (pathname === "/") {
                      handleLinkClick(e, "#rsvp");
                    }
                    closeMenu();
                  }}
                  className="text-sm font-medium text-secondary py-2 hover:text-primary transition-colors hover:pl-2"
                >
                  RSVP Form
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
