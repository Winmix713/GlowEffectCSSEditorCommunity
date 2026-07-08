import React, { useState } from 'react';
import { Slider } from "../../ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from '../../../lib/utils';
import { useGlowEditor } from '../context';

export function PositionSection() {
  const { state, actions } = useGlowEditor();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pt-4 border-t border-white/5">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <button className="flex items-center justify-between w-full text-sm font-medium text-zinc-400 hover:text-zinc-300 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 rounded-sm">
            <span>Glow Position</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-3 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-zinc-500">
                <label htmlFor="position-x-slider" className="cursor-pointer">Horizontal (X)</label>
                <span aria-live="polite">{state.positionX}px</span>
              </div>
              <Slider
                id="position-x-slider"
                value={[state.positionX]}
                onValueChange={(v) => actions.setPositionX(v[0])}
                min={-600}
                max={100}
                step={5}
                aria-label="Horizontal position"
                aria-valuetext={`${state.positionX}px`}
                className="focus-visible:ring-2 focus-visible:ring-zinc-400"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-zinc-500">
                <label htmlFor="position-y-slider" className="cursor-pointer">Vertical (Y)</label>
                <span aria-live="polite">{state.positionY}px</span>
              </div>
              <Slider
                id="position-y-slider"
                value={[state.positionY]}
                onValueChange={(v) => actions.setPositionY(v[0])}
                min={-800}
                max={100}
                step={5}
                aria-label="Vertical position"
                aria-valuetext={`${state.positionY}px`}
                className="focus-visible:ring-2 focus-visible:ring-zinc-400"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
