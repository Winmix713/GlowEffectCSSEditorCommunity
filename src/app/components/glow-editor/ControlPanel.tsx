import React, { useState } from 'react';
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronDown, Copy, Check, Code } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { cn } from '../../lib/utils';

interface ControlPanelProps {
  power: boolean;
  setPower: (v: boolean) => void;
  themeMode: 'dark' | 'light';
  setThemeMode: (v: 'dark' | 'light') => void;
  hexColor: string;
  setHexColor: (v: string) => void;
  lightness: number;
  setLightness: (v: number) => void;
  chroma: number;
  setChroma: (v: number) => void;
  hue: number;
  setHue: (v: number) => void;
  maskSize: number;
  setMaskSize: (v: number) => void;
  glowScale: number;
  setGlowScale: (v: number) => void;
  positionX: number;
  setPositionX: (v: number) => void;
  positionY: number;
  setPositionY: (v: number) => void;
  noiseEnabled: boolean;
  setNoiseEnabled: (v: boolean) => void;
  noiseIntensity: number;
  setNoiseIntensity: (v: number) => void;
}

export function ControlPanel({
  power, setPower,
  themeMode, setThemeMode,
  hexColor, setHexColor,
  lightness, setLightness,
  chroma, setChroma,
  hue, setHue,
  maskSize, setMaskSize,
  glowScale, setGlowScale,
  positionX, setPositionX,
  positionY, setPositionY,
  noiseEnabled, setNoiseEnabled,
  noiseIntensity, setNoiseIntensity
}: ControlPanelProps) {

  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPositionOpen, setIsPositionOpen] = useState(false);
  const [isShapeOpen, setIsShapeOpen] = useState(false);

  const cssCode = `/* Glow Container */
.glow-effect {
  position: relative;
  transform: scale(${glowScale});
  mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
}

/* Primary Glow Layer */
.glow-layer {
  background-color: oklch(${Math.round(lightness)}% ${chroma} ${hue});
  filter: blur(120px);
  /* Height controlled by mask size */
  height: ${Math.round(900 * maskSize + 300)}px;
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
    <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-6 text-zinc-100 shadow-2xl">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Glow Editor</h2>
          <p className="text-sm text-zinc-500">CSS Progressive Blur</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-500 tracking-wider uppercase">Power</span>
          <Switch 
            checked={power} 
            onCheckedChange={setPower} 
            className="data-[state=unchecked]:bg-zinc-950 border border-white/10 transition-colors duration-300"
            style={{ 
              backgroundColor: power ? hexColor : undefined,
              borderColor: power ? hexColor : undefined
            }}
          />
        </div>
      </div>

      {/* Theme Mode */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-400">Theme Mode</label>
        <Select value={themeMode} onValueChange={(v: 'dark' | 'light') => setThemeMode(v)}>
          <SelectTrigger className="w-full bg-zinc-950 border-zinc-800 text-zinc-300 h-9 rounded-lg">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-300">
            <SelectItem value="dark">Dark Mode</SelectItem>
            <SelectItem value="light">Light Mode</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Base Color */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-400">Base Color</label>
          <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-lg p-1 pr-3 h-8">
             <div 
              className="w-6 h-6 rounded-md border border-white/20 shadow-inner"
              style={{ backgroundColor: hexColor }}
             />
             <input 
               type="text" 
               value={hexColor}
               onChange={(e) => setHexColor(e.target.value)}
               className="bg-transparent border-none outline-none text-xs text-zinc-300 w-16 uppercase font-mono"
             />
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          {/* Lightness */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Lightness</span>
              <span>{Math.round(lightness)}%</span>
            </div>
            <div className="relative h-4 w-full">
               <div className="absolute inset-0 rounded-full bg-zinc-900 overflow-hidden pointer-events-none">
                 <div className="absolute inset-0 bg-gradient-to-r from-black to-white opacity-20" />
               </div>
               <Slider 
                 value={[lightness]} 
                 onValueChange={(v) => setLightness(v[0])} 
                 max={100} 
                 step={1}
                 className="[&_[data-slot=slider-track]]:bg-transparent [&_[data-slot=slider-range]]:bg-transparent"
               />
            </div>
          </div>

          {/* Chroma */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Chroma</span>
              <span>{chroma.toFixed(3)}</span>
            </div>
            <div className="relative h-4 w-full">
               <div className="absolute inset-0 rounded-full bg-zinc-900 overflow-hidden pointer-events-none">
                 <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-[oklch(0.6_0.3_0)] opacity-20" />
               </div>
               <Slider 
                 value={[chroma]} 
                 onValueChange={(v) => setChroma(v[0])} 
                 max={0.4} 
                 step={0.001}
                 className="[&_[data-slot=slider-track]]:bg-transparent [&_[data-slot=slider-range]]:bg-transparent"
               />
            </div>
          </div>

          {/* Hue */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Hue</span>
              <span>{Math.round(hue)}°</span>
            </div>
            <div className="relative h-4 w-full">
              <div className="absolute inset-0 rounded-full bg-zinc-900 overflow-hidden pointer-events-none">
                <div 
                  className="absolute inset-0 opacity-80" 
                  style={{
                    background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
                  }}
                />
              </div>
              <Slider 
                 value={[hue]} 
                 onValueChange={(v) => setHue(v[0])} 
                 max={360} 
                 step={1}
                 className="[&_[data-slot=slider-track]]:bg-transparent [&_[data-slot=slider-range]]:bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Shape Configuration */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <Collapsible open={isShapeOpen} onOpenChange={setIsShapeOpen} className="w-full">
          <CollapsibleTrigger asChild>
            <button className="flex items-center justify-between w-full text-sm font-medium text-zinc-400 hover:text-zinc-300 transition-colors group">
              <span>Shape Configuration</span>
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isShapeOpen && "rotate-180")} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Gradient Mask Size (Shape 1)</span>
                  <span>{Math.round(maskSize * 100)}%</span>
                </div>
                <Slider 
                   value={[maskSize]} 
                   onValueChange={(v) => setMaskSize(v[0])} 
                   max={1} 
                   step={0.01}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Glow Scale</span>
                  <span>{glowScale.toFixed(1)}x</span>
                </div>
                 <Slider 
                   value={[glowScale]} 
                   onValueChange={(v) => setGlowScale(v[0])} 
                   min={0.5}
                   max={3} 
                   step={0.1}
                />
              </div>

              {/* Noise Toggle */}
              <div className="flex items-center justify-between pt-2">
                <label className="text-xs text-zinc-500">Noise Overlay</label>
                <Switch 
                  checked={noiseEnabled} 
                  onCheckedChange={setNoiseEnabled}
                  className="data-[state=unchecked]:bg-zinc-950 border border-white/10"
                />
              </div>

              {/* Noise Intensity Slider */}
              {noiseEnabled && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>Noise Intensity</span>
                    <span>{Math.round(noiseIntensity * 100)}%</span>
                  </div>
                  <Slider 
                    value={[noiseIntensity]} 
                    onValueChange={(v) => setNoiseIntensity(v[0])} 
                    min={0}
                    max={1} 
                    step={0.01}
                  />
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Glow Position */}
      <div className="pt-4 border-t border-white/5">
        <Collapsible open={isPositionOpen} onOpenChange={setIsPositionOpen} className="w-full">
          <CollapsibleTrigger asChild>
            <button className="flex items-center justify-between w-full text-sm font-medium text-zinc-400 hover:text-zinc-300 transition-colors group">
              <span>Glow Position</span>
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isPositionOpen && "rotate-180")} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-3 mt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Horizontal (X)</span>
                  <span>{positionX}px</span>
                </div>
                <Slider 
                  value={[positionX]} 
                  onValueChange={(v) => setPositionX(v[0])} 
                  min={-600}
                  max={100} 
                  step={5}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Vertical (Y)</span>
                  <span>{positionY}px</span>
                </div>
                <Slider 
                  value={[positionY]} 
                  onValueChange={(v) => setPositionY(v[0])} 
                  min={-800}
                  max={100} 
                  step={5}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Footer Info */}
      <div className="pt-2 flex flex-col gap-4">
        <div className="text-xs text-zinc-600 flex justify-center gap-4">
          <span>Simulating CSS <code className="bg-zinc-950 px-1 py-0.5 rounded text-zinc-500">backdrop-filter</code> & <code className="bg-zinc-950 px-1 py-0.5 rounded text-zinc-500">mask-image</code></span>
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <CollapsibleTrigger asChild>
             <button className="flex items-center justify-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors w-full py-2 group">
                <Code className="w-3 h-3" />
                <span className="border-b border-transparent group-hover:border-zinc-500/50">View CSS Code</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", isOpen && "rotate-180")} />
             </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
             <div className="mt-2 relative bg-zinc-950/50 border border-white/5 rounded-lg overflow-hidden">
                <div className="absolute top-2 right-2 z-10">
                   <button 
                     onClick={handleCopy}
                     className="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                   >
                     {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                   </button>
                </div>
                <pre className="p-4 text-[10px] leading-relaxed font-mono text-zinc-400 overflow-x-auto">
                  {cssCode}
                </pre>
             </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

    </div>
  );
}