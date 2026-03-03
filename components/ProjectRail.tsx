import Link from "next/link";
import type { Project } from "@/lib/projects";

function ProjectTile({ project }: { project: Project }) {
  const content = (
    <div className="grid grid-cols-[220px_1fr] gap-6">
      <div className="aspect-square w-[220px] bg-white/90 text-black p-6">
        <div className="text-3xl font-semibold leading-tight">{project.tileLabel}</div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="text-3xl font-semibold">{project.title}</div>
        <div className="mt-4 flex flex-wrap gap-2 text-sm opacity-80">
          {project.skills.map((s) => (
            <span key={s} className="border border-white/20 px-2 py-1">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (project.disabled) {
    return (
      <section className="snap-start px-6">
        <div className="mx-auto max-w-6xl py-12 opacity-40">{content}</div>
      </section>
    );
  }

  return (
    <section className="snap-start px-6">
      <Link href={`/project/${project.slug}`} className="block">
        <div className="mx-auto max-w-6xl py-12 hover:opacity-95">{content}</div>
      </Link>
    </section>
  );
}

export default function ProjectRail({ projects }: { projects: Project[] }) {
  return (
    <div className="h-[calc(100vh-170px)] overflow-y-auto scroll-smooth snap-y snap-mandatory">
      {/* Peek effect: tiles are shorter than viewport */}
      <div className="py-10 space-y-10">
        {projects.map((p) => (
          <ProjectTile key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}