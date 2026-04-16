"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function SiteBanner({
  style,
}: {
  style?: CSSProperties;
}) {
  return (
    <div
      className="w-full"
      style={{
        background: "#232323",
        ...style,
      }}
    >
      <div className="h-px w-full bg-[#ededed]" />
      <div className="flex h-[42px] w-full items-center pl-10 pr-6">
        <Link
          href="/"
          className="ml-[30px] no-underline hover:no-underline font-british text-[14px] leading-none tracking-[0.01em] text-[#ededed] transition-opacity duration-150 hover:opacity-70"
        >
          GABRIEL RICHARDSON
        </Link>
      </div>
      <div className="h-px w-full bg-[#ededed]" />
    </div>
  );
}

export default function HomeHero({
  onTransitionTrigger,
  onResetPointChange,
  onHeroSettlePointChange,
  triggerResetKey,
}: {
  onTransitionTrigger?: () => void;
  onResetPointChange?: (targetY: number) => void;
  onHeroSettlePointChange?: (targetY: number) => void;
  triggerResetKey?: number;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasTriggeredRef = useRef(false);

  const face1MeasureRef = useRef<HTMLSpanElement | null>(null);
  const face2MeasureRef = useRef<HTMLSpanElement | null>(null);

  const face1VisibleRef = useRef<HTMLSpanElement | null>(null);
  const face2VisibleRef = useRef<HTMLSpanElement | null>(null);

  const [scrollYValue, setScrollYValue] = useState(0);
  const [progress, setProgress] = useState(0);
  const [rawProgress, setRawProgress] = useState(0);

  const [containerWidth, setContainerWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  const [face1FitScaleX, setFace1FitScaleX] = useState(1);
  const [face1FitScaleY, setFace1FitScaleY] = useState(1);

  const [face2FitScaleX, setFace2FitScaleX] = useState(1);
  const [face2FitScaleY, setFace2FitScaleY] = useState(1);

  const [face1NaturalWidth, setFace1NaturalWidth] = useState(0);
  const [face2NaturalWidth, setFace2NaturalWidth] = useState(0);

  const [fontsReady, setFontsReady] = useState(false);
  const [measuredReady, setMeasuredReady] = useState(false);

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
        const currentViewportHeight = window.innerHeight;

        const start = sectionTop;
        const end = sectionTop + sectionHeight - currentViewportHeight;
        const raw = end > start ? (y - start) / (end - start) : 0;

        setRawProgress(raw);
        setProgress(clamp(raw));
      }

      frameId = window.requestAnimationFrame(update);
    };

    frameId = window.requestAnimationFrame(update);

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const HERO_PROGRESS = Math.pow(progress, 1.65);
  const HERO_PROGRESS_UNCLAMPED = Math.pow(Math.max(0, rawProgress), 1.65);

  useEffect(() => {
    hasTriggeredRef.current = false;
  }, [triggerResetKey]);

  const FACE_H = 600;
  const FACE_MIN = 10;
  const SEAM_H = -114;
  const FACE1_Y_NUDGE_PX = -42;
  const FACE1_TEXT_SCALE_Y = 0.9;

  const FACE2_FULL_H = 490;
  const FACE2_STRIP_H = 40;
  const FACE2_COMPRESSED_H = 0.001;

  const FACE2_LOCK_TOP_RATIO = 0.02;
  const FACE2_LOCK_TOP = viewportHeight * FACE2_LOCK_TOP_RATIO;

  const face1TopDrift = 0.1 * Math.pow(HERO_PROGRESS, 1.6);
  const compressionProgress = Math.pow(HERO_PROGRESS, 0.6);

  const face1Height = Math.max(
    FACE_MIN,
    FACE_H - compressionProgress * (FACE_H - FACE_MIN),
  );

  const face1AnimatedScaleY = 0.01 + (1 - compressionProgress) * 0.99;

  const face1Top = face1TopDrift;
  const face1Bottom = face1Top + face1Height;

  const face2BottomStart = FACE_H + SEAM_H + FACE2_STRIP_H;
  const face2BottomEnd = 320;

  const face2RevealBottom = lerp(
    face2BottomStart,
    face2BottomEnd,
    Math.pow(HERO_PROGRESS, 0.88),
  );

  const face2RevealTop = FACE_H + SEAM_H + (face1Bottom - FACE_H) * 0.9;
  const face2RevealHeight = Math.max(
    FACE2_STRIP_H,
    face2RevealBottom - face2RevealTop,
  );

  const face2RevealProgress = clamp(
    (face2RevealHeight - FACE2_STRIP_H) / (FACE2_FULL_H - FACE2_STRIP_H),
  );

  const face2RevealScaleY = face2RevealProgress * 0.99;

  const FACE2_COMPRESS_START = 0.9;
  const FACE2_COMPRESS_SPEED = 1.0;

  const face2CompressRaw = Math.max(
    0,
    (HERO_PROGRESS_UNCLAMPED - FACE2_COMPRESS_START) * FACE2_COMPRESS_SPEED,
  );

  const face2TopCompressProgress = clamp(Math.pow(face2CompressRaw, 0.9));
  const face2BodyCompressProgress = clamp(Math.pow(face2CompressRaw, 1.2));

  const face2Top = lerp(
    face2RevealTop,
    FACE2_LOCK_TOP,
    face2TopCompressProgress,
  );

  const face2Height = lerp(
    face2RevealHeight,
    FACE2_COMPRESSED_H,
    face2BodyCompressProgress,
  );

  const face2ScaleY = lerp(
    face2RevealScaleY,
    0.001,
    face2BodyCompressProgress,
  );

  useEffect(() => {
    if (!sectionRef.current || !onResetPointChange) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const sectionAbsoluteTop = window.scrollY + sectionRect.top;
    const headerOffset = 44;

    const targetY = Math.max(
      0,
      sectionAbsoluteTop + face2RevealTop - headerOffset,
    );

    onResetPointChange(targetY);
  }, [face2RevealTop, onResetPointChange]);

  useEffect(() => {
    if (!sectionRef.current || !onHeroSettlePointChange) return;

    const targetRevealProgress = 0.56;

    const getRevealProgressForRaw = (candidateRaw: number) => {
      const candidateProgress = clamp(candidateRaw);
      const candidateHeroProgress = Math.pow(candidateProgress, 1.65);

      const candidateCompressionProgress = Math.pow(candidateHeroProgress, 0.6);
      const candidateFace1Height = Math.max(
        FACE_MIN,
        FACE_H - candidateCompressionProgress * (FACE_H - FACE_MIN),
      );
      const candidateFace1TopDrift =
        0.1 * Math.pow(candidateHeroProgress, 1.6);
      const candidateFace1Bottom =
        candidateFace1TopDrift + candidateFace1Height;

      const candidateFace2RevealBottom = lerp(
        face2BottomStart,
        face2BottomEnd,
        Math.pow(candidateHeroProgress, 0.88),
      );

      const candidateFace2RevealTop =
        FACE_H + SEAM_H + (candidateFace1Bottom - FACE_H) * 0.9;

      const candidateFace2RevealHeight = Math.max(
        FACE2_STRIP_H,
        candidateFace2RevealBottom - candidateFace2RevealTop,
      );

      return clamp(
        (candidateFace2RevealHeight - FACE2_STRIP_H) /
          (FACE2_FULL_H - FACE2_STRIP_H),
      );
    };

    let bestRaw = 0;
    let bestDiff = Number.POSITIVE_INFINITY;

    for (let i = 0; i <= 1000; i += 1) {
      const candidateRaw = i / 1000;
      const candidateReveal = getRevealProgressForRaw(candidateRaw);
      const diff = Math.abs(candidateReveal - targetRevealProgress);

      if (diff < bestDiff) {
        bestDiff = diff;
        bestRaw = candidateRaw;
      }
    }

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const sectionAbsoluteTop = window.scrollY + sectionRect.top;
    const sectionHeight = sectionRef.current.offsetHeight;
    const currentViewportHeight = window.innerHeight;

    const start = sectionAbsoluteTop;
    const end = sectionAbsoluteTop + sectionHeight - currentViewportHeight;

    const targetY = Math.max(0, start + (end - start) * bestRaw);

    onHeroSettlePointChange(targetY);
  }, [
    onHeroSettlePointChange,
    viewportHeight,
    FACE_H,
    FACE_MIN,
    SEAM_H,
    FACE2_FULL_H,
    FACE2_STRIP_H,
    face2BottomStart,
    face2BottomEnd,
  ]);

  useEffect(() => {
    if (!hasTriggeredRef.current && face2BodyCompressProgress >= 0.34) {
      hasTriggeredRef.current = true;
      onTransitionTrigger?.();
    }
  }, [face2BodyCompressProgress, onTransitionTrigger]);

  useLayoutEffect(() => {
    const measure = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setContainerWidth(width);
      setViewportHeight(height);

      if (face1MeasureRef.current) {
        const rect = face1MeasureRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setFace1NaturalWidth(rect.width);
          setFace1FitScaleX(width / rect.width);
          setFace1FitScaleY(FACE_H / rect.height);
        }
      }

      if (face2MeasureRef.current) {
        const rect = face2MeasureRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setFace2NaturalWidth(rect.width);
          setFace2FitScaleX(width / rect.width);
          setFace2FitScaleY(FACE2_FULL_H / rect.height);
        }
      }
    };

    const run = async () => {
      if ("fonts" in document) {
        await document.fonts.ready;
      }
      setFontsReady(true);
      measure();
      setMeasuredReady(true);
    };

    run();
    window.addEventListener("resize", run);

    return () => window.removeEventListener("resize", run);
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 w-screen">
        <SiteBanner />
      </div>

      {/* <div className="fixed left-4 top-[56px] z-[9999] rounded bg-black px-3 py-2 text-xs text-white">
        <div>scrollY: {scrollYValue.toFixed(0)}</div>
        <div>progress: {progress.toFixed(3)}</div>
        <div>hero: {HERO_PROGRESS.toFixed(3)}</div>
        <div>w: {containerWidth}</div>
        <div>vh: {viewportHeight}</div>
        <div>lock ratio: {FACE2_LOCK_TOP_RATIO.toFixed(3)}</div>
        <div>lock top: {FACE2_LOCK_TOP.toFixed(1)}</div>
        <div>f2 reveal: {face2RevealProgress.toFixed(3)}</div>
        <div>f2 top compress: {face2TopCompressProgress.toFixed(3)}</div>
        <div>f2 body compress: {face2BodyCompressProgress.toFixed(3)}</div>
        <div>f1 top: {face1Top.toFixed(1)}</div>
        <div>f1 bottom: {face1Bottom.toFixed(1)}</div>
        <div>f2 reveal top: {face2RevealTop.toFixed(1)}</div>
        <div>f2 top: {face2Top.toFixed(1)}</div>
        <div>f2 height: {face2Height.toFixed(1)}</div>
      </div> */}

      <div className="pointer-events-none absolute left-[-99999px] top-[-99999px] opacity-0">
        <span
          ref={face1MeasureRef}
          className="font-grith text-[240px] uppercase whitespace-nowrap"
        >
          Creative Technologist
        </span>

        <span
          ref={face2MeasureRef}
          className="font-grith text-[220px] uppercase whitespace-nowrap"
        >
          Building Interactive Systems
        </span>
      </div>

      <section
        ref={sectionRef}
        className="relative h-[120vh] bg-[#232323] transition-opacity duration-150"
        style={{ opacity: fontsReady && measuredReady ? 1 : 0 }}
      >
        <div className="sticky top-[44px] h-[calc(100vh-44px)] overflow-hidden">
          <div className="relative h-full w-full overflow-hidden">
            <div
              className="absolute left-0 right-0 overflow-hidden"
              style={{
                top: face1Top,
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                height: face1Height,
                color: "#ededed",
              }}
            >
              <div
                style={{
                  width: face1NaturalWidth,
                  transform: `translateY(${FACE1_Y_NUDGE_PX}px) scaleX(${face1FitScaleX}) scaleY(${face1FitScaleY * face1AnimatedScaleY * FACE1_TEXT_SCALE_Y})`,
                  transformOrigin: "left top",
                  willChange: "transform",
                }}
              >
                <span
                  ref={face1VisibleRef}
                  className="font-grith text-[240px] uppercase whitespace-nowrap"
                >
                  Creative Technologist
                </span>
              </div>
            </div>

            <div
              className="absolute left-0 right-0 overflow-hidden"
              style={{
                top: face2Top,
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                height: face2Height,
                color: "#ededed",
              }}
            >
              <div
                style={{
                  width: face2NaturalWidth,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transform: `scaleX(${face2FitScaleX}) scaleY(${face2FitScaleY * face2ScaleY})`,
                  transformOrigin: "left top",
                  willChange: "transform",
                }}
              >
                <span
                  ref={face2VisibleRef}
                  className="font-grith text-[220px] uppercase whitespace-nowrap"
                >
                  Building Interactive Systems
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}