### 1. **App.tsx**
**Szerepkör:** Alkalmazás fő belépési pontja  
**Funkció:** A GlowEditor komponens wrapper-je, fekete hátteret és teljes képernyős layout-ot biztosít.

**Fejlesztési Javaslatok:**
- [ ] Routing implementálása (React Router) több oldal támogatásához
- [ ] Global state management (Context API vagy Zustand)
- [ ] Error boundary hozzáadása hibakezeléshez
- [ ] Loading state implementálása az alkalmazás betöltéséhez
- [ ] SEO meta tagek beágyazása (ha SSR-rel használják)

---

### 2. **components/glow-editor/GlowEditor.tsx**
**Szerepkör:** Fő szerkesztő komponens és állapotkezelés  
**Funkció:** 
- Központi state management a glow effekt paraméterekhez
- OKLCH ↔ Hex színkonverzió kezelése
- ControlPanel és Preview komponensek összekötése
- Valós idejű szinkronizáció a color slider-ek és hex input között

**Fejlesztési Javaslatok:**
- [ ] Undo/Redo funkcionalitás hozzáadása (history stack)
- [ ] Preset rendszer implementálása (mentés/betöltés)
- [ ] Export funkcionalitás (CSS, JSON, képként)
- [ ] Local Storage perzisztencia az állapothoz
- [ ] Keyboard shortcuts támogatása (pl. Ctrl+S mentéshez)
- [ ] Multi-layer támogatás (több glow réteg egyszerre)
- [ ] Animation timeline a glow változásokhoz

---

### 3. **components/glow-editor/ControlPanel.tsx**
**Szerepkör:** Felhasználói vezérlő panel  
**Funkció:**
- OKLCH szín paraméterek kezelése (Lightness, Chroma, Hue)
- Theme mode váltás (dark/light)
- Glow shape konfiguráció (mask size, scale)
- Pozíció beállítások
- Noise overlay vezérlők
- CSS kód megjelenítés és másolás

**Fejlesztési Javaslatok:**
- [ ] Collapsible szekciók állapotának mentése
- [ ] Preset selector dropdown hozzáadása
- [ ] Real-time CSS kód syntax highlighting
- [ ] Export gomb külön modállal (több formátum)
- [ ] Keyboard input támogatása a slider értékekhez
- [ ] Range lock funkció (paraméterek összekötése)
- [ ] A/B összehasonlítás két beállítás között
- [ ] History browser az undo/redo-hoz

---

### 4. **components/glow-editor/Preview.tsx**
**Szerepkör:** Valós idejű előnézet renderelő  
**Funkció:**
- 290×350px-es telefon keret megjelenítése
- 4 rétegű glow effekt renderelése Motion animációkkal
- Noise overlay szimulálása SVG-vel
- Click to randomize funkció
- Smooth transitions (0.8s bezier curve)

**Fejlesztési Javaslatok:**
- [ ] Screenshot export funkcionalitás
- [ ] Többféle keret méret támogatása (tablet, desktop)
- [ ] Grid overlay hozzáadása pozíció finomhangoláshoz
- [ ] Drag & drop a glow pozíció beállításához
- [ ] Real-time performance metrics megjelenítése
- [ ] Canvas alapú renderelés a jobb teljesítményért
- [ ] Video export (animált glow változások)
- [ ] Split view (before/after összehasonlítás)

---

### 5. **components/figma/ImageWithFallback.tsx**
**Szerepkör:** Képbetöltés hibakezelő komponens  
**Funkció:**
- Képek betöltésének kezelése error state-tel
- Fallback SVG ikon megjelenítése sikertelen betöltés esetén

**Fejlesztési Javaslatok:**
- [ ] Lazy loading implementálása
- [ ] Retry mechanizmus hozzáadása
- [ ] Loading skeleton/spinner animáció
- [ ] Progressive image loading (blur-up technika)
- [ ] WebP formátum támogatás detektálással
- [ ] Image optimization cache réteg
- [ ] Error reporting analytics integrációval

---

### 6. **imports/Frame3.tsx**
**Szerepkör:** Figma design preview komponens  
**Funkció:**
- Két frame SVG renderelése (dark és light mode)
- Design referencia vizualizáció

**Fejlesztési Javaslatok:**
- [ ] Dinamikus színparaméterek átadása
- [ ] Interaktivitás hozzáadása (kattintható elemek)
- [ ] Responsive méretezés
- [ ] Export mint standalone komponens
- [ ] SVG optimalizáció (méretcsökkentés)
- [ ] Animation támogatás a glow rétegeknél

---

### 7. **imports/GlowEffectCssEditor.tsx**
**Szerepkör:** Figma import statikus UI komponens  
**Funkció:**
- Teljes ControlPanel UI statikus megvalósítása Figma-ból
- Design rendszer vizuális referencia

**Fejlesztési Javaslatok:**
- [ ] Komponensekre bontás (atomic design)
- [ ] Funkcionális vezérlőkkel való helyettesítés
- [ ] Accessibility javítása (ARIA labels)
- [ ] Tailwind class optimalizáció
- [ ] Responsive breakpoint-ok hozzáadása
- [ ] Interaktív prototípus készítése
- [ ] Storybook integráció design review-hoz

---

### 8. **imports/svg-4s1gnmg8kz.ts**
**Szerepkör:** SVG path export modul  
**Funkció:**
- SVG útvonal adatok tárolása
- Icon rendereléshez path-ok exportálása

**Fejlesztési Javaslatok:**
- [ ] TypeScript típusozás javítása
- [ ] SVG sprite rendszer implementálása
- [ ] Icon komponens generátor
- [ ] Path optimalizáció (SVGO használata)
- [ ] ViewBox adatok hozzáadása
- [ ] Automated export pipeline Figma-ból

---

### 9. **lib/utils.ts**
**Szerepkör:** Utility függvények könyvtár  
**Funkció:**
- `cn()` függvény a Tailwind class merge-hez

**Fejlesztési Javaslatok:**
- [ ] További utility függvények hozzáadása:
  - [ ] `debounce()` és `throttle()` helpers
  - [ ] `clamp()` függvény számértékek korlátozásához
  - [ ] `lerp()` linear interpolációhoz
  - [ ] `formatCss()` CSS kód formázáshoz
- [ ] Type guards hozzáadása
- [ ] Unit tesztek írása

---

### 10. **utils/color-conversion.ts**
**Szerepkör:** Színkonverziós motor  
**Funkció:**
- Hex ↔ RGB ↔ OKLCH konverziók
- sRGB ↔ Linear RGB transformációk
- Mátrix műveletek (M1, M2, InvM1, InvM2)

**Fejlesztési Javaslatok:**
- [ ] További színterek támogatása:
  - [ ] HSL ↔ OKLCH
  - [ ] OKLCH ↔ P3 Display
  - [ ] OKLCH ↔ Lab
- [ ] Gamut mapping implementálása
- [ ] Color contrast ratio számítás (WCAG)
- [ ] Color blindness szimuláció
- [ ] Memoization a számításokhoz
- [ ] Unit tesztek matematikai pontossághoz
- [ ] Performance optimalizáció (WASM port?)

---

### 11. **styles/globals.css**
**Szerepkör:** Globális CSS változók és stílusok  
**Funkció:**
- CSS custom properties definiálása (light/dark mode)
- Tailwind v4 konfiguráció
- Design token rendszer
- Typography alapértelmezések

**Fejlesztési Javaslatok:**
- [ ] CSS változók dinamikus frissítése JavaScript-ből
- [ ] További theme-ek hozzáadása (high contrast, colorblind)
- [ ] Animation utility class-ok
- [ ] Responsive typography scale
- [ ] Print stylesheet
- [ ] Dark mode transition animáció
- [ ] CSS variables for glow presets

---

### 12. **Attributions.md**
**Szerepkör:** Licensz és hivatkozások dokumentáció  
**Funkció:**
- Shadcn/ui MIT licensz hivatkozás
- Unsplash képek licensz info

**Fejlesztési Javaslatok:**
- [ ] Minden használt könyvtár hozzáadása
- [ ] Verzió információk dokumentálása
- [ ] Contributors lista
- [ ] Changelog hozzáadása
- [ ] README.md link hozzáadása
- [ ] Third-party API hivatkozások

---

## Globális Fejlesztési Prioritások

### 🔴 High Priority
1. **Preset Rendszer** - Mentés/betöltés funkcionalitás
2. **Export Funkciók** - CSS, JSON, képként exportálás
3. **Undo/Redo** - History management
4. **Performance Optimalizáció** - Canvas rendering, memoization

### 🟡 Medium Priority
5. **Keyboard Shortcuts** - Power user funkciók
6. **Multi-layer Support** - Több glow réteg kezelése
7. **Accessibility** - ARIA labels, keyboard navigation
8. **Responsive Design** - Mobil nézet optimalizálása

### 🟢 Low Priority
9. **Storybook Integration** - Komponens dokumentáció
10. **Unit & E2E Tests** - Teszt lefedettség növelése
11. **Animation Timeline** - Glow animációk időzítése
12. **Advanced Color Tools** - Contrast checker, color blindness szimuláció

---

## Technológiai Stack

- **Framework:** React 18+ (TypeScript)
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (Framer Motion fork)
- **UI Components:** Shadcn/ui
- **Color Science:** Custom OKLCH implementation
- **Build Tool:** (Implicit - Vite/Next.js feltételezve)

---