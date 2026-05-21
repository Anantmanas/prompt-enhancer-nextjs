"use client";

import type { DetailLevel, OutputFormat, Tone } from "@/features/enhancer/types";

const tones: Tone[] = ["direct", "premium", "friendly", "technical"];
const details: DetailLevel[] = ["concise", "balanced", "deep"];
const formats: OutputFormat[] = ["structured", "checklist", "markdown", "json"];

export function PromptSettings({
  tone,
  detailLevel,
  outputFormat,
  includeContext,
  onToneChange,
  onDetailChange,
  onFormatChange,
  onContextChange
}: {
  tone: Tone;
  detailLevel: DetailLevel;
  outputFormat: OutputFormat;
  includeContext: boolean;
  onToneChange: (tone: Tone) => void;
  onDetailChange: (detail: DetailLevel) => void;
  onFormatChange: (format: OutputFormat) => void;
  onContextChange: (enabled: boolean) => void;
}) {
  return (
    <div className="grid gap-4 rounded-3xl border border-line bg-white/60 p-4 sm:grid-cols-2 lg:grid-cols-4">
      <Select label="Tone" value={tone} options={tones} onChange={(value) => onToneChange(value as Tone)} />
      <Select label="Detail" value={detailLevel} options={details} onChange={(value) => onDetailChange(value as DetailLevel)} />
      <Select label="Format" value={outputFormat} options={formats} onChange={(value) => onFormatChange(value as OutputFormat)} />
      <label className="interactive-field flex min-h-20 items-center justify-between gap-4 rounded-2xl border border-line bg-white/70 px-4">
        <span>
          <span className="block text-sm font-semibold text-ink">Context</span>
          <span className="block text-xs text-graphite">Add assumptions</span>
        </span>
        <input
          checked={includeContext}
          className="h-5 w-5 shrink-0 accent-ink"
          type="checkbox"
          onChange={(event) => onContextChange(event.target.checked)}
        />
      </label>
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="interactive-field focus-ring h-12 w-full rounded-2xl border border-line bg-white/80 px-3 text-sm capitalize text-graphite"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
