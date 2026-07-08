import {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  Component,
  ErrorInfo,
  ReactNode,
} from "react";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toPng } from "html-to-image";
import { Slider } from "./components/ui/slider";
import { Switch } from "./components/ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/ui/collapsible";
import {
  ChevronDown,
  Copy,
  Check,
  Code,
  Undo2,
  Redo2,
  Save,
  FolderOpen,
  Download,
  Image as ImageIcon,
  Plus,
  Trash2,
  Grid3X3,
  Smartphone,
  Tablet,
  Monitor,
  Layers,
  Eye,
  EyeOff,
  Activity,
  Settings2,
  RefreshCcw,
  HelpCircle,
  Lock,
  Unlock,
  History,
  FileJson,
  X,
  Zap,
  BarChart2,
  Split,
  Pencil,
  Power,
  MoveHorizontal,
  MoveVertical,
  RotateCcw,
  AlertTriangle,
  GripVertical,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

// ========================================================================================
// UTILITY FUNCTIONS
// ========================================================================================

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// ========================================================================================
// TYPE DEFINITIONS
// ========================================================================================

type BlendMode =
  | "normal"
  | "screen"
  | "overlay"
  | "soft-light"
  | "color-dodge"
  | "multiply";

interface GlowLayer {
  id: string;
  name: string;
  active: boolean;
  color: string;
  blur: number;
  opacity: number;
  width: number;
  height: number;
  x: number;
  y: number;
  blendMode: BlendMode;
}

interface AnimationConfig {
  enabled: boolean;
  type: "pulse" | "breathe";
  duration: number;
}

interface GlowState {
  power: boolean;
  themeMode: "dark" | "light";
  globalScale: number;
  globalOpacity: number;
  noiseEnabled: boolean;
  noiseIntensity: number;
  layers: GlowLayer[];
  selectedLayerId: string | null;
  animation: AnimationConfig;
}

interface Preset {
  id: string;
  name: string;
  timestamp: number;
  builtin?: boolean;
  state: GlowState;
}

// ========================================================================================
// STATE VERSION & MIGRATION
// ========================================================================================

const STATE_VERSION = 4;
const STATE_KEY = "glow-editor-state-v4";

/**
 * Validates and migrates a stored state object.
 * If the stored data is missing fields or from an old version,
 * merges with INITIAL_STATE to ensure structural integrity.
 */
function migrateState(stored: any): GlowState {
  if (!stored || typeof stored !== "object") return deepClone(INITIAL_STATE);

  // Ensure all top-level fields exist
  const migrated: GlowState = {
    power: typeof stored.power === "boolean" ? stored.power : INITIAL_STATE.power,
    themeMode: stored.themeMode === "light" ? "light" : "dark",
    globalScale:
      typeof stored.globalScale === "number"
        ? stored.globalScale
        : INITIAL_STATE.globalScale,
    globalOpacity:
      typeof stored.globalOpacity === "number"
        ? stored.globalOpacity
        : INITIAL_STATE.globalOpacity,
    noiseEnabled:
      typeof stored.noiseEnabled === "boolean"
        ? stored.noiseEnabled
        : INITIAL_STATE.noiseEnabled,
    noiseIntensity:
      typeof stored.noiseIntensity === "number"
        ? stored.noiseIntensity
        : INITIAL_STATE.noiseIntensity,
    selectedLayerId: stored.selectedLayerId ?? null,
    animation: {
      enabled:
        typeof stored.animation?.enabled === "boolean"
          ? stored.animation.enabled
          : false,
      type:
        stored.animation?.type === "pulse" || stored.animation?.type === "breathe"
          ? stored.animation.type
          : "breathe",
      duration:
        typeof stored.animation?.duration === "number"
          ? stored.animation.duration
          : 3,
    },
    layers: Array.isArray(stored.layers)
      ? stored.layers.map((l: any) => ({
          id: l.id ?? `layer-${Date.now()}`,
          name: l.name ?? "Layer",
          active: typeof l.active === "boolean" ? l.active : true,
          color: typeof l.color === "string" ? l.color : "#ffffff",
          blur: typeof l.blur === "number" ? l.blur : 80,
          opacity: typeof l.opacity === "number" ? l.opacity : 0.5,
          width: typeof l.width === "number" ? l.width : 280,
          height: typeof l.height === "number" ? l.height : 280,
          x: typeof l.x === "number" ? l.x : 0,
          y: typeof l.y === "number" ? l.y : 0,
          blendMode: (l.blendMode as BlendMode) ?? "screen",
        }))
      : deepClone(INITIAL_STATE.layers),
  };

  // Fix selectedLayerId if it references a non-existent layer
  if (
    migrated.selectedLayerId &&
    !migrated.layers.find((l) => l.id === migrated.selectedLayerId)
  ) {
    migrated.selectedLayerId = migrated.layers[0]?.id ?? null;
  }

  return migrated;
}

// ========================================================================================
// INITIAL STATE & BUILT-IN PRESETS
// ========================================================================================

const DEFAULT_LAYERS: GlowLayer[] = [
  {
    id: "layer-1",
    name: "Base Glow",
    active: true,
    color: "#4ade80",
    blur: 180,
    opacity: 0.4,
    width: 600,
    height: 380,
    x: -50,
    y: -50,
    blendMode: "screen",
  },
  {
    id: "layer-2",
    name: "Core Glow",
    active: true,
    color: "#22c55e",
    blur: 120,
    opacity: 0.6,
    width: 440,
    height: 440,
    x: 30,
    y: 50,
    blendMode: "screen",
  },
  {
    id: "layer-3",
    name: "Inner Light",
    active: true,
    color: "#86efac",
    blur: 60,
    opacity: 1,
    width: 360,
    height: 300,
    x: 70,
    y: 100,
    blendMode: "screen",
  },
  {
    id: "layer-highlight",
    name: "Highlight",
    active: true,
    color: "#FFFFFF",
    blur: 80,
    opacity: 0.4,
    width: 240,
    height: 180,
    x: 130,
    y: 130,
    blendMode: "normal",
  },
];

const INITIAL_STATE: GlowState = {
  power: true,
  themeMode: "dark",
  globalScale: 0.9,
  globalOpacity: 1,
  noiseEnabled: true,
  noiseIntensity: 0.35,
  layers: DEFAULT_LAYERS,
  selectedLayerId: "layer-1",
  animation: { enabled: false, type: "breathe", duration: 3 },
};

const BUILTIN_PRESETS: Preset[] = [
  {
    id: "builtin-emerald",
    name: "Emerald Dream",
    timestamp: 0,
    builtin: true,
    state: INITIAL_STATE,
  },
  {
    id: "builtin-blue",
    name: "Ocean Blue",
    timestamp: 0,
    builtin: true,
    state: {
      ...INITIAL_STATE,
      layers: [
        {
          id: "b1",
          name: "Deep Ocean",
          active: true,
          color: "#1e40af",
          blur: 200,
          opacity: 0.5,
          width: 620,
          height: 400,
          x: -60,
          y: -40,
          blendMode: "screen",
        },
        {
          id: "b2",
          name: "Current",
          active: true,
          color: "#3b82f6",
          blur: 130,
          opacity: 0.7,
          width: 460,
          height: 460,
          x: 20,
          y: 60,
          blendMode: "screen",
        },
        {
          id: "b3",
          name: "Shimmer",
          active: true,
          color: "#93c5fd",
          blur: 70,
          opacity: 1,
          width: 300,
          height: 260,
          x: 80,
          y: 90,
          blendMode: "screen",
        },
        {
          id: "b4",
          name: "Crest",
          active: true,
          color: "#e0f2fe",
          blur: 60,
          opacity: 0.5,
          width: 220,
          height: 160,
          x: 140,
          y: 140,
          blendMode: "normal",
        },
      ],
      selectedLayerId: "b1",
    },
  },
  {
    id: "builtin-fire",
    name: "Solar Flare",
    timestamp: 0,
    builtin: true,
    state: {
      ...INITIAL_STATE,
      layers: [
        {
          id: "f1",
          name: "Ember",
          active: true,
          color: "#dc2626",
          blur: 190,
          opacity: 0.45,
          width: 580,
          height: 360,
          x: -40,
          y: -60,
          blendMode: "screen",
        },
        {
          id: "f2",
          name: "Flame",
          active: true,
          color: "#f97316",
          blur: 120,
          opacity: 0.65,
          width: 440,
          height: 420,
          x: 40,
          y: 40,
          blendMode: "screen",
        },
        {
          id: "f3",
          name: "Corona",
          active: true,
          color: "#fde68a",
          blur: 50,
          opacity: 1,
          width: 320,
          height: 280,
          x: 90,
          y: 80,
          blendMode: "screen",
        },
        {
          id: "f4",
          name: "Core",
          active: true,
          color: "#fef9c3",
          blur: 70,
          opacity: 0.45,
          width: 200,
          height: 160,
          x: 150,
          y: 120,
          blendMode: "normal",
        },
      ],
      selectedLayerId: "f1",
    },
  },
  {
    id: "builtin-violet",
    name: "Violet Dusk",
    timestamp: 0,
    builtin: true,
    state: {
      ...INITIAL_STATE,
      layers: [
        {
          id: "v1",
          name: "Dusk",
          active: true,
          color: "#7e22ce",
          blur: 200,
          opacity: 0.5,
          width: 640,
          height: 400,
          x: -70,
          y: -50,
          blendMode: "screen",
        },
        {
          id: "v2",
          name: "Twilight",
          active: true,
          color: "#a855f7",
          blur: 130,
          opacity: 0.7,
          width: 460,
          height: 460,
          x: 30,
          y: 50,
          blendMode: "screen",
        },
        {
          id: "v3",
          name: "Glow",
          active: true,
          color: "#d8b4fe",
          blur: 65,
          opacity: 0.9,
          width: 340,
          height: 290,
          x: 80,
          y: 100,
          blendMode: "screen",
        },
        {
          id: "v4",
          name: "Sparkle",
          active: true,
          color: "#fae8ff",
          blur: 55,
          opacity: 0.4,
          width: 200,
          height: 150,
          x: 140,
          y: 140,
          blendMode: "normal",
        },
      ],
      selectedLayerId: "v1",
    },
  },
];

// ========================================================================================
// ERROR BOUNDARY
// ========================================================================================

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackLabel?: string;
  onReset?: () => void;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[GlowEditor ErrorBoundary]", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-6 gap-4 bg-zinc-950 text-zinc-400">
          <AlertTriangle className="w-8 h-8 text-amber-500" />
          <div className="text-center">
            <p className="text-sm font-medium text-zinc-300 mb-1">
              {this.props.fallbackLabel ?? "Panel error"}
            </p>
            <p className="text-xs text-zinc-600 font-mono max-w-xs break-all">
              {this.state.error?.message ?? "Unknown error"}
            </p>
          </div>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-xs text-zinc-300 transition-colors"
          >
            <RefreshCcw className="w-3 h-3" /> Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ========================================================================================
// HOOKS
// ========================================================================================

/**
 * useHistory — ref-based index to avoid stale closure bugs.
 * currentIndex lives in a ref so pushState always reads the latest value,
 * while a parallel state counter drives re-renders.
 */
function useHistory<T>(initialState: T, maxHistory = 50) {
  const historyRef = useRef<T[]>([deepClone(initialState)]);
  const indexRef = useRef(0);
  // Trigger re-renders when history changes
  const [, forceUpdate] = useState(0);
  const bump = useCallback(() => forceUpdate((n) => n + 1), []);

  const canUndo = indexRef.current > 0;
  const canRedo = indexRef.current < historyRef.current.length - 1;

  const pushState = useCallback(
    (newState: T) => {
      const cloned = deepClone(newState);
      const idx = indexRef.current;
      // Trim redo branch
      historyRef.current = historyRef.current.slice(0, idx + 1);
      historyRef.current.push(cloned);
      // Enforce maxHistory
      if (historyRef.current.length > maxHistory) {
        historyRef.current = historyRef.current.slice(
          historyRef.current.length - maxHistory,
        );
      }
      indexRef.current = historyRef.current.length - 1;
      bump();
    },
    [maxHistory, bump],
  );

  const undo = useCallback((): T | null => {
    if (indexRef.current <= 0) return null;
    indexRef.current -= 1;
    bump();
    return deepClone(historyRef.current[indexRef.current]);
  }, [bump]);

  const redo = useCallback((): T | null => {
    if (indexRef.current >= historyRef.current.length - 1) return null;
    indexRef.current += 1;
    bump();
    return deepClone(historyRef.current[indexRef.current]);
  }, [bump]);

  const jumpToIndex = useCallback(
    (index: number): T | null => {
      if (index < 0 || index >= historyRef.current.length) return null;
      indexRef.current = index;
      bump();
      return deepClone(historyRef.current[index]);
    },
    [bump],
  );

  const historyItems = historyRef.current.map((item, index) => ({
    item,
    index,
    isCurrent: index === indexRef.current,
  }));

  return {
    pushState,
    undo,
    redo,
    canUndo,
    canRedo,
    historyItems,
    jumpToIndex,
  };
}

/** useLocalStorageState — persist any state value to localStorage */
function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setAndPersist = useCallback(
    (value: T | ((prev: T) => T)) => {
      setState((prev) => {
        const next =
          typeof value === "function" ? (value as (p: T) => T)(prev) : value;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch {
          /* quota exceeded — silent */
        }
        return next;
      });
    },
    [key],
  );

  return [state, setAndPersist];
}

/** usePresets — save/load/delete named presets with localStorage persistence */
function usePresets() {
  const STORAGE_KEY = "glow-editor-presets-v4";

  const [userPresets, setUserPresets] = useState<Preset[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userPresets));
    } catch {
      /* silent */
    }
  }, [userPresets]);

  const allPresets = [...BUILTIN_PRESETS, ...userPresets];

  const savePreset = useCallback(
    (name: string, state: GlowState, overwriteId?: string) => {
      const p: Preset = {
        id: overwriteId ?? `p-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name,
        timestamp: Date.now(),
        state: deepClone(state),
      };
      setUserPresets((prev) => {
        if (overwriteId) {
          return prev.map((x) => (x.id === overwriteId ? p : x));
        }
        return [p, ...prev];
      });
      return p;
    },
    [],
  );

  const deletePreset = useCallback((id: string) => {
    setUserPresets((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const loadPreset = useCallback(
    (id: string): GlowState | null => {
      const p = allPresets.find((x) => x.id === id);
      return p ? deepClone(p.state) : null;
    },
    [allPresets],
  );

  /** Returns the id of an existing user preset with that name, or null */
  const findByName = useCallback(
    (name: string) =>
      userPresets.find((p) => p.name.toLowerCase() === name.toLowerCase()) ?? null,
    [userPresets],
  );

  const exportAll = useCallback(() => {
    const blob = new Blob([JSON.stringify(userPresets, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `glow-presets-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [userPresets]);

  const importFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (Array.isArray(data)) setUserPresets((prev) => [...data, ...prev]);
      } catch {
        /* invalid file */
      }
    };
    reader.readAsText(file);
  }, []);

  return {
    allPresets,
    userPresets,
    savePreset,
    deletePreset,
    loadPreset,
    findByName,
    exportAll,
    importFile,
  };
}

// ========================================================================================
// CSS / JSON GENERATORS
// ========================================================================================

/**
 * Generates inline style objects for each layer — used directly in the preview.
 * This is the single source of truth for visual rendering.
 * The exported CSS mirrors this exactly, eliminating the className sync problem.
 */
function layerToInlineStyle(layer: GlowLayer): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: layer.width,
    height: layer.height,
    backgroundColor: layer.color,
    filter: `blur(${layer.blur}px)`,
    opacity: layer.opacity,
    borderRadius: "9999px",
    mixBlendMode: layer.blendMode as React.CSSProperties["mixBlendMode"],
    pointerEvents: "auto",
    willChange: "transform",
  };
}

function exportAsCSS(state: GlowState): string {
  const activeLayers = state.layers.filter((l) => l.active);

  const layersCss = activeLayers
    .map(
      (layer, i) => `
/* Layer ${i + 1}: ${layer.name} */
.glow-layer:nth-child(${i + 1}) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) translate(${layer.x}px, ${layer.y}px);
  width: ${layer.width}px;
  height: ${layer.height}px;
  background-color: ${layer.color};
  filter: blur(${layer.blur}px);
  opacity: ${layer.opacity};
  border-radius: 9999px;
  mix-blend-mode: ${layer.blendMode};
  z-index: ${i};
}`,
    )
    .join("\n");

  const breatheAnim = `@keyframes breathe {
  0%, 100% { opacity: ${state.globalOpacity}; transform: scale(${state.globalScale}); }
  50% { opacity: ${(state.globalOpacity * 0.75).toFixed(2)}; transform: scale(${(state.globalScale * 1.05).toFixed(3)}); }
}`;

  const pulseAnim = `@keyframes pulse {
  0%, 100% { opacity: ${state.globalOpacity}; transform: scale(${state.globalScale}); }
  50% { opacity: ${(state.globalOpacity * 0.75).toFixed(2)}; transform: scale(${(state.globalScale * 1.1).toFixed(3)}); }
}`;

  const animCss = state.animation.enabled
    ? `\n${state.animation.type === "breathe" ? breatheAnim : pulseAnim}\n\n.glow-container {\n  animation: ${state.animation.type} ${state.animation.duration}s ease-in-out infinite;\n}`
    : "";

  const noiseCss = state.noiseEnabled
    ? `
.noise-overlay {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' /></filter><rect width='100%' height='100%' filter='url(%23n)' /></svg>");
  background-repeat: repeat;
  background-size: 200px 200px;
  opacity: ${state.noiseIntensity};
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 100;
}`
    : "";

  return `/* Glow Effect — generated by Glow Editor v${STATE_VERSION} */

.glow-container {
  position: relative;
  width: 100%;
  height: 100%;
  transform: scale(${state.globalScale});
  opacity: ${state.globalOpacity};
  mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
}
${animCss}
${layersCss}
${noiseCss}`;
}

function exportAsJSON(state: GlowState): string {
  return JSON.stringify(state, null, 2);
}

function calcMetrics(state: GlowState) {
  const active = state.layers.filter((l) => l.active);
  const avgBlur = active.length
    ? Math.round(active.reduce((s, l) => s + l.blur, 0) / active.length)
    : 0;
  const score = Math.min(
    100,
    active.length * 15 +
      (avgBlur / 300) * 40 +
      (state.animation.enabled ? 20 : 0),
  );
  return { active: active.length, total: state.layers.length, avgBlur, score };
}

// ========================================================================================
// SHARED UI COMPONENTS
// ========================================================================================

const NumberInput = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
  className,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  className?: string;
}) => (
  <div
    className={cn(
      "flex items-center bg-zinc-950 border border-zinc-800 rounded px-2 h-6",
      className,
    )}
  >
    <input
      type="number"
      value={value}
      onChange={(e) => {
        const v = parseFloat(e.target.value);
        if (!isNaN(v)) onChange(v);
      }}
      min={min}
      max={max}
      step={step}
      className="w-14 bg-transparent border-none outline-none text-xs text-right pr-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    />
    {unit && (
      <span className="text-xs text-zinc-600 select-none">{unit}</span>
    )}
  </div>
);

const SliderRow = ({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  unit = "",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max: number;
  step?: number;
  unit?: string;
}) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
        {label}
      </span>
      <NumberInput
        value={parseFloat(value.toFixed(step < 1 ? 2 : 0))}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        unit={unit}
      />
    </div>
    <Slider
      value={[value]}
      onValueChange={(v) => onChange(v[0])}
      min={min}
      max={max}
      step={step}
    />
  </div>
);

// ========================================================================================
// PRESET SAVE DIALOG — handles name collision
// ========================================================================================

function PresetSaveDialog({
  onSave,
  onCancel,
  findByName,
}: {
  onSave: (name: string, overwriteId?: string) => void;
  onCancel: () => void;
  findByName: (name: string) => Preset | null;
}) {
  const [name, setName] = useState("");
  const [conflict, setConflict] = useState<Preset | null>(null);

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const existing = findByName(trimmed);
    if (existing) {
      setConflict(existing);
      return;
    }
    onSave(trimmed);
  };

  if (conflict) {
    return (
      <div className="space-y-2">
        <p className="text-[11px] text-amber-400">
          A preset named <strong>"{conflict.name}"</strong> already exists.
          Overwrite?
        </p>
        <div className="flex gap-1.5">
          <button
            onClick={() => {
              onSave(conflict.name, conflict.id);
              setConflict(null);
            }}
            className="flex-1 px-3 py-1.5 bg-amber-700 hover:bg-amber-600 rounded-lg text-xs font-bold text-white"
          >
            Overwrite
          </button>
          <button
            onClick={() => setConflict(null)}
            className="px-2 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 text-xs"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-1.5">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
          if (e.key === "Escape") onCancel();
          e.stopPropagation();
        }}
        placeholder="Preset name…"
        className="flex-1 px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-300 outline-none focus:border-zinc-600"
        autoFocus
      />
      <button
        onClick={handleSubmit}
        disabled={!name.trim()}
        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 rounded-lg text-xs font-bold text-white"
      >
        Save
      </button>
      <button
        onClick={onCancel}
        className="px-2 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400"
      >
        ✕
      </button>
    </div>
  );
}

// ========================================================================================
// LEFT PANEL — Layers (with drag-to-reorder)
// ========================================================================================

interface LeftPanelProps {
  state: GlowState;
  onStateChange: (s: GlowState) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onShowHistory: () => void;
  onShowShortcuts: () => void;
  onReset: () => void;
}

function LeftPanel({
  state,
  onStateChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onShowHistory,
  onShowShortcuts,
  onReset,
}: LeftPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const metrics = calcMetrics(state);

  const updateLayers = (layers: GlowLayer[]) =>
    onStateChange({ ...state, layers });

  const addLayer = () => {
    const newLayer: GlowLayer = {
      id: `layer-${Date.now()}`,
      name: "New Layer",
      active: true,
      color: "#a78bfa",
      blur: 80,
      opacity: 0.5,
      width: 280,
      height: 280,
      x: 0,
      y: 0,
      blendMode: "screen",
    };
    onStateChange({
      ...state,
      layers: [...state.layers, newLayer],
      selectedLayerId: newLayer.id,
    });
  };

  const removeLayer = (id: string) => {
    if (state.layers.length <= 1) return;
    const next = state.layers.filter((l) => l.id !== id);
    onStateChange({
      ...state,
      layers: next,
      selectedLayerId: next[next.length - 1].id,
    });
  };

  const toggleVisibility = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    updateLayers(
      state.layers.map((l) => (l.id === id ? { ...l, active: !l.active } : l)),
    );
  };

  const startEdit = (layer: GlowLayer, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(layer.id);
    setEditingName(layer.name);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const commitEdit = () => {
    if (editingId && editingName.trim()) {
      updateLayers(
        state.layers.map((l) =>
          l.id === editingId ? { ...l, name: editingName.trim() } : l,
        ),
      );
    }
    setEditingId(null);
  };

  const selectLayer = (id: string) =>
    onStateChange({ ...state, selectedLayerId: id });

  // Drag-to-reorder handlers (reversed display, so we reorder in display space)
  const reversedLayers = [...state.layers].reverse();

  const handleDragStart = (displayIndex: number) => {
    dragItem.current = displayIndex;
  };

  const handleDragEnter = (displayIndex: number) => {
    dragOverItem.current = displayIndex;
  };

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    if (dragItem.current === dragOverItem.current) return;

    const reordered = [...reversedLayers];
    const [moved] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOverItem.current, 0, moved);
    // Convert back to original order
    updateLayers([...reordered].reverse());
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <aside className="flex flex-col h-full bg-zinc-900/20 border-r border-white/5">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">
              Glow Editor
            </h1>
            <p className="text-[10px] text-zinc-600 mt-0.5">Multi-layer CSS</p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={onReset}
              className="p-1.5 hover:bg-white/5 rounded-lg text-zinc-600 hover:text-amber-400 transition-colors"
              title="Reset to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onShowShortcuts}
              className="p-1.5 hover:bg-white/5 rounded-lg text-zinc-600 hover:text-zinc-400 transition-colors"
              title="Keyboard shortcuts (?)"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Undo / Redo / History */}
        <div className="flex gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md text-[10px] font-medium bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
          >
            <Undo2 className="w-3 h-3" /> Undo
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md text-[10px] font-medium bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
          >
            <Redo2 className="w-3 h-3" /> Redo
          </button>
          <button
            onClick={onShowHistory}
            title="History Browser"
            className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <History className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Layers header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            Layers
          </span>
          <span
            className={cn(
              "px-1.5 py-0.5 rounded text-[9px] font-bold",
              metrics.score < 40
                ? "bg-emerald-900/40 text-emerald-400"
                : metrics.score < 70
                  ? "bg-amber-900/40 text-amber-400"
                  : "bg-red-900/40 text-red-400",
            )}
          >
            {metrics.active}/{metrics.total}
          </span>
        </div>
        <button
          onClick={addLayer}
          title="Add Layer"
          className="p-1 hover:bg-white/5 rounded text-zinc-500 hover:text-white transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Layer list — drag-to-reorder */}
      <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5 custom-scrollbar">
        {reversedLayers.map((layer, displayIndex) => {
          const isSelected = state.selectedLayerId === layer.id;
          const isEditing = editingId === layer.id;
          return (
            <div
              key={layer.id}
              draggable
              onDragStart={() => handleDragStart(displayIndex)}
              onDragEnter={() => handleDragEnter(displayIndex)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => selectLayer(layer.id)}
              className={cn(
                "group flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition-all border",
                isSelected
                  ? "bg-zinc-800/70 border-zinc-700/60 text-white"
                  : "border-transparent hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-200",
              )}
            >
              {/* Drag handle */}
              <GripVertical className="w-3 h-3 text-zinc-700 flex-shrink-0 cursor-grab" />

              {/* Visibility */}
              <button
                onClick={(e) => toggleVisibility(layer.id, e)}
                className="flex-shrink-0 text-zinc-600 hover:text-zinc-300 transition-colors"
              >
                {layer.active ? (
                  <Eye className="w-3.5 h-3.5" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 opacity-40" />
                )}
              </button>

              {/* Color dot */}
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 border border-white/10"
                style={{
                  backgroundColor: layer.active ? layer.color : "transparent",
                }}
              />

              {/* Name / edit */}
              {isEditing ? (
                <input
                  ref={nameInputRef}
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={commitEdit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitEdit();
                    if (e.key === "Escape") setEditingId(null);
                    e.stopPropagation();
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 bg-zinc-800 text-white text-xs px-1.5 py-0.5 rounded outline-none border border-zinc-600 min-w-0"
                />
              ) : (
                <span className="flex-1 text-xs truncate min-w-0">
                  {layer.name}
                </span>
              )}

              {/* Actions */}
              <div
                className={cn(
                  "flex gap-0.5 transition-opacity",
                  isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                )}
              >
                <button
                  onClick={(e) => startEdit(layer, e)}
                  title="Rename layer"
                  className="p-1 hover:text-white transition-colors"
                >
                  <Pencil className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeLayer(layer.id);
                  }}
                  title="Delete layer (Del)"
                  className="p-1 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Power toggle at bottom */}
      <div className="px-4 py-3 border-t border-white/5 flex-shrink-0">
        <button
          onClick={() => onStateChange({ ...state, power: !state.power })}
          title="Toggle power (Ctrl+P)"
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all border",
            state.power
              ? "bg-emerald-900/20 border-emerald-700/30 text-emerald-400 hover:bg-emerald-900/40"
              : "bg-zinc-900/40 border-zinc-800 text-zinc-500 hover:text-zinc-300",
          )}
        >
          <Power className="w-3.5 h-3.5" />
          {state.power ? "On" : "Off"}
        </button>
      </div>
    </aside>
  );
}

// ========================================================================================
// CENTER PANEL — Preview
// ========================================================================================

interface CenterPanelProps {
  state: GlowState;
  onStateChange: (s: GlowState) => void;
  cssOverride: string | null;
  abViewingA?: boolean;
}

function CenterPanel({
  state,
  onStateChange,
  cssOverride,
  abViewingA,
}: CenterPanelProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [showGrid, setShowGrid] = useLocalStorageState("glow-grid", false);
  const [frameSize, setFrameSize] = useLocalStorageState<
    "mobile" | "tablet" | "desktop"
  >("glow-frame", "mobile");
  const [isExporting, setIsExporting] = useState(false);

  const isDark = state.themeMode === "dark";

  const frames = {
    mobile: { w: 290, h: 350 },
    tablet: { w: 460, h: 580 },
    desktop: { w: 760, h: 480 },
  };
  const frame = frames[frameSize];

  const handleExportPng = async () => {
    if (!previewRef.current) return;
    try {
      setIsExporting(true);
      const url = await toPng(previewRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        skipFonts: true,
        skipAutoScale: true,
      });
      const a = document.createElement("a");
      a.download = `glow-${Date.now()}.png`;
      a.href = url;
      a.click();
    } catch (err) {
      console.error("PNG export failed:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleLayerDrag = (id: string, info: PanInfo) => {
    onStateChange({
      ...state,
      layers: state.layers.map((l) =>
        l.id === id ? { ...l, x: l.x + info.delta.x, y: l.y + info.delta.y } : l,
      ),
    });
  };

  // Determine animation props for the container
  const containerAnimate =
    !state.animation.enabled && !cssOverride
      ? {
          scale: state.power ? state.globalScale : 0.7,
          opacity: state.power ? state.globalOpacity : 0,
        }
      : undefined;

  // CSS animation style when animation.enabled
  const containerAnimStyle: React.CSSProperties =
    state.animation.enabled
      ? {
          animation: `${state.animation.type} ${state.animation.duration}s ease-in-out infinite`,
        }
      : {};

  return (
    <main className="flex-1 flex flex-col items-center justify-center overflow-hidden bg-[#070707] relative min-w-0">
      {/* Keyframes injected for live animation preview */}
      {state.animation.enabled && (
        <style>{`
          @keyframes breathe {
            0%,100% { opacity:${state.globalOpacity}; transform:scale(${state.globalScale}); }
            50% { opacity:${(state.globalOpacity * 0.75).toFixed(2)}; transform:scale(${(state.globalScale * 1.05).toFixed(3)}); }
          }
          @keyframes pulse {
            0%,100% { opacity:${state.globalOpacity}; transform:scale(${state.globalScale}); }
            50% { opacity:${(state.globalOpacity * 0.75).toFixed(2)}; transform:scale(${(state.globalScale * 1.1).toFixed(3)}); }
          }
        `}</style>
      )}

      {/* Top toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-zinc-900/80 backdrop-blur border border-white/10 p-1.5 rounded-xl shadow-xl">
        <div className="flex bg-zinc-950 rounded-lg p-0.5 border border-zinc-800 gap-0.5">
          {(["mobile", "tablet", "desktop"] as const).map((f) => {
            const Icon =
              f === "mobile" ? Smartphone : f === "tablet" ? Tablet : Monitor;
            return (
              <button
                key={f}
                onClick={() => setFrameSize(f)}
                title={f.charAt(0).toUpperCase() + f.slice(1)}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  frameSize === f
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-500 hover:text-zinc-300",
                )}
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            );
          })}
        </div>

        <div className="w-px h-5 bg-white/10" />

        <button
          onClick={() => setShowGrid(!showGrid)}
          title="Toggle grid"
          className={cn(
            "p-1.5 rounded-lg transition-colors",
            showGrid ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300",
          )}
        >
          <Grid3X3 className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleExportPng}
          disabled={isExporting}
          title="Export PNG"
          className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-700 transition-colors"
        >
          {isExporting ? (
            <div className="w-3.5 h-3.5 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
          ) : (
            <ImageIcon className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* A/B badge */}
      {abViewingA !== undefined && (
        <div
          className={cn(
            "absolute top-16 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border",
            abViewingA
              ? "bg-blue-900/30 text-blue-400 border-blue-700/40"
              : "bg-emerald-900/30 text-emerald-400 border-emerald-700/40",
          )}
        >
          {abViewingA ? "● SNAPSHOT A" : "● CURRENT (B)"}
        </div>
      )}

      {/* Frame */}
      <motion.div
        className={cn(
          "relative rounded-[36px] overflow-hidden border-4 shadow-2xl",
          isDark ? "bg-[#050505] border-zinc-900" : "bg-white border-zinc-200",
          abViewingA === true
            ? "ring-2 ring-blue-500/30"
            : abViewingA === false
              ? "ring-2 ring-emerald-500/20"
              : "",
        )}
        animate={{ width: frame.w, height: frame.h }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        ref={previewRef}
      >
        {/* Grid overlay */}
        {showGrid && (
          <div
            className="absolute inset-0 pointer-events-none z-50 opacity-15"
            style={{
              backgroundImage: `radial-gradient(${isDark ? "#fff" : "#000"} 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
        )}

        {/* Glow layers — rendered with inline styles (single source of truth) */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="relative w-full h-full"
            animate={containerAnimate}
            style={containerAnimStyle}
          >
            {state.layers.map((layer) =>
              layer.active ? (
                <motion.div
                  key={layer.id}
                  drag
                  dragMomentum={false}
                  onDragStart={() =>
                    onStateChange({ ...state, selectedLayerId: layer.id })
                  }
                  onDrag={(_, info) => handleLayerDrag(layer.id, info)}
                  // Inline styles replace the broken className approach
                  style={{
                    ...layerToInlineStyle(layer),
                    x: layer.x,
                    y: layer.y,
                    translateX: "-50%",
                    translateY: "-50%",
                    outline:
                      state.selectedLayerId === layer.id
                        ? "2px solid rgba(96,165,250,0.4)"
                        : undefined,
                    outlineOffset: "2px",
                    zIndex:
                      state.selectedLayerId === layer.id
                        ? 50
                        : state.layers.indexOf(layer),
                  }}
                  className="cursor-grab active:cursor-grabbing"
                />
              ) : null,
            )}
          </motion.div>
        </div>

        {/* Noise overlay */}
        {state.noiseEnabled && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' /></filter><rect width='100%' height='100%' filter='url(%23n)' /></svg>")`,
              backgroundRepeat: "repeat",
              backgroundSize: "200px 200px",
              opacity: state.noiseIntensity,
              mixBlendMode: "overlay",
              zIndex: 100,
            }}
          />
        )}
      </motion.div>

      {/* Hint */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-zinc-700 whitespace-nowrap">
        Drag layers to reposition · Delete to remove selected · Drag grip to reorder
      </p>
    </main>
  );
}

// ========================================================================================
// RIGHT PANEL — Properties
// ========================================================================================

interface RightPanelProps {
  state: GlowState;
  onStateChange: (s: GlowState) => void;
  cssOverride: string | null;
  setCssOverride: (v: string | null) => void;
  onOpenExport: () => void;
  onSavePreset: (name: string, overwriteId?: string) => void;
  presetManager: ReturnType<typeof usePresets>;
  snapshotA: GlowState | null;
  onStoreSnapshotA: () => void;
  abViewingA: boolean;
  onToggleAB: () => void;
}

function RightPanel({
  state,
  onStateChange,
  cssOverride,
  setCssOverride,
  onOpenExport,
  onSavePreset,
  presetManager,
  snapshotA,
  onStoreSnapshotA,
  abViewingA,
  onToggleAB,
}: RightPanelProps) {
  const [activeTab, setActiveTab] = useLocalStorageState<
    "layer" | "global" | "code"
  >("glow-rtab", "layer");
  const [rangeLock, setRangeLock] = useState(false);
  const [showPresetInput, setShowPresetInput] = useState(false);
  const [sectionOpen, setSectionOpen] = useLocalStorageState<{
    animation: boolean;
    noise: boolean;
    metrics: boolean;
  }>("glow-sections-v4", { animation: false, noise: false, metrics: false });

  const sel =
    state.layers.find((l) => l.id === state.selectedLayerId) ?? null;

  const updateState = (updates: Partial<GlowState>) => {
    onStateChange({ ...state, ...updates });
    setCssOverride(null);
  };

  const updateLayer = (updates: Partial<GlowLayer>) => {
    if (!sel) return;
    updateState({
      layers: state.layers.map((l) =>
        l.id === sel.id ? { ...l, ...updates } : l,
      ),
    });
  };

  const handleWidthChange = (w: number) => {
    if (rangeLock && sel && sel.width > 0) {
      updateLayer({ width: w, height: Math.round((w * sel.height) / sel.width) });
    } else {
      updateLayer({ width: w });
    }
  };

  const handleHeightChange = (h: number) => {
    if (rangeLock && sel && sel.height > 0) {
      updateLayer({
        height: h,
        width: Math.round((h * sel.width) / sel.height),
      });
    } else {
      updateLayer({ height: h });
    }
  };

  const metrics = calcMetrics(state);

  const tabs = [
    { id: "layer" as const, label: "Layer", icon: <Layers className="w-3 h-3" /> },
    {
      id: "global" as const,
      label: "Global",
      icon: <Settings2 className="w-3 h-3" />,
    },
    { id: "code" as const, label: "Code", icon: <Code className="w-3 h-3" /> },
  ];

  const toggleSection = (key: keyof typeof sectionOpen) => {
    setSectionOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="flex flex-col h-full bg-zinc-900/20 border-l border-white/5 w-72 flex-shrink-0">
      {/* Tab bar */}
      <div className="flex gap-0.5 p-2 bg-zinc-950/50 border-b border-white/5 flex-shrink-0">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[11px] font-medium transition-all",
              activeTab === t.id
                ? "bg-zinc-800 text-white"
                : "text-zinc-500 hover:text-zinc-300",
            )}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* ── LAYER TAB ── */}
        {activeTab === "layer" && (
          <div className="p-4 space-y-5">
            {sel ? (
              <>
                {/* Color */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                    Color
                  </span>
                  <div className="flex items-center gap-3 relative">
                    <label className="cursor-pointer">
                      <div
                        className="w-9 h-9 rounded-xl border-2 border-white/10 flex-shrink-0 shadow-inner"
                        style={{ backgroundColor: sel.color }}
                      />
                      <input
                        type="color"
                        value={sel.color}
                        onChange={(e) => updateLayer({ color: e.target.value })}
                        className="sr-only"
                      />
                    </label>
                    <input
                      type="text"
                      value={sel.color}
                      onChange={(e) => updateLayer({ color: e.target.value })}
                      className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs font-mono text-zinc-300 outline-none focus:border-zinc-600"
                    />
                  </div>
                </div>

                <SliderRow
                  label="Blur"
                  value={sel.blur}
                  onChange={(v) => updateLayer({ blur: v })}
                  max={300}
                  unit="px"
                />
                <SliderRow
                  label="Opacity"
                  value={sel.opacity}
                  onChange={(v) => updateLayer({ opacity: v })}
                  max={1}
                  step={0.01}
                />

                {/* Dimensions */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                      Size
                    </span>
                    <button
                      onClick={() => setRangeLock((v) => !v)}
                      className={cn(
                        "flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border transition-all",
                        rangeLock
                          ? "bg-blue-900/30 border-blue-700/40 text-blue-400"
                          : "bg-zinc-900 border-zinc-800 text-zinc-600 hover:text-zinc-400",
                      )}
                      title="Lock aspect ratio"
                    >
                      {rangeLock ? (
                        <Lock className="w-3 h-3" />
                      ) : (
                        <Unlock className="w-3 h-3" />
                      )}
                      {rangeLock ? "Locked" : "Lock"}
                    </button>
                  </div>
                  <SliderRow
                    label="Width"
                    value={sel.width}
                    onChange={handleWidthChange}
                    max={900}
                    step={10}
                    unit="px"
                  />
                  <SliderRow
                    label="Height"
                    value={sel.height}
                    onChange={handleHeightChange}
                    max={900}
                    step={10}
                    unit="px"
                  />
                </div>

                {/* X/Y Position */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                    Position
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-zinc-600 flex items-center gap-1">
                          <MoveHorizontal className="w-3 h-3" /> X
                        </span>
                        <NumberInput
                          value={sel.x}
                          onChange={(v) => updateLayer({ x: v })}
                          min={-500}
                          max={500}
                          unit="px"
                        />
                      </div>
                      <Slider
                        value={[sel.x]}
                        onValueChange={(v) => updateLayer({ x: v[0] })}
                        min={-400}
                        max={400}
                        step={1}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-zinc-600 flex items-center gap-1">
                          <MoveVertical className="w-3 h-3" /> Y
                        </span>
                        <NumberInput
                          value={sel.y}
                          onChange={(v) => updateLayer({ y: v })}
                          min={-500}
                          max={500}
                          unit="px"
                        />
                      </div>
                      <Slider
                        value={[sel.y]}
                        onValueChange={(v) => updateLayer({ y: v[0] })}
                        min={-400}
                        max={400}
                        step={1}
                      />
                    </div>
                  </div>
                </div>

                {/* Blend mode */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                    Blend Mode
                  </span>
                  <Select
                    value={sel.blendMode}
                    onValueChange={(v: BlendMode) =>
                      updateLayer({ blendMode: v })
                    }
                  >
                    <SelectTrigger className="w-full bg-zinc-900 border-zinc-800 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                      {[
                        "normal",
                        "screen",
                        "overlay",
                        "soft-light",
                        "color-dodge",
                        "multiply",
                      ].map((m) => (
                        <SelectItem
                          key={m}
                          value={m}
                          className="capitalize text-xs"
                        >
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <div className="py-16 text-center text-zinc-600 text-sm">
                Select a layer from the left panel
              </div>
            )}
          </div>
        )}

        {/* ── GLOBAL TAB ── */}
        {activeTab === "global" && (
          <div className="p-4 space-y-5">
            {/* Theme */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Theme</span>
              <div className="flex gap-1 bg-zinc-950 p-0.5 rounded-lg border border-zinc-800">
                {(["dark", "light"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => updateState({ themeMode: t })}
                    className={cn(
                      "px-3 py-1 rounded-md text-[11px] font-medium transition-all capitalize",
                      state.themeMode === t
                        ? "bg-zinc-700 text-white"
                        : "text-zinc-500 hover:text-zinc-300",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <SliderRow
              label="Master Scale"
              value={state.globalScale}
              onChange={(v) => updateState({ globalScale: v })}
              min={0.5}
              max={2}
              step={0.05}
            />
            <SliderRow
              label="Master Opacity"
              value={state.globalOpacity}
              onChange={(v) => updateState({ globalOpacity: v })}
              max={1}
              step={0.01}
            />

            {/* Animation — persisted collapsible */}
            <div className="pt-3 border-t border-white/5">
              <Collapsible
                open={sectionOpen.animation}
                onOpenChange={() => toggleSection("animation")}
              >
                <CollapsibleTrigger asChild>
                  <button className="flex items-center justify-between w-full text-sm text-zinc-400 mb-2">
                    <span className="flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5" /> Animation
                    </span>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={state.animation.enabled}
                        onCheckedChange={(v) => {
                          updateState({
                            animation: { ...state.animation, enabled: v },
                          });
                          if (v && !sectionOpen.animation)
                            toggleSection("animation");
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform text-zinc-600",
                          sectionOpen.animation && "rotate-180",
                        )}
                      />
                    </div>
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="space-y-3 pl-2 border-l-2 border-zinc-800">
                    <div className="flex gap-2">
                      {(["breathe", "pulse"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() =>
                            updateState({
                              animation: { ...state.animation, type: t },
                            })
                          }
                          className={cn(
                            "flex-1 py-1.5 text-[11px] rounded-lg border transition-all capitalize",
                            state.animation.type === t
                              ? "bg-zinc-700 border-zinc-600 text-white font-medium"
                              : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300",
                          )}
                        >
                          {t === "breathe" ? "🌊 Breathe" : "💓 Pulse"}
                        </button>
                      ))}
                    </div>
                    <SliderRow
                      label="Duration"
                      value={state.animation.duration}
                      onChange={(v) =>
                        updateState({
                          animation: { ...state.animation, duration: v },
                        })
                      }
                      min={0.5}
                      max={10}
                      step={0.5}
                      unit="s"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Noise — persisted collapsible */}
            <div className="pt-3 border-t border-white/5">
              <Collapsible
                open={sectionOpen.noise}
                onOpenChange={() => toggleSection("noise")}
              >
                <CollapsibleTrigger asChild>
                  <button className="flex items-center justify-between w-full text-sm text-zinc-400 mb-2">
                    <span>Noise Overlay</span>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={state.noiseEnabled}
                        onCheckedChange={(v) => {
                          updateState({ noiseEnabled: v });
                          if (v && !sectionOpen.noise) toggleSection("noise");
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform text-zinc-600",
                          sectionOpen.noise && "rotate-180",
                        )}
                      />
                    </div>
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-2 border-l-2 border-zinc-800">
                    <SliderRow
                      label="Intensity"
                      value={state.noiseIntensity}
                      onChange={(v) => updateState({ noiseIntensity: v })}
                      max={1}
                      step={0.01}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Performance metrics — persisted collapsible */}
            <div className="pt-3 border-t border-white/5">
              <Collapsible
                open={sectionOpen.metrics}
                onOpenChange={() => toggleSection("metrics")}
              >
                <CollapsibleTrigger asChild>
                  <button className="flex items-center justify-between w-full text-[10px] uppercase text-zinc-500 font-bold tracking-wider mb-2">
                    <span className="flex items-center gap-2">
                      <BarChart2 className="w-3 h-3" /> Render Metrics
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 transition-transform",
                        sectionOpen.metrics && "rotate-180",
                      )}
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        {
                          label: "Active",
                          value: `${metrics.active}/${metrics.total}`,
                        },
                        { label: "Avg Blur", value: `${metrics.avgBlur}px` },
                        {
                          label: "Complexity",
                          value: `${metrics.score}/100`,
                        },
                        {
                          label: "Animation",
                          value: state.animation.enabled
                            ? `${state.animation.duration}s`
                            : "Off",
                        },
                      ].map((m) => (
                        <div
                          key={m.label}
                          className="bg-zinc-950/60 rounded-lg p-2 border border-white/5"
                        >
                          <p className="text-[9px] text-zinc-600 uppercase tracking-wide">
                            {m.label}
                          </p>
                          <p className="text-xs font-bold text-zinc-200 mt-0.5">
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          metrics.score < 40
                            ? "bg-emerald-500"
                            : metrics.score < 70
                              ? "bg-amber-500"
                              : "bg-red-500",
                        )}
                        style={{ width: `${metrics.score}%` }}
                      />
                    </div>
                    {metrics.score >= 70 && (
                      <p className="text-[10px] text-amber-600 flex items-center gap-1">
                        <Zap className="w-3 h-3" /> High complexity — consider
                        reducing blur or layers.
                      </p>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        )}

        {/* ── CODE TAB ── */}
        {activeTab === "code" && (
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                Live CSS Editor
              </span>
              <div className="flex gap-2">
                {cssOverride && (
                  <button
                    onClick={() => setCssOverride(null)}
                    className="text-[10px] bg-red-900/30 text-red-400 px-2 py-0.5 rounded border border-red-900/50 flex items-center gap-1 hover:bg-red-900/50 transition-colors"
                  >
                    <RefreshCcw className="w-2.5 h-2.5" /> Reset
                  </button>
                )}
                <button
                  onClick={onOpenExport}
                  className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded border border-zinc-700 flex items-center gap-1 hover:text-white transition-colors"
                >
                  <Download className="w-2.5 h-2.5" /> Export
                </button>
              </div>
            </div>
            <textarea
              value={cssOverride ?? exportAsCSS(state)}
              onChange={(e) => setCssOverride(e.target.value)}
              className="w-full h-72 bg-zinc-950 p-3 rounded-lg font-mono text-[11px] text-zinc-400 leading-relaxed outline-none border border-zinc-800 focus:border-zinc-600 resize-none custom-scrollbar"
              spellCheck={false}
            />
            <p className="text-[10px] text-zinc-600">
              {cssOverride
                ? "⚠ Manual override active. Moving any slider resets edits."
                : `${(cssOverride ?? exportAsCSS(state)).split("\n").length} lines · auto-generated`}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-white/5 p-3 space-y-2">
        {/* A/B Comparison */}
        {snapshotA && (
          <div className="flex gap-1.5 items-center bg-zinc-950/50 rounded-xl px-3 py-2 border border-white/5">
            <span className="text-[10px] text-zinc-600 flex-1">A/B Compare</span>
            <button
              onClick={onToggleAB}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all",
                abViewingA
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700",
              )}
            >
              A
            </button>
            <button
              onClick={onToggleAB}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all",
                !abViewingA
                  ? "bg-emerald-600 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700",
              )}
            >
              B
            </button>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-1.5">
          <button
            onClick={onOpenExport}
            title="Export CSS/JSON (Ctrl+E)"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-[11px] font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button
            onClick={onStoreSnapshotA}
            title="Store as Snapshot A (Ctrl+A)"
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2 border rounded-xl text-[11px] font-medium transition-colors",
              snapshotA
                ? "bg-blue-900/20 border-blue-700/30 text-blue-400 hover:bg-blue-900/40"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800",
            )}
          >
            <Split className="w-3.5 h-3.5" />{" "}
            {snapshotA ? "Update A" : "A/B Snap"}
          </button>
        </div>

        {/* Preset save with name collision handling */}
        {showPresetInput ? (
          <PresetSaveDialog
            onSave={(name, overwriteId) => {
              onSavePreset(name, overwriteId);
              setShowPresetInput(false);
            }}
            onCancel={() => setShowPresetInput(false)}
            findByName={presetManager.findByName}
          />
        ) : (
          <button
            onClick={() => setShowPresetInput(true)}
            title="Save Preset (Ctrl+S)"
            className="w-full flex items-center justify-center gap-1.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-[11px] font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <Save className="w-3.5 h-3.5" /> Save Preset
          </button>
        )}

        {/* Preset manager */}
        <PresetManager
          allPresets={presetManager.allPresets}
          onLoad={(id) => {
            const s = presetManager.loadPreset(id);
            if (s) onStateChange(s);
          }}
          onDelete={presetManager.deletePreset}
          onExport={presetManager.exportAll}
          onImport={presetManager.importFile}
        />
      </div>
    </aside>
  );
}

// ========================================================================================
// SUB-COMPONENTS
// ========================================================================================

function PresetManager({
  allPresets,
  onLoad,
  onDelete,
  onExport,
  onImport,
}: {
  allPresets: Preset[];
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
  onExport: () => void;
  onImport: (file: File) => void;
}) {
  const [isOpen, setIsOpen] = useLocalStorageState("glow-presets-open-v4", false);
  const fileRef = useRef<HTMLInputElement>(null);
  const userPresets = allPresets.filter((p) => !p.builtin);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button className="flex items-center justify-between w-full text-[11px] font-medium text-zinc-600 hover:text-zinc-400 transition-colors py-1">
          <span className="flex items-center gap-1.5">
            <FolderOpen className="w-3 h-3" /> Presets ({allPresets.length})
          </span>
          <ChevronDown
            className={cn(
              "w-3 h-3 transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-1.5 space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar">
          <p className="text-[9px] text-zinc-700 uppercase tracking-widest font-bold px-1">
            Built-in
          </p>
          {BUILTIN_PRESETS.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-zinc-900/40 hover:bg-zinc-900 group cursor-pointer"
              onClick={() => onLoad(p.id)}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: p.state.layers[0]?.color ?? "#fff" }}
              />
              <span className="flex-1 text-[11px] text-zinc-400">{p.name}</span>
            </div>
          ))}

          {userPresets.length > 0 && (
            <>
              <p className="text-[9px] text-zinc-700 uppercase tracking-widest font-bold px-1 pt-1">
                Saved
              </p>
              {userPresets.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-zinc-900/40 hover:bg-zinc-900 group cursor-pointer"
                  onClick={() => onLoad(p.id)}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: p.state.layers[0]?.color ?? "#fff",
                    }}
                  />
                  <span className="flex-1 text-[11px] text-zinc-300 truncate">
                    {p.name}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(p.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-red-400 text-zinc-600 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </>
          )}

          <div className="flex gap-1.5 pt-1">
            <button
              onClick={() => fileRef.current?.click()}
              className="flex-1 py-1 text-[10px] bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Import
            </button>
            <button
              onClick={onExport}
              className="flex-1 py-1 text-[10px] bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Export
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".json"
            onChange={(e) => {
              if (e.target.files?.[0]) onImport(e.target.files[0]);
              e.target.value = "";
            }}
            className="hidden"
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function ExportModal({
  isOpen,
  onClose,
  state,
  cssOverride,
}: {
  isOpen: boolean;
  onClose: () => void;
  state: GlowState;
  cssOverride: string | null;
}) {
  const [fmt, setFmt] = useLocalStorageState<"css" | "json">(
    "glow-export-fmt",
    "css",
  );
  const [copied, setCopied] = useState(false);

  const css = cssOverride ?? exportAsCSS(state);
  const json = exportAsJSON(state);
  const content = fmt === "css" ? css : json;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = fmt === "css" ? "css" : "json";
    const blob = new Blob([content], {
      type: fmt === "css" ? "text/css" : "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `glow-${Date.now()}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 8 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="bg-zinc-900 border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[85vh] flex flex-col gap-4 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Export</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-1 bg-zinc-950 p-1 rounded-xl">
            {(
              [
                ["css", "CSS Stylesheet"],
                ["json", "JSON Config"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setFmt(id)}
                className={cn(
                  "flex-1 py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-2",
                  fmt === id
                    ? "bg-zinc-800 text-white shadow"
                    : "text-zinc-500 hover:text-zinc-300",
                )}
              >
                {id === "css" ? (
                  <Code className="w-3.5 h-3.5" />
                ) : (
                  <FileJson className="w-3.5 h-3.5" />
                )}
                {label}
              </button>
            ))}
          </div>

          <div className="relative flex-1 bg-zinc-950 rounded-xl border border-white/5 overflow-hidden min-h-64">
            <div className="absolute top-2 right-2 flex gap-1.5 z-10">
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                title="Copy"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={handleDownload}
                className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-zinc-400 overflow-auto h-full leading-relaxed">
              {content}
            </pre>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-600">
            <span>
              {content.split("\n").length} lines ·{" "}
              {(content.length / 1024).toFixed(1)} KB
            </span>
            <span>
              {state.layers.filter((l) => l.active).length} active layers
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function KeyboardShortcutsHelp({ onClose }: { onClose: () => void }) {
  const shortcuts = [
    { keys: ["Ctrl", "Z"], desc: "Undo" },
    { keys: ["Ctrl", "Y"], desc: "Redo" },
    { keys: ["Ctrl", "S"], desc: "Save preset" },
    { keys: ["Ctrl", "E"], desc: "Open export modal" },
    { keys: ["Ctrl", "P"], desc: "Toggle power" },
    { keys: ["Ctrl", "A"], desc: "Store Snapshot A" },
    { keys: ["Ctrl", "B"], desc: "Toggle A/B view" },
    { keys: ["Delete"], desc: "Remove selected layer" },
    { keys: ["?"], desc: "Toggle this dialog" },
  ];
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[300] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 10 }}
          className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">Keyboard Shortcuts</h3>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1.5">
            {shortcuts.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0"
              >
                <span className="text-xs text-zinc-300">{s.desc}</span>
                <div className="flex items-center gap-1">
                  {s.keys.map((k, ki) => (
                    <span
                      key={ki}
                      className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[10px] font-mono text-zinc-300"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function HistoryBrowser({
  items,
  onJump,
  onClose,
}: {
  items: { item: GlowState; index: number; isCurrent: boolean }[];
  onJump: (index: number) => void;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[300] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 10 }}
          className="bg-zinc-900 border border-white/10 rounded-2xl p-5 w-full max-w-xs shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <History className="w-4 h-4 text-zinc-400" /> History
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1 max-h-80 overflow-y-auto custom-scrollbar">
            {[...items].reverse().map(({ item, index, isCurrent }) => (
              <button
                key={index}
                onClick={() => {
                  onJump(index);
                  onClose();
                }}
                className={cn(
                  "w-full flex items-center gap-3 p-2.5 rounded-xl text-left border transition-all",
                  isCurrent
                    ? "bg-blue-900/30 border-blue-700/40 text-blue-300"
                    : "bg-zinc-900/50 border-transparent hover:border-zinc-700 text-zinc-400 hover:text-white",
                )}
              >
                <div className="flex gap-1 flex-shrink-0">
                  {item.layers.slice(0, 4).map((l) => (
                    <div
                      key={l.id}
                      className="w-2.5 h-2.5 rounded-full border border-white/10"
                      style={{
                        backgroundColor: l.active ? l.color : "transparent",
                      }}
                    />
                  ))}
                </div>
                <span className="flex-1 text-xs">State {index + 1}</span>
                {isCurrent && (
                  <span className="text-[9px] bg-blue-800/50 text-blue-300 px-1.5 py-0.5 rounded font-bold">
                    NOW
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-zinc-700 text-center">
            {items.length} states in history
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Reset Confirmation Modal
function ResetModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[300] flex items-center justify-center p-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 10 }}
          className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-xs shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 mb-3">
            <RotateCcw className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <h3 className="text-sm font-bold text-white">Reset to defaults?</h3>
          </div>
          <p className="text-xs text-zinc-500 mb-5">
            This will discard all unsaved changes and restore the initial Emerald
            Dream state. Saved presets are not affected.
          </p>
          <div className="flex gap-2">
            <button
              onClick={onConfirm}
              className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 rounded-xl text-xs font-bold text-white transition-colors"
            >
              Reset
            </button>
            <button
              onClick={onCancel}
              className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl text-xs text-zinc-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ========================================================================================
// MAIN APP COMPONENT
// ========================================================================================

export default function App() {
  // Load state with migration — guards against stale/corrupted localStorage
  const [currentState, setCurrentState] = useLocalStorageState<GlowState>(
    STATE_KEY,
    INITIAL_STATE,
  );

  // On first mount, validate and migrate whatever is stored
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const migrated = migrateState(parsed);
        // Only update if migration actually changed something
        if (JSON.stringify(parsed) !== JSON.stringify(migrated)) {
          setCurrentState(migrated);
        }
      }
    } catch {
      setCurrentState(deepClone(INITIAL_STATE));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [cssOverride, setCssOverride] = useState<string | null>(null);
  const [snapshotA, setSnapshotA] = useState<GlowState | null>(null);
  const [abViewingA, setAbViewingA] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const history = useHistory(currentState);
  const presetManager = usePresets();

  // Debounced history push — prevents stack flooding during slider drags
  const debouncedPush = useMemo(
    () => debounce((s: GlowState) => history.pushState(s), 400),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleStateChange = useCallback(
    (next: GlowState) => {
      setCurrentState(next);
      debouncedPush(next);
      if (abViewingA) setAbViewingA(false);
    },
    [debouncedPush, abViewingA, setCurrentState],
  );

  const handleUndo = useCallback(() => {
    const s = history.undo();
    if (s) {
      setCurrentState(s);
      setCssOverride(null);
    }
  }, [history, setCurrentState]);

  const handleRedo = useCallback(() => {
    const s = history.redo();
    if (s) {
      setCurrentState(s);
      setCssOverride(null);
    }
  }, [history, setCurrentState]);

  const handleJump = useCallback(
    (index: number) => {
      const s = history.jumpToIndex(index);
      if (s) {
        setCurrentState(s);
        setCssOverride(null);
      }
    },
    [history, setCurrentState],
  );

  const handleSavePreset = useCallback(
    (name: string, overwriteId?: string) =>
      presetManager.savePreset(name, currentState, overwriteId),
    [currentState, presetManager],
  );

  const handleStoreSnapshotA = useCallback(() => {
    setSnapshotA(deepClone(currentState));
    setAbViewingA(false);
  }, [currentState]);

  const handleToggleAB = useCallback(() => {
    if (snapshotA) setAbViewingA((v) => !v);
  }, [snapshotA]);

  const handleReset = useCallback(() => {
    const fresh = deepClone(INITIAL_STATE);
    setCurrentState(fresh);
    history.pushState(fresh);
    setCssOverride(null);
    setShowReset(false);
  }, [history, setCurrentState]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tgt = e.target as HTMLElement;
      const editing =
        tgt.tagName === "INPUT" || tgt.tagName === "TEXTAREA";

      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z" && !e.shiftKey) {
          e.preventDefault();
          handleUndo();
        } else if (e.key === "y" || (e.key === "z" && e.shiftKey)) {
          e.preventDefault();
          handleRedo();
        } else if (e.key === "s") {
          e.preventDefault();
          /* Ctrl+S opens preset save — bubble to RightPanel via showPresetInput */
        } else if (e.key === "e") {
          e.preventDefault();
          setShowExport(true);
        } else if (e.key === "p" && !editing) {
          e.preventDefault();
          handleStateChange({ ...currentState, power: !currentState.power });
        } else if (e.key === "a" && !editing) {
          e.preventDefault();
          handleStoreSnapshotA();
        } else if (e.key === "b" && !editing) {
          e.preventDefault();
          handleToggleAB();
        }
      } else if (e.key === "Delete" && !editing) {
        const { selectedLayerId, layers } = currentState;
        if (selectedLayerId && layers.length > 1) {
          const next = layers.filter((l) => l.id !== selectedLayerId);
          handleStateChange({
            ...currentState,
            layers: next,
            selectedLayerId: next[next.length - 1].id,
          });
        }
      } else if (e.key === "?" && !editing) {
        setShowShortcuts((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    currentState,
    handleUndo,
    handleRedo,
    handleStateChange,
    handleStoreSnapshotA,
    handleToggleAB,
  ]);

  const previewState =
    abViewingA && snapshotA ? snapshotA : currentState;

  return (
    <div className="h-screen w-screen bg-[#080808] text-zinc-100 flex overflow-hidden font-sans">

      {/* ─── Left Panel: Layers ─── */}
      <div className="hidden lg:block w-56 flex-shrink-0 overflow-y-auto">
        <ErrorBoundary fallbackLabel="Layers panel error" onReset={() => {}}>
          <LeftPanel
            state={currentState}
            onStateChange={handleStateChange}
            canUndo={history.canUndo}
            canRedo={history.canRedo}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onShowHistory={() => setShowHistory(true)}
            onShowShortcuts={() => setShowShortcuts(true)}
            onReset={() => setShowReset(true)}
          />
        </ErrorBoundary>
      </div>

      {/* ─── Center Panel: Preview ─── */}
      <ErrorBoundary fallbackLabel="Preview panel error">
        <CenterPanel
          state={previewState}
          onStateChange={handleStateChange}
          cssOverride={cssOverride}
          abViewingA={snapshotA ? abViewingA : undefined}
        />
      </ErrorBoundary>

      {/* ─── Right Panel: Properties ─── */}
      <div className="hidden lg:block flex-shrink-0 overflow-y-auto">
        <ErrorBoundary fallbackLabel="Properties panel error">
          <RightPanel
            state={currentState}
            onStateChange={handleStateChange}
            cssOverride={cssOverride}
            setCssOverride={setCssOverride}
            onOpenExport={() => setShowExport(true)}
            onSavePreset={handleSavePreset}
            presetManager={presetManager}
            snapshotA={snapshotA}
            onStoreSnapshotA={handleStoreSnapshotA}
            abViewingA={abViewingA}
            onToggleAB={handleToggleAB}
          />
        </ErrorBoundary>
      </div>

      {/* ─── Mobile: stacked layout with bottom tabs ─── */}
      <MobileLayout
        state={currentState}
        previewState={previewState}
        onStateChange={handleStateChange}
        cssOverride={cssOverride}
        setCssOverride={setCssOverride}
        onOpenExport={() => setShowExport(true)}
        onSavePreset={handleSavePreset}
        presetManager={presetManager}
        canUndo={history.canUndo}
        canRedo={history.canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        abViewingA={snapshotA ? abViewingA : undefined}
        snapshotA={snapshotA}
        onStoreSnapshotA={handleStoreSnapshotA}
        onToggleAB={handleToggleAB}
        onShowShortcuts={() => setShowShortcuts(true)}
        onShowHistory={() => setShowHistory(true)}
        onReset={() => setShowReset(true)}
      />

      {/* Modals */}
      <ExportModal
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        state={currentState}
        cssOverride={cssOverride}
      />
      {showHistory && (
        <HistoryBrowser
          items={history.historyItems}
          onJump={handleJump}
          onClose={() => setShowHistory(false)}
        />
      )}
      {showShortcuts && (
        <KeyboardShortcutsHelp onClose={() => setShowShortcuts(false)} />
      )}
      {showReset && (
        <ResetModal onConfirm={handleReset} onCancel={() => setShowReset(false)} />
      )}
    </div>
  );
}

// ========================================================================================
// MOBILE LAYOUT
// ========================================================================================

function MobileLayout({
  state,
  previewState,
  onStateChange,
  cssOverride,
  setCssOverride,
  onOpenExport,
  onSavePreset,
  presetManager,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  abViewingA,
  snapshotA,
  onStoreSnapshotA,
  onToggleAB,
  onShowShortcuts,
  onShowHistory,
  onReset,
}: {
  state: GlowState;
  previewState: GlowState;
  onStateChange: (s: GlowState) => void;
  cssOverride: string | null;
  setCssOverride: (v: string | null) => void;
  onOpenExport: () => void;
  onSavePreset: (name: string, overwriteId?: string) => void;
  presetManager: ReturnType<typeof usePresets>;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  abViewingA: boolean | undefined;
  snapshotA: GlowState | null;
  onStoreSnapshotA: () => void;
  onToggleAB: () => void;
  onShowShortcuts: () => void;
  onShowHistory: () => void;
  onReset: () => void;
}) {
  const [mobileTab, setMobileTab] = useState<"preview" | "layers" | "props">(
    "preview",
  );

  return (
    <div className="flex lg:hidden flex-col flex-1 overflow-hidden">
      {mobileTab === "preview" && (
        <div className="flex-1 overflow-hidden">
          <ErrorBoundary fallbackLabel="Preview error">
            <CenterPanel
              state={previewState}
              onStateChange={onStateChange}
              cssOverride={cssOverride}
              abViewingA={abViewingA}
            />
          </ErrorBoundary>
        </div>
      )}
      {mobileTab === "layers" && (
        <div className="flex-1 overflow-y-auto">
          <ErrorBoundary fallbackLabel="Layers error">
            <LeftPanel
              state={state}
              onStateChange={onStateChange}
              canUndo={canUndo}
              canRedo={canRedo}
              onUndo={onUndo}
              onRedo={onRedo}
              onShowHistory={onShowHistory}
              onShowShortcuts={onShowShortcuts}
              onReset={onReset}
            />
          </ErrorBoundary>
        </div>
      )}
      {mobileTab === "props" && (
        <div className="flex-1 overflow-y-auto w-full">
          <ErrorBoundary fallbackLabel="Properties error">
            <RightPanel
              state={state}
              onStateChange={onStateChange}
              cssOverride={cssOverride}
              setCssOverride={setCssOverride}
              onOpenExport={onOpenExport}
              onSavePreset={onSavePreset}
              presetManager={presetManager}
              snapshotA={snapshotA}
              onStoreSnapshotA={onStoreSnapshotA}
              abViewingA={abViewingA ?? false}
              onToggleAB={onToggleAB}
            />
          </ErrorBoundary>
        </div>
      )}

      {/* Bottom tab bar */}
      <div className="flex-shrink-0 flex border-t border-white/5 bg-zinc-950">
        {(
          [
            [
              "preview",
              "Preview",
              <Monitor className="w-4 h-4" key="m" />,
            ],
            ["layers", "Layers", <Layers className="w-4 h-4" key="l" />],
            [
              "props",
              "Properties",
              <Settings2 className="w-4 h-4" key="p" />,
            ],
          ] as const
        ).map(([id, label, icon]) => (
          <button
            key={id}
            onClick={() => setMobileTab(id)}
            className={cn(
              "flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors",
              mobileTab === id ? "text-white" : "text-zinc-600",
            )}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}