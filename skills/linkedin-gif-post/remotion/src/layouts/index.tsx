import React from 'react';
import {LayoutProps, ease} from '../common';
// data: {sections:[{title, items:[{t,d}] x4}] x6}
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];
export const Index: React.FC<LayoutProps> = ({c, g, data}) => {
  const secs = data.sections as {title: string; items: {t: string; d: string}[]}[];
  const w = 468, h = 266, gap = 14;
  let counter = 0;
  return (
    <div style={{position: 'absolute', left: 64, width: 952, top: 0}}>
      {secs.map((s, i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const p = ease(g, i * 12, 14);
        const color = c.palette[i];
        const start = counter; counter += s.items.length;
        return (
          <div key={i} style={{position: 'absolute', left: col * (w + 16), top: row * (h + gap), width: w, height: h, background: c.card, border: `3px solid ${c.line}`, borderRadius: 26, padding: '16px 22px', opacity: p, transform: `translateY(${(1 - p) * 22}px)`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8}}>
              <div style={{background: color, color: '#fff', borderRadius: 10, padding: '2px 12px', fontSize: 20, fontWeight: 800, fontFamily: 'IS', fontStyle: 'italic'}}>{ROMAN[i]}</div>
              <div style={{fontSize: 27, fontWeight: 800, letterSpacing: -0.5}}>{s.title}</div>
            </div>
            {s.items.map((it, j) => {
              const ip = ease(g, i * 12 + 12 + j * 7, 10);
              return (
                <div key={j} style={{display: 'flex', alignItems: 'baseline', height: 41, borderTop: `2px solid ${c.line}`, opacity: ip, transform: `translateX(${(1 - ip) * 14}px)`}}>
                  <span style={{width: 40, fontSize: 18, fontWeight: 800, color: c.mute}}>{String(start + j + 1).padStart(2, '0')}</span>
                  <span style={{fontSize: 23, fontWeight: 800, flex: 'none', paddingTop: 7}}>{it.t}</span>
                  <span style={{marginLeft: 'auto', fontSize: 17, fontWeight: 600, color: c.mute, paddingTop: 7}}>{it.d}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
