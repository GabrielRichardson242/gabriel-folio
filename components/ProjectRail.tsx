"use client";

import Link from "next/link";
import type { Project } from "@/app/types/projects";

type ProjectRailProps = {
  projects: Project[];
};

function ProjectTile({ project, index }: { project: Project; index: number }) {
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

      <div className="pointer-events-none absolute inset-0 z-10 opacity-100 min-[900px]:opacity-0 min-[900px]:transition-opacity min-[900px]:duration-300 min-[900px]:group-hover:opacity-100">
        <div className="flex h-full flex-col justify-between px-6 py-8 min-[900px]:px-10 min-[900px]:py-10">
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

  const section = (
    <section data-project data-project-index={index} className="h-[78vh]">
      {content}
    </section>
  );

  if (project.disabled) return section;

  return (
    <Link href={`/project/${project.slug}`} className="block">
      {section}
    </Link>
  );
}

export default function ProjectRail({ projects }: ProjectRailProps) {
  return (
    <div className="bg-[#232323]">
      {projects.map((project, index) => (
        <ProjectTile key={project.slug} project={project} index={index} />
      ))}

      <div className="h-[30vh]" />
    </div>
  );
}