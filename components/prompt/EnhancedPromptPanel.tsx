"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Clipboard, Download, Share2 } from "lucide-react";
import { useState } from "react";
import { MotionButton } from "@/components/ui/MotionPrimitives";

export function EnhancedPromptPanel({ value, isGenerating = false }: { value: string; isGenerating?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    if (!value) {
      return;
    }

    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  function exportPrompt() {
    if (!value) {
      return;
    }

    const blob = new Blob([value], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "enhanced-prompt.md";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function sharePrompt() {
    if (!value) {
      return;
    }

    if (navigator.share) {
      await navigator.share({ title: "Enhanced Prompt", text: value });
      return;
    }

    await copyPrompt();
  }

  return (
    <section className="glass-panel flex min-h-[34rem] flex-col rounded-[2rem] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-ink">Enhanced Prompt</h2>
          <p className="text-sm text-graphite">Copy, export, or share the optimized result.</p>
        </div>
        <div className="flex gap-2">
          <MotionButton
            type="button"
            onClick={copyPrompt}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/70 text-ink transition hover:bg-white"
            aria-label="Copy prompt"
          >
            {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
          </MotionButton>
          <MotionButton
            type="button"
            onClick={exportPrompt}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/70 text-ink transition hover:bg-white"
            aria-label="Export prompt"
          >
            <Download className="h-4 w-4" />
          </MotionButton>
          <MotionButton
            type="button"
            onClick={sharePrompt}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/70 text-ink transition hover:bg-white"
            aria-label="Share prompt"
          >
            <Share2 className="h-4 w-4" />
          </MotionButton>
        </div>
      </div>
      <motion.div
        layout
        className="interactive-field relative flex-1 overflow-hidden whitespace-pre-wrap rounded-3xl border border-line bg-white/80 p-5 text-sm leading-7 text-ink"
      >
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="generating"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex h-full min-h-96 flex-col justify-center gap-4 text-graphite"
            >
              <div className="h-3 w-2/3 animate-pulse rounded-full bg-ink/10" />
              <div className="h-3 w-5/6 animate-pulse rounded-full bg-cyan/20" />
              <div className="h-3 w-1/2 animate-pulse rounded-full bg-lime/25" />
            </motion.div>
          ) : (
            <motion.div
              key={value || "empty"}
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.34 }}
            >
              {value || "Your enhanced prompt will appear here after generation."}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
