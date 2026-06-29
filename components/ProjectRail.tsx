"use client";

import Link from "next/link";
import type { Project } from "@/app/types/projects";

type ProjectRailProps = {
  projects: Project[];
};

function ProjectTile({ project, index }: { project: Project; index: number }) {
  const content = (
    <div className="relative h-full w-full overflow-hidden border-y border-white/10 bg-[#2b2b2b]">
      {project.image ? (
        <img
          src={project.image}
          srcSet={
            project.image.endsWith(".jpg")
              ? `${project.image} 1x, ${project.image.replace(".jpg", "@2x.jpg")} 2x`
              : undefined
          }
          alt={project.title}
          className="absolute inset-0 z-0 h-full w-full object-cover transition-all duration-300 min-[900px]:group-hover:brightness-[0.5] min-[900px]:group-hover:scale-[1.015]"
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 z-0 bg-[#3a3a3a]" />
      )}

      <div className="pointer-events-none absolute inset-0 z-10 opacity-100 min-[900px]:opacity-0 min-[900px]:transition-opacity min-[900px]:duration-300 min-[900px]:group-hover:opacity-100">
        <div className="h-full">
          <div className="max-w-[980px] pl-[2.5vw] pt-[-4vw]">
            <h2 className="mt-[60px] max-w-[78ch] font-grith text-[clamp(6.5rem,10vw,11rem)] uppercase leading-[0.88] tracking-[-0.005em] text-[#ededed] [font-synthesis:none]">
              {project.title}
            </h2>

            {project.railCopy ? (
              <div className="-mt-[60px] max-w-[72ch] font-newrail text-[clamp(1.15rem,1.5vw,1.65rem)] font-bold leading-[1.12] text-[#ededed]">
                {project.railCopy.question && (
                  <p>{project.railCopy.question}</p>
                )}

                {project.railCopy.body && (
                  <p className="mt-8">{project.railCopy.body}</p>
                )}

                {project.railCopy.close && (
                  <p className="mt-8">{project.railCopy.close}</p>
                )}
              </div>
            ) : (
              <p className="-mt-[60px] max-w-[72ch] font-newrail text-[clamp(1.15rem,1.5vw,1.65rem)] font-bold leading-[1.12] text-[#ededed]">
                {project.note}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (project.disabled) {
    return (
      <section
        data-project
        data-project-index={index}
        className="group h-[78vh]"
      >
        {content}
      </section>
    );
  }

  return (
    <section data-project data-project-index={index} className="group h-[78vh]">
      <Link href={`/project/${project.slug}`} className="block h-full">
        {content}
      </Link>
    </section>
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