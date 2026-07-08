import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible";
import { ChevronDown, Copy, Check, Code } from "lucide-react";
import { cn } from '../../../lib/utils';
import { useGlowEditor } from '../context';
import { motion } from 'motion/react';

export function CodeExport() {
  const { state } = useGlowEditor();
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const cssCode = `/* Glow Container */
.glow-effect {
  position: relative;
  transform: scale(${state.glowScale});
  mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
}

/* Primary Glow Layer */
.glow-layer {
  background-color: oklch(${Math.round(state.lightness)}% ${state.chroma} ${state.hue});
  filter: blur(120px);
  /* Height controlled by mask size */
  height: ${Math.round(900 * state.maskSize + 300)}px;
  width: 100%;
  opacity: 0.4;
  border-radius: 9999px;
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-2 flex flex-col gap-4">
      <div className="text-xs text-zinc-600 flex justify-center gap-4">
        <span>
          Simulating CSS{' '}
          <code className="bg-zinc-950 px-1 py-0.5 rounded text-zinc-500">backdrop-filter</code>
          {' '}&&{' '}
          <code className="bg-zinc-950 px-1 py-0.5 rounded text-zinc-500">mask-image</code>
        </span>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <button className="flex items-center justify-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors w-full py-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 rounded-sm">
            <Code className="w-3 h-3" />
            <span className="border-b border-transparent group-hover:border-zinc-500/50">View CSS Code</span>
            <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", isOpen && "rotate-180")} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2 relative bg-zinc-950/50 border border-white/5 rounded-lg overflow-hidden">
            <div className="absolute top-2 right-2 z-10">
              <motion.button
                onClick={handleCopy}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                aria-label={copied ? "Copied to clipboard" : "Copy CSS code to clipboard"}
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-green-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </motion.button>
            </div>
            <pre className="p-4 text-[10px] leading-relaxed font-mono text-zinc-400 overflow-x-auto">
              {cssCode}
            </pre>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
