"use client";

import HomeHero from "@/components/HomeHero";
import ProjectRail from "@/components/ProjectRail";
import SkillsBanner from "@/components/SkillsBanner";
import { projects } from "@/app/data/projects";
import useActiveSection from "@/app/hooks/useActiveSection";

export default function Home() {
  const activeIndex = useActiveSection(projects.length);

  return (
    <main className="min-h-screen bg-[#232323] text-[#ededed]">
      <HomeHero />

      <div className="fixed right-4 top-[56px] z-[9999] rounded bg-black px-3 py-2 text-xs text-white">
        activeIndex: {activeIndex}
      </div>

      <div
        className="relative z-40"
        style={{ marginTop: "clamp(-560px, 20vh, -420px)" }}
      >
        <SkillsBanner projects={projects} activeIndex={activeIndex} />

        <div style={{ paddingTop: "clamp(120px, -60vh, 200px)" }}>
          <ProjectRail projects={projects} />
        </div>
      </div>
    </main>
  );
}