"use client";

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { useEffect, useRef, useState, useLayoutEffect } from "react";

const navItems = [
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Email" },
  { href: "/info", label: "Info" },
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));

function ClosedHeaderBar({
  interactive,
  style,
}: {
  interactive: boolean;
  style?: CSSProperties;
}) {
  return (
    <div className="border-b border-black/10 bg-[#dadada]" style={style}>
      <div className="flex h-[64px] items-center justify-between gap-6 px-5 text-[11px] uppercase tracking-[0.14em] text-[#111111] min-[900px]:px-8 min-[900px]:text-[12px]">
        <div className="font-body whitespace-nowrap">Gabriel Richardson</div>

        <div className="flex items-center gap-5 min-[640px]:gap-8">
          {navItems.map((item) =>
            interactive ? (
              <Link
                key={item.label}
                href={item.href}
                className="font-body whitespace-nowrap transition-opacity duration-150 hover:opacity-65"
              >
                {item.label}
              </Link>
            ) : (
              <span key={item.label} className="font-body whitespace-nowrap">
                {item.label}
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomeHero({
  children,
}: {
  children: ReactNode;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const face1MeasureRef = useRef<HTMLSpanElement | null>(null);
  const face2MeasureRef = useRef<HTMLDivElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [scrollYValue, setScrollYValue] = useState(0);

  const [face1FitScaleX, setFace1FitScaleX] = useState(1);
  const [face2FitScaleX, setFace2FitScaleX] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const update = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      setScrollYValue(y);

      if (sectionRef.current) {
        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const sectionTop = y + rect.top;
        const sectionHeight = section.offsetHeight;
        const viewportHeight = window.innerHeight;

        const start = sectionTop;
        const end = sectionTop + sectionHeight - viewportHeight;
        const raw = end > start ? (y - start) / (end - start) : 0;

        setProgress(clamp(raw));
      }

      frameId = window.requestAnimationFrame(update);
    };

    frameId = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      setViewportWidth(vw);

      const usableWidth = vw;

      if (face1MeasureRef.current) {
        const naturalWidth =
          face1MeasureRef.current.getBoundingClientRect().width;
        if (naturalWidth > 0) {
          setFace1FitScaleX(usableWidth / naturalWidth);
        }
      }

      if (face2MeasureRef.current) {
        const naturalWidth =
          face2MeasureRef.current.getBoundingClientRect().width;
        if (naturalWidth > 0) {
          setFace2FitScaleX(usableWidth / naturalWidth);
        }
      }
    };

    measure();
    window.addEventListener("resize", measure);

    const t1 = window.setTimeout(measure, 50);
    const t2 = window.setTimeout(measure, 250);

    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  /**
   * Stage timing
   * 0.00 -> 0.42  Face 1 compresses / Face 2 expands
   * 0.42 -> 0.78  Face 2 compresses / Face 3 expands
   * 0.78 -> 0.92  Header settles
   * 0.92 -> 1.00  Handoff
   */
  const stage1Progress = clamp(progress / 0.42);
  const stage2Progress = clamp((progress - 0.42) / 0.36);
  const stage3Progress = clamp((progress - 0.78) / 0.14);
  const handoffProgress = clamp((progress - 0.92) / 0.08);

  // Geometry
  const FACE_H = 340;
  const FACE_MIN = 8;
  const SEAM_H = 10;
  const HEADER_H = 64;

  // Base vertical overfill so the type fills the face more aggressively
  const face1BaseStretch = 1.22;
  const face2BaseStretch = 1.14;

  // Face 1 motion
  const face1Height = Math.max(
    FACE_MIN,
    FACE_H - stage1Progress * (FACE_H - FACE_MIN),
  );
  const face1AnimatedScaleY =
    0.02 + (1 - Math.pow(stage1Progress, 0.82)) * 0.98;
  const face1ScaleY = face1BaseStretch * face1AnimatedScaleY;

  // Face 2 motion
  const face2OpenHeight = FACE_MIN + stage1Progress * (FACE_H - FACE_MIN);
  const face2CloseHeight = FACE_H - stage2Progress * (FACE_H - FACE_MIN);
  const face2Height =
    stage2Progress > 0
      ? Math.max(FACE_MIN, face2CloseHeight)
      : Math.max(FACE_MIN, face2OpenHeight);

  const face2AnimatedScaleYOpen = 0.06 + stage1Progress * 0.94;
  const face2AnimatedScaleYClose = 1 - stage2Progress * 0.82;
  const face2ScaleY =
    stage2Progress > 0
      ? face2BaseStretch * face2AnimatedScaleYClose
      : face2BaseStretch * face2AnimatedScaleYOpen;
  const face2Origin = stage2Progress > 0 ? "bottom left" : "top left";

  // Face 3 motion
  const face3Height = Math.max(0, stage3Progress * HEADER_H);
  const face3ScaleY = 0.08 + stage3Progress * 0.92;

  // Header handoff
  const persistentHeaderOpacity = handoffProgress;
  const mechanismHeaderOpacity = 1 - handoffProgress;

  // Dynamic mechanism geometry
  const mechanismTop = 0;
  const seam1Top = mechanismTop + face1Height;
  const face2Top = seam1Top + SEAM_H;
  const seam2Top = face2Top + face2Height;
  const face3Top = seam2Top + SEAM_H;

  return (
    <>
      <div className="fixed left-4 top-4 z-[9999] rounded bg-black px-3 py-2 text-xs text-white">
        <div>scrollY: {scrollYValue.toFixed(0)}</div>
        <div>progress: {progress.toFixed(3)}</div>
        <div>s1: {stage1Progress.toFixed(3)}</div>
        <div>s2: {stage2Progress.toFixed(3)}</div>
        <div>s3: {stage3Progress.toFixed(3)}</div>
        <div>vw: {viewportWidth}</div>
        <div>f1x: {face1FitScaleX.toFixed(3)}</div>
        <div>f2x: {face2FitScaleX.toFixed(3)}</div>
      </div>

      <section ref={sectionRef} className="relative h-[240vh] bg-[#ededed]">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#ededed]">
          <div className="relative h-full w-full overflow-hidden px-0">
            <div
              className="relative w-full"
              style={{
                height: `${face3Top + HEADER_H}px`,
              }}
            >
              {/* FACE 1 */}
              <div
                className="absolute left-0 right-0 overflow-hidden bg-[#dadada]"
                style={{
                  top: `${mechanismTop}px`,
                  height: `${face1Height}px`,
                }}
              >
                <div
                  className="flex w-full items-start overflow-hidden"
                  style={{
                    height: `${FACE_H}px`,
                    transform: `scaleY(${face1ScaleY})`,
                    transformOrigin: "top left",
                    willChange: "transform",
                  }}
                >
                  <div className="w-screen overflow-hidden">
                    <div
                      className="font-abolition origin-left uppercase leading-[0.76] tracking-[-0.035em] text-[#111111] text-[17vw]"
                      style={{
                        transform: `scaleX(${face1FitScaleX}) translateY(0.01em)`,
                        transformOrigin: "left top",
                        width: "max-content",
                        willChange: "transform",
                      }}
                    >
                      <span
                        ref={face1MeasureRef}
                        className="block whitespace-nowrap"
                      >
                        Creative Technologist
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEAM 1 */}
              <div
                className="absolute left-0 right-0 bg-[#ededed]"
                style={{
                  top: `${seam1Top}px`,
                  height: `${SEAM_H}px`,
                }}
              />

              {/* FACE 2 */}
              <div
                className="absolute left-0 right-0 overflow-hidden bg-[#dadada]"
                style={{
                  top: `${face2Top}px`,
                  height: `${face2Height}px`,
                }}
              >
                <div
                  className="overflow-hidden"
                  style={{
                    height: `${FACE_H}px`,
                    transform: `scaleY(${face2ScaleY})`,
                    transformOrigin: face2Origin,
                    willChange: "transform",
                  }}
                >
                  <div className="w-screen overflow-hidden">
                    <div
                      ref={face2MeasureRef}
                      className="font-gildent origin-left uppercase leading-[0.82] tracking-[-0.035em] text-[#111111] text-[12vw]"
                      style={{
                        transform: `scaleX(${face2FitScaleX}) translateY(0.01em)`,
                        transformOrigin: "left top",
                        width: "max-content",
                        willChange: "transform",
                      }}
                    >
                      <span className="block whitespace-nowrap">
                        Building Interactive
                      </span>
                      <span className="block whitespace-nowrap">
                        Systems
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEAM 2 */}
              <div
                className="absolute left-0 right-0 bg-[#ededed]"
                style={{
                  top: `${seam2Top}px`,
                  height: `${SEAM_H}px`,
                }}
              />

              {/* FACE 3 */}
              <div
                className="absolute left-0 right-0 overflow-hidden"
                style={{
                  top: `${face3Top}px`,
                  height: `${face3Height}px`,
                  opacity: mechanismHeaderOpacity,
                }}
              >
                <div
                  style={{
                    transform: `scaleY(${face3ScaleY})`,
                    transformOrigin: "top left",
                    willChange: "transform, opacity",
                  }}
                >
                  <ClosedHeaderBar interactive={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-40 h-0">
        <div
          style={{
            opacity: persistentHeaderOpacity,
            pointerEvents: persistentHeaderOpacity > 0.98 ? "auto" : "none",
            transform: `translateY(${(1 - persistentHeaderOpacity) * -8}px)`,
            transition: "opacity 120ms linear, transform 120ms linear",
            willChange: "opacity, transform",
          }}
        >
          <ClosedHeaderBar interactive />
        </div>
      </div>

      {children}
    </>
  );
}