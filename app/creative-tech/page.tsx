import HomeHero from "@/components/HomeHero";
import SectionTwo from "@/components/SectionTwo";

const placeholderProjects = [
  {
    index: "01",
    title: "Experiential systems for live audiences",
    category: "Prototype block",
    note: "Placeholder project module for future homepage work.",
  },
  {
    index: "02",
    title: "Digital environments for culture-led brands",
    category: "Case study block",
    note: "Placeholder project module for future homepage work.",
  },
  {
    index: "03",
    title: "Interaction concepts with a restrained visual pace",
    category: "Archive block",
    note: "Placeholder project module for future homepage work.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#232323] text-[#ededed]">
      <HomeHero>
        <SectionTwo />

        <section className="bg-[#232323] px-5 pb-16 min-[900px]:px-8 min-[900px]:pb-24">
          <div className="grid gap-6">
            {placeholderProjects.map((project) => (
              <article
                key={project.index}
                className="grid gap-8 border border-white/10 bg-[#2b2b2b] px-5 py-6 min-[900px]:grid-cols-[120px_minmax(0,1fr)_280px] min-[900px]:items-end min-[900px]:gap-10 min-[900px]:px-8 min-[900px]:py-9"
              >
                <div className="font-body text-[11px] uppercase tracking-[0.14em] text-[#b5b5b5] min-[900px]:text-[12px]">
                  {project.index}
                </div>

                <div>
                  <p className="font-body text-[11px] uppercase tracking-[0.14em] text-[#b5b5b5] min-[900px]:text-[12px]">
                    {project.category}
                  </p>
                  <h2 className="mt-3 font-head text-[clamp(2.75rem,6vw,5.5rem)] uppercase leading-[0.82] tracking-[-0.06em] text-[#ededed]">
                    {project.title}
                  </h2>
                </div>

                <p className="font-body max-w-[32ch] text-sm leading-6 text-[#b5b5b5]">
                  {project.note}
                </p>
              </article>
            ))}
          </div>
        </section>
      </HomeHero>
    </main>
  );
}