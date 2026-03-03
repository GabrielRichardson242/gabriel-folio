export type Project = {
  slug: string;
  title: string;
  tileLabel: string;
  skills: string[];
  disabled?: boolean;
  previewVideo?: string; // optional later
};

export const PROJECTS: Record<string, Project> = {
  glasto: {
    slug: "glasto",
    title: "Glastonbury Game",
    tileLabel: "Cow drumming platform",
    skills: ["Concept lead", "Rapid prototyping", "Behavioural mechanics", "Retention model"],
  },
  ambroise: {
    slug: "ambroise",
    title: "Ambroise Digital Galleries",
    tileLabel: "Digital gallery room",
    skills: ["System design", "3D web", "Creator → buyer flow"],
  },
  shits: {
    slug: "shits",
    title: "30 Years of Sh*ts and Gigs",
    tileLabel: "Interactive toilet booth",
    skills: ["Experiential activation", "Installation prototype", "Campaign build"],
  },
  scarf: {
    slug: "scarf",
    title: "Scarf / Oil Salesman",
    tileLabel: "Hidden / coming soon",
    skills: ["—"],
    disabled: true,
  },
};