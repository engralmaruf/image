import React from 'react';
import {LayoutProps, ease} from '../common';
// data: {items:[{t,s}] (6 recommended)}
export const Rail: React.FC<LayoutProps> = ({c, g, data}) => {
  const items = data.items as {t: string; s: string}[];
  const n = items.length, rowH = 118, gap = 14, START = 10, PER = 34;
  const idx = (g - START) / PER;
  const running = g >= START && g < START + PER * n;
  const active = running ? Math.floor(idx) : -1;
  return (
    <div style={{position: 'absolute', left: 64, width: 952, top: 10}}>
      <div style={{position: 'absolute', left: 41, top: 40, width: 6, height: n * rowH + (n - 1) * gap - 80, background: c.dim, borderRadius: 3}} />
      {running && <div style={{position: 'absolute', left: 35, top: rowH / 2 - 9 + idx * (rowH + gap), width: 18, height: 18, borderRadius: 9, background: c.acc, boxShadow: `0 0 0 8px ${c.accSoft}`}} />}
      {items.map((s, i) => {
        const isA = i === active;
        const done = g >= START + PER * (i + 1);
        const pop = isA ? ease(g - START - PER * i, 0, 9) : 0;
        return (
          <div key={i} style={{position: 'absolute', left: 0, right: 0, top: i * (rowH + gap), height: rowH, borderRadius: 26, background: isA ? c.accSoft : c.card, border: `3px solid ${isA ? c.acc : c.line}`, display: 'flex', alignItems: 'center', padding: '0 28px 0 20px', transform: `translateX(${10 * pop}px)`, boxShadow: isA ? `0 14px 34px ${c.acc}33` : 'none'}}>
            <div style={{width: 56, height: 56, borderRadius: 28, background: isA || done ? c.acc : c.dim, color: isA || done ? c.onAcc : c.mute, fontWeight: 800, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none'}}>{done ? '✓' : i + 1}</div>
            <div style={{marginLeft: 24, flex: 1}}>
              <div style={{fontSize: 38, fontWeight: 800, letterSpacing: -1}}>{s.t}</div>
              <div style={{fontSize: 25, fontWeight: 600, color: c.mute, marginTop: 2}}>{s.s}</div>
            </div>
            <div style={{fontSize: 21, fontWeight: 800, letterSpacing: 2, color: isA ? c.acc : c.ok}}>{isA ? 'RUNNING' : done ? 'DONE' : ''}</div>
          </div>
        );
      })}
    </div>
  );
};
