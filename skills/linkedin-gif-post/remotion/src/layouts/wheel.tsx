import React from 'react';
import {LayoutProps, ease, lin} from '../common';
// data: {steps:[{time,t,done}] x8, note}
const pt = (cx: number, cy: number, r: number, a: number) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
const arc = (cx: number, cy: number, r1: number, r2: number, a0: number, a1: number) => {
  const [x0, y0] = pt(cx, cy, r2, a0), [x1, y1] = pt(cx, cy, r2, a1), [x2, y2] = pt(cx, cy, r1, a1), [x3, y3] = pt(cx, cy, r1, a0);
  return `M${x0} ${y0} A${r2} ${r2} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${r1} ${r1} 0 0 0 ${x3} ${y3} Z`;
};
export const Wheel: React.FC<LayoutProps> = ({c, g, data}) => {
  const steps = data.steps as {time: string; t: string; done: string}[];
  const n = 8, cx = 476, cy = 307, R = 195, r = 124;
  const prog = g >= 9999 ? 1 : lin(g, 12, 210);
  const hand = -90 + 360 * prog;
  const act = prog >= 1 || prog <= 0 ? -1 : Math.floor(prog * n);
  const state = (i: number) => (g >= 9999 ? 'done' : prog >= (i + 1) / n ? 'done' : act === i ? 'act' : 'wait');
  const order = [0, 1, 2, 3, 7, 6, 5, 4]; // right column top->bottom = 0..3 ; left column top->bottom = 7..4
  const card = (i: number, side: 'l' | 'r', slot: number) => {
    const st = state(i), color = c.palette[i];
    return (
      <div key={i} style={{position: 'absolute', [side === 'l' ? 'left' : 'right']: 0, top: 20 + slot * 148, width: 272, height: 130, borderRadius: 22, background: st === 'act' ? c.accSoft : c.card, border: `3px solid ${st === 'act' ? color : c.line}`, padding: '12px 16px', opacity: st === 'wait' ? 0.55 : 1, boxShadow: st === 'act' ? `0 0 26px ${color}55` : 'none'}}>
        <div style={{display: 'inline-block', background: color, color: '#fff', borderRadius: 10, padding: '2px 10px', fontSize: 18, fontWeight: 800}}>{steps[i].time}</div>
        <div style={{fontSize: 24, fontWeight: 800, lineHeight: 1.08, marginTop: 6, letterSpacing: -0.5}}>{steps[i].t}</div>
        {st === 'done' && <div style={{fontSize: 17, fontWeight: 600, color: c.ok, marginTop: 4}}>✓ {steps[i].done}</div>}
      </div>
    );
  };
  const [hx, hy] = pt(cx, cy, R - 6, hand);
  const [hx0, hy0] = pt(cx, cy, r - 12, hand);
  const cur = act >= 0 ? steps[act].time : data.centerLabel || 'SAMPLE DAY';
  return (
    <div style={{position: 'absolute', left: 64, width: 952, top: 0, height: 820}}>
      {[0, 1, 2, 3].map((k) => card(k, 'r', k))}
      {[7, 6, 5, 4].map((k, slot) => card(k, 'l', slot))}
      <svg width="952" height="640" style={{position: 'absolute', left: 0, top: 0}}>
        {steps.map((s, i) => {
          const a0 = -90 + (360 / n) * i + 1.5, a1 = -90 + (360 / n) * (i + 1) - 1.5;
          const st = state(i);
          return <path key={i} d={arc(cx, cy, r, R, a0, a1)} fill={c.palette[i]} opacity={st === 'wait' ? 0.25 : st === 'act' ? 1 : 0.75} />;
        })}
        <circle cx={cx} cy={cy} r={r - 12} fill={c.card} stroke={c.line} strokeWidth="3" />
        {prog > 0 && prog < 1 && <line x1={hx0} y1={hy0} x2={hx} y2={hy} stroke={c.acc2} strokeWidth="7" strokeLinecap="round" />}
        <text x={cx} y={cy + 10} textAnchor="middle" fontFamily="IT" fontWeight="800" fontSize="40" fill={c.ink}>{cur}</text>
        <text x={cx} y={cy + 44} textAnchor="middle" fontFamily="IT" fontWeight="800" fontSize="17" letterSpacing="4" fill={c.mute}>SAMPLE DAY</text>
      </svg>
      <div style={{position: 'absolute', left: 0, right: 0, top: 660, height: 100, borderRadius: 26, background: c.ink, color: c.card === '#FFFFFF' ? '#fff' : c.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, fontSize: 30, fontWeight: 600}}>
        <span style={{color: c.acc2, fontWeight: 800}}>🔒</span><span style={{color: c.card === '#FFFFFF' ? '#fff' : '#0B0F1A'}}>{data.note}</span>
      </div>
    </div>
  );
};
