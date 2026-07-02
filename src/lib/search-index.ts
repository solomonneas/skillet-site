import { NAV_LINKS } from "./site";

export type SearchEntry = {
  title: string;
  url: string;
  group: "Sections" | "Compare";
};

export function buildSearchIndex(): SearchEntry[] {
  return [
    { title: "Home", url: "/", group: "Sections" },
    ...NAV_LINKS.map((link) => ({
      title: link.label,
      url: `/${link.href}`,
      group: "Sections" as const,
    })),
    {
      title: "Skills for AI coding agents",
      url: "/compare/skills-for-ai-coding-agents",
      group: "Compare",
    },
  ];
}
