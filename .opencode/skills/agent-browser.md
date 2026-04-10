# agent-browser

Browser automation CLI designed for AI agents. Compact text output minimizes context usage. Built in Rust by Vercel Labs.

## Installation

```bash
npm install -g agent-browser
agent-browser install  # Download Chrome (first time)
```

## Core Workflow

1. **Navigate** to a page
2. **Snapshot** to get interactive elements with refs (`@e1`, `@e2`, ...)
3. **Interact** using refs (click, fill, type)
4. **Re-snapshot** after page changes to get updated refs

```bash
agent-browser open http://localhost:3000
agent-browser snapshot -i
# Output:
# - heading "My App" [ref=e1]
# - link "Settings" [ref=e2]
# - input "Search" [ref=e3]

agent-browser click @e2
agent-browser fill @e3 "search query"
```

## Headed Mode

Use `--headed` to show the browser window (not headless). This is useful for debugging and visual verification.

```bash
agent-browser --headed open http://localhost:3000
```

You can also set `AGENT_BROWSER_HEADED=true` in your environment or add `"headed": true` to `agent-browser.json`.

## Essential Commands

### Navigation
```bash
agent-browser open <url>              # Navigate to URL
agent-browser back                    # Go back
agent-browser forward                 # Go forward
agent-browser reload                  # Reload page
agent-browser close                   # Close browser
agent-browser close --all             # Close all sessions
```

### Observation
```bash
agent-browser snapshot                # Full accessibility tree with refs
agent-browser snapshot -i             # Interactive elements only (recommended)
agent-browser snapshot -c             # Compact (remove empty structural elements)
agent-browser screenshot [path]       # Take screenshot
agent-browser screenshot --full       # Full-page screenshot
agent-browser screenshot --annotate   # Annotated screenshot with numbered labels
agent-browser get text @e1            # Get text content of element
agent-browser get url                 # Get current URL
agent-browser get title               # Get page title
```

### Interaction
```bash
agent-browser click @e1               # Click element
agent-browser fill @e2 "text"         # Clear and fill input
agent-browser type @e2 "text"         # Type into element (append)
agent-browser press Enter             # Press key
agent-browser select @e3 "option"     # Select dropdown option
agent-browser check @e4               # Check checkbox
agent-browser hover @e5               # Hover element
agent-browser scroll down 300         # Scroll down 300px
agent-browser upload @e6 ./file.png   # Upload file
```

### Semantic Locators
```bash
agent-browser find role button click --name "Submit"
agent-browser find label "Email" fill "test@test.com"
agent-browser find placeholder "Search..." fill "query"
agent-browser find text "Sign in" click
```

### Waiting
```bash
agent-browser wait 2000               # Wait 2 seconds
agent-browser wait "#element"         # Wait for element to appear
agent-browser wait --text "Welcome"   # Wait for text to appear
agent-browser wait --url "**/dashboard"  # Wait for URL pattern
agent-browser wait --load networkidle # Wait for network to settle
```

### Tabs
```bash
agent-browser tab                     # List tabs
agent-browser tab new [url]           # Open new tab
agent-browser tab 2                   # Switch to tab 2
agent-browser tab close               # Close current tab
```

## Command Chaining

Chain commands with `&&` for efficiency:

```bash
agent-browser open http://localhost:3000 && agent-browser wait --load networkidle && agent-browser snapshot -i
agent-browser fill @e1 "user@test.com" && agent-browser fill @e2 "password" && agent-browser click @e3
```

## Batch Execution

Execute multiple commands in one call:

```bash
agent-browser batch "open http://localhost:3000" "snapshot -i" "screenshot"
```

## Sessions

Isolate browser contexts:

```bash
agent-browser --session testing open http://localhost:3000
agent-browser --session testing snapshot -i
```

## Tips

- Always use `snapshot -i` (interactive only) to reduce token usage
- Re-snapshot after any page navigation or state change — refs become stale
- Use `wait --load networkidle` after navigation to ensure the page has settled
- Use `--headed` for visual debugging
- Use `screenshot --annotate` for vision model analysis
- Chain commands with `&&` when you don't need intermediate output
- Use separate commands when you need to parse snapshot output to discover refs
