import React from 'react';
import {Composition} from 'remotion';
import {Frame} from './Frame';
import {THEMES, ThemeName, useClock} from './common';
import {Rail} from './layouts/rail';
import {Folders} from './layouts/folders';
import {Dashboard} from './layouts/dashboard';
import {Calls} from './layouts/calls';
import {Wheel} from './layouts/wheel';
import {Index} from './layouts/index';

export type PostProps = {layout: 'rail' | 'folders' | 'dashboard' | 'calls' | 'wheel' | 'index'; theme: ThemeName; kicker: string; titleA: string; titleB: string; sub: string; keyword: string; ctaPost?: string; data: any};
const L: Record<string, React.FC<any>> = {rail: Rail, folders: Folders, dashboard: Dashboard, calls: Calls, wheel: Wheel, index: Index};

const Post: React.FC<PostProps> = (p) => {
  const {g, wipe} = useClock();
  const Layout = L[p.layout];
  return (
    <Frame theme={p.theme} kicker={p.kicker} titleA={p.titleA} titleB={p.titleB} sub={p.sub} keyword={p.keyword} ctaPost={p.ctaPost}>
      <div style={{opacity: wipe}}>
        <Layout c={THEMES[p.theme]} g={g} data={p.data} />
      </div>
    </Frame>
  );
};

const def: PostProps = require('../data/example-rail.json');
export const Root: React.FC = () => (
  <Composition id="Post" component={Post} width={1080} height={1350} fps={30} durationInFrames={300} defaultProps={def} />
);
