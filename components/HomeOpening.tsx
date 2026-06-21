"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import SiteBanner from "@/components/SiteBanner";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = clamp((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

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

  const anchorY = stickyHeight * 0.52;
  const gutter = 32;

  const phase1 = smoothstep(0.08, 0.52, progress);
  const phase2 = smoothstep(0.52, 0.86, progress);

  const face1FullHeight = 600;
  const face1MinHeight = 8;

  const face2FullHeight = 490;
  const face2MinHeight = 8;

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

  /*
    Phase 1:
    - Face 2 grows upward from anchorY.
    - Its bottom is locked to anchorY.

    Phase 2:
    - Face 2 is pinned to the top.
    - Its bottom compresses upward.
    - Intro follows face2 bottom, preserving the gutter.
  */
  const face2RevealTop = anchorY - face2RevealHeight;
  const face2PinnedTop = 44;

  const face2Top = lerp(face2RevealTop, face2PinnedTop, phase2);
  const face2Bottom = face2Top + face2Height;
  const face2Opacity = phase1 <= 0.02 ? 0 : 1;

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
        className="relative hidden h-[220vh] bg-[#232323] text-[#ededed] min-[900px]:block"
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
              className="absolute left-0 right-0 grid gap-16 px-24"
              style={{
                top: introTop,
                gridTemplateColumns: "620px 1fr",
                willChange: "top",
              }}
            >
              <div className="flex max-w-[620px] flex-col gap-16">
                <div>
                  <h2 className="font-abolition text-[clamp(3.5rem,5vw,5.5rem)] uppercase italic leading-none text-[#ededed]/70">
                    What I do.
                  </h2>

                  <div className="mt-7 max-w-[34ch] font-body text-[clamp(1.45rem,1.7vw,1.9rem)] font-bold leading-[1.35] text-[#ededed]">
                    <p>
                      I work between design, technology and strategy to identify
                      opportunities, shape them into experience-led propositions,
                      and build prototypes that test their value.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-abolition text-[clamp(3.5rem,5vw,5.5rem)] uppercase italic leading-none text-[#ededed]/70">
                    Core capabilities.
                  </h2>

                  <ul className="mt-8 flex list-none flex-col gap-6 p-0 font-body text-[clamp(1.45rem,1.7vw,1.9rem)] font-bold leading-none text-[#ededed]">
                    <li>Opportunity Discovery</li>
                    <li>Systems Thinking</li>
                    <li>Experience Design</li>
                    <li>Rapid Prototyping</li>
                    <li>Evidence-Based Pitching</li>
                    <li>Self-Directed Learning</li>
                  </ul>

                  <p className="mt-8 max-w-[30ch] font-disket text-[9px] uppercase leading-[1.6] tracking-[0.12em] text-[#ededed]/55">
                    Highlighted throughout relevant projects.
                  </p>
                </div>
              </div>

              <div className="h-[calc(100vh-44px-26px)] overflow-hidden border border-white/20 bg-black">
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
      </section>

      <section className="block bg-[#232323] px-6 pb-16 pt-24 text-[#ededed] min-[900px]:hidden">
        <h1 className="font-grith text-[24vw] uppercase leading-[0.85]">
          Creative Technologist
        </h1>

        <p className="mt-8 font-grith text-[14vw] uppercase leading-[0.9]">
          Building Interactive Systems
        </p>

        <div className="mt-14 border-t border-white/20 pt-8">
          <h2 className="font-abolition text-[3rem] uppercase italic text-[#ededed]/70">
            What I do.
          </h2>

          <p className="mt-5 font-body text-[1.35rem] font-bold leading-[1.35]">
            I work between design, technology and strategy to identify
            opportunities, shape them into experience-led propositions, and
            build prototypes that test their value.
          </p>
        </div>
      </section>
    </>
  );
}