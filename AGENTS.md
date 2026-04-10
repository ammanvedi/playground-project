# Agent Instructions

## First Step — Always

Before doing anything else, open the dev server in agent-browser with the `--headed` flag so you can visually verify changes throughout the session:

```bash
agent-browser --headed open http://localhost:3000
```

If the dev server is not already running, start it first:

```bash
npm run dev
```

Then open the browser:

```bash
agent-browser --headed open http://localhost:3000
```

## Browser Workflow

After opening the browser, follow this loop when making UI changes:

1. Make code changes
2. Wait for HMR to update the page: `agent-browser wait 1000`
3. Take a snapshot to verify: `agent-browser snapshot -i`
4. Take a screenshot if visual verification is needed: `agent-browser screenshot`
5. Repeat

## Dev Server

- **Framework**: Vite + React + TypeScript
- **Dev command**: `npm run dev`
- **URL**: `http://localhost:3000`
