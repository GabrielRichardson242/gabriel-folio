import type { Project } from "@/app/types/projects";

type SkillsBannerProps = {
  projects: Project[];
  activeIndex: number;
};

const THINKING_SKILLS = [
  "Concept Development",
  "System Thinking",
  "Interaction Design",
  "Rapid Prototyping",
  "AI-assisted Development",
  "Scalable Systems",
  "Physical Builds",
];

const TOOLS = [
  "Blender",
  "React",
  "Next.js",
  "Three.js",
  "Unity",
  "Code",
  "Microcontrollers",
  "Adobe Suite",
];

function SkillRow({
  items,
  activeItems,
  itemSpacingClass,
}: {
  items: string[];
  activeItems: string[];
  itemSpacingClass: string;
}) {
  const repeatedItems = [...items, "|", ...items];

  return (
    <div className="overflow-hidden">
      <div className="font-disket flex items-center whitespace-nowrap px-8 py-[6px] text-[10px] uppercase tracking-[0.08em] min-[900px]:px-20">
        {repeatedItems.map((item, index) => {
          if (item === "|") {
            return (
              <span
                key={`separator-${index}`}
                className="mr-[38px] shrink-0 text-[#232323]"
              >
                |
              </span>
            );
          }

          const isActive = activeItems.includes(item);

          return (
            <span
              key={`${item}-${index}`}
              className={`shrink-0 transition-colors duration-200 ${itemSpacingClass}`}
              style={{
                color: isActive ? "#ff4b6e" : "#232323",
              }}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function SkillsBanner({
  projects,
  activeIndex,
}: SkillsBannerProps) {
  const activeProject = projects[activeIndex] ?? projects[0];

  return (
    <div className="sticky top-[44px] z-40 bg-[#ededed]">
      <div className="border-y border-white/30 bg-[#ededed]">
        <SkillRow
          items={THINKING_SKILLS}
          activeItems={activeProject.thinkingSkills}
          itemSpacingClass="mr-[60px]"
        />

        <div className="h-px w-full bg-[#232323]" />

        <SkillRow
          items={TOOLS}
          activeItems={activeProject.tools}
          itemSpacingClass="mr-[112px]"
        />
      </div>
    </div>
  );
}