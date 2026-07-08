import React from 'react';
import { ControlPanelHeader } from './Header';
import { ThemeSelect } from './ThemeSelect';
import { ColorSection } from './ColorSection';
import { ShapeSection } from './ShapeSection';
import { PositionSection } from './PositionSection';
import { CodeExport } from './CodeExport';

export function ControlPanel() {
  return (
    <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-6 text-zinc-100 shadow-2xl">
      <ControlPanelHeader />
      <ThemeSelect />
      <ColorSection />
      <ShapeSection />
      <PositionSection />
      <CodeExport />
    </div>
  );
}
