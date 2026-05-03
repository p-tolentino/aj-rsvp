"use client";

import { Heart, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "./footer";
import Image from "next/image";

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
          className="font-medium text-[#383539] hover:text-[#383539]/65 transition-all hover:scale-105"
        >
          {children}
        </Link>
      );
    }

    // Regular link
    return (
      <Link
        href={href}
        className="font-medium text-[#383539] hover:text-[#383539]/65 transition-all hover:scale-105"
      >
        {children}
      </Link>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-b-[#212122]/20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link href="/guests" className="flex items-center gap-2 h-8 w-8">
              <Image
                src="/aj-logo.png"
                alt="A&J Wedding"
                height={600}
                width={600}
                preload
                className="w-full h-full object-cover"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {routes.map(
                (route) =>
                  route.name !== "RSVP" && (
                    <NavLink key={route.href} href={route.href}>
                      {route.name}
                    </NavLink>
                  ),
              )}

              <Link href="/#rsvp" className="inline-block">
                <Button className="bg-[#383539] hover:bg-[#383539]/90 text-white px-4 py-2 transform transition-transform hover:scale-105">
                  {process.env.NEXT_PUBLIC_RSVP_CLOSED === "true"
                    ? "RSVP"
                    : "RSVP Now"}
                </Button>
              </Link>
            </nav>

            <div className="flex items-center gap-2 md:hidden">
              <Link href="/#rsvp">
                <Button
                  size="sm"
                  className="bg-[#383539] hover:bg-[#383539]/90 text-white px-3 py-1"
                >
                  RSVP
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="h-9 w-9 bg-[#383539] text-background hover:bg-[#383539]/90 text-white"
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
        <div className="fixed inset-x-0 top-14 z-40 md:hidden animate-slide-down">
          <div className="bg-white border-b shadow-lg  overflow-auto max-h-[300px]">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4 ">
                {routes.map(
                  (route) =>
                    route.href !== "#rsvp" && (
                      <Link
                        key={route.href}
                        href={{ pathname: "/", hash: route.href }}
                        onClick={(e) => {
                          if (pathname === "/") {
                            handleLinkClick(e, route.href);
                          }
                          closeMenu();
                        }}
                        className="font-medium text-[#383539] py-2 hover:text-gray-500 transition-all hover:pl-2"
                      >
                        {route.name}
                      </Link>
                    ),
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
