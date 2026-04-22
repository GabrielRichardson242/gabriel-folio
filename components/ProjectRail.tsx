"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/app/types/projects";

type ProjectRailProps = {
  projects: Project[];
  isActive?: boolean;
  initialIndex?: number;
  onProjectChange?: (index: number) => void;
  onExitToHero?: () => void;
};

type ProjectTileProps = {
  project: Project;
  index: number;
  sectionRef: (el: HTMLElement | null) => void;
};

type RailDebugItem = {
  index: number;
  top: number;
  bottom: number;
  height: number;
};

type RailIntent = "up" | "down" | "none";

function ProjectTile({ project, index, sectionRef }: ProjectTileProps) {
  const content = (
    <div className="group relative h-full w-full overflow-hidden border-y border-white/10 bg-[#2b2b2b]">
      {project.image ? (
        <img
          src={project.image}
          srcSet={
            project.image.endsWith(".jpg")
              ? `${project.image} 1x, ${project.image.replace(".jpg", "@2x.jpg")} 2x`
              : undefined
          }
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 bg-[#3a3a3a]" />
      )}

      <div className="absolute inset-0 bg-[rgba(220,232,245,0.38)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex h-full flex-col justify-between px-8 py-8 min-[900px]:px-10 min-[900px]:py-10">
          <div className="max-w-[720px]">
            <div className="font-body text-[11px] uppercase tracking-[0.14em] text-[#ededed] min-[900px]:text-[12px]">
              {project.category}
            </div>

            <h2 className="mt-4 font-head text-[clamp(3rem,6vw,6.4rem)] leading-[0.9] tracking-[-0.07em] text-[#ededed]">
              {project.title}
            </h2>

            <p className="mt-4 max-w-[34ch] font-body text-[clamp(1.05rem,1.5vw,1.45rem)] leading-[1.25] text-[#ededed]">
              {project.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const sectionProps = {
    ref: sectionRef,
    "data-project": true,
    "data-project-index": index,
    className: "h-[78vh]",
  };

  if (project.disabled) {
    return (
      <section {...sectionProps}>
        <div className="h-full w-full">{content}</div>
      </section>
    );
  }

  return (
    <section {...sectionProps}>
      <Link href={`/project/${project.slug}`} className="block h-full w-full">
        <div className="h-full w-full">{content}</div>
      </Link>
    </section>
  );
}

export default function ProjectRail({
  projects,
  isActive = false,
  initialIndex = 0,
  onProjectChange,
  onExitToHero,
}: ProjectRailProps) {
  const projectRefs = useRef<Array<HTMLElement | null>>([]);
  const isSnappingRef = useRef(false);
  const snapTimeoutRef = useRef<number | null>(null);
  const activeIndexRef = useRef(initialIndex);

  const intentRef = useRef<RailIntent>("none");
  const intentTimestampRef = useRef(0);

  const [debugItems, setDebugItems] = useState<RailDebugItem[]>([]);
  const [debugDriverIndex, setDebugDriverIndex] = useState<number | null>(null);
  const [debugDriverTop, setDebugDriverTop] = useState<number | null>(null);
  const [debugIsSnapping, setDebugIsSnapping] = useState(false);
  const [debugLastDelta, setDebugLastDelta] = useState<number>(0);
  const [debugIntent, setDebugIntent] = useState<RailIntent>("none");

  const PROJECT_ALIGN_TOP = 92.6;
  const SNAP_FORWARD_AT = 20;
  const SNAP_BACK_AT = 135;
  const EXIT_UP_AT = 165;
  const SNAP_DURATION_MS = 650;
  const WHEEL_DEADZONE = 1.5;
  const INTENT_MEMORY_MS = 420;

  const setProjectRef = (index: number) => (el: HTMLElement | null) => {
    projectRefs.current[index] = el;
  };

  const clearSnapTimeout = () => {
    if (snapTimeoutRef.current !== null) {
      window.clearTimeout(snapTimeoutRef.current);
      snapTimeoutRef.current = null;
    }
  };

  const getProjectRects = () => {
    return projectRefs.current
      .map((node, index) => {
        if (!node) return null;
        return {
          index,
          node,
          rect: node.getBoundingClientRect(),
        };
      })
      .filter(Boolean) as Array<{
      index: number;
      node: HTMLElement;
      rect: DOMRect;
    }>;
  };

  const getDriver = () => {
    const rects = getProjectRects();
    if (rects.length === 0) return null;

    let driver = rects[0];

    for (const item of rects) {
      if (
        Math.abs(item.rect.top - PROJECT_ALIGN_TOP) <
        Math.abs(driver.rect.top - PROJECT_ALIGN_TOP)
      ) {
        driver = item;
      }
    }

    return driver;
  };

  const emitProjectChange = (index: number) => {
    if (activeIndexRef.current === index) return;
    activeIndexRef.current = index;
    onProjectChange?.(index);
  };

  const snapToIndex = (targetIndex: number) => {
    const targetNode = projectRefs.current[targetIndex];
    if (!targetNode) return;
    if (isSnappingRef.current) return;

    const rect = targetNode.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const targetY = absoluteTop - PROJECT_ALIGN_TOP;

    isSnappingRef.current = true;
    setDebugIsSnapping(true);
    intentRef.current = "none";
    setDebugIntent("none");

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth",
    });

    clearSnapTimeout();
    snapTimeoutRef.current = window.setTimeout(() => {
      isSnappingRef.current = false;
      setDebugIsSnapping(false);
      emitProjectChange(targetIndex);
    }, SNAP_DURATION_MS);
  };

  useEffect(() => {
    if (!isActive) return;

    const clampedInitial = Math.max(
      0,
      Math.min(initialIndex, projects.length - 1),
    );
    activeIndexRef.current = clampedInitial;
    onProjectChange?.(clampedInitial);
  }, [isActive, initialIndex, onProjectChange, projects.length]);

  useEffect(() => {
    if (!isActive) return;

    const handleWheel = (event: WheelEvent) => {
      if (!isActive) return;
      if (isSnappingRef.current) return;

      setDebugLastDelta(event.deltaY);

      if (Math.abs(event.deltaY) < WHEEL_DEADZONE) return;

      const nextIntent: RailIntent = event.deltaY > 0 ? "down" : "up";
      intentRef.current = nextIntent;
      intentTimestampRef.current = performance.now();
      setDebugIntent(nextIntent);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    let frameId = 0;

    const tick = () => {
      const driver = getDriver();

      if (driver) {
        emitProjectChange(driver.index);
        setDebugDriverIndex(driver.index);
        setDebugDriverTop(driver.rect.top);

        if (Math.abs(driver.rect.top - PROJECT_ALIGN_TOP) < 12) {
          intentRef.current = "none";
          setDebugIntent("none");
        }

        const now = performance.now();
        const intentAge = now - intentTimestampRef.current;
        const activeIntent: RailIntent =
          intentAge <= INTENT_MEMORY_MS ? intentRef.current : "none";

        setDebugIntent(activeIntent);

        if (!isSnappingRef.current) {
          if (activeIntent === "down") {
            if (
              driver.index < projects.length - 1 &&
              driver.rect.top <= SNAP_FORWARD_AT
            ) {
              snapToIndex(driver.index + 1);
            }
          }

          if (activeIntent === "up") {
            if (driver.index === 0 && driver.rect.top >= EXIT_UP_AT) {
              intentRef.current = "none";
              setDebugIntent("none");
              onExitToHero?.();
            } else if (
              driver.index > 0 &&
              driver.rect.top >= SNAP_BACK_AT
            ) {
              snapToIndex(driver.index - 1);
            }
          }
        }
      } else {
        setDebugDriverIndex(null);
        setDebugDriverTop(null);
      }

      const rects = getProjectRects();
      setDebugItems(
        rects.map((item) => ({
          index: item.index,
          top: item.rect.top,
          bottom: item.rect.bottom,
          height: item.rect.height,
        })),
      );

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isActive, onExitToHero, onProjectChange, projects.length]);

  useEffect(() => {
    return () => {
      clearSnapTimeout();
    };
  }, []);

  return (
    <div className="bg-[#232323]">
      <div className="fixed left-4 top-[56px] z-[9999] rounded bg-black px-3 py-2 text-xs text-white">
        <div>railActive: {isActive ? "yes" : "no"}</div>
        <div>railIndex: {activeIndexRef.current}</div>
        <div>driver: {debugDriverIndex ?? "none"}</div>
        <div>
          driverTop:{" "}
          {debugDriverTop !== null ? debugDriverTop.toFixed(1) : "none"}
        </div>
        <div>railSnapping: {debugIsSnapping ? "yes" : "no"}</div>
        <div>lastDeltaY: {debugLastDelta.toFixed(1)}</div>
        <div>intent: {debugIntent}</div>
        <div>alignTop: {PROJECT_ALIGN_TOP.toFixed(1)}</div>
        <div>forwardAt: {SNAP_FORWARD_AT.toFixed(1)}</div>
        <div>backAt: {SNAP_BACK_AT.toFixed(1)}</div>
        <div>exitUpAt: {EXIT_UP_AT.toFixed(1)}</div>
        <div className="mt-2 border-t border-white/20 pt-2">
          {debugItems.map((item) => (
            <div key={item.index} className="mb-2">
              <div>
                {projects[item.index]?.title ?? `P${item.index}`} ({item.index})
              </div>
              <div>t: {item.top.toFixed(1)}</div>
              <div>b: {item.bottom.toFixed(1)}</div>
              <div>h: {item.height.toFixed(1)}</div>
            </div>
          ))}
        </div>
      </div>

      {projects.map((project, index) => (
        <ProjectTile
          key={project.slug}
          project={project}
          index={index}
          sectionRef={setProjectRef(index)}
        />
      ))}

      <div data-project-tail className="h-[40vh]" />
    </div>
  );
}