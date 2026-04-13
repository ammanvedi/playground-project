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
    description: 'The main dashboard for viewing, tracking, and creating tasks',
    spec: `# Home — Parallel

<div id="header-section"></div>

## Hero Section

<span id="hero-heading"></span>At the top of the page sits a large *hero section* that sets the tone for the entire app. It features the headline **"Manage everything."** rendered in extra-bold **white** text on a **near-black** background. The text is very large — roughly five times bigger than normal body text — and uses tight letter spacing to give it a clean, editorial feel.

Below the headline, a short subtitle reads "Unified task tracking for {name}" where **{name}** is replaced with the display name you have set in Settings (shown in lowercase). If you haven't changed your name, it will default to **"operator"**. This subtitle appears in a smaller, **gray** font.

Underneath the subtitle there is a row containing a solid **white** *button* labelled **"New task →"** which, when clicked, scrolls you down to the task creation area and focuses the input. Next to it, a small **gray** note shows how many tasks are currently in the queue.

On the right-hand side of the hero, a very large accent number is displayed in bold **white** text. This number reflects the **total count of active (non-archived) tasks**. Below the number, a small **gray** label reads "Active tasks  Explore →".

<div id="task-queue"></div>

## Stats Overview

Directly below the hero, a *stat bar* stretches across the full width of the page. It is divided into three equal *stat cells* separated by thin **dark gray** vertical borders, with a thin **dark gray** horizontal border along the top.

Each cell shows:

- <span id="stat-pending"></span>**Pending** — the number of tasks with status **"todo"** or **"in-progress"** that have not yet been completed
- <span id="stat-in-progress"></span>**In progress** — the number of tasks currently being worked on (status **"in-progress"**)
- <span id="stat-completed"></span>**Completed** — the number of tasks that have been finished (status **"completed"**)

The label in each cell is small, uppercase, and **gray**. The number below it is larger, bold, and **white**.

## Task Queue

Below the stats, a section titled **"Task queue"** in small uppercase **gray** text lists all active tasks. On the right side of the section header, a **gray** counter shows the total number of items (e.g. "3 items").

Each task is shown as a <span id="todo-row"></span>*task row* — a horizontal strip spanning the full width, separated from other rows by thin **dark gray** borders. When you hover over a row, it subtly highlights with a slightly lighter background and the arrow on the right slides to the right.

Every row contains:

- A <span id="status-indicator"></span>small circular *status dot* on the left, color-coded by the task's current state: **dark gray** for todo, **amber** for in-progress, and **green** for completed
- <span id="todo-name"></span>The task name in **white**, medium-weight text that fills the available space. If the name is very long, it is truncated with an ellipsis
- <span id="todo-date"></span>The due date shown in **gray** text on the right (formatted like "Apr 20, 2026")
- A small **gray** right-arrow **"→"** at the far right

Clicking any row navigates to that task's detail page. Tasks are **sorted by creation date, newest first**.

<div id="empty-state"></div>

## Empty State

When there are no active tasks at all, the task queue area shows the centered message **"No active tasks. Create one below."** in **gray** text instead of the list.

<div id="add-task"></div>

## Creating a New Task

At the bottom of the page, a section titled **"New task"** provides an *input field* and a *button* for adding tasks.

The <span id="new-task-input"></span>*text input* has a transparent background with a thin **dark gray** underline border that brightens to **light gray** when focused. Placeholder text reads **"Task name..."** in a dim **dark gray** color.

To the right of the input sits a solid **white** *button* labelled **"Add →"** with **black** text. You can either click this button or **press the Enter key** to create the task.

When a new task is created it is given the status **"todo"**, an empty description, and a due date set to **7 days from now**. The task name is taken exactly as typed. The new task immediately appears at the top of the queue above.
`,
  },
  {
    url: '/settings',
    exampleUrl: '/settings',
    title: 'Settings',
    description: 'Configure your display name and manage stored task data',
    spec: `# Settings — Parallel

## Page Heading

The page opens with a large *hero heading* that reads **"Settings."** in extra-bold **white** text, matching the same bold editorial style used across the app. Beneath it, a short **gray** subtitle reads "Configure your workspace and manage stored data."

<div id="operator-name"></div>

## Profile

This section is titled **"Profile"** in small uppercase **gray** text and contains a single field for your display name.

A small uppercase **gray** label reads **"Display name"** above a <span id="settings-name-input"></span>*text input field*. The input has a transparent background with a thin **dark gray** underline border. When you focus it, the border brightens to **light gray**. Your current name appears in **white** text inside the field. If the field is empty, placeholder text reads **"Your name"** in dim **dark gray**.

<span id="auto-save-hint"></span>Below the input, a small **gray** hint reads "Auto-saved to local storage." — this means **every keystroke saves your change immediately** without needing to press a save button. Your name persists across browser sessions.

The display name you set here appears on the home page hero subtitle ("Unified task tracking for {name}"). **If you clear the field entirely, the name reverts to the default value "OPERATOR"**.

<div id="data-management"></div>

## Data

This section is titled **"Data"** in small uppercase **gray** text and provides a way to reset all task data back to its original state.

A small uppercase **gray** label reads **"Reset all data"** followed by a **gray** description: "Restores default seed tasks. This cannot be undone."

Below that is a <span id="reset-button"></span>**"Reset data"** *outlined button* — it has a transparent background with a thin **dark gray** border and **white** text. When you click it the first time, **the button changes to a red "Confirm reset" button** as a safety measure. A second *outlined button* labelled **"Cancel"** appears beside it so you can back out. Clicking **"Confirm reset"** erases all your tasks and restores the four default seed tasks. **This action cannot be undone**.

## System Information

At the bottom of the page, a *stat bar* with three cells shows technical details about the app:

- **Version** — currently **"1.0.0"**
- **Storage** — **"localStorage"** (all data is saved in your browser)
- **Runtime** — **"Vite + React"**

Each cell has a small uppercase **gray** label and a larger **white** value, separated by thin **dark gray** vertical borders.
`,
  },
  {
    url: '/archive',
    exampleUrl: '/archive',
    title: 'Archive',
    description: 'Browse and restore completed tasks that have been archived',
    spec: `# Archive — Parallel

## Page Heading

The page opens with a large *hero section*. On the left, the *hero heading* reads **"Archive."** in extra-bold **white** text. Below it, a **gray** subtitle explains: "Completed and decommissioned tasks. Restore any item to move it back to the active queue."

On the right side of the hero, a very large accent number in bold **white** text shows the **total count of archived tasks**. Below it, a small **gray** label reads "Archived".

<div id="archived-task-list"></div>

## Archived Tasks

This section is titled **"Archived tasks"** in small uppercase **gray** text, with an item count on the right (e.g. "1 item").

Each archived task is displayed as a *task row* identical in layout to the home page — a *status dot*, task name, due date, and arrow — but with one addition: a <span id="restore-action"></span>**"Restore"** *outlined button* sits at the far right of each row. This button has a transparent background, a thin **dark gray** border, and smaller **white** text.

Clicking **"Restore"** immediately moves that task's status back to **"todo"** and returns it to the active task queue on the home page. The task disappears from the archive list.

The *status dot* on archived tasks appears in a faded **dark gray** with reduced opacity, visually indicating that these tasks are no longer active.

## How Tasks Get Archived

Tasks arrive in the archive from the task detail page. When viewing a task whose status is **"completed"**, an Archive button becomes available in the Actions section. **Only tasks with status "completed" can be archived** — you must first mark a task as completed before you can move it here.

## Empty State

<span id="archive-empty-state"></span>When there are no archived tasks, the section displays the centered message **"No archived tasks yet."** in **gray** text.
`,
  },
  {
    url: '/todo/:id',
    exampleUrl: '/todo/latest',
    title: 'Task Detail',
    description: 'View and edit all details of an individual task',
    spec: `# Task Detail — Parallel

<div id="back-nav"></div>

## Back Navigation

At the very top of the page, an *underlined text link* reading **"← Back"** in **white** text allows you to return to the home page. The underline is normally **dark gray** and becomes **white** when you hover over it.

## Task Name Heading

Below the back link, the task's name is displayed as a large, bold **white** *heading*. This text is significantly larger than body text (roughly two and a half times the size) and uses tight letter spacing. If the name is very long, it will wrap and break across lines.

<div id="task-fields"></div>

## Details

This section is titled **"Details"** in small uppercase **gray** text and contains all editable fields for the task. Every field in this section **saves automatically whenever you make a change** — there is no save button.

- <span id="field-name"></span>**Name** — a *text input field* with a thin **dark gray** underline border. It holds the task name in **white** text and saves as you type. The border brightens to **light gray** when focused.

- <span id="field-description"></span>**Description** — a *text area* (a larger, multi-line input) with a thin **dark gray** border on all four sides. If no description has been entered, **gray** placeholder text reads **"Add a description..."**. You can type longer notes here and resize the box vertically by dragging its bottom edge. The border brightens to **medium gray** when focused.

- <span id="field-status"></span>**Status** — a *dropdown select* showing the current status. Next to it sits a small circular <span id="status-indicator"></span>*status dot* whose color updates immediately when you change the selection:
  - **"Todo"** — **dark gray** dot
  - **"In-progress"** — **amber** dot
  - **"Completed"** — **green** dot
  - **"Archived"** — **dark gray** dot (faded)

  The *dropdown* has a **near-black** background with a thin **dark gray** border. **You can change between any status freely** — there are no restrictions on which transitions are allowed.

- <span id="field-due-date"></span>**Due date** — a *date picker input* that shows the current due date. It uses the browser's native date selector and appears with **white** text and a **dark gray** underline border. You can pick any date.

- <span id="field-created-at"></span>**Created** — a read-only line of **gray** text showing when the task was first created (e.g. "April 10, 2026 at 20:31"). This field cannot be edited.

<div id="delete-action"></div>

## Actions

This section is titled **"Actions"** in small uppercase **gray** text and contains action buttons for managing the task.

<div id="archive-action"></div>

<span id="archive-button"></span>**Archive** — an *outlined button* with a transparent background, thin **dark gray** border, and **white** text. This button **only appears when the task's status is "completed"**. Clicking it moves the task to archived status and redirects you to the Archive page.

<span id="delete-button"></span>**Delete** — an *outlined button* styled identically to the archive button. When you click it the first time, **the button changes to a red "Confirm delete" button** as a safety step. A **"Cancel"** *outlined button* appears beside it so you can back out. Clicking **"Confirm delete" permanently removes the task** — it cannot be recovered. After deletion, you are redirected to the home page.

## Quick Access Shortcut

You can navigate to \`/todo/latest\` as a shortcut. This **automatically redirects to the detail page of the most recently created task**. If there are no tasks at all, it redirects to the home page instead.

## Not Found

If you navigate to a task ID that does not exist, the page displays a large *heading* reading **"Not found."** with a **gray** subtitle "This task doesn't exist." and a solid **white** *button* labelled **"Back to tasks →"** to return to the home page.
`,
  },
];
