export type TargetModel =
  | "chatgpt"
  | "claude"
  | "gemini"
  | "nemotron3"
  | "bolt"
  | "v0"
  | "emergent"
  | "generic";

export type PromptMode = "code" | "creative" | "business" | "developer";

export type OutputFormat = "structured" | "checklist" | "markdown" | "json";

export type DetailLevel = "concise" | "balanced" | "deep";

export type Tone = "direct" | "premium" | "friendly" | "technical";

export type EnhanceRequest = {
  rawPrompt: string;
  model: TargetModel;
  mode: PromptMode;
  tone: Tone;
  outputFormat: OutputFormat;
  detailLevel: DetailLevel;
  includeContext: boolean;
};

export type ModelStrategy = {
  id: TargetModel;
  label: string;
  description: string;
  build: (request: EnhanceRequest) => string;
};
