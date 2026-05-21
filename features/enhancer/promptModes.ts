import type { PromptMode } from "./types";

export const promptModes: Array<{
  id: PromptMode;
  label: string;
  description: string;
}> = [
  {
    id: "code",
    label: "Code Generation",
    description: "Architecture, components, APIs, tests, and implementation constraints."
  },
  {
    id: "creative",
    label: "Creative Writing",
    description: "Voice, audience, scene, structure, style, and originality."
  },
  {
    id: "business",
    label: "Business / Marketing",
    description: "Audience, positioning, offer, channels, objections, and conversion goals."
  },
  {
    id: "developer",
    label: "Developer Assistant",
    description: "Debugging, refactoring, technical planning, edge cases, and verification."
  }
];

export const modeDirectives: Record<PromptMode, string[]> = {
  code: [
    "Define the app or feature goal clearly.",
    "Specify stack, architecture, routes, components, data models, and API contracts when relevant.",
    "Include accessibility, responsiveness, loading states, empty states, errors, and tests.",
    "Ask for production-quality code with maintainable boundaries."
  ],
  creative: [
    "Clarify audience, genre, tone, point of view, and desired emotional effect.",
    "Include constraints for originality, pacing, imagery, and structure.",
    "Request examples or variants when useful.",
    "Preserve the user's core idea while improving specificity."
  ],
  business: [
    "Define target customer, offer, outcome, channel, and conversion goal.",
    "Add positioning, objections, proof points, and success metrics.",
    "Request a clear structure for copy, strategy, or campaign output.",
    "Keep language polished, concise, and commercially useful."
  ],
  developer: [
    "State the technical problem and expected result.",
    "Provide environment details, constraints, relevant files, and reproduction steps when known.",
    "Ask for assumptions, risks, implementation plan, and verification steps.",
    "Prioritize practical debugging and maintainable code changes."
  ]
};
