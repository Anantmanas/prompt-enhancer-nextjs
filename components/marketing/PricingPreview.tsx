"use client";

import { motion } from "framer-motion";
import { MotionCard, revealContainer } from "@/components/ui/MotionPrimitives";

const plans = [
  { name: "Free", price: "$0", credits: "50 credits", detail: "For exploring prompt workflows." },
  { name: "Pro", price: "$19", credits: "2,000 credits", detail: "For creators, developers, and founders." },
  { name: "Team", price: "$49", credits: "Shared credits", detail: "For teams building prompt libraries." }
];

export function PricingPreview() {
  return (
    <motion.section
      className="grid gap-4 md:grid-cols-3"
      variants={revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {plans.map((plan) => (
        <MotionCard key={plan.name} className="rounded-3xl border border-line bg-white/70 p-6 backdrop-blur">
          <p className="text-sm font-medium text-cyan">{plan.name}</p>
          <div className="mt-3 flex items-end gap-1">
            <span className="text-4xl font-semibold text-ink">{plan.price}</span>
            <span className="pb-1 text-sm text-graphite">/mo</span>
          </div>
          <p className="mt-4 font-medium text-ink">{plan.credits}</p>
          <p className="mt-2 text-sm leading-6 text-graphite">{plan.detail}</p>
        </MotionCard>
      ))}
    </motion.section>
  );
}
