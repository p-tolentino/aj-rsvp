"use client";

import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface SmoothScrollLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  offset?: number; // Custom offset if needed
}

export default function SmoothScrollLink({
  href,
  children,
  className,
  onClick,
  offset = 80,
  ...props
}: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Smooth scrolling for hash links on the same page only
    if (typeof href === "string" && href.startsWith("#")) {
      e.preventDefault();

      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        onClick?.();

        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        // Smooth scroll to element with offset
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Update URL without page reload
        window.history.pushState(null, "", href);
      }
    }

    onClick?.();
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
