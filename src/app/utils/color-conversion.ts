/**
 * Color conversion utilities for Hex <-> OKLCH
 * 
 * Based on standard algorithms for sRGB <-> OKLCH conversion.
 */

// Utility to parse hex
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : null;
}

function componentToHex(c: number) {
  const hex = Math.round(c * 255).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// sRGB to Linear RGB
function sRgbToLinear(c: number) {
  return c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
}

// Linear RGB to sRGB
function linearToSRgb(c: number) {
  return c > 0.0031308 ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055 : 12.92 * c;
}

// Matrices
const M1 = [
  [0.4122214708, 0.5363325363, 0.0514459929],
  [0.2119034982, 0.6806995451, 0.1073969566],
  [0.0883024619, 0.2817188376, 0.6299787005]
];

const M2 = [
  [0.2104542553, 0.7936177850, -0.0040720468],
  [1.9779984951, -2.4285922050, 0.4505937099],
  [0.0259040371, 0.7827717662, -0.8086757660]
];

// Inverse Matrices
const InvM1 = [
  [4.0767416621, -3.3077115913, 0.2309699292],
  [-1.2684380046, 2.6097574011, -0.3413193965],
  [-0.0041960863, -0.7034186147, 1.7076147010]
];

const InvM2 = [
  [1, 0.3963377774, 0.2158037573],
  [1, -0.1055613458, -0.0638541728],
  [1, -0.0894841775, -1.2914855480]
];

function multiplyMatrix(matrix: number[][], v: number[]) {
  return [
    matrix[0][0] * v[0] + matrix[0][1] * v[1] + matrix[0][2] * v[2],
    matrix[1][0] * v[0] + matrix[1][1] * v[1] + matrix[1][2] * v[2],
    matrix[2][0] * v[0] + matrix[2][1] * v[1] + matrix[2][2] * v[2]
  ];
}

export function rgbToOklch(r: number, g: number, b: number): { l: number, c: number, h: number } {
  const linR = sRgbToLinear(r);
  const linG = sRgbToLinear(g);
  const linB = sRgbToLinear(b);

  const [l, m, s] = multiplyMatrix(M1, [linR, linG, linB]);
  
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const [L, a, b_] = multiplyMatrix(M2, [l_, m_, s_]);

  const C = Math.sqrt(a * a + b_ * b_);
  let H = Math.atan2(b_, a) * (180 / Math.PI);
  
  if (H < 0) H += 360;

  return { l: L, c: C, h: H };
}

export function oklchToRgb(l: number, c: number, h: number): { r: number, g: number, b: number } {
  const hRad = h * (Math.PI / 180);
  const a = c * Math.cos(hRad);
  const b_ = c * Math.sin(hRad);

  const [l_, m_, s_] = multiplyMatrix(InvM2, [l, a, b_]);

  const lLin = l_ * l_ * l_;
  const mLin = m_ * m_ * m_;
  const sLin = s_ * s_ * s_;

  const [linR, linG, linB] = multiplyMatrix(InvM1, [lLin, mLin, sLin]);

  let r = linearToSRgb(linR);
  let g = linearToSRgb(linG);
  let b = linearToSRgb(linB);

  // Clamp
  r = Math.max(0, Math.min(1, r));
  g = Math.max(0, Math.min(1, g));
  b = Math.max(0, Math.min(1, b));

  return { r, g, b };
}

export function hexToOklch(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return { l: 0, c: 0, h: 0 }; // Default black
  return rgbToOklch(rgb.r, rgb.g, rgb.b);
}

export function oklchToHex(l: number, c: number, h: number) {
  const rgb = oklchToRgb(l, c, h);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}
