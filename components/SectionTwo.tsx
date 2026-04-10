"use client";

import { useEffect, useRef, useState } from "react";
import PhraseGraphic from "./PhraseGraphic";

export default function SectionTwo() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#ededed]">
      <div className="w-full overflow-hidden">
        <img
          src="/section2/greek-separator.svg"
          alt=""
          aria-hidden="true"
          className="block w-full h-auto select-none"
          draggable={false}
        />
      </div>

      <div className="mx-auto flex w-full max-w-[1800px] flex-col items-center px-6 pb-24 pt-16 min-[900px]:px-10 min-[900px]:pb-32 min-[900px]:pt-20">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center">
          <PhraseGraphic
            outlineSrc="/section2/audience-led-ideas-outline.svg"
            fillSrc="/section2/audience-led-ideas-fill.svg"
            alt="Audience-led ideas"
            isActive={hasAnimated}
            delayMs={0}
            className="w-[80%]"
          />

          <PhraseGraphic
            outlineSrc="/section2/into-outline.svg"
            fillSrc="/section2/into-fill.svg"
            alt="Into"
            isActive={hasAnimated}
            delayMs={120}
            className="mt-6 w-[20%]"
          />

          <PhraseGraphic
            outlineSrc="/section2/structured-systems-outline.svg"
            fillSrc="/section2/structured-systems-fill.svg"
            alt="Structured systems"
            isActive={hasAnimated}
            delayMs={220}
            className="mt-5 w-[90%]"
          />

          <PhraseGraphic
            outlineSrc="/section2/and-outline.svg"
            fillSrc="/section2/and-fill.svg"
            alt="And"
            isActive={hasAnimated}
            delayMs={340}
            className="mt-6 w-[18%]"
          />

          <PhraseGraphic
            outlineSrc="/section2/engaging-solutions-outline.svg"
            fillSrc="/section2/engaging-solutions-fill.svg"
            alt="Engaging solutions"
            isActive={hasAnimated}
            delayMs={440}
            className="mt-5 w-[92%]"
          />
        </div>

        <div className="mt-20 grid w-full max-w-[1400px] grid-cols-1 gap-y-12 text-center font-gildent text-[30px] uppercase leading-[0.9] tracking-[0.02em] text-[#ff4b6e] min-[900px]:mt-24 min-[900px]:grid-cols-3 min-[900px]:gap-x-8">
          <div className="flex flex-col gap-8 min-[900px]:border-r min-[900px]:border-black/10 min-[900px]:pr-8">
            <div>Concept Development</div>
            <div>Visual Systems</div>
          </div>

          <div className="flex flex-col gap-8 min-[900px]:border-r min-[900px]:border-black/10 min-[900px]:px-8">
            <div>React</div>
            <div>Next.js</div>
            <div>Rapid Prototyping</div>
          </div>

          <div className="flex flex-col gap-8 min-[900px]:pl-8">
            <div>Three.js</div>
            <div>Unity</div>
            <div>Physical Builds</div>
          </div>
        </div>
      </div>
    </section>
  );
}