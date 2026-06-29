export type ProjectRailCopy = {
  question?: string;
  body?: string;
  close?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  note: string;
  image?: string;
  disabled?: boolean;
  thinkingSkills: string[];
  railCopy?: ProjectRailCopy;
};