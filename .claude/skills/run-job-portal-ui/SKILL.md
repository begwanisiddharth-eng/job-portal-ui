---
name: run-job-portal-ui
description: Build, run, and drive job-portal-ui (a Vite + React 19 job board SPA). Use when asked to start job-portal-ui, run its dev server, build it, lint it, or take a screenshot of its UI (home page, job search/filter, job detail, companies).
---

Vite + React 19 SPA with no backend — all data comes from `src/data/mockData.js` and `localStorage`. Drive it by starting the Vite dev server, then navigating a real browser against it (Playwright MCP tools in this environment; `chromium-cli` if available instead — same script shape).

All paths below are relative to the repo root (`job-portal-ui/`).

## Prerequisites

No OS packages needed — this is a pure JS/Vite project, no native deps. Verified with Node v24.13.1 / npm 11.8.0 (any current Node 20+ works).

## Setup

```bash
npm install
```

## Build

```bash
npm run build   # vite build -> dist/. Verified: builds clean, ~4s, one expected warning
                 # about profileService.js being both statically and dynamically
                 # imported (harmless, not a build error).
```

## Run (agent path)

Before starting, confirm 5173 is actually free — see the stray-server gotcha below,
this environment tends to accumulate leftover dev servers from prior runs:

```bash
netstat -ano | grep ':5173' | grep LISTENING || echo clear
```

Start the dev server in the background and poll the port instead of sleeping:

```bash
npm run dev > /tmp/dev.log 2>&1 &
echo $! > /tmp/dev.pid
timeout 30 bash -c 'until curl -sf http://localhost:5173 >/dev/null; do sleep 1; done'
```

On a clean port Vite binds **5173** and prints `ready in ~1.9s`. If it printed `Port
5173 is in use, trying another one...` instead, read the actual bound port out of
`/tmp/dev.log` — don't assume 5173 — and drive that URL instead.

**Stopping (Windows/git-bash):** `kill $(cat /tmp/dev.pid)` does NOT work — `npm run
dev` forks a child `node`/vite process, and killing the recorded PID leaves the
actual listener running. Find and kill the real process by port instead:

```bash
pid=$(netstat -ano | grep ':5173' | grep LISTENING | awk '{print $5}')
taskkill //PID "$pid" //F
```

Skip this and stray dev servers pile up silently: Vite doesn't fail on a taken port,
it prints `Port 5173 is in use, trying another one...` and moves to 5174, then 5175,
etc. (verified — two overlapping `npm run dev` runs landed on 5173 and 5175, with a
phantom 5174 from an even earlier stray). Always verify the port a fresh run actually
bound to from its log output — don't assume 5173 — and kill stray listeners by PID
(the `netstat`/`taskkill` above) before you're done, not just the one you think you
started.

Drive it with the Playwright MCP tools (`mcp__plugin_playwright_playwright__*`) —
load them via `ToolSearch` if not already available:

```
select:mcp__plugin_playwright_playwright__browser_navigate,mcp__plugin_playwright_playwright__browser_snapshot,mcp__plugin_playwright_playwright__browser_take_screenshot,mcp__plugin_playwright_playwright__browser_console_messages,mcp__plugin_playwright_playwright__browser_click,mcp__plugin_playwright_playwright__browser_type
```

Loop: `browser_navigate` → `browser_snapshot` (get element refs) → act
(`browser_click` / `browser_type`) → `browser_take_screenshot` →
`browser_console_messages` (level `error`) to confirm nothing threw.

Verified end-to-end flow — home page search box to job listing:

```
browser_navigate  http://localhost:5173
browser_snapshot                                  # get refs for the two search inputs + submit button
browser_type       ref=<job-title-input>  "Engineer"
browser_click       ref=<search-button>
# -> navigates to /jobs?search=Engineer, filter UI shows "Engineer" pre-filled
browser_take_screenshot
browser_console_messages level=error               # 0 errors, both on / and /jobs
```

Screenshots land wherever `filename` is passed to `browser_take_screenshot` (relative
to repo root — e.g. `home.png`). Session state/logs land in `.playwright-mcp/`
(gitignored). Delete or move screenshots out of the repo root when done verifying —
they aren't build artifacts and shouldn't linger in `git status`.

**If `chromium-cli` is available instead**, use it the same way — pipe `nav` /
`wait-for` / `click` / `fill` / `screenshot` / `console --errors` to stdin. See the
`chromium-cli` skill for the command reference.

## Run (human path)

```bash
npm run dev   # -> http://localhost:5173, Ctrl-C to stop
```

## Test

No test suite configured (no `test` script in `package.json`, no test files in `src/`).

```bash
npm run lint   # eslint .
```

**Lint is not currently clean** — verified 30 errors / 3 warnings on a fresh checkout,
all pre-existing `no-unused-vars` (destructured `theme` never used, a couple of unused
handler functions) and one `react-hooks/exhaustive-deps` warning. Not something a
run/drive task needs to fix; don't treat a nonzero lint exit as a sign the app is broken.

## Gotchas

- **No backend, no auth to fake.** Everything renders from `mockData.js` — there's no
  login wall between the dev server and the pages that matter (home, `/jobs`,
  `/companies`). Login/register pages exist but aren't required to see real content.
- **Search is client-side and URL-driven.** Submitting the home page search box
  navigates to `/jobs?search=<term>` and the filter panel picks the term up from the
  query string — `wait-for`/snapshot on the `/jobs` URL, don't expect an XHR to watch.
