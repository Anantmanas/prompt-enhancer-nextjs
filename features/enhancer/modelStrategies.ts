import { modeDirectives } from "./promptModes";
import type { EnhanceRequest, ModelStrategy, TargetModel } from "./types";

const modelGuidance: Record<TargetModel, string[]> = {
  chatgpt: [
    "Use a clear role, direct task statement, and explicit success criteria.",
    "Prefer numbered sections and concrete output requirements.",
    "Ask for assumptions to be stated before execution when the prompt is ambiguous."
  ],
  claude: [
    "Use rich context and careful constraints.",
    "Organize context with XML-style sections when helpful.",
    "Ask for nuanced tradeoffs, edge cases, and concise final recommendations."
  ],
  gemini: [
    "Make the request multimodal-ready and research-friendly.",
    "Ask for synthesis, comparisons, and source-aware reasoning when relevant.",
    "Keep the task structured with crisp deliverables."
  ],
  nemotron3: [
    "Use a direct instruction hierarchy with clear task, context, constraints, and final output shape.",
    "Leverage reasoning for prompt analysis, but return only the final enhanced prompt.",
    "Favor concrete examples, acceptance criteria, and copy-ready formatting over broad meta-instructions."
  ],
  bolt: [
    "Frame the prompt as an app-building specification.",
    "Include pages, components, data flow, responsive behavior, and implementation constraints.",
    "Avoid vague requests; specify what should be built in the first usable screen."
  ],
  v0: [
    "Focus on UI composition, visual hierarchy, component states, and responsive behavior.",
    "Specify design style, interactions, empty states, and accessibility.",
    "Ask for clean reusable React components."
  ],
  emergent: [
    "Describe the product, users, workflows, pages, and data models.",
    "Include end-to-end behavior, integrations, admin settings, and future scalability.",
    "Make success criteria concrete enough for an app generator."
  ],
  generic: [
    "Clarify role, task, context, constraints, output format, and evaluation criteria.",
    "Remove ambiguity and preserve the user's original intent.",
    "Structure the result for direct copy-paste use."
  ]
};

const modelLabels: Record<TargetModel, string> = {
  chatgpt: "ChatGPT",
  claude: "Claude",
  gemini: "Gemini",
  nemotron3: "Nemotron 3 Super 120B A12B",
  bolt: "Bolt.new",
  v0: "v0.dev",
  emergent: "Emergent",
  generic: "Future / Generic"
};

function formatDirectives(items: string[]) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function contextBlock(request: EnhanceRequest) {
  if (!request.includeContext) {
    return "Context depth: use only the information provided and ask concise clarification questions if required.";
  }

  return "Context depth: enrich the prompt with likely missing context, constraints, acceptance criteria, and edge cases while clearly labeling assumptions.";
}

function buildOutputInstructions(request: EnhanceRequest) {
  const formats = {
    structured: "Use labeled sections with clear headings and bullet points.",
    checklist: "Use an execution checklist with acceptance criteria.",
    markdown: "Return polished Markdown suitable for direct reuse.",
    json: "Return a JSON-ready structure with fields for role, task, context, constraints, and output."
  };

  return [
    `Tone: ${request.tone}.`,
    `Detail level: ${request.detailLevel}.`,
    `Output format: ${formats[request.outputFormat]}`,
    contextBlock(request)
  ].join("\n");
}

function buildPrompt(request: EnhanceRequest) {
  const model = modelLabels[request.model];
  const rawPrompt = request.rawPrompt.trim();
  const modeRules = modeDirectives[request.mode];
  const guidance = modelGuidance[request.model];

  return `You are an expert prompt engineer optimizing a prompt for ${model}.

<original_prompt>
${rawPrompt}
</original_prompt>

Enhance the prompt so it is immediately useful for ${model}. Preserve the user's intent, remove ambiguity, and make the request specific enough for a high-quality response.

Model optimization rules:
${formatDirectives(guidance)}

Workflow mode rules:
${formatDirectives(modeRules)}

Customization:
${buildOutputInstructions(request)}

Return only the enhanced prompt.`;
}

export const modelStrategies: Record<TargetModel, ModelStrategy> = {
  chatgpt: {
    id: "chatgpt",
    label: "ChatGPT",
    description: "Direct, structured, role-driven prompts with success criteria.",
    build: buildPrompt
  },
  claude: {
    id: "claude",
    label: "Claude",
    description: "Context-rich prompts with careful constraints and nuanced instructions.",
    build: buildPrompt
  },
  gemini: {
    id: "gemini",
    label: "Gemini",
    description: "Research-friendly, multimodal-ready prompts with crisp deliverables.",
    build: buildPrompt
  },
  nemotron3: {
    id: "nemotron3",
    label: "Nemotron 3 Super",
    description: "Reasoning-heavy prompts generated through NVIDIA-hosted Nemotron.",
    build: buildPrompt
  },
  bolt: {
    id: "bolt",
    label: "Bolt.new",
    description: "Implementation-heavy app specs for full-stack generation.",
    build: buildPrompt
  },
  v0: {
    id: "v0",
    label: "v0.dev",
    description: "UI-first prompts for layouts, components, and responsive states.",
    build: buildPrompt
  },
  emergent: {
    id: "emergent",
    label: "Emergent",
    description: "Product workflows, pages, data models, and app-generation detail.",
    build: buildPrompt
  },
  generic: {
    id: "generic",
    label: "Future / Generic",
    description: "Portable prompt structure for future AI systems.",
    build: buildPrompt
  }
};
