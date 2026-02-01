"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

export function useSmoothScroll() {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToElement = useCallback(
    (elementId: string) => {
      if (pathname !== "/") {
        router.push(`/#${elementId}`);
        return;
      }

      const element = document.getElementById(elementId);

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

        window.history.pushState(null, "", `#${elementId}`);
      }
    },
    [router, pathname],
  );

  return { scrollToElement };
}
