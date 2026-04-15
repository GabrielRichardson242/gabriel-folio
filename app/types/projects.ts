export type Project = {
  slug: string;
  title: string;
  category: string;
  note: string;
  image?: string;
  disabled?: boolean;
  thinkingSkills: string[];
  tools: string[];
};