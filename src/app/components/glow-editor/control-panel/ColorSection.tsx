import React from 'react';
import { Slider } from "../../ui/slider";
import { Input } from "../../ui/input";
import { useGlowEditor } from '../context';

export function ColorSection() {
  const { state, actions } = useGlowEditor();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label htmlFor="hex-color" className="text-sm font-medium text-zinc-400">
          Base Color
        </label>
        <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-lg p-1 pr-3 h-8">
          <div
            className="w-6 h-6 rounded-md border border-white/20 shadow-inner"
            style={{ backgroundColor: state.hexColor }}
            aria-hidden="true"
          />
          <Input
            id="hex-color"
            type="text"
            value={state.hexColor}
            onChange={(e) => actions.setHexColor(e.target.value)}
            aria-label="Hex color value"
            className="bg-transparent border-none outline-none text-xs text-zinc-300 w-16 uppercase font-mono h-auto p-0 focus-visible:ring-0"
          />
        </div>
      </div>

      <div className="space-y-4">
        {/* Lightness */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-zinc-500">
            <label htmlFor="lightness-slider" className="cursor-pointer">Lightness</label>
            <span aria-live="polite">{Math.round(state.lightness)}%</span>
          </div>
          <div className="relative h-4 w-full">
            <div className="absolute inset-0 rounded-full bg-zinc-900 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-black to-white opacity-20" />
            </div>
            <Slider
              id="lightness-slider"
              value={[state.lightness]}
              onValueChange={(v) => actions.setLightness(v[0])}
              max={100}
              step={1}
              aria-label="Lightness"
              aria-valuetext={`${Math.round(state.lightness)}%`}
              className="[&_[data-slot=slider-track]]:bg-transparent [&_[data-slot=slider-range]]:bg-transparent focus-visible:ring-2 focus-visible:ring-zinc-400"
            />
          </div>
        </div>

        {/* Chroma */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-zinc-500">
            <label htmlFor="chroma-slider" className="cursor-pointer">Chroma</label>
            <span aria-live="polite">{state.chroma.toFixed(3)}</span>
          </div>
          <div className="relative h-4 w-full">
            <div className="absolute inset-0 rounded-full bg-zinc-900 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-[oklch(0.6_0.3_0)] opacity-20" />
            </div>
            <Slider
              id="chroma-slider"
              value={[state.chroma]}
              onValueChange={(v) => actions.setChroma(v[0])}
              max={0.4}
              step={0.001}
              aria-label="Chroma"
              aria-valuetext={state.chroma.toFixed(3)}
              className="[&_[data-slot=slider-track]]:bg-transparent [&_[data-slot=slider-range]]:bg-transparent focus-visible:ring-2 focus-visible:ring-zinc-400"
            />
          </div>
        </div>

        {/* Hue */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-zinc-500">
            <label htmlFor="hue-slider" className="cursor-pointer">Hue</label>
            <span aria-live="polite">{Math.round(state.hue)}°</span>
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
              id="hue-slider"
              value={[state.hue]}
              onValueChange={(v) => actions.setHue(v[0])}
              max={360}
              step={1}
              aria-label="Hue"
              aria-valuetext={`${Math.round(state.hue)}°`}
              className="[&_[data-slot=slider-track]]:bg-transparent [&_[data-slot=slider-range]]:bg-transparent focus-visible:ring-2 focus-visible:ring-zinc-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
