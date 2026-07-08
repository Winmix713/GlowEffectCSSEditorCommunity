import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

interface PreviewProps {
  power: boolean;
  themeMode: "dark" | "light";
  color: string; // OKLCH string or Hex
  maskSize: number; // 0 to 1
  glowScale: number; // 0.5 to 2
  positionX: number; // Left position in px
  positionY: number; // Top position in px
  noiseEnabled: boolean;
  noiseIntensity: number; // 0 to 1
  setPower: (v: boolean) => void;
  setHexColor: (v: string) => void;
}

export function Preview({
  power,
  themeMode,
  color,
  maskSize,
  glowScale,
  positionX,
  positionY,
  noiseEnabled,
  noiseIntensity,
  setPower,
  setHexColor,
}: PreviewProps) {
  // Transition settings
  const transition = {
    type: "tween",
    ease: [0.4, 0, 0.2, 1], // Bezier curve
    duration: 0.8,
  };

  const isDark = themeMode === "dark";

  // SVG noise as data URL
  const noiseSvg =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' /></filter><rect width='100%' height='100%' filter='url(%23n)' /></svg>";

  // Random color generator and animation handler
  const handleSpotlightClick = () => {
    // Turn off glow
    setPower(false);

    // Wait for fade out to complete, then change color and turn back on
    setTimeout(() => {
      // Generate random hex color
      const randomHex =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0");
      setHexColor(randomHex);

      // Turn glow back on after color change
      setTimeout(() => {
        setPower(true);
      }, 90);
    }, 950);
  };

  return (
    <div className="flex items-center justify-center p-10 min-h-[500px]">
      {/* Phone Frame */}
      <div
        className={cn(
          "relative w-[290px] h-[350px] rounded-[40px] overflow-hidden shadow-2xl border-4 transition-colors duration-500",
          isDark
            ? "bg-[#050505] border-zinc-900"
            : "bg-white border-zinc-100",
        )}
      >
        {/* Glow Container */}
        <motion.div
          className="absolute w-[800px] h-[1000px] pointer-events-none"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 30%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 30%, transparent 100%)",
          }}
          animate={{
            opacity: power ? 1 : 0,
            scale: glowScale,
            left: positionX,
            top: positionY,
          }}
          transition={transition}
        >
          {/* Shape 1 (Large, Background) */}
          <motion.div
            className={cn(
              "absolute top-[100px] left-[100px] w-[600px] rounded-full opacity-40",
              isDark ? "mix-blend-screen" : "mix-blend-normal",
            )}
            style={{
              backgroundColor: color,
              height: `${600 * maskSize + 200}px`,
              filter: "blur(80px)",
            }}
            animate={{
              height: `${600 * maskSize + 200}px`,
            }}
            transition={transition}
          />

          {/* Shape 2 (Medium) */}
          <motion.div
            className={cn(
              "absolute top-[200px] left-[180px] w-[440px] h-[440px] rounded-full opacity-60",
              isDark ? "mix-blend-screen" : "mix-blend-normal",
            )}
            style={{
              backgroundColor: color,
              filter: "blur(60px)",
            }}
            transition={transition}
          />

          {/* Shape 3 (Core Color) */}
          <motion.div
            className={cn(
              "absolute top-[250px] left-[220px] w-[360px] h-[300px] rounded-full",
              isDark ? "mix-blend-screen" : "mix-blend-normal",
            )}
            style={{
              backgroundColor: color,
              filter: "blur(40px)",
              opacity: isDark ? 1 : 0.6,
            }}
            transition={transition}
          />

          {/* Highlight (White Core) */}
          <motion.div
            className="absolute top-[280px] left-[280px] w-[240px] h-[180px] rounded-full mix-blend-normal"
            style={{
              backgroundColor: "#FFFFFF",
              filter: isDark ? "blur(30px)" : "blur(40px)",
            }}
            animate={{
              filter: isDark ? "blur(30px)" : "blur(45px)",
              opacity: isDark ? 0.4 : 0.7,
            }}
            transition={transition}
          />
        </motion.div>

        {/* Noise Overlay */}
        <motion.div
          className="absolute inset-0 w-full h-full pointer-events-none z-[5] mix-blend-overlay"
          style={{
            backgroundImage: `url("${noiseSvg}")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
          animate={{
            opacity: noiseEnabled && power ? noiseIntensity : 0,
          }}
          transition={transition}
        />
      </div>
    </div>
  );
}