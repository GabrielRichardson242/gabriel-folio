import type { Project } from "@/app/types/projects";

type SkillsBannerProps = {
  projects: Project[];
  activeIndex: number;
};

const PRACTICE_AREAS = [
  "Concept Development",
  "Systems Thinking",
  "Interaction Design",
  "Rapid Prototyping",
  "Evidence-Based Pitching",
  "Scalable Systems",
  "Physical Builds",
];

export default function SkillsBanner({
  projects,
  activeIndex,
}: SkillsBannerProps) {
  const activeProject = projects[activeIndex] ?? projects[0];

  return (
    <div className="sticky top-[44px] z-40 bg-[#232323]">
      <div className="border-y border-white/30 bg-[#232323]">
        <div className="overflow-hidden">
          <div className="font-disket flex items-center whitespace-nowrap px-8 py-[8px] text-[10px] uppercase tracking-[0.08em] min-[900px]:px-20">
            {[...PRACTICE_AREAS, "|", ...PRACTICE_AREAS].map((item, index) => {
              if (item === "|") {
                return (
                  <span
                    key={`separator-${index}`}
                    className="mr-[56px] shrink-0 text-[#ededed]"
                  >
                    |
                  </span>
                );
              }

              const activeSkills = activeProject?.thinkingSkills ?? [];
              const isActive = activeSkills.includes(item);

              return (
                <span
                  key={`${item}-${index}`}
                  className="mr-[72px] shrink-0 transition-colors duration-200"
                  style={{
                    color: isActive ? "#ededed" : "#373737",
                  }}
                >
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}