import Header from "@/components/Header";
import ProjectRail from "@/components/ProjectRail";
import { MODE_CONFIG } from "@/lib/modes";
import { PROJECTS } from "@/lib/projects";

export default function ExperienceActivationPage() {
  const mode = MODE_CONFIG["experience-activation"];
  const orderedProjects = mode.order.map((slug) => PROJECTS[slug]).filter(Boolean);

  return (
    <main className="min-h-screen bg-black text-white">
      <Header
        leftName="Gabriel ‘Harry’ Richardson"
        modeTitle={mode.title}
        subtitle={mode.subtitle}
        toolStrip={mode.toolStrip}
      />
      <ProjectRail projects={orderedProjects} />
    </main>
  );
}