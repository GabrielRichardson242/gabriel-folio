"use client";

import { useEffect, useState } from "react";

export default function useActiveSection(count: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const update = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-project]"),
      );

      if (sections.length === 0) {
        frameId = window.requestAnimationFrame(update);
        return;
      }

      const viewportCenter = window.innerHeight * 0.5;

      let closestIndex = 0;
      let closestDistance = Infinity;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height * 0.5;
        const distance = Math.abs(viewportCenter - sectionCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex((prev) => (prev === closestIndex ? prev : closestIndex));
      frameId = window.requestAnimationFrame(update);
    };

    frameId = window.requestAnimationFrame(update);

    return () => window.cancelAnimationFrame(frameId);
  }, [count]);

  return activeIndex;
}