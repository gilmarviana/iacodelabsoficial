
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Paintbrush } from 'lucide-react';

const colors = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6',
  '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'
];

function hexToRgba(hex, alpha = 1) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

function rgbaToHexA(rgba) {
  // Accepts rgba(255,255,255,0.5) or #fff or #ffffff
  if (!rgba) return '#ffffff';
  if (rgba.startsWith('#')) return rgba;
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return '#ffffff';
  const r = parseInt(match[1]), g = parseInt(match[2]), b = parseInt(match[3]);
  const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
  const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return { hex, alpha: a };
}

const ColorPicker = ({ value, onChange, trigger }) => {
  const { hex, alpha } = typeof value === 'string' && value.startsWith('rgba') ? rgbaToHexA(value) : { hex: value || '#ffffff', alpha: 1 };
  const [customHex, setCustomHex] = useState(hex);
  const [customAlpha, setCustomAlpha] = useState(alpha);

  const handleCustomChange = (h, a) => {
    setCustomHex(h);
    setCustomAlpha(a);
    onChange(`rgba(${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)},${a})`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
            <div className="w-5 h-5 rounded-full border" style={{ background: `rgba(${parseInt(customHex.slice(1,3),16)},${parseInt(customHex.slice(3,5),16)},${parseInt(customHex.slice(5,7),16)},${customAlpha})` }} />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <div className="grid grid-cols-8 gap-1 mb-2">
          {colors.map(color => (
            <button
              key={color}
              className="w-6 h-6 rounded-full border hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => handleCustomChange(color, 1)}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="color"
            value={customHex}
            onChange={e => handleCustomChange(e.target.value, customAlpha)}
            className="w-8 h-8 p-0 border rounded"
          />
          <input
            type="text"
            value={customHex}
            onChange={e => {
              const v = e.target.value;
              if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(v)) handleCustomChange(v, customAlpha);
              setCustomHex(v);
            }}
            className="w-20 border rounded px-1 py-0.5 text-xs"
            maxLength={7}
          />
          <span className="text-xs">Alpha</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={customAlpha}
            onChange={e => handleCustomChange(customHex, parseFloat(e.target.value))}
            className="w-16"
          />
          <span className="text-xs w-6 text-right">{Math.round(customAlpha*100)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs">Preview:</span>
          <div className="w-8 h-8 rounded-full border" style={{ background: `rgba(${parseInt(customHex.slice(1,3),16)},${parseInt(customHex.slice(3,5),16)},${parseInt(customHex.slice(5,7),16)},${customAlpha})` }} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
