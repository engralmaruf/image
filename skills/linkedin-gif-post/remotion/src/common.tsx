import React from 'react';
import {Easing, interpolate, useCurrentFrame, delayRender, continueRender, staticFile} from 'remotion';

// ---- fonts (Inter Tight + Instrument Serif italic, same as Maruf's brand) ----
const fonts = [
  ['IT', 600, 'normal', 'inter-tight-latin-600-normal.woff2'],
  ['IT', 800, 'normal', 'inter-tight-latin-800-normal.woff2'],
  ['IS', 400, 'italic', 'instrument-serif-latin-400-italic.woff2'],
] as const;
const handle = delayRender('fonts');
Promise.all(
  fonts.map(([fam, w, st, f]) =>
    new FontFace(fam, `url(${staticFile(f)})`, {weight: String(w), style: st}).load().then((ff) => document.fonts.add(ff)),
  ),
).then(() => continueRender(handle));

// ---- brand themes: sky = white-to-sky gradient + blue, ink = near-black + blue/orange ----
export const THEMES = {
  sky: {
    bg: 'linear-gradient(180deg,#FFFFFF 0%,#EAF6FF 38%,#CDE8FF 78%,#A9D5FF 100%)', grid: '#D3E3F3',
    ink: '#0B0F1A', mute: '#5B6678', card: '#FFFFFF', line: '#D3E3F3', dim: '#DCE6F1',
    acc: '#2E9BFF', accSoft: '#DDEFFF', acc2: '#F59E0B', ok: '#16A34A', onAcc: '#FFFFFF',
    ctaBg: '#0B0F1A', ctaInk: '#FFFFFF', pill: '#FFFFFF', pillInk: '#0B0F1A',
    palette: ['#2E9BFF', '#8B5CF6', '#14B8A6', '#F59E0B', '#EC4899', '#16A34A', '#F97316', '#6366F1'],
  },
  ink: {
    bg: 'radial-gradient(900px 600px at 85% 0%,#12315A 0%,transparent 60%),#0B0F1A', grid: '#17223A',
    ink: '#F4F7FB', mute: '#93A0B5', card: '#121B2E', line: '#22304A', dim: '#1B2740',
    acc: '#3DA9FF', accSoft: '#10304F', acc2: '#FFA24D', ok: '#34D399', onAcc: '#06101F',
    ctaBg: '#2E9BFF', ctaInk: '#06101F', pill: '#06101F', pillInk: '#7CC4FF',
    palette: ['#3DA9FF', '#A78BFA', '#2DD4BF', '#FBBF24', '#F472B6', '#34D399', '#FB923C', '#818CF8'],
  },
};
export type ThemeName = keyof typeof THEMES;
export type TC = typeof THEMES.sky;
export type LayoutProps = {c: TC; g: number; data: any};

/** Loop design: frame 0 and the last frames show the fully built state (good thumbnail).
 *  g = animation clock; 9999 means "fully built". Build runs g=0..~230 starting at frame 38. */
export const useClock = () => {
  const f = useCurrentFrame();
  const g = f < 38 ? 9999 : f - 38;
  const wipe = f < 22 ? 1 : f < 38 ? interpolate(f, [22, 38], [1, 0], {extrapolateRight: 'clamp'}) : 1;
  return {f, g, wipe};
};
export const ease = (g: number, start: number, dur: number) =>
  interpolate(g, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
export const lin = (g: number, start: number, dur: number) =>
  interpolate(g, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
export const AsteriskIcon: React.FC<{size: number; color: string}> = ({size, color}) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    {[0, 60, 120].map((a) => (
      <rect key={a} x="17" y="4" width="6" height="32" rx="3" fill={color} transform={`rotate(${a} 20 20)`} />
    ))}
  </svg>
);
