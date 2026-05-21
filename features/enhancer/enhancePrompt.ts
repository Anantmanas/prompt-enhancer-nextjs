import { modelStrategies } from "./modelStrategies";
import type { EnhanceRequest } from "./types";

export function enhancePrompt(request: EnhanceRequest) {
  if (!request.rawPrompt.trim()) {
    throw new Error("Add a prompt before enhancing.");
  }

  return modelStrategies[request.model].build(request);
}

export function estimateCredits(rawPrompt: string, model: EnhanceRequest["model"]) {
  const baseCost = 1;
  const longPromptCost = rawPrompt.length > 3000 ? 2 : 0;
  const premiumModelCost = ["nemotron3", "bolt", "v0", "emergent"].includes(model) ? 1 : 0;

  return baseCost + longPromptCost + premiumModelCost;
}
