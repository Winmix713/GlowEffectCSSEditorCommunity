import React from 'react';
import { GlowEditorProvider } from './context';
import { ControlPanel } from './control-panel';
import { Preview } from './Preview';

export function GlowEditor() {
  return (
    <GlowEditorProvider>
      <div className="min-h-screen bg-black text-zinc-100 flex flex-col items-center justify-center p-4 lg:p-10 font-sans">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-24 w-full max-w-7xl mx-auto">
          <div className="flex-1 w-full flex justify-center lg:justify-end lg:sticky lg:top-10">
            <Preview />
          </div>
          <div className="w-full lg:w-auto flex justify-center lg:justify-start lg:pt-14">
            <ControlPanel />
          </div>
        </div>
      </div>
    </GlowEditorProvider>
  );
}
