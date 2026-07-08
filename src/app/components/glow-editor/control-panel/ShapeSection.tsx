import React, { useState } from 'react';
import { Slider } from "../../ui/slider";
import { Switch } from "../../ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from '../../../lib/utils';
import { useGlowEditor } from '../context';
import { AnimatePresence, motion } from 'motion/react';

export function ShapeSection() {
  const { state, actions } = useGlowEditor();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4 pt-4 border-t border-white/5">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <button className="flex items-center justify-between w-full text-sm font-medium text-zinc-400 hover:text-zinc-300 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 rounded-sm">
            <span>Shape Configuration</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-zinc-500">
                <label htmlFor="mask-size-slider" className="cursor-pointer">Gradient Mask Size (Shape 1)</label>
                <span aria-live="polite">{Math.round(state.maskSize * 100)}%</span>
              </div>
              <Slider
                id="mask-size-slider"
                value={[state.maskSize]}
                onValueChange={(v) => actions.setMaskSize(v[0])}
                max={1}
                step={0.01}
                aria-label="Gradient Mask Size"
                aria-valuetext={`${Math.round(state.maskSize * 100)}%`}
                className="focus-visible:ring-2 focus-visible:ring-zinc-400"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-zinc-500">
                <label htmlFor="glow-scale-slider" className="cursor-pointer">Glow Scale</label>
                <span aria-live="polite">{state.glowScale.toFixed(1)}x</span>
              </div>
              <Slider
                id="glow-scale-slider"
                value={[state.glowScale]}
                onValueChange={(v) => actions.setGlowScale(v[0])}
                min={0.5}
                max={3}
                step={0.1}
                aria-label="Glow Scale"
                aria-valuetext={`${state.glowScale.toFixed(1)}x`}
                className="focus-visible:ring-2 focus-visible:ring-zinc-400"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label htmlFor="noise-switch" className="text-xs text-zinc-500 cursor-pointer">
                Noise Overlay
              </label>
              <Switch
                id="noise-switch"
                checked={state.noiseEnabled}
                onCheckedChange={actions.setNoiseEnabled}
                aria-label="Toggle noise overlay"
                className="data-[state=unchecked]:bg-zinc-950 border border-white/10"
              />
            </div>

            <AnimatePresence initial={false}>
              {state.noiseEnabled && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs text-zinc-500">
                      <label htmlFor="noise-intensity-slider" className="cursor-pointer">Noise Intensity</label>
                      <span aria-live="polite">{Math.round(state.noiseIntensity * 100)}%</span>
                    </div>
                    <Slider
                      id="noise-intensity-slider"
                      value={[state.noiseIntensity]}
                      onValueChange={(v) => actions.setNoiseIntensity(v[0])}
                      min={0}
                      max={1}
                      step={0.01}
                      aria-label="Noise Intensity"
                      aria-valuetext={`${Math.round(state.noiseIntensity * 100)}%`}
                      className="focus-visible:ring-2 focus-visible:ring-zinc-400"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
