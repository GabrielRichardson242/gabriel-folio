export type Mode = "creative-tech" | "innovation-strat" | "experience-activation";

export const MODE_CONFIG: Record<
  Mode,
  { title: string; subtitle: string; toolStrip: string[]; order: string[] }
> = {
  "creative-tech": {
    title: "CREATIVE TECHNOLOGIST",
    subtitle: "Building Interactive, Audience-led Systems",
    toolStrip: ["WebGL", "Unity", "Live Interactivity", "Prototyping", "Behavioural Mechanics"],
    order: ["glasto", "ambroise", "shits", "scarf"],
  },
  "innovation-strat": {
    title: "INNOVATION / STRATEGY",
    subtitle: "New products, new systems, clear value",
    toolStrip: ["Concept Systems", "MVP Scoping", "Retention Loops", "Pitching", "Prototyping"],
    order: ["ambroise", "glasto", "shits", "scarf"],
  },
  "experience-activation": {
    title: "EXPERIENCE / ACTIVATION",
    subtitle: "Campaigns that people actually participate in",
    toolStrip: ["Experiential", "Events", "Interaction Design", "Brand Activation", "Prototyping"],
    order: ["shits", "glasto", "ambroise", "scarf"],
  },
};