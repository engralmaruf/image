import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {THEMES, ThemeName} from './common';

export const Frame: React.FC<{theme: ThemeName; kicker: string; titleA: string; titleB: string; sub: string; keyword: string; ctaPost?: string; children: React.ReactNode}> = ({theme, kicker, titleA, titleB, sub, keyword, ctaPost = 'for free access', children}) => {
  const f = useCurrentFrame();
  const c = THEMES[theme];
  const pulse = 1 + 0.025 * Math.max(0, Math.sin((f / 30) * Math.PI));
  return (
    <AbsoluteFill style={{background: c.bg, fontFamily: 'IT', color: c.ink}}>
      <div style={{position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${c.grid} 2.5px,transparent 2.5px)`, backgroundSize: '54px 54px', opacity: 0.7}} />
      <div style={{position: 'absolute', left: 64, top: 56, fontSize: 23, fontWeight: 800, letterSpacing: 5, color: c.acc}}>{kicker}</div>
      <div style={{position: 'absolute', right: 64, top: 58, fontSize: 20, fontWeight: 800, letterSpacing: 3, color: c.mute}}>LEADGENSPOT</div>
      <div style={{position: 'absolute', left: 64, top: 96, fontSize: 90, fontWeight: 800, letterSpacing: -3.5, lineHeight: 1.02}}>
        {titleA}
        <br />
        <span style={{fontFamily: 'IS', fontStyle: 'italic', fontWeight: 400, color: c.acc, letterSpacing: -2}}>{titleB}</span>
      </div>
      <div style={{position: 'absolute', left: 64, top: 300, right: 64, fontSize: 30, fontWeight: 600, color: c.mute}}>{sub}</div>
      <div style={{position: 'absolute', left: 0, top: 355, width: 1080, height: 820}}>{children}</div>
      <div style={{position: 'absolute', left: 64, right: 64, top: 1185, textAlign: 'center', fontSize: 20, fontWeight: 600, color: c.mute, letterSpacing: 1}}>Maruf · AI Automation Expert</div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 125, background: c.ctaBg, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, fontSize: 44, fontWeight: 600, color: c.ctaInk, letterSpacing: -1}}>
        <span>Comment</span>
        <span style={{background: c.pill, color: c.pillInk, borderRadius: 16, padding: '4px 26px', fontWeight: 800, transform: `scale(${pulse})`, display: 'inline-block'}}>{keyword}</span>
        <span>{ctaPost}</span>
      </div>
    </AbsoluteFill>
  );
};
