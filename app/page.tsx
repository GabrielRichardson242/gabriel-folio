"use client";

import { useEffect, useRef, useState } from "react";
import HomeHero from "@/components/HomeHero";
import ProjectRail from "@/components/ProjectRail";
import SkillsBanner from "@/components/SkillsBanner";
import { projects } from "@/app/data/projects";
import useActiveSection from "@/app/hooks/useActiveSection";

type ProjectDebugItem = {
  index: number;
  top: number;
  bottom: number;
  height: number;
};

type SnapDebug = {
  direction: "up" | "down" | "none";
  isProjectSnapping: boolean;
  swipeDriverIndex: number | null;
  swipeDriverTop: number | null;
  snapTargetIndex: number | null;
  snapTargetTop: number | null;
};

export default function Home() {
  const activeIndex = useActiveSection(projects.length);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const hasAutoSettledRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const isProjectSnappingRef = useRef(false);

  const settleTimeoutRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);
  const projectSnapTimeoutRef = useRef<number | null>(null);

  const lastUpScrollTimeRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const boundaryArmedRef = useRef(false);

  const lockedScrollYRef = useRef(0);

  const [isLockedToProjects, setIsLockedToProjects] = useState(false);
  const [heroResetTargetY, setHeroResetTargetY] = useState(0);
  const [heroSettleTargetY, setHeroSettleTargetY] = useState(0);
  const [triggerResetKey, setTriggerResetKey] = useState(0);

  const [scrollYDebug, setScrollYDebug] = useState(0);
  const [contentTopDebug, setContentTopDebug] = useState(0);
  const [projectDebug, setProjectDebug] = useState<ProjectDebugItem[]>([]);
  const [snapDebug, setSnapDebug] = useState<SnapDebug>({
    direction: "none",
    isProjectSnapping: false,
    swipeDriverIndex: null,
    swipeDriverTop: null,
    snapTargetIndex: null,
    snapTargetTop: null,
  });

  const DOUBLE_INTENT_WINDOW = 260;
  const ANIMATION_MS = 750;

  const PROJECT_ALIGN_TOP = 92.6;
  const PROJECT_SWIPE_DISTANCE = 70;
  const SNAP_FORWARD_AT = PROJECT_ALIGN_TOP - PROJECT_SWIPE_DISTANCE; // 22.6
  const SNAP_BACK_AT = PROJECT_ALIGN_TOP + PROJECT_SWIPE_DISTANCE; // 162.6
  const PROJECT_SNAP_MS = 650;

  const HERO_LOCK_MIN = 70;
  const HERO_LOCK_MAX = 120;

  const clearTimers = () => {
    if (settleTimeoutRef.current !== null) {
      window.clearTimeout(settleTimeoutRef.current);
      settleTimeoutRef.current = null;
    }
    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    if (projectSnapTimeoutRef.current !== null) {
      window.clearTimeout(projectSnapTimeoutRef.current);
      projectSnapTimeoutRef.current = null;
    }
  };

  const triggerProjectSnap = (targetY: number) => {
    if (isAnimatingRef.current) return;
    if (isProjectSnappingRef.current) return;

    isProjectSnappingRef.current = true;
    boundaryArmedRef.current = false;

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth",
    });

    projectSnapTimeoutRef.current = window.setTimeout(() => {
      isProjectSnappingRef.current = false;
    }, PROJECT_SNAP_MS);
  };

  const triggerHeroReturn = () => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    boundaryArmedRef.current = false;
    isProjectSnappingRef.current = false;

    clearTimers();

    window.scrollTo({
      top: heroSettleTargetY,
      behavior: "smooth",
    });

    resetTimeoutRef.current = window.setTimeout(() => {
      isAnimatingRef.current = false;
      hasAutoSettledRef.current = false;
      setIsLockedToProjects(false);
      setTriggerResetKey((prev) => prev + 1);
    }, ANIMATION_MS);
  };

  const handleTransitionTrigger = () => {
    if (hasAutoSettledRef.current) return;
    if (!contentRef.current) return;
    if (isAnimatingRef.current) return;

    hasAutoSettledRef.current = true;
    isAnimatingRef.current = true;
    boundaryArmedRef.current = false;

    clearTimers();

    contentRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    settleTimeoutRef.current = window.setTimeout(() => {
      isAnimatingRef.current = false;
      setIsLockedToProjects(true);
      lockedScrollYRef.current = window.scrollY;
      lastScrollYRef.current = window.scrollY;
      boundaryArmedRef.current = false;
    }, ANIMATION_MS);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const direction =
        currentY > lastScrollYRef.current
          ? "down"
          : currentY < lastScrollYRef.current
            ? "up"
            : "none";

      lastScrollYRef.current = currentY;

      if (!isLockedToProjects) {
        setSnapDebug({
          direction,
          isProjectSnapping: isProjectSnappingRef.current,
          swipeDriverIndex: null,
          swipeDriverTop: null,
          snapTargetIndex: null,
          snapTargetTop: null,
        });
        return;
      }

      if (isAnimatingRef.current || isProjectSnappingRef.current) {
        setSnapDebug((prev) => ({
          ...prev,
          direction,
          isProjectSnapping: isProjectSnappingRef.current,
        }));
        return;
      }

      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-project-index]"),
      ).sort((a, b) => {
        const aIndex = Number(a.dataset.projectIndex ?? -1);
        const bIndex = Number(b.dataset.projectIndex ?? -1);
        return aIndex - bIndex;
      });

      if (nodes.length === 0) return;

      const rects = nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        const index = Number(node.dataset.projectIndex ?? -1);
        return { node, index, rect };
      });

      const project0 = rects.find((item) => item.index === 0);

      if (project0) {
        const project0Top = project0.rect.top;
        const inHeroLockZone =
          project0Top > HERO_LOCK_MIN && project0Top < HERO_LOCK_MAX;

        if (inHeroLockZone && currentY < lockedScrollYRef.current) {
          window.scrollTo({
            top: lockedScrollYRef.current,
            behavior: "auto",
          });
          return;
        }
      }

      let swipeDriverIndex: number | null = null;
      let swipeDriverTop: number | null = null;
      let snapTargetIndex: number | null = null;
      let snapTargetTop: number | null = null;

      if (direction === "down") {
        const driver = rects.find(
          (item) =>
            item.index < rects.length - 1 && item.rect.top <= SNAP_FORWARD_AT,
        );

        if (driver) {
          const targetIndex = driver.index + 1;
          const target = rects.find((item) => item.index === targetIndex);

          swipeDriverIndex = driver.index;
          swipeDriverTop = driver.rect.top;
          snapTargetIndex = target?.index ?? null;
          snapTargetTop = target?.rect.top ?? null;

          if (target) {
            setSnapDebug({
              direction,
              isProjectSnapping: isProjectSnappingRef.current,
              swipeDriverIndex,
              swipeDriverTop,
              snapTargetIndex,
              snapTargetTop,
            });

            const targetY = currentY + (target.rect.top - PROJECT_ALIGN_TOP);
            triggerProjectSnap(targetY);
            return;
          }
        }
      }

      if (direction === "up") {
        const driver = rects
          .slice()
          .reverse()
          .find((item) => item.index > 0 && item.rect.top >= SNAP_BACK_AT);

        if (driver) {
          const targetIndex = driver.index - 1;
          const target = rects.find((item) => item.index === targetIndex);

          swipeDriverIndex = driver.index;
          swipeDriverTop = driver.rect.top;
          snapTargetIndex = target?.index ?? null;
          snapTargetTop = target?.rect.top ?? null;

          if (target) {
            setSnapDebug({
              direction,
              isProjectSnapping: isProjectSnappingRef.current,
              swipeDriverIndex,
              swipeDriverTop,
              snapTargetIndex,
              snapTargetTop,
            });

            const targetY = currentY + (target.rect.top - PROJECT_ALIGN_TOP);
            triggerProjectSnap(targetY);
            return;
          }
        }
      }

      setSnapDebug({
        direction,
        isProjectSnapping: isProjectSnappingRef.current,
        swipeDriverIndex,
        swipeDriverTop,
        snapTargetIndex,
        snapTargetTop,
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLockedToProjects]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!isLockedToProjects) return;
      if (isAnimatingRef.current) return;
      if (isProjectSnappingRef.current) return;

      const project0 = document.querySelector<HTMLElement>(
        '[data-project-index="0"]',
      );

      if (!project0) {
        boundaryArmedRef.current = false;
        return;
      }

      const project0Top = project0.getBoundingClientRect().top;
      const inHeroLockZone =
        project0Top > HERO_LOCK_MIN && project0Top < HERO_LOCK_MAX;

      if (!inHeroLockZone) {
        boundaryArmedRef.current = false;
        return;
      }

      if (event.deltaY < 0) {
        event.preventDefault();

        const now = performance.now();

        if (!boundaryArmedRef.current) {
          boundaryArmedRef.current = true;
          lastUpScrollTimeRef.current = now;
          return;
        }

        const timeSinceLast = now - lastUpScrollTimeRef.current;

        if (timeSinceLast < DOUBLE_INTENT_WINDOW) {
          triggerHeroReturn();
        } else {
          lastUpScrollTimeRef.current = now;
        }

        return;
      }

      if (event.deltaY > 0) {
        boundaryArmedRef.current = false;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isLockedToProjects, heroSettleTargetY]);

  useEffect(() => {
    let frameId = 0;

    const updateDebug = () => {
      setScrollYDebug(window.scrollY || window.pageYOffset || 0);

      if (contentRef.current) {
        setContentTopDebug(contentRef.current.getBoundingClientRect().top);
      }

      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-project-index]"),
      ).sort((a, b) => {
        const aIndex = Number(a.dataset.projectIndex ?? -1);
        const bIndex = Number(b.dataset.projectIndex ?? -1);
        return aIndex - bIndex;
      });

      const nextDebug: ProjectDebugItem[] = nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        const index = Number(node.dataset.projectIndex ?? -1);

        return {
          index,
          top: rect.top,
          bottom: rect.bottom,
          height: rect.height,
        };
      });

      setProjectDebug(nextDebug);

      frameId = window.requestAnimationFrame(updateDebug);
    };

    frameId = window.requestAnimationFrame(updateDebug);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#232323] text-[#ededed]">
      <HomeHero
        onTransitionTrigger={handleTransitionTrigger}
        onResetPointChange={setHeroResetTargetY}
        onHeroSettlePointChange={setHeroSettleTargetY}
        triggerResetKey={triggerResetKey}
      />

      <div className="fixed right-4 top-[56px] z-[9999] rounded bg-black px-3 py-2 text-xs text-white">
        <div>scrollY: {scrollYDebug.toFixed(1)}</div>
        <div>activeIndex: {activeIndex}</div>
        <div>locked: {isLockedToProjects ? "yes" : "no"}</div>
        <div>contentTop: {contentTopDebug.toFixed(1)}</div>
        <div>projectEntry: {heroResetTargetY.toFixed(1)}</div>
        <div>heroSettle: {heroSettleTargetY.toFixed(1)}</div>
        <div>alignTop: {PROJECT_ALIGN_TOP.toFixed(1)}</div>
        <div>snapForwardAt: {SNAP_FORWARD_AT.toFixed(1)}</div>
        <div>snapBackAt: {SNAP_BACK_AT.toFixed(1)}</div>
        <div>direction: {snapDebug.direction}</div>
        <div>isProjectSnapping: {snapDebug.isProjectSnapping ? "yes" : "no"}</div>
        <div>
          swipeDriver:
          {" "}
          {snapDebug.swipeDriverIndex ?? "none"}
        </div>
        <div>
          swipeDriverTop:
          {" "}
          {snapDebug.swipeDriverTop !== null
            ? snapDebug.swipeDriverTop.toFixed(1)
            : "none"}
        </div>
        <div>
          snapTarget:
          {" "}
          {snapDebug.snapTargetIndex ?? "none"}
        </div>
        <div>
          snapTargetTop:
          {" "}
          {snapDebug.snapTargetTop !== null
            ? snapDebug.snapTargetTop.toFixed(1)
            : "none"}
        </div>

        <div className="mt-2 border-t border-white/20 pt-2">
          {projectDebug.map((item) => (
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

      <div
        ref={contentRef}
        className="relative z-40"
        style={{ scrollMarginTop: "44px" }}
      >
        <SkillsBanner projects={projects} activeIndex={activeIndex} />
        <ProjectRail projects={projects} />
      </div>
    </main>
  );
}