"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import SiteBanner from "@/components/SiteBanner";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = clamp((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

const capabilities = [
  "Opportunity Discovery",
  "Systems Thinking",
  "Evidence Based Pitching",
  "Rapid Prototyping",
  "Experience Design",
  "Self Directed Learning",
];

export default function HomeOpening() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const face1MeasureRef = useRef<HTMLSpanElement | null>(null);
  const face2MeasureRef = useRef<HTMLSpanElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  const [face1NaturalWidth, setFace1NaturalWidth] = useState(0);
  const [face2NaturalWidth, setFace2NaturalWidth] = useState(0);
  const [face1NaturalHeight, setFace1NaturalHeight] = useState(0);
  const [face2NaturalHeight, setFace2NaturalHeight] = useState(0);

  const [fontsReady, setFontsReady] = useState(false);
  const [measuredReady, setMeasuredReady] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const update = () => {
      if (sectionRef.current) {
        const y = window.scrollY || window.pageYOffset || 0;
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = y + rect.top;
        const sectionHeight = sectionRef.current.offsetHeight;
        const scrollRange = sectionHeight - window.innerHeight;

        const raw = scrollRange > 0 ? (y - sectionTop) / scrollRange : 0;
        setProgress(clamp(raw));
      }

      frameId = window.requestAnimationFrame(update);
    };

    frameId = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useLayoutEffect(() => {
    const measure = async () => {
      if ("fonts" in document) {
        await document.fonts.ready;
      }

      const width = window.innerWidth;
      const height = window.innerHeight;

      setViewportWidth(width);
      setViewportHeight(height);

      if (face1MeasureRef.current) {
        const rect = face1MeasureRef.current.getBoundingClientRect();
        setFace1NaturalWidth(rect.width);
        setFace1NaturalHeight(rect.height);
      }

      if (face2MeasureRef.current) {
        const rect = face2MeasureRef.current.getBoundingClientRect();
        setFace2NaturalWidth(rect.width);
        setFace2NaturalHeight(rect.height);
      }

      setFontsReady(true);
      setMeasuredReady(true);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const stickyHeight = Math.max(0, viewportHeight - 44);

  const anchorY = stickyHeight * 0.46;
  const gutter = 48;

  const phase1 = smoothstep(0.08, 0.52, progress);
  const phase2 = smoothstep(0.52, 1.04, progress);

  const face1FullHeight = Math.min(600, stickyHeight * 0.58);
  const face1MinHeight = 0;

  const face2FullHeight = Math.min(420, stickyHeight * 0.48);
  const face2MinHeight = 0;

  const face1Height = lerp(face1FullHeight, face1MinHeight, phase1);
  const face1ScaleY =
    face1NaturalHeight > 0 ? face1Height / face1NaturalHeight : 1;
  const face1ScaleX =
    face1NaturalWidth > 0 ? viewportWidth / face1NaturalWidth : 1;

  const face1Top = 0;
  const face1Opacity = lerp(1, 0, smoothstep(0.5, 0.62, progress));

  const face2RevealHeight = lerp(0, face2FullHeight, phase1);
  const face2Height = lerp(face2RevealHeight, face2MinHeight, phase2);

  const face2ScaleY =
    face2NaturalHeight > 0 ? face2Height / face2NaturalHeight : 1;
  const face2ScaleX =
    face2NaturalWidth > 0 ? viewportWidth / face2NaturalWidth : 1;

  const face2RevealTop = anchorY - face2RevealHeight;
  const face2PinnedTop = 44;

  const face2Top = lerp(face2RevealTop, face2PinnedTop, phase2);
  const face2Bottom = face2Top + face2Height;
  const face2Opacity =
    phase1 <= 0.02 ? 0 : 1 - smoothstep(0.94, 0.98, phase2);

  const introTop = face2Bottom + gutter;

  return (
    <>
      <SiteBanner />

      <div className="pointer-events-none absolute left-[-99999px] top-[-99999px] opacity-0">
        <span
          ref={face1MeasureRef}
          className="font-grith whitespace-nowrap text-[240px] uppercase"
        >
          Creative Technologist
        </span>

        <span
          ref={face2MeasureRef}
          className="font-grith whitespace-nowrap text-[220px] uppercase"
        >
          Building Interactive Systems
        </span>
      </div>

      <section
        ref={sectionRef}
        className="relative hidden h-[260vh] bg-[#232323] text-[#ededed] min-[900px]:block"
        style={{ opacity: fontsReady && measuredReady ? 1 : 0 }}
      >
        <div className="sticky top-[44px] h-[calc(100vh-44px)] overflow-hidden">
          <div className="relative h-full w-full overflow-hidden">
            <div
              className="absolute left-0 right-0 overflow-hidden"
              style={{
                top: face1Top,
                height: face1Height,
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                opacity: face1Opacity,
              }}
            >
              <div
                style={{
                  width: face1NaturalWidth,
                  transform: `translateY(-42px) scaleX(${face1ScaleX}) scaleY(${
                    face1ScaleY * 0.9
                  })`,
                  transformOrigin: "left top",
                  willChange: "transform",
                }}
              >
                <span className="font-grith whitespace-nowrap text-[240px] uppercase">
                  Creative Technologist
                </span>
              </div>
            </div>

            <div
              className="absolute left-0 right-0 overflow-hidden"
              style={{
                top: face2Top,
                height: face2Height,
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                opacity: face2Opacity,
              }}
            >
              <div
                style={{
                  width: face2NaturalWidth,
                  transform: `scaleX(${face2ScaleX}) scaleY(${face2ScaleY})`,
                  transformOrigin: "left top",
                  willChange: "transform",
                }}
              >
                <span className="font-grith whitespace-nowrap text-[220px] uppercase">
                  Building Interactive Systems
                </span>
              </div>
            </div>

            <div
              className="absolute left-0 right-0 bg-[#9c871f] text-white"
              style={{
                top: introTop,
                minHeight: stickyHeight,
                willChange: "top",
              }}
            >
              <div className="grid min-h-[220vh] grid-cols-[32vw_1fr]">
                <div className="pl-[5vw] pr-10 py-14">
                  <div className="max-w-[42rem] font-body text-[clamp(1.35rem,1.65vw,2rem)] font-bold leading-[1.42]">
                    <p>
                      I work between Design, Technology and Strategy to identify
                      entrepreneurial opportunities, shape them into pitch ready 
                      propositions, and build prototypes that test their value.
                    </p>

                    <p className="mt-16">
                      Through university projects and independent ventures, I
                      have developed a practice centred around rapid
                      experimentation. Using emerging AI workflows, I&apos;ve
                      enabled fast, self-directed uptake of technical skills and
                      tools, allowing me to move from concept to testable 
                      prototypes under tight deadlines.
                    </p>

                    <p className="mt-16">
                      This has offered freedom in our ideation, allowing my teams
                      to create for the best idea, beyond confidence or comfort.
                    </p>
                  </div>

                  <div className="mt-28 grid gap-y-8 font-kalmansk text-[clamp(1.65rem,2vw,2.65rem)] leading-none tracking-[0.02em]">
                    <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
                      <span>{capabilities[0]}</span>
                      <span>*</span>
                      <span>{capabilities[1]}</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
                      <span>*</span>
                      <span>{capabilities[2]}</span>
                      <span>*</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
                      <span>{capabilities[3]}</span>
                      <span>*</span>
                      <span>{capabilities[4]}</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
                      <span>*</span>
                      <span>{capabilities[5]}</span>
                      <span>*</span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="h-full overflow-hidden bg-black">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    >
                      <source
                        src="/projects/home-practice-loop.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="hidden h-[20vh] bg-[#9c871f] min-[900px]:block" />

      <section className="block bg-[#232323] px-6 pb-16 pt-24 text-[#ededed] min-[900px]:hidden">
        <h1 className="font-grith text-[24vw] uppercase leading-[0.85]">
          Creative Technologist
        </h1>

        <p className="mt-8 font-grith text-[14vw] uppercase leading-[0.9]">
          Building Interactive Systems
        </p>
      </section>
    </>
  );
}