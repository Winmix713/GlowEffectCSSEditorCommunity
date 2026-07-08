import React, { useState, useEffect } from 'react';
import { ControlPanel } from './ControlPanel';
import { Preview } from './Preview';
import { hexToOklch, oklchToHex } from '../../utils/color-conversion';

export function GlowEditor() {
  const [power, setPower] = useState(true);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  
  // Color State
  // Default: #FF9F00 -> L: ~0.78, C: ~0.18, H: ~70 (Approx)
  const [lightness, setLightness] = useState(78); // 0-100
  const [chroma, setChroma] = useState(0.180); // 0-0.4
  const [hue, setHue] = useState(70); // 0-360
  const [hexColor, setHexColor] = useState('#FF9F00');

  // Shape State
  const [maskSize, setMaskSize] = useState(0.3);
  const [glowScale, setGlowScale] = useState(0.9);
  const [positionX, setPositionX] = useState(-255); // Centered for 800px wide glow on 290px frame
  const [positionY, setPositionY] = useState(-325); // Centered for 1000px high glow on 350px frame
  const [noiseEnabled, setNoiseEnabled] = useState(true);
  const [noiseIntensity, setNoiseIntensity] = useState(0.35); // 0-1 opacity

  // Update Hex when sliders change
  const handleSliderChange = (type: 'l' | 'c' | 'h', value: number) => {
    let newL = lightness;
    let newC = chroma;
    let newH = hue;

    if (type === 'l') {
        newL = value;
        setLightness(value);
    } else if (type === 'c') {
        newC = value;
        setChroma(value);
    } else {
        newH = value;
        setHue(value);
    }

    // Convert to Hex
    // Note: oklchToHex expects l in 0-1 range
    const hex = oklchToHex(newL / 100, newC, newH);
    setHexColor(hex.toUpperCase());
  };

  // Update Sliders when Hex changes
  const handleHexChange = (value: string) => {
    setHexColor(value);
    
    // Only update sliders if it's a valid hex
    if (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(value)) {
       const { l, c, h } = hexToOklch(value);
       setLightness(l * 100);
       setChroma(c);
       setHue(h);
    }
  };

  // Construct CSS color string for preview
  // using oklch() function supported in modern browsers
  const colorString = `oklch(${lightness}% ${chroma} ${hue})`;

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col items-center justify-center p-4 lg:p-10 font-sans">
      
      <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-24 w-full max-w-7xl mx-auto">
        
        {/* Left: Preview */}
        <div className="flex-1 w-full flex justify-center lg:justify-end lg:sticky lg:top-10">
           <Preview 
             power={power}
             themeMode={themeMode}
             color={`oklch(${lightness}% ${chroma} ${hue})`}
             maskSize={maskSize}
             glowScale={glowScale}
             positionX={positionX}
             positionY={positionY}
             noiseEnabled={noiseEnabled}
             noiseIntensity={noiseIntensity}
             setPower={setPower}
             setHexColor={handleHexChange}
           />
        </div>

        {/* Right: Control Panel */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-start lg:pt-14">
          <ControlPanel 
            power={power}
            setPower={setPower}
            themeMode={themeMode}
            setThemeMode={setThemeMode}
            hexColor={hexColor}
            setHexColor={handleHexChange}
            lightness={lightness}
            setLightness={(v) => handleSliderChange('l', v)}
            chroma={chroma}
            setChroma={(v) => handleSliderChange('c', v)}
            hue={hue}
            setHue={(v) => handleSliderChange('h', v)}
            maskSize={maskSize}
            setMaskSize={setMaskSize}
            glowScale={glowScale}
            setGlowScale={setGlowScale}
            positionX={positionX}
            setPositionX={setPositionX}
            positionY={positionY}
            setPositionY={setPositionY}
            noiseEnabled={noiseEnabled}
            setNoiseEnabled={setNoiseEnabled}
            noiseIntensity={noiseIntensity}
            setNoiseIntensity={setNoiseIntensity}
          />
        </div>

      </div>
    </div>
  );
}