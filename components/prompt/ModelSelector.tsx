"use client";

import { Bot, Code2, Cpu, Gem, Layers3, PenTool, Sparkles, Wand2 } from "lucide-react";
import { FramerSelect, type FramerSelectOption } from "@/components/ui/FramerSelect";
import { modelStrategies } from "@/features/enhancer/modelStrategies";
import type { TargetModel } from "@/features/enhancer/types";

const icons = {
  chatgpt: Bot,
  claude: PenTool,
  gemini: Gem,
  nemotron3: Sparkles,
  bolt: Cpu,
  v0: Layers3,
  emergent: Code2,
  generic: Wand2
};

const modelOptions = Object.values(modelStrategies).map((model) => ({
  value: model.id,
  label: model.label,
  description: model.description,
  icon: icons[model.id]
})) satisfies Array<FramerSelectOption<TargetModel>>;

export function ModelSelector({
  value,
  onChange
}: {
  value: TargetModel;
  onChange: (model: TargetModel) => void;
}) {
  return (
    <FramerSelect
      label="Target AI model"
      hint="Each model uses a distinct optimization strategy."
      value={value}
      options={modelOptions}
      onChange={onChange}
    />
  );
}
