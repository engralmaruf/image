import React from 'react';
import {LayoutProps, ease, lin, AsteriskIcon} from '../common';
// data: {items:[{t}] x20 (5 cols x 4 rows)}
export const Folders: React.FC<LayoutProps> = ({c, g, data}) => {
  const items = data.items as {t: string}[];
  const cols = 5, cw = 180, ch = 196, gx = (952 - cols * cw) / (cols - 1);
  return (
    <div style={{position: 'absolute', left: 64, width: 952, top: 6}}>
      {items.map((it, i) => {
        const col = i % cols, row = Math.floor(i / cols);
        const p = ease(g, i * 4, 14);
        const scanStart = 125 + i * 5;
        const hot = g >= scanStart && g < scanStart + 9;
        const s = (0.6 + 0.4 * p) * (hot ? 1.12 : 1);
        return (
          <div key={i} style={{position: 'absolute', left: col * (cw + gx), top: row * (ch + 8), width: cw, height: ch, opacity: p, transform: `scale(${s})`, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <svg width="132" height="108" viewBox="0 0 120 98" style={{filter: hot ? `drop-shadow(0 10px 18px ${c.acc2}88)` : `drop-shadow(0 8px 14px ${c.acc}33)`}}>
              <path d="M6 14 Q6 6 14 6 H44 L54 16 H106 Q114 16 114 24 V84 Q114 92 106 92 H14 Q6 92 6 84 Z" fill={hot ? c.acc2 : c.acc} opacity="0.55" />
              <rect x="6" y="26" width="108" height="66" rx="10" fill={hot ? c.acc2 : c.acc} />
              <g transform="translate(40 40)"><AsteriskIcon size={40} color="#fff" /></g>
            </svg>
            <div style={{marginTop: 8, fontSize: 22, fontWeight: 600, lineHeight: 1.12, textAlign: 'center', color: hot ? c.ink : c.mute, padding: '0 4px'}}>{it.t}</div>
          </div>
        );
      })}
    </div>
  );
};
