"use client";

import HomeHero from "@/components/HomeHero";
import HomeIntro from "@/components/HomeIntro";
import ProjectRail from "@/components/ProjectRail";
import SkillsBanner from "@/components/SkillsBanner";
import { projects } from "@/app/data/projects";
import useActiveSection from "@/app/hooks/useActiveSection";

export default function Home() {
  const activeIndex = useActiveSection(projects.length);

  return (
    <main className="min-h-screen bg-[#232323] text-[#ededed]">
      <HomeHero />
      <HomeIntro />
      <SkillsBanner projects={projects} activeIndex={activeIndex} />
      <ProjectRail projects={projects} />
    </main>
  );
}