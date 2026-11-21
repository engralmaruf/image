import React from 'react';
import {LayoutProps, ease, lin} from '../common';
// data: {cards:[{name,tag,tasks:[a,b,c]}] x4}
const spark = (seed: number) => {
  const pts: [number, number][] = [];
  for (let i = 0; i <= 24; i++) pts.push([i * 17, 70 - i * 1.9 - 9 * Math.sin(i * 0.9 + seed) - 5 * Math.sin(i * 2.3 + seed * 2)]);
  return pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
};
export const Dashboard: React.FC<LayoutProps> = ({c, g, data}) => {
  const cards = data.cards as {name: string; tag: string; tasks: string[]}[];
  const w = 468, h = 402;
  return (
    <div style={{position: 'absolute', left: 64, width: 952, top: 0}}>
      {cards.map((cd, i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const color = c.palette[[0, 3, 2, 1][i % 4]];
        const p = ease(g, i * 6, 14);
        const sp = lin(g, 40 + i * 8, 150);
        return (
          <div key={i} style={{position: 'absolute', left: col * (w + 16), top: row * (h + 16), width: w, height: h, background: c.card, border: `3px solid ${c.line}`, borderLeft: `8px solid ${color}`, borderRadius: 28, padding: '22px 26px', opacity: p, transform: `translateY(${(1 - p) * 24}px)`, boxShadow: '0 12px 30px rgba(20,60,120,.10)'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div>
                <div style={{fontSize: 34, fontWeight: 800, letterSpacing: -1}}>{cd.name}</div>
                <div style={{fontSize: 22, fontWeight: 600, color: c.mute}}>{cd.tag}</div>
              </div>
              <div style={{fontSize: 19, fontWeight: 800, letterSpacing: 2, color: c.ok, background: c.ok + '22', borderRadius: 14, padding: '6px 14px'}}>● LIVE</div>
            </div>
            <div style={{marginTop: 16}}>
              {cd.tasks.map((t, j) => {
                const pr = lin(g, 30 + i * 8 + j * 30, 40);
                const st = pr >= 1 ? 'DONE' : pr > 0 ? 'RUNNING' : 'QUEUED';
                return (
                  <div key={j} style={{marginBottom: 12}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 23, fontWeight: 600}}>
                      <span>{t}</span>
                      <span style={{fontSize: 17, fontWeight: 800, letterSpacing: 2, color: st === 'DONE' ? c.ok : st === 'RUNNING' ? color : c.mute}}>{st}</span>
                    </div>
                    <div style={{height: 10, borderRadius: 5, background: c.dim, marginTop: 6}}>
                      <div style={{height: 10, borderRadius: 5, width: `${pr * 100}%`, background: color}} />
                    </div>
                  </div>
                );
              })}
            </div>
            <svg width="416" height="80" viewBox="0 0 408 80" style={{position: 'absolute', left: 26, bottom: 36}}>
              <path d={spark(i * 1.7)} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - sp} />
            </svg>
            <div style={{position: 'absolute', left: 26, bottom: 12, fontSize: 15, fontWeight: 800, letterSpacing: 2, color: c.mute}}>ILLUSTRATIVE TREND</div>
          </div>
        );
      })}
    </div>
  );
};
