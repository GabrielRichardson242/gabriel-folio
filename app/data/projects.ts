import type { Project } from "@/app/types/projects";

export const projects: Project[] = [
  {
    slug: "festival-interactive-game",
    title: "Festival  Interactive  Game  Prototype",
    category: "Prototype block",
    note: "A Unity based project aimed to encourage younger festival go-ers back to Glastonbury, by adding a virtual collection based memory layer to the experience.",
    image: "/projects/glasto-hero.jpg",
    thinkingSkills: [
      "Concept Development",
      "Systems Thinking",
      "Interaction Design",
      "Rapid Prototyping",
      "Physical Builds",
    ],
    railCopy: {
      question:
        "How do you encourage young festival goers back to Glastonbury without changing the line-up?",
      body:
        "We built a collection based video game tied to their existing app, that automatically builds your Glastonbury experience as you dance, explore, and make memories to keep.",
      close:
        "Keep the app all year, keep the memories close, and keep next year's ticket drops rolling in. Win win.",
    },
  },
  {
    slug: "ambroise-digital-gallery",
    title: "LiDAR  Based  Digital  Gallery  Spaces",
    category: "Case study block",
    note: "A digital platform concept built to help emerging artists present and sell work through interactive spatial environments.",
    image: "/projects/galleries-thumbnail.jpg",
    thinkingSkills: [
      "Concept Development",
      "Systems Thinking",
      "Interaction Design",
      "Rapid Prototyping",
      "Evidence-Based Pitching",
      "Scalable Systems", 
    ],
     railCopy: {
      body:
        "In response to observations of limitations for young artists using Instagram to promote their work, I prototyped a digital product offering mobile first, customisable 3D gallery spaces and quick connectivity to promote their channels.",
      close:
        "This was well received in pitches and at the Kingston School of Art’s Gallery Show.",
    },
  },
  {
    slug: "restrained-visual-pace",
    title: "Interaction Concepts with a Restrained Visual Pace",
    category: "Archive block",
    note: "Placeholder project module for future homepage work.",
    image: "/placeholder-pace.jpg",
    thinkingSkills: [
      "Concept Development",
      "Systems Thinking",
      "Interaction Design",
      "Rapid Prototyping",
      "Physical Builds",
    ],
    disabled: true,
  },
];