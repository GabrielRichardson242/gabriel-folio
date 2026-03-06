"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

const STACK_BREAKPOINT = 900;
const MOBILE_ZOOM_THRESHOLD = 1.5;

function useViewportMode() {
  const baseDprRef = useRef<number | null>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [zoomRatio, setZoomRatio] = useState(1);

  useEffect(() => {
    const readMetrics = () => {
      const currentDpr = window.devicePixelRatio || 1;
      if (baseDprRef.current === null) {
        baseDprRef.current = currentDpr;
      }

      const baseDpr = baseDprRef.current || 1;
      const nextZoom = currentDpr / baseDpr;

      setViewportWidth(window.innerWidth);
      setZoomRatio(Number.isFinite(nextZoom) && nextZoom > 0 ? nextZoom : 1);
    };

    readMetrics();

    window.addEventListener("resize", readMetrics);
    const viewport = window.visualViewport;
    viewport?.addEventListener("resize", readMetrics);

    return () => {
      window.removeEventListener("resize", readMetrics);
      viewport?.removeEventListener("resize", readMetrics);
    };
  }, []);

  const mobileMode =
    viewportWidth <= STACK_BREAKPOINT || zoomRatio >= MOBILE_ZOOM_THRESHOLD;

  const lockStyle = useMemo<CSSProperties | undefined>(() => {
    if (mobileMode) {
      return undefined;
    }

    const safeZoom = Math.min(Math.max(zoomRatio, 0.67), 1.49);
    return {
      transform: `scale(${1 / safeZoom})`,
      transformOrigin: "top left",
      width: `${safeZoom * 100}%`,
    };
  }, [mobileMode, zoomRatio]);

  return { mobileMode, lockStyle };
}

function Divider() {
  return <div className="h-[2px] w-full bg-[#CEDECE]" />;
}

function HomeHero({ mobileMode }: { mobileMode: boolean }) {
  return (
    <section className={mobileMode ? "w-full px-[20px] pt-4" : "w-full px-[42px] pt-6"}>
      <div
        className={
          mobileMode
            ? "grid w-full grid-cols-1 gap-0"
            : "grid w-full min-h-[calc(100vh-112px)] grid-cols-2 gap-0"
        }
      >
        <div
          className={
            mobileMode
              ? "w-full min-h-[300px] overflow-hidden bg-[#D9D9D9]"
              : "h-full w-full min-h-full overflow-hidden bg-[#D9D9D9]"
          }
        >
          <video
            src="/reel.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        </div>

        <div
          className={
            mobileMode
              ? "flex w-full min-h-[360px] flex-col justify-between bg-[#CFE0CF] p-[20px] text-[#242424]"
              : "flex h-full w-full min-h-full flex-col justify-between bg-[#CFE0CF] px-[42px] py-[56px] text-[#242424]"
          }
        >
          <div>
            <h1
              className={
                mobileMode
                  ? "font-head text-[clamp(2.5rem,12vw,4.5rem)] leading-[0.92]"
                  : "font-head text-[104px] leading-[0.9]"
              }
            >
              CREATIVE
              <br />
              TECHNOLOGIST
            </h1>

            <p
              className={
                mobileMode
                  ? "font-head mt-5 text-[20px] leading-tight text-[#DF4939]"
                  : "font-head mt-5 text-[30px] leading-tight text-[#DF4939]"
              }
            >
              Building Interactive, Audience-led Systems
            </p>

            <p
              className={
                mobileMode
                  ? "font-body mt-3 text-[12px] text-[#DF4939] opacity-90"
                  : "font-body mt-3 text-[13px] text-[#DF4939] opacity-90"
              }
            >
              WebGL&nbsp;&nbsp;|&nbsp;&nbsp;Unity&nbsp;&nbsp;|&nbsp;&nbsp;Live
              Interactivity
            </p>
          </div>

          <p
            className={
              mobileMode
                ? "font-body mt-7 text-[12px] leading-5 text-[#DF4939]"
                : "font-body mt-7 text-[13px] leading-5 text-[#DF4939]"
            }
          >
            Third year Design Marketing student at Kingston School of Art.
            <br />
            I build interactive systems that invite audiences to participate.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  title,
  role,
  context,
  mediaOnLeft,
  media,
  placeholderLabel,
  mobileMode,
}: {
  title: string;
  role: string;
  context: string;
  mediaOnLeft: boolean;
  media?: { src: string; alt: string };
  placeholderLabel?: string;
  mobileMode: boolean;
}) {
  return (
    <section className="py-[110px]">
      <div className={mobileMode ? "w-full px-[20px]" : "w-full px-[42px]"}>
        <div
          className={
            mobileMode
              ? "grid grid-cols-1 items-center gap-12"
              : `grid grid-cols-2 items-center gap-14 ${
                  mediaOnLeft ? "" : "[&>*:first-child]:order-2"
                }`
          }
        >
          <div className={mobileMode ? "flex justify-center" : "flex justify-center"}>
            {media ? (
              <Image
                src={media.src}
                alt={media.alt}
                width={560}
                height={360}
                className="h-auto w-full max-w-[560px] border border-[#CEDECE]/60"
                priority={false}
              />
            ) : (
              <div className="flex aspect-[4/3] w-full max-w-[560px] items-center justify-center border border-[#CEDECE]/60 bg-[#D9D9D9] text-black">
                <div className="font-body text-3xl font-semibold leading-tight">
                  {placeholderLabel ?? "Placeholder"}
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="font-head text-[56px] leading-[0.95] md:text-[72px]">
              {title}
            </h2>

            <div className="mt-6 font-body text-[13px] leading-5 text-[#CEDECE]">
              <div>{role}</div>
              <div className="opacity-70">{context}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { mobileMode, lockStyle } = useViewportMode();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#242424] text-[#CEDECE]">
      <div style={lockStyle}>
        <header
          className={
            mobileMode
              ? "flex w-full flex-col items-start justify-between gap-4 px-[20px] pt-6"
              : "flex w-full flex-row items-start justify-between gap-0 px-[42px] pt-8"
          }
        >
          <div className="font-body text-[14px] leading-5">
            <div>Gabriel Richardson</div>
            <div className="mt-2 opacity-70">
              Third year Design Marketing student
              <br />
              Kingston School of Art.
            </div>
          </div>

          <nav className="font-body text-[14px] opacity-90">
            <Link className="hover:opacity-100" href="/info">
              Info
            </Link>
            <span className="px-3 opacity-60">|</span>
            <Link className="hover:opacity-100" href="/cv">
              CV
            </Link>
            <span className="px-3 opacity-60">|</span>
            <Link className="hover:opacity-100" href="/contact">
              Contact
            </Link>
          </nav>
        </header>

        <HomeHero mobileMode={mobileMode} />

        <Divider />

        <ProjectRow
          mediaOnLeft
          media={{ src: "/glasto.jpg", alt: "Festival prototype" }}
          title="Festival interactive game prototype"
          role="Role: Concept and Technology Lead in a 2 person tech team"
          context="Third Year University Project"
          mobileMode={mobileMode}
        />

        <Divider />

        <ProjectRow
          mediaOnLeft={false}
          placeholderLabel="Ambroise"
          title="Ambroise digital gallery spaces"
          role="Role: Project Manager, Developer, Brand Designer, Strategist"
          context="Personal Project, turned Third Year University Project"
          mobileMode={mobileMode}
        />

        <Divider />

        <ProjectRow
          mediaOnLeft
          placeholderLabel="Shits and gigs"
          title="Blink 182 interactive experience"
          role="Role: Project Manager, Strategist, Lead Prototyper"
          context="Second Year University Project"
          mobileMode={mobileMode}
        />

        <Divider />
      </div>
    </main>
  );
}
