import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { useGlowEditor } from '../context';

export function ThemeSelect() {
  const { state, actions } = useGlowEditor();

  return (
    <div className="space-y-2">
      <label htmlFor="theme-select" className="text-sm font-medium text-zinc-400">
        Theme Mode
      </label>
      <Select
        value={state.themeMode}
        onValueChange={(v: 'dark' | 'light') => actions.setThemeMode(v)}
      >
        <SelectTrigger
          id="theme-select"
          className="w-full bg-zinc-950 border-zinc-800 text-zinc-300 h-9 rounded-lg focus-visible:ring-2 focus-visible:ring-zinc-400"
        >
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-300">
          <SelectItem value="dark">Dark Mode</SelectItem>
          <SelectItem value="light">Light Mode</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
