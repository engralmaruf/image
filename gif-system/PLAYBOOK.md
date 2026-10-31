# Daily GIF playbook (Maruf)

From now on every post uses an animated GIF, not a still image. Two GIFs a day.
Rule: GIFs are drawn graphics. Never call them real screenshots. No client names, no invented stats.
Numbers only as simple arithmetic from a stated assumption, labelled "Example numbers".

## GIF 1: SERVICE (offer AI automation to business owners)
Audience: law firms, hotels, restaurants, ecommerce, real estate, coaches, wholesalers.
Pain point they feel + the automation that fixes it. Never repeat the topic back to back (check Buffer list_posts).
Visual: gif_workflow.py (steps appear one by one) or funnel.py (counter + bars). 720x1280 or 720x900.
CTA: Comment "KEYWORD" and I'll send you the free <template/guide>.

## GIF 2: LEARNER (free give-away for people who want to learn/do it themselves)
Audience: founders, freelancers, agency owners learning AI and LinkedIn.
Offer something free: a Claude skill pack, an automation template, a LinkedIn client acquisition system, a checklist.
Visual: one big counter or board that moves (example: 70 -> 58 -> 35 -> 18 -> 8), a "Running" or "Example numbers" badge.
CTA bar inside the GIF: Comment [KEYWORD] for the free <thing>.
Alternate the free thing day to day: Claude skills, n8n/Make template, LinkedIn system, DM framework, lead magnet, content calendar.

## What works in the reference posts (learned 2026-10-31)
Visual
- One hero idea per GIF, shown as a product-like UI (dashboard, board, calendar, node map), not clip art.
- Something always moves: a number ticking up (3 -> 5 stages, 6/10), cards moving through columns, a calendar filling, a "Running" badge.
- Big bold number or short headline top-left, small sub line under it, lots of white space.
- Solid CTA bar at the bottom, keyword in a coloured pill: Comment [AUTO] to test it / Comment [SALES] for Free Access.
- Hold the last frame 3 seconds so the CTA is readable. Keep file under 5 MB.
- Label placeholder data: "Illustrative example" or "Example numbers".
Caption (LinkedIn)
- Hook line in plain words or CAPS: "I BUILT A LINKEDIN SALES TEAM INSIDE CLAUDE." Cut-off at "more", so the hook must carry alone.
- Short lines, one idea each. Setup in 3 to 5 steps. A "No X. No Y. No Z." beat.
- Say who stays in control: nothing is sent without your approval.
- Offer + comment keyword on the last line. Do not copy deadlines or claims we cannot prove.
- Plain English. Max 3 hashtags. No em dash. Avoid "It's not X, it's Y".
X: under 280 characters, no link, ends with Reply "KEYWORD" and I'll send it.

## Run
python3 -m venv v && ./v/bin/pip install pillow playwright
./v/bin/python gif_workflow.py out.gif workflow_spec.example.json   # steps appear one by one
./v/bin/python funnel.py out.gif funnel_spec.example.json           # counter + bars
(common.py points Playwright at /opt/pw-browsers/chromium. Fonts come from npm: inter-tight, instrument-serif.)
Always open the GIF's last frame and one middle frame to check before showing Maruf.
