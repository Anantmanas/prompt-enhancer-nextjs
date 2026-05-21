"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { type ComponentType, type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type FramerSelectOption<T extends string> = {
  value: T;
  label: string;
  description: string;
  icon?: ComponentType<{ className?: string }>;
};

export function FramerSelect<T extends string>({
  label,
  hint,
  value,
  options,
  onChange
}: {
  label: string;
  hint: string;
  value: T;
  options: Array<FramerSelectOption<T>>;
  onChange: (value: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value) ?? options[0];
  const SelectedIcon = selected.icon;

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen((current) => !current);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <div className="mb-3">
        <label id={`${selectId}-label`} className="block font-semibold text-ink">
          {label}
        </label>
        <p className="text-sm text-graphite">{hint}</p>
      </div>

      <motion.button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${selectId}-label`}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleKeyDown}
        className="interactive-field focus-ring flex min-h-20 w-full items-center gap-4 rounded-3xl border border-line bg-white/75 px-4 py-3 text-left shadow-[0_18px_60px_rgba(31,38,55,0.1)] backdrop-blur-xl"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink text-white shadow-sm">
          {SelectedIcon ? <SelectedIcon className="h-5 w-5" /> : <Check className="h-5 w-5" />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-ink">{selected.label}</span>
          <span className="mt-1 line-clamp-2 block text-xs leading-5 text-graphite">{selected.description}</span>
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-white/80 text-ink"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 430, damping: 34 }}
            className="mt-2 overflow-hidden rounded-3xl border border-line bg-white/95 shadow-[0_28px_90px_rgba(17,19,24,0.18)] backdrop-blur-2xl"
          >
            <div role="listbox" aria-labelledby={`${selectId}-label`} className="max-h-80 overflow-y-auto p-2 pr-1">
              {options.map((option) => {
                const Icon = option.icon;
                const active = option.value === value;

                return (
                  <motion.button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "focus-ring flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left",
                      active ? "bg-ink text-white" : "text-ink hover:bg-mist/80"
                    )}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 440, damping: 32 }}
                  >
                    <span className={cn("mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl", active ? "bg-white/15" : "bg-white")}>
                      {Icon ? <Icon className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{option.label}</span>
                      <span className={cn("mt-1 block text-xs leading-5", active ? "text-white/75" : "text-graphite")}>
                        {option.description}
                      </span>
                    </span>
                    {active && <Check className="mt-2 h-4 w-4 shrink-0" />}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
