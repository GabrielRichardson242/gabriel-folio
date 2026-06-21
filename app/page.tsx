"use client";

import HomeOpening from "@/components/HomeOpening";
import ProjectRail from "@/components/ProjectRail";
import SkillsBanner from "@/components/SkillsBanner";
import { projects } from "@/app/data/projects";
import useActiveSection from "@/app/hooks/useActiveSection";

export default function Home() {
  const activeIndex = useActiveSection(projects.length);

  return (
    <main className="min-h-screen bg-[#232323] text-[#ededed]">
      <HomeOpening />
      <SkillsBanner projects={projects} activeIndex={activeIndex} />
      <ProjectRail projects={projects} />
    </main>
  );
}