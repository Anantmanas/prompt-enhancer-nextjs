"use client";

import { BriefcaseBusiness, Code2, PenLine, Wrench } from "lucide-react";
import { FramerSelect, type FramerSelectOption } from "@/components/ui/FramerSelect";
import { promptModes } from "@/features/enhancer/promptModes";
import type { PromptMode } from "@/features/enhancer/types";

const icons = {
  code: Code2,
  creative: PenLine,
  business: BriefcaseBusiness,
  developer: Wrench
};

const modeOptions = promptModes.map((mode) => ({
  value: mode.id,
  label: mode.label,
  description: mode.description,
  icon: icons[mode.id]
})) satisfies Array<FramerSelectOption<PromptMode>>;

export function ModeSelector({
  value,
  onChange
}: {
  value: PromptMode;
  onChange: (mode: PromptMode) => void;
}) {
  return (
    <FramerSelect
      label="Prompt mode"
      hint="Tune the enhancement for the job the prompt needs to do."
      value={value}
      options={modeOptions}
      onChange={onChange}
    />
  );
}
