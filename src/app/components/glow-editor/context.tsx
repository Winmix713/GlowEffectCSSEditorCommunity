import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { hexToOklch, oklchToHex } from '../../utils/color-conversion';

interface GlowState {
  power: boolean;
  themeMode: 'dark' | 'light';
  lightness: number;
  chroma: number;
  hue: number;
  hexColor: string;
  maskSize: number;
  glowScale: number;
  positionX: number;
  positionY: number;
  noiseEnabled: boolean;
  noiseIntensity: number;
}

interface GlowActions {
  setPower: (v: boolean) => void;
  setThemeMode: (v: 'dark' | 'light') => void;
  setHexColor: (v: string) => void;
  setLightness: (v: number) => void;
  setChroma: (v: number) => void;
  setHue: (v: number) => void;
  setMaskSize: (v: number) => void;
  setGlowScale: (v: number) => void;
  setPositionX: (v: number) => void;
  setPositionY: (v: number) => void;
  setNoiseEnabled: (v: boolean) => void;
  setNoiseIntensity: (v: number) => void;
  cycleRandomColor: () => void;
}

type GlowContextType = {
  state: GlowState;
  actions: GlowActions;
};

const GlowContext = createContext<GlowContextType | null>(null);

export function useGlowEditor() {
  const context = useContext(GlowContext);
  if (!context) {
    throw new Error('useGlowEditor must be used within a GlowEditorProvider');
  }
  return context;
}

export function GlowEditorProvider({ children }: { children: ReactNode }) {
  const [power, setPower] = useState(true);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [lightness, setLightnessState] = useState(78);
  const [chroma, setChromaState] = useState(0.180);
  const [hue, setHueState] = useState(70);
  const [hexColor, setHexColor] = useState('#FF9F00');
  const [maskSize, setMaskSize] = useState(0.3);
  const [glowScale, setGlowScale] = useState(0.9);
  const [positionX, setPositionX] = useState(-255);
  const [positionY, setPositionY] = useState(-325);
  const [noiseEnabled, setNoiseEnabled] = useState(true);
  const [noiseIntensity, setNoiseIntensity] = useState(0.35);

  const setLightness = useCallback((value: number) => {
    setLightnessState(value);
    const hex = oklchToHex(value / 100, chroma, hue);
    setHexColor(hex.toUpperCase());
  }, [chroma, hue]);

  const setChroma = useCallback((value: number) => {
    setChromaState(value);
    const hex = oklchToHex(lightness / 100, value, hue);
    setHexColor(hex.toUpperCase());
  }, [lightness, hue]);

  const setHue = useCallback((value: number) => {
    setHueState(value);
    const hex = oklchToHex(lightness / 100, chroma, value);
    setHexColor(hex.toUpperCase());
  }, [lightness, chroma]);

  const handleHexChange = useCallback((value: string) => {
    setHexColor(value);
    if (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(value)) {
      const { l, c, h } = hexToOklch(value);
      setLightnessState(l * 100);
      setChromaState(c);
      setHueState(h);
    }
  }, []);

  // Easter egg: random color cycle
  const cycleRandomColor = useCallback(() => {
    setPower(false);
    setTimeout(() => {
      const randomHex =
        '#' +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0');
      handleHexChange(randomHex);
      setTimeout(() => {
        setPower(true);
      }, 90);
    }, 950);
  }, [handleHexChange]);

  const state: GlowState = {
    power,
    themeMode,
    lightness,
    chroma,
    hue,
    hexColor,
    maskSize,
    glowScale,
    positionX,
    positionY,
    noiseEnabled,
    noiseIntensity,
  };

  const actions: GlowActions = {
    setPower,
    setThemeMode,
    setHexColor: handleHexChange,
    setLightness,
    setChroma,
    setHue,
    setMaskSize,
    setGlowScale,
    setPositionX,
    setPositionY,
    setNoiseEnabled,
    setNoiseIntensity,
    cycleRandomColor,
  };

  return (
    <GlowContext.Provider value={{ state, actions }}>
      {children}
    </GlowContext.Provider>
  );
}
