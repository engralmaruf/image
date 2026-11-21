import React from 'react';
import {LayoutProps, ease, lin} from '../common';
// data: {callTitle, tiles:[{name}] x12 (first = You), chat:{from,text}}
export const Calls: React.FC<LayoutProps> = ({c, g, data}) => {
  const tiles = data.tiles as {name: string}[];
  const w = 308, h = 150, gap = 14;
  const chatP = lin(g, 150, 70);
  const text = (data.chat.text as string).slice(0, Math.round(chatP * data.chat.text.length));
  const secs = g >= 9999 ? 221 : 200 + Math.floor(g / 30);
  const mm = String(Math.floor(secs / 60)).padStart(2, '0'), ss = String(secs % 60).padStart(2, '0');
  return (
    <div style={{position: 'absolute', left: 64, width: 952, top: 0}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', height: 56}}>
        <span style={{fontSize: 32, fontWeight: 800, letterSpacing: -1}}>{data.callTitle}</span>
        <span style={{fontSize: 22, fontWeight: 600, color: c.mute}}>{tiles.length} participants · {mm}:{ss}</span>
      </div>
      {tiles.map((t, i) => {
        const col = i % 3, row = Math.floor(i / 3);
        const p = ease(g, i * 4, 12);
        const s0 = 20 + i * 15;
        const speaking = g >= s0 && g < s0 + 15;
        const color = i === 0 ? c.acc2 : c.palette[i % c.palette.length];
        return (
          <div key={i} style={{position: 'absolute', left: col * (w + gap), top: 62 + row * (h + gap), width: w, height: h, borderRadius: 24, background: c.card, border: `${speaking ? 5 : 3}px solid ${speaking ? c.ok : c.line}`, opacity: p, transform: `scale(${0.92 + 0.08 * p})`, boxShadow: speaking ? `0 0 0 6px ${c.ok}33` : 'none'}}>
            <div style={{position: 'absolute', left: w / 2 - 38 - 3, top: 18, width: 76, height: 76, borderRadius: 38, background: color + '22', border: `3px solid ${color}`, color, fontSize: i === 0 ? 22 : 34, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i === 0 ? 'YOU' : t.name.replace(/\(.*/, '').trim().charAt(0)}</div>
            <div style={{position: 'absolute', left: 14, bottom: 12, background: c.dim, borderRadius: 12, padding: '4px 12px', fontSize: 20, fontWeight: 600}}>{t.name}</div>
            {speaking && (
              <div style={{position: 'absolute', right: 16, top: 16, display: 'flex', gap: 4, alignItems: 'flex-end', height: 24}}>
                {[0, 1, 2].map((k) => <div key={k} style={{width: 6, borderRadius: 3, background: c.ok, height: 8 + 14 * Math.abs(Math.sin(g * 0.5 + k * 1.7))}} />)}
              </div>
            )}
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 0, right: 0, top: 62 + 4 * (h + gap), height: 92, borderRadius: 24, background: c.card, border: `3px solid ${c.line}`, padding: '16px 24px', fontSize: 26, fontWeight: 600}}>
        <b style={{fontWeight: 800}}>{data.chat.from}: </b>{text}<span style={{color: c.acc}}>{chatP < 1 ? '▍' : ''}</span>
      </div>
    </div>
  );
};
