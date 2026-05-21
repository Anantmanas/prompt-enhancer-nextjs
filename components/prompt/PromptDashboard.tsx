"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { EnhancedPromptPanel } from "@/components/prompt/EnhancedPromptPanel";
import { ModeSelector } from "@/components/prompt/ModeSelector";
import { ModelSelector } from "@/components/prompt/ModelSelector";
import { PromptSettings } from "@/components/prompt/PromptSettings";
import { MotionButton, revealContainer, revealItem } from "@/components/ui/MotionPrimitives";
import { estimateCredits } from "@/features/enhancer/enhancePrompt";
import type { DetailLevel, OutputFormat, PromptMode, TargetModel, Tone } from "@/features/enhancer/types";

const starterPrompt = "Build a modern project management app for small creative teams.";

export function PromptDashboard() {
  const [rawPrompt, setRawPrompt] = useState(starterPrompt);
  const [model, setModel] = useState<TargetModel>("chatgpt");
  const [mode, setMode] = useState<PromptMode>("developer");
  const [tone, setTone] = useState<Tone>("premium");
  const [detailLevel, setDetailLevel] = useState<DetailLevel>("balanced");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("structured");
  const [includeContext, setIncludeContext] = useState(true);
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const credits = useMemo(() => estimateCredits(rawPrompt, model), [rawPrompt, model]);

  async function handleEnhance() {
    setError("");
    setIsGenerating(true);

    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          rawPrompt,
          model,
          mode,
          tone,
          detailLevel,
          outputFormat,
          includeContext
        })
      });

      const result = (await response.json()) as { enhancedPrompt?: string; error?: string };

      if (!response.ok || !result.enhancedPrompt) {
        throw new Error(result.error ?? "Unable to enhance prompt.");
      }

      setEnhancedPrompt(result.enhancedPrompt);
    } catch (enhancementError) {
      setError(enhancementError instanceof Error ? enhancementError.message : "Unable to enhance prompt.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <motion.div
      className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8"
      variants={revealContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col gap-5">
        <motion.section layout variants={revealItem} className="glass-panel rounded-[2rem] p-4 sm:p-6">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-semibold text-ink">Prompt Enhancer Dashboard</h1>
              <p className="mt-2 text-graphite">Choose a model, tune the workflow, and generate a copy-ready prompt.</p>
            </div>
            <motion.div
              key={credits}
              initial={{ scale: 0.94, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-full border border-line bg-white/70 px-4 py-2 text-sm font-medium text-graphite"
            >
              Estimated cost: <span className="text-ink">{credits} credits</span>
            </motion.div>
          </div>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-ink">Raw prompt</span>
            <textarea
              value={rawPrompt}
              onChange={(event) => setRawPrompt(event.target.value)}
              className="interactive-field focus-ring min-h-56 w-full resize-y rounded-3xl border border-line bg-white/80 p-5 text-base leading-7 text-ink placeholder:text-graphite/60"
              placeholder="Describe what you want the AI to do..."
            />
          </label>
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="mt-3 rounded-2xl bg-coral/10 px-4 py-3 text-sm font-medium text-ink"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.section>

        <motion.section layout variants={revealItem}>
          <ModelSelector value={model} onChange={setModel} />
        </motion.section>

        <motion.section layout variants={revealItem}>
          <ModeSelector value={mode} onChange={setMode} />
        </motion.section>

        <motion.section layout variants={revealItem}>
          <div className="mb-3">
            <h2 className="font-semibold text-ink">Customization</h2>
            <p className="text-sm text-graphite">Control tone, detail, format, and context assumptions.</p>
          </div>
          <PromptSettings
            tone={tone}
            detailLevel={detailLevel}
            outputFormat={outputFormat}
            includeContext={includeContext}
            onToneChange={setTone}
            onDetailChange={setDetailLevel}
            onFormatChange={setOutputFormat}
            onContextChange={setIncludeContext}
          />
        </motion.section>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <motion.div variants={revealItem} layout>
          <EnhancedPromptPanel value={enhancedPrompt} isGenerating={isGenerating} />
          <MotionButton
            type="button"
            onClick={handleEnhance}
            disabled={isGenerating}
            className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 font-semibold text-white shadow-glass disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isGenerating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
            <span>{isGenerating ? "Enhancing prompt..." : "Enhance Prompt"}</span>
          </MotionButton>
        </motion.div>
      </div>
    </motion.div>
  );
}
