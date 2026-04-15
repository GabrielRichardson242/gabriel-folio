import type { Project } from "@/app/types/projects";

export const projects: Project[] = [
  {
    slug: "festival-interactive-game",
    title: "Festival Interactive Game Prototype",
    category: "Prototype block",
    note: "A Unity based project aimed to encourage younger festival go-ers back to Glastonbury, by adding a virtual collection based memory layer to the experience.",
    image: "/projects/glasto-hero.jpg",
    thinkingSkills: [
      "Concept Development",
      "System Thinking",
      "Interaction Design",
      "Rapid Prototyping",
      "Physical Builds",
    ],
    tools: [
      "Blender",
      "Unity",
      "Code",
      "Adobe Suite",
    ],
  },
  {
    slug: "ambroise-digital-gallery",
    title: "LiDAR Based Digital Gallery Spaces",
    category: "Case study block",
    note: "A digital platform concept built to help emerging artists present and sell work through interactive spatial environments.",
    image: "/placeholder-ambroise.jpg",
    thinkingSkills: [
      "Concept Development",
      "System Thinking",
      "Interaction Design",
      "AI-assisted Development",
      "Scalable Systems",
    ],
    tools: [
      "React",
      "Next.js",
      "Three.js",
      "Code",
    ],
  },
  {
    slug: "restrained-visual-pace",
    title: "Interaction Concepts with a Restrained Visual Pace",
    category: "Archive block",
    note: "Placeholder project module for future homepage work.",
    image: "/placeholder-pace.jpg",
    thinkingSkills: [
      "Concept Development",
      "System Thinking",
      "Interaction Design",
      "Rapid Prototyping",
      "Physical Builds",
    ],
    tools: [
      "Adobe Suite",
      "Code",
      "Microcontrollers",
    ],
    disabled: true,
  },
];