"use client";

import Link from "next/link";

/**
 * Home header (Phase 1): static typographic banner.
 * We’ll add the flip + dock animation later once layout + fonts are correct.
 */
export default function FlipHeader() {
  // Banner height (desktop). Keep it generous so the type can breathe.
  const H = "clamp(210px, 22vw, 360px)";
  const G = "4px";

  return (
    <section className="w-full bg-[#242424] text-[#CEDECE]">
      {/* Full-width 60/40 banner */}
      <div
        className="grid w-full grid-cols-[3fr_2fr] overflow-hidden"
        style={{ height: H }}
      >
        {/* LEFT: CREATIVE / TECHNOLOGIST (60%) */}
        <div className="h-full" style={{ paddingLeft: G, paddingRight: G }}>
          <div
            className="flex h-full flex-col justify-start"
            style={{ paddingTop: G, paddingBottom: G, gap: G }}
          >
            <div
              className="font-abril text-[#CEDECE]"
              style={{
                fontSize: "clamp(84px, 9.8vw, 210px)",
                lineHeight: 0.78,
                letterSpacing: "-0.03em",
                fontFamily: "var(--font-abril), serif",
                whiteSpace: "nowrap",
                transform: "translateY(2px)",
                transformOrigin: "left top",
              }}
            >
              CREATIVE
            </div>

            <div
              className="font-eaves text-[#CEDECE]"
              style={{
                // Height ratio target: CREATIVE ~= 1.8x TECHNOLOGIST
                fontSize: "clamp(47px, 5.45vw, 117px)",
                lineHeight: 0.86,
                letterSpacing: "0.02em",
                fontFamily: "var(--font-mrs-eaves), serif",
                transform: "translateY(-2px) scaleX(1.14) scaleY(1.3)",
                transformOrigin: "left center",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              TECHNOLOGIST
            </div>
          </div>
        </div>

        {/* RIGHT: GABRIEL / RICHARDSON (40%) */}
        <div className="h-full" style={{ paddingLeft: G, paddingRight: G }}>
          <div
            className="flex h-full flex-col items-end justify-between text-right"
            style={{ paddingTop: G, paddingBottom: G }}
          >
            <div
              className="font-british"
              style={{
                fontSize: "clamp(58px, 6.6vw, 150px)",
                lineHeight: 2,
                letterSpacing: "-0.03em",
                color: "rgba(0,0,0,0.55)",
              }}
            >
              GABRIEL
            </div>

            <div
              className="font-british"
              style={{
                // ~1.5x bigger than GABRIEL
                fontSize: "clamp(86px, 9.2vw, 220px)",
                lineHeight: 0.82,
                letterSpacing: "-0.03em",
                color: "rgba(0,0,0,0.55)",
              }}
            >
              RICHARDSON
            </div>
          </div>
        </div>
      </div>

      {/* Divider (keep) */}
      <div className="h-[2px] w-full bg-[#CEDECE]" />

      {/* Dock bar (Phase 2): keep in DOM but hidden until we animate it in */}
      <div className="hidden h-[68px] w-full items-center bg-[#BFD0BF] px-[42px]">
        <div className="font-british text-[22px] tracking-[0.08em] text-[#242424]">
          GABRIEL RICHARDSON
        </div>

        <div className="ml-auto flex gap-[58px] font-british text-[22px] tracking-[0.08em] text-[#242424] opacity-80">
          <Link href="/cv" className="hover:opacity-100">
            CV
          </Link>
          <Link href="/info" className="hover:opacity-100">
            INFO
          </Link>
          <Link href="/contact" className="hover:opacity-100">
            CONTACT
          </Link>
        </div>
      </div>
    </section>
  );
}
