# Current Hunt Screen: Critique & Recommendations

**Sources:** the Ghost Tour app flow (`reference/ghost-tour-app-flow.png`, 11 screens) and the provided build of the current app (`reference/current-hunt-demo/`, viewed on a Samsung Galaxy S22 Ultra).
**Goal from the brief:** raise **completion rate**, **fun**, and **clarity** on the screen teams use for most of a ~90-minute, ~3 mi (5 km) walking hunt.

---

## TL;DR: the three problems that matter most

1. **The hunt's structure is invisible.** The main list mixes *places* (you walk there, and each holds 3–5 tasks) with *single questions you can answer anywhere*, using the same card style. Players can't tell what "Complete Challenges Below" refers to, or that tapping a place opens more tasks.
2. **The time budget doesn't add up, and the app never says so.** About 60 of the 90 minutes go to walking, leaving ~30 minutes for 14+ challenges. Whether teams may use transit or a ride to save time is never stated. **This needs a business decision** (see §B).
3. **The first screen is mostly decoration.** About 80% of the first screen is team name, a 0% ring and four generic tips. The first thing a player can act on starts at the bottom edge.

---

## A. Screen-level findings

Each finding: **what I see → why it hurts (Completion / Fun / Clarity) → recommendation.**

### A1. Places and single questions look the same · *Clarity, Completion*
- **See:** "Denver Central Library · 0/3 · Complete 3 challenges here" (a place with its own tasks) sits in the same list, with the same card, as "Clock Tower · How many faces does the clock have?" (one question you can answer anywhere). The Ghost Tour shows the same pattern: Moore Theatre 0/5, Butterworth 0/4.
- **Why:** players have no model of the game. They don't know they must walk *to* some cards and can answer others *on the way*, so they either skip the anywhere challenges or stand still trying to solve something that needs a check-in.
- **Recommend:**
  - Name the two levels: a **Challenge** is a place (Moore Theatre), and **Tasks** are the questions and photos inside it. Tasks not tied to a place are grouped into one **Bonus challenge: anywhere** card.
  - Make the hierarchy visible:
    - **Main screen:** compact challenge cards, each showing how many tasks it holds (task dots) and leading to the challenge.
    - **Challenge screen:** that challenge's tasks, in order, with locks.

### A2. The first screen doesn't show the next step · *Completion, Clarity*
- **See:** team name, a large progress ring, the Points and Map icons, a tips block and the "Show Ordered Locations" button fill the first screen. The first location card starts at the bottom edge. Nothing says *where to go next*.
- **Why:** teams glance at this screen 5–6 times per hunt, often while walking. Each time they have to scroll and work out the next place themselves. That friction adds up, and it's where teams stall and drop out.
- **Recommend:** a compact **three-row header**:
  1. Avatar · team name · timer.
  2. Progress bar · points.
  3. **Current challenge: Moore Theatre** · distance · **Map** button.

  The challenge list starts immediately below it.

### A3. The tips are vague, static and incomplete · *Clarity, Completion*
- **See:** "Complete More Challenges · Accurate Check-Ins · Fun, Accurate Photos · Finish Locations Quickly" are always visible, with no numbers.
- **Why:**
  - "More challenges": main or bonus? "Quickly": how quick, and worth how much?
  - The biggest strategic question, **"can we take transit or a ride?"**, isn't answered.
  - After the first read, the tips only push content down.
- **Recommend:**
  - Replace the block with **one line** that explains the loop: *"Start a challenge at its location → solve its tasks in order. Bonus tasks work anywhere."*
  - Add a **"How scoring works"** info sheet (ⓘ in the header) that gives real numbers, e.g. speed bonus up to 500 per challenge.
  - Show a **3-card intro** once, at hunt start, including the transport rule (see §B).
  - Show tips **where they apply**, e.g. a *"Speed bonus: finish within 12:00"* chip on the active challenge.

### A4. The cards don't look tappable · *Clarity*
- **See:** a coloured tile on the left and text on the right, with no button, chevron or verb.
- **Why:** players don't know that tapping a place is how they check in and start its tasks. "0/3" doesn't explain itself either.
- **Recommend:**
  - Make the **whole card tappable**, with a **chevron ›** and a pressed state, so it clearly leads somewhere: to the challenge's own screen.
  - Show task progress as **dots**, one per task (●●○○○), instead of an unexplained "0/5". Empty slots motivate teams to fill them.
  - Keep one clear start action, **Check In** on the location screen, not a button on every card in the list.
  - Give a started challenge a **"Next task ›"** shortcut on its card, so its tasks are always one tap away.

### A5. Locked tasks aren't shown clearly · *Clarity, Fun*
- **See:** tasks inside a place look the same before and after check-in. There's no visible "locked" state or explanation.
- **Recommend:**
  - **Unlock tasks one at a time.**
    - The first task unlocks when its challenge is **started**.
    - Each next task unlocks when the **previous one is finished**.
    - The team always knows exactly what to do next.
  - Show locked tasks **faded, with a lock icon and a reason** ("Finish *Grand Entrance* to unlock"), and keep the **points visible** as a teaser.
  - Use faded styling together with the icon, never alone: faded text alone is illegible in sunlight and looks like a loading bug.

### A6. A 0% ring is the wrong first message · *Fun, Completion*
- **See:** the most prominent element at the start says **"0% Complete"**.
- **Why:** the moment a team is most likely to give up (the start, or after a long walk) is exactly when the screen shows nothing achieved.
- **Recommend:**
  - Count progress in **challenges** ("Challenge 1 of 5") and **pace** ("On pace" / "Running behind"), not percentages.
  - Celebrate each finished challenge (the Foxtrot mascot is ideal for this) instead of only the end of the hunt.

### A7. Colours carry meaning nobody explains · *Clarity*
- **See:** grey, teal and orange tiles. The grey one says "0 m away" and reads as *disabled* even though it's the current location.
- **Recommend:** tie the challenge card's border and status tag to **state**, not to challenge type:

  | State | Colour | Label |
  |---|---|---|
  | Not started | Grey | "Not started" |
  | In progress | Blue | "In progress · 2/5" |
  | Finished | Green | "Done · +1,250 pts" |
  | Started, time ran out, unfinished | Orange (brand, not error red) | "Time's up · 3/5" |

  Every colour is paired with a text label and an icon, so the state is readable without colour: in bright sun, and for colour-blind players. Icons indicate task type (photo, trivia, …).

### A8. The map is a small icon · *Completion*
- **See:** Map is a small circle, the same size as the points counter.
- **Why:** on a walking tour, finding the next location is the most frequent task.
- **Recommend:** put a labelled **Map** button next to the current challenge's name in the header. Show distance and walking time as text ("0.4 mi · 8 min walk").

### A9. The header icons and timer have no labels · *Clarity*
- **See (Ghost Tour):** Home, Photos, Settings and Flag icons with no labels, and a timer ("89:44") that doesn't say whether it counts up or down.
- **Recommend:**
  - Label the timer (timer icon + "89:44 left") and turn it orange in the last 10 minutes.
  - Move rarely used actions (settings, report a problem, end hunt) into a **"⋯" menu**. The flag icon is ambiguous: it could mean *report* or *finish*.

### A10. Polish issues on the surrounding screens · *Trust*
These are outside the main screen but visible in the same flow:
- **Debug text is showing to players:**
  - *"Loading Mock.."* on the welcome screen.
  - *"Do you like this challenge? null-c_437997"* on the result screen.
- **The design system isn't followed:**
  - The role picker uses a serif font.
  - The points pop-up uses emoji (✅ 📍 📈), which the design system explicitly rules out.
  - Four fonts (CircularStd, Jakarta, Alternate Gothic, system serif) are mixed.
- **Scoring terms are internal jargon:** "392 / 400 for Distance" and "Location Speed Bonus 500 / 500" read like internal metrics. *"Checked in 8 m from the door: +392"* explains itself.
- **Accessibility:**
  - Much text is light grey at 12–13 px.
  - Several tap targets are below 44 px, which matters when walking outdoors.

---


## B. For the business: open questions, time budget & ideas

> **Not built in this demo.** These are open questions and proposals for the product/business team. They need data and a decision before design work.

### B1. The time budget doesn't add up
| | |
|---|---|
| Hunt timer | 90 min |
| Route length | ~3 mi / 5 km |
| Walking time at ~3 mph | **~60 min** |
| Left for every task in the hunt | **~30 min** |
| Tasks visible in the Ghost Tour (first 3 challenges only) | 14+ |
| Time per task | **~1–2 min**, before counting bonus tasks and group photos |

The distances in the Ghost Tour screenshot (**2.87–2.88 mi away**) also show the team starting about 3 mi from the route. If the timer is already running, **getting to the first challenge can use up much of the hunt**.

For a team on foot, the hunt as designed can't be finished within the time, and nothing in the app says so. Teams find out mid-route that they're behind, which is a likely cause of both the **completion drop** and the **satisfaction drop**: a team that runs out of time feels it failed, not that it had fun.

### B2. Open questions & recommendations
Each item needs a product/business decision. The recommendation is where I'd start.

| # | Question | Why it matters | Recommendation |
|---|---|---|---|
| 1 | **Is transport allowed?** Transit, rideshare or taxi between locations, or only to reach the start? | About 60 of 90 minutes go to walking (§B1). Teams need to know whether a ride is a legitimate strategy. | Allow it, say so in the tips, and add a "Get there" option (§B3). |
| 2 | **When does the 90-min timer start?** Today it's already running on the welcome screen (89:44) and the team-photo screen (89:25), before the team is at a location. | Minutes spent on intro screens or travelling to the first location count against the team. | **Start it when the team submits its team photo.** That's the natural "we're together and ready" moment. |
| 3 | **What does "completed" mean?** Visiting every location, or finishing every task? | The completion metric depends on it. | Count a hunt as completed when every location is visited. It measures the walk, not trivia accuracy. |
| 4 | **Does the speed bonus hold if a team rides?** | Riding could otherwise be an unfair shortcut to the speed bonus. | Waive the bonus for that leg only, and say so *before* the team chooses. |
| 5 | **Can the team set its own name?** | The team name is the header title. A name they picked makes the screen feel like theirs. | Add a team-name **text input** at team setup, editable later from the header. |
| 6 | **Should speed earn points on a sliding scale?** | A flat +250 within 15 min gives nothing to a team that just misses it and no extra to a very fast one. | Scale the bonus with finishing time (e.g. full at 5 min, tapering to 0 at 15 min). Decide the curve together with #4. |
| 7 | **Should the location (challenge description) screen list its tasks?** Today it shows photo, story, points and "5 Challenges", but not *what* the tasks are until after check-in. | Tasks are a huge part of a challenge. Seeing them up front (photo pose, riddle, trivia) helps teams choose where to go next and builds anticipation. | **Add the task list, with each task's status, to the location screen.** The main-screen card can then drop its expandable task list and keep only "5 tasks" and the dots, which makes the main screen lighter. |

### B3. Recommendations, depending on the decision
- **If transport is allowed:**
  - Add it to the tips: *"Tired or short on time? Take transit or a ride between challenges. You'll skip that challenge's speed bonus, nothing else."*
  - Add a **"Get there"** option on every challenge, with Uber, Lyft, transit directions or a local taxi, the destination **pre-filled**.
    - The native app can detect which ride apps are installed and show only those.
    - Wording stays neutral, so it doesn't feel like cheating for players with limited mobility.
- **If it isn't allowed:**
  - Match the content to the time: fewer tasks per challenge, or a longer timer.
  - Offer a **"Short on time" route** that drops the challenges furthest out.
- **Either way:** show **pace**, not just time left. For example: *"3 of 5 challenges · 41 min left · On pace"*.

### B4. Creative ideas: more fun, more teams finishing
1. **Choose your pace at the start.** One question before the timer starts: *Walk it all · Mix in rides · Short on time*. The app then suggests a route that fits 90 minutes. Teams choose their own challenge level, and nobody is set up to fail.
2. **Travel time becomes play time.** Bonus tasks are offered **between challenges**, while walking or in a ride: *"On the way to Moore Theatre: 3 quick questions about 1920s Seattle."* The dead time between places becomes content, and rides feel like part of the game instead of a shortcut.
3. **Ride legs as a feature.** The "Get there" card says *"~6 min by car · speed bonus off for this challenge"*, and during the ride shows a **teaser** for the next location's story. Teams arrive curious, not tired.
4. **Location story on start.** For themed hunts, a short audio or text story unlocks when a challenge starts. It's the emotional reward for arriving, before the questions start.
5. **Foxtrot as the guide.** The mascot appears at moments that matter:
   - Cheering after each challenge.
   - A nudge when the team is behind.
   - A celebration at the end.
6. **Finishing without guilt.** When time runs low, offer **"Head to the final location"** instead of letting the timer expire in the middle of the route. The team ends on a high note and counts as finishing the hunt.
7. **Weather-aware nudge.** If rain is coming (weather API), bring the ride and transit options forward.

---

## C. What this demo implements

### C1. Top space: compact header
| Row | Content |
|---|---|
| 1 | **Team avatar with a progress ring** as its border and the **%** below it · team name · timer ("89:44 left", orange in the last 10 min) with **points below it** |
| 2 | Current challenge title (e.g. **Moore Theatre**) · **Map** button. **Hidden until a challenge is started.** |

- **Progress** counts *tasks* completed across the hunt, so the ring moves with every answer instead of jumping 33% per location.
- **Map before a challenge is chosen:** a Map button sits next to the "Challenges" heading, so the map is always reachable.
- **Space:** this replaces the large team-name block, the 0% ring and the separate progress bar. The challenge list starts right below the header, on the first screen.

### C2. Tips reorganized
- The four-tip block is replaced by **one line** explaining the game loop, plus an **ⓘ "How scoring works"** sheet with the scoring detail.
- Once the business decides on transport (§B), its rule is added to that sheet.

### C3. Main screen: challenge list (the main change)

**Screen 1: the main screen, a list of compact challenge cards.** The whole hunt fits on about one phone screen.
- Each card shows:
  - photo;
  - name;
  - distance and walking time;
  - **task dots**, one per task, filled when done. **Tapping the dots** expands the list of that challenge's tasks with each one's status: done ✓ +points, to do, or locked;
  - "5 tasks · 2,500 pts" on its own line;
  - a **chevron ›**.
- **The whole card is tappable**, with a pressed state, and opens the location screen. The dots motivate ("3 of 5, just 2 more"); the chevron and the pressed state are what say "tap me".
- **Status** shows as the card border plus a tag on the card's top edge. There's no tag before a challenge starts; the grey border already says "not started".

  | State | Colour |
  |---|---|
  | Not started | Grey (default) |
  | In progress | Blue |
  | Finished | Green |
  | Started, time ran out, not finished | Orange (brand orange, not error red) |

- **Started challenges move to the top** and show the speed-bonus countdown plus a **"Next task ›"** shortcut. That opens the next task directly, keeping fast access to tasks without leaving the list.
- There's **no start button on the list.** One large orange button per card competed for attention and invited starting before arriving, which starts the 15-minute window early. Starting happens on the location screen with **Check In**.

**Tapping a card opens the current app, unchanged.** Only the main screen is in scope. The screens a card leads to (location → Check In → the location's challenge list → challenge) are the existing app, so the demo shows them from the **provided build, copied as-is** (`redesign/public/current-app/`), instead of rebuilding them.
- **Before check-in:** a card opens the existing location screen with **Check In**.
- **After:** a card, or its "Next task ›" shortcut, opens the existing challenge list.

The provided build holds its own demo content (Denver Central Library), so that's what those screens show.

**When "time ran out" applies (orange):**
- **Per-challenge window:** each challenge has a 15-min window once started, matching the speed-bonus window. If it runs out, the card turns orange, but the team **can still finish the tasks** for task points.
- **Hunt timer ends:** when the 90-min timer reaches 0, only challenges that were **started but not finished** turn orange. Untouched challenges stay grey and finished ones stay green, so the final screen reads as a result, not a failure. Photos always stay visible.

Tasks not tied to a location are grouped into one **"Bonus: anywhere"** challenge with a dashed border, which works the same way.

### C4. Not in this demo
- Everything in §B (transport / ride button, pace planning, creative ideas).
- The polish fixes on surrounding screens (A10); they're listed for the team.
