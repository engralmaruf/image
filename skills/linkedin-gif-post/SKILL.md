---
name: "linkedin-gif-post"
description: "Maruf's daily LinkedIn + X animated GIF post (Leadgenspot, AI automation with Claude/n8n for online coaches, law firms, real estate, construction). Asks for the topic each morning, then builds a 4:5 GIF in one of 6 rotating layouts, writes the caption + X text, waits for approval, publishes via Buffer only. Use for any 'GIF post', 'LinkedIn + X post', 'daily post' request."
---

# LinkedIn + X GIF post (v2: rotating layouts, topic from Maruf)

One post per day (LinkedIn + X), one animated GIF, reused on both. Output is the GIF only (no MP4, no PNG).
Brand: Leadgenspot / Maruf, AI automation expert. White-to-sky gradient or near-black, blue #2E9BFF, orange accent, Inter Tight + Instrument Serif italic. Never copy another creator's layout, wording, names or numbers: use the idea, fill it with Maruf's brand and real content.

## 0. Daily flow
- **7:00 AM Asia/Dhaka: a scheduled task only sends Maruf a notification** asking for today's topic (with 3 unused suggestions from `topics.md`). It builds nothing. If you are that scheduled run: check Buffer `list_posts` and the repo `gifs/` folder for recent systems, send ONE PushNotification with the question and the 3 suggestions, then STOP.
- **Maruf then opens a Claude chat and sends the topic** (or a vertical / system name). Post generation happens only in that chat, using this skill. Take the most likely reading of the topic and say which reading you took. If he sends no topic, make nothing.
1. Build the GIF (sections 2-4), write the caption + first comment + X text (section 5).
2. Show him: the GIF file only, the three texts, and the layout + theme used. **Wait for a clear "yes, publish" or edits.** Never publish without it.
3. After approval: publish through Buffer only (section 6) if Buffer is connected in that chat. If not, hand him the GIF + text to post himself.

## 1. Audience and topic rule
Audience: online coaches (fitness, sales, business), law firms, real estate agents, construction / contractors.
Every post is a **complete, outcome-driven system or toolkit** built with Claude / n8n, never a generic tip, news item or one-step trick. Pick from `topics.md` or Maruf's own topic. Never repeat a system posted in the last 14 days.
Hard rules: no invented stats, client names, testimonials or results. No fake dashboards with numbers. Counts are allowed only when they match what the visual lists (e.g. "20 skills" with 20 folders). Anything illustrative is labelled ("Illustrative", "Sample day"). Everything that sends a message says the human approves it. Legal/finance: "drafts for review".
Do not promise "free access" unless there is something to send. The keyword reply should deliver the same list/system shown in the GIF; tell Maruf if it still needs to be created.

## 2. Pick the layout (variation rule)
Six layouts live in `remotion/src/layouts/`. **Never use the same layout as any of the last 3 posts** (layout name is in each GIF filename). Alternate theme (`sky` light / `ink` dark) day to day, and rotate verticals so the same audience is not hit 2 days running.

| layout | idea | best for | data shape |
|---|---|---|---|
| `rail` | 6 numbered agents light up in order with a travelling dot | any step-by-step system | `items:[{t,s}]` x6 |
| `folders` | grid of 20 skill folders pop in, then a highlight sweep | "20 Claude skills for X" libraries | `items:[{t}]` x20 |
| `dashboard` | 4 business cards, progress bars fill, trend line draws | one setup across business types, back office | `cards:[{name,tag,tasks:[3]}]` x4 |
| `calls` | video-call grid of 12 agent roles, speaking ring moves, message types | "your AI team" for one business | `callTitle, tiles:[{name}] x12 (first = You), chat:{from,text}` |
| `wheel` | a day clock of 8 scheduled jobs, hand sweeps, cards check off | daily-running desk / back office | `steps:[{time,t,done}] x8, note, centerLabel` |
| `index` | 6 section cards, 24 tools type in row by row | complete toolkit / playbook | `sections:[{title,items:[{t,d}] x4}] x6` |

Props for every post (JSON): `layout, theme, kicker, titleA (ink, short), titleB (blue italic serif, short), sub (one line), keyword (ONE short uppercase word), data`. See `remotion/data/example-*.json`.
Text limits: titleA/titleB under ~22 characters each, item names under ~24 characters, descriptions under ~28.

## 3. Motion rules (already built in)
Loop is 10 s, 30 fps render, GIF at 15 fps. Frame 0 and the last frames show the fully built state (this is the thumbnail LinkedIn shows), the middle plays: clear, rebuild, highlight in sequence. Title and CTA bar never move; the keyword pill pulses gently. Calm ease-out, no bounce. To add a new layout, copy one in `layouts/`, animate from the clock `g` (0..230, 9999 = built), register it in `Root.tsx`.

## 4. Build the GIF
```
cd remotion            # (copy this skill folder to a work dir first; do not commit node_modules)
cp data/example-<layout>.json data/today.json   # edit the content
./render.sh data/today.json out/YYYY-MM-DD-<layout>-<slug>.gif
```
`render.sh` installs deps on first run (needs node 18+, ffmpeg, Chromium; in Claude Code cloud Chromium is at /opt/pw-browsers/chromium, set in remotion.config.ts), renders, converts to GIF (720 wide, falls back smaller to stay under 5 MB) and deletes the MP4.
Always look at one still before sending: `npx remotion still src/index.ts Post out/check.png --props=data/today.json --frame=0` and `--frame=140`. Check: no clipped or wrapped text, nothing overlapping, CTA readable. Fix by shortening text, not shrinking it.

## 5. Caption + X text
LinkedIn caption archetype A (default): 
```
I built the complete [system] for [outcome] inside [Claude / n8n].

Free access 👇

[Doing X properly means:]
→ task 1
→ task 2
→ task 3

That's a full-time job before [the real work starts].

So I set up [N] agents that handle all of it and put it on one board.

You approve what goes out and show up for what matters.

Inside the [System Name]:

1. [Role]
↳ one line
...

Comment "KEYWORD" and I'll send it over 👇
```
Rules: hook = first 2 lines, under ~140 characters, must work before "...more". One idea per line, blank line between blocks, 80-250 words. List with `→` and numbered `↳`. One human-in-control line. One credibility line only if Maruf gave a real fact. Single CTA, same keyword as the GIF. 0-3 hashtags or none. No links in the body. No em dashes, no "game-changer", "unlock", "delve". Run the `li-human` skill over it if available.
First comment: `Comment "KEYWORD" for the system ☺️`.
X: one tweet under 280 characters: same claim tighter, the steps on one arrow line, `Reply "KEYWORD" and I'll send it.` No hashtags.
Other archetypes (before/after, question + proof, contrarian, playbook) are fine for variety, but the topic rule above still applies.

## 6. Publishing (Buffer only, after approval)
Never post, comment, like, DM or connect on LinkedIn/X through browser automation. Never mass-DM keyword commenters; Maruf replies himself.
`get_account` -> `list_channels` (LinkedIn `engr-maruf`, X `aiautomationexp`; Instagram is disconnected) -> `create_post`. Default `addToQueue`; `customScheduled` with a time in Asia/Dhaka (UTC+6) if he gives one; `shareNow` only if he says so. LinkedIn: `metadata.linkedin.firstComment`. Media needs a public direct GIF URL; if there is none, `saveToDraft` with the intended time in the note and tell Maruf to attach the GIF in Buffer. Report channel, status and time for each post. Buffer free plan allows 10 scheduled posts: clear old drafts first if needed.
