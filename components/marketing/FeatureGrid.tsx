"use client";

import { Bot, Braces, Layers3, PenLine, Share2, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { MotionCard, revealContainer } from "@/components/ui/MotionPrimitives";

const features = [
  {
    icon: Bot,
    title: "Model-specific workflows",
    description: "Tune prompts for ChatGPT, Claude, Gemini, Bolt.new, v0.dev, Emergent, and generic assistants."
  },
  {
    icon: Braces,
    title: "Code generation mode",
    description: "Adds stack, constraints, architecture notes, edge cases, and implementation-ready detail."
  },
  {
    icon: PenLine,
    title: "Creative and business modes",
    description: "Shape voice, audience, structure, positioning, and story direction without clutter."
  },
  {
    icon: SlidersHorizontal,
    title: "Customization controls",
    description: "Adjust tone, output format, detail level, and context depth before enhancement."
  },
  {
    icon: Share2,
    title: "Export and share",
    description: "Copy polished prompts, export Markdown, or prepare shareable prompt records."
  },
  {
    icon: Layers3,
    title: "Scalable architecture",
    description: "Add new model strategies without rewriting the editor or product workflow."
  }
];

export function FeatureGrid() {
  return (
    <motion.section
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      variants={revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <MotionCard key={feature.title} className="glass-panel rounded-3xl p-6">
            <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-ink text-white">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-ink">{feature.title}</h2>
            <p className="mt-3 leading-7 text-graphite">{feature.description}</p>
          </MotionCard>
        );
      })}
    </motion.section>
  );
}
