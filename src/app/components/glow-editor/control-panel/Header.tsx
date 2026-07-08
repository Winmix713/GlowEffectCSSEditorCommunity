import React from 'react';
import { Switch } from "../../ui/switch";
import { useGlowEditor } from '../context';

export function ControlPanelHeader() {
  const { state, actions } = useGlowEditor();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Glow Editor</h2>
        <p className="text-sm text-zinc-500">CSS Progressive Blur</p>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="power-switch" className="text-xs font-bold text-zinc-500 tracking-wider uppercase">
          Power
        </label>
        <Switch
          id="power-switch"
          checked={state.power}
          onCheckedChange={actions.setPower}
          aria-label="Toggle glow effect"
          className="data-[state=unchecked]:bg-zinc-950 border border-white/10 transition-colors duration-300"
          style={{
            backgroundColor: state.power ? state.hexColor : undefined,
            borderColor: state.power ? state.hexColor : undefined
          }}
        />
      </div>
    </div>
  );
}
