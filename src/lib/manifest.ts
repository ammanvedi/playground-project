export interface PageManifest {
  url: string;
  exampleUrl: string;
  title: string;
  description: string;
  spec: string;
}

export const manifests: PageManifest[] = [
  {
    url: '/',
    exampleUrl: '/',
    title: 'Home',
    description: 'Main todo list dashboard — the SYSOP command center',
    spec: `# Home — SYSOP Command Center

<div id="header-section"></div>

## Header Section

<span id="hero-heading"></span>The top of the page displays a *session info bar* showing the operator's name (loaded from settings), the current system time, and connection status. The greeting follows the format **"SESSION: {name} // ACTIVE"**.

The operator name is **editable via the Settings page** and defaults to **"OPERATOR"** if unset.

<div id="task-queue"></div>

## Task Queue

Below the header, the main *task queue panel* lists all non-archived todos. Each task entry is rendered as a <span id="todo-row"></span>*terminal row* showing:

- A <span id="status-indicator"></span>**status indicator block** color-coded by state: <span id="stat-pending"></span>**dim gray** for todo, <span id="stat-in-progress"></span>**amber/yellow** for in-progress, <span id="stat-completed"></span>**green** for completed
- <span id="todo-name"></span>The task name in monospaced uppercase
- <span id="todo-date"></span>The due date formatted as a compact timestamp

Tasks are **sorted by creation date** (newest first). Clicking any task row navigates to its detail page at \`/todo/:id\`.

<div id="empty-state"></div>

## Empty State

When no active tasks exist, the panel displays a centered message: **"NO ACTIVE TASKS IN QUEUE"** with a prompt to add a new task.

<div id="add-task"></div>

## Add Task

A <span id="new-task-input"></span>*command input row* at the bottom of the queue allows creating new tasks inline. The operator types a task name and the system creates it with status **"todo"** and a default due date of **7 days from now**.
`,
  },
  {
    url: '/settings',
    exampleUrl: '/settings',
    title: 'Settings',
    description: 'Operator configuration panel',
    spec: `# Settings — Operator Config

<div id="operator-name"></div>

## Operator Name

A single <span id="settings-name-input"></span>*terminal input field* allows the operator to set their display name. This name appears in the home page session bar and throughout the interface.

The field <span id="auto-save-hint"></span>**auto-saves on change** with no explicit submit button — mimicking a live terminal configuration. The value **persists in localStorage** across sessions.

**Default value**: "OPERATOR". If the field is cleared, the name reverts to the default.

<div id="data-management"></div>

## Data Management

A <span id="reset-button"></span>**RESET_DATA** command button clears all todos and restores the default seed data. This action is **irreversible** and displays a confirmation prompt before executing.
`,
  },
  {
    url: '/archive',
    exampleUrl: '/archive',
    title: 'Archive',
    description: 'Decommissioned tasks storage',
    spec: `# Archive — Decommissioned Tasks

<div id="archived-task-list"></div>

## Archived Task List

Displays all tasks with status **"archived"** in a *dimmed terminal list*. Archived tasks appear with muted styling to indicate their inactive state.

Each entry shows the task name, original due date, and an <span id="restore-action"></span>**[RESTORE]** action that moves the task back to **"todo"** status, returning it to the home page queue.

## How Tasks Arrive Here

Tasks are archived via the **archive action** on the todo detail page. Only tasks with status **"completed"** can be archived — this enforces the workflow: todo → in-progress → completed → archived.

## Empty State

When no archived tasks exist, displays: <span id="archive-empty-state"></span>**"ARCHIVE EMPTY // NO DECOMMISSIONED TASKS"**.
`,
  },
  {
    url: '/todo/:id',
    exampleUrl: '/todo/latest',
    title: 'Todo Detail',
    description: 'Full task inspection and edit terminal',
    spec: `# Todo Detail — Task Inspector

<div id="task-fields"></div>

## Task Fields

The detail view presents all task fields in a *terminal form layout*:

- <span id="field-name"></span>**NAME**: Editable text input, displayed in uppercase monospace
- <span id="field-description"></span>**DESCRIPTION**: Multi-line editable text area
- <span id="field-status"></span>**STATUS**: Selectable from the status options — **todo**, **in-progress**, **completed**, **archived**
- <span id="field-due-date"></span>**DUE_DATE**: Date input field
- <span id="field-created-at"></span>**CREATED_AT**: Read-only timestamp, displayed but not editable

All fields **auto-save on change** to localStorage.

## Status Transitions

The <span id="status-indicator"></span>status field uses a *terminal select* element. The available transitions are unrestricted — any status can move to any other status. The status indicator block updates color immediately on change.

<div id="archive-action"></div>

## Archive Action

When the task status is **"completed"**, an <span id="archive-button"></span>**[ARCHIVE]** command becomes available. This moves the task to archived status and redirects to the archive page.

<div id="delete-action"></div>

## Delete Action

A <span id="delete-button"></span>**[DELETE]** command permanently removes the task and redirects to the home page. This action **requires confirmation**.

## The /todo/latest Shortcut

Navigating to \`/todo/latest\` automatically redirects to the detail page of the **most recently created task**. If no tasks exist, it redirects to the home page.

<div id="back-nav"></div>

## Back Navigation

A **[← BACK]** command at the top returns to the home page.
`,
  },
];
