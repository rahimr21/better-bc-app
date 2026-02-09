# BC EagleGlass — Styling Guide for AI Agents

This document describes styling details, rules, and patterns that work well with the Boston College portal pages. **Read this before modifying `styles.css`, `sidebar.js`, or `eaen-tables.js`.**

---

## 1. Design Philosophy (from PRD)

- **Vibe:** Card-based, high white space, modern sans-serif (Inter).
- **Colors:** BC Maroon (`#8A2432`) and Gold (`#BC9B6A`) as **subtle accents only**—never dominant.
- **Performance:** 60FPS UI. No blur effects, no heavy JS for layout. Prefer CSS Grid and Flexbox.
- **Scope:** The extension overrides BC’s native styles via content-injected CSS. We do **not** remove or replace DOM nodes; we only add classes and override CSS.

---

## 2. Design Tokens (`styles.css`)

Always use these variables instead of hardcoded values:

| Token | Value | Use |
|-------|-------|-----|
| `--eagle-primary` | `#8A2432` | Primary actions, links, headings |
| `--eagle-primary-hover` | `#a02a3c` | Hover states |
| `--eagle-primary-light` | `rgba(138,36,50,0.08)` | Hover backgrounds, focus rings |
| `--eagle-accent` | `#BC9B6A` | Sidebar active state, highlights |
| `--eagle-accent-hover` | `#c9ad80` | Accent hover |
| `--eagle-accent-light` | `rgba(188,155,106,0.12)` | Accent backgrounds |
| `--eagle-bg` | `#F4F5F7` | Page backgrounds |
| `--eagle-card` | `#FDFDFD` | Card/panel backgrounds |
| `--eagle-text` | `#212529` | Body text |
| `--eagle-text-muted` | `#6C757D` | Secondary text |
| `--eagle-font` | `'Inter', ui-sans-serif, system-ui, sans-serif` | Body font |
| `--eagle-font-display` | Same as `--eagle-font` | Headings |
| `--eagle-radius` | `12px` | Large cards, page sections |
| `--eagle-radius-sm` | `8px` | Buttons, inputs, small cards |
| `--eagle-radius-lg` | `16px` | Login card, footer |
| `--eagle-shadow` | `0 4px 20px rgba(0,0,0,0.05)` | Subtle cards |
| `--eagle-shadow-md` | `0 4px 24px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)` | Cards with more pop |
| `--eagle-shadow-lg` | `0 8px 40px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)` | Hover / elevated |
| `--eagle-sidebar-width-collapsed` | `64px` | Sidebar collapsed |
| `--eagle-sidebar-width-expanded` | `240px` | Sidebar expanded |
| `--eagle-z-sidebar` | `9990` | Must stay below BC emergency banner (z-index 9999999) |

---

## 3. Domain Scoping (Body Classes)

Styling is scoped by body classes injected in `sidebar.js` -> `addPageScopeClass()`:

| Host | Body Class | When Added |
|------|------------|------------|
| `services.bc.edu` | `eagle-agora` | When `#all-services` or `#content` exists |
| `eaen.bc.edu` | `eagle-eaen` | Always on eaen |
| `login.bc.edu` | `eagle-login` | Always on login |
| All domains | `eagle-has-sidebar` | When sidebar is injected |

**Rule:** All page-specific overrides must be scoped under `body.eagle-agora`, `body.eagle-eaen`, or `body.eagle-login`. Do not style BC elements globally without a scope—this avoids affecting unintended pages.

---

## 4. Agora Portal (`services.bc.edu`) — Critical Rules

### DOM Structure to Respect

- **`#all-services`** — Grid of service panels. Uses `display: grid` with `repeat(auto-fill, minmax(300px, 1fr))`.
- **`.panel.panel-default`** — Each service card (Academics, Account, etc.).
- **`.panel-heading`** — Card header.
- **`.panel-body ul li a`** — Service links. The **whole `<li>` is clickable** via jQuery; do not remove or change the `<a>` or `<li>` structure.

### Do Not Break

- **jQuery click handler:** `#all-services li:not(.disabled)` delegates clicks to the first `<a>` inside. Do not remove links, change `li` structure, or add click-blocking overlays.
- **`target="_blank"`** — Some links open in a new tab. Preserve this behavior.
- **`.disabled`** — Used for unavailable services. Style with reduced opacity; do not remove.

### Selectors to Use

- Cards: `body.eagle-agora #all-services .panel.panel-default`
- Links: `body.eagle-agora #all-services .panel-body li a`
- Page header: `body.eagle-agora .page-description` (maroon banner with rounded bottom)
- Top banner: `body.eagle-agora .banner.banner-inverse`
- Header row: `body.eagle-agora .header`

### Visual Rules That Work

- Use `overflow: hidden` on panels so rounded corners clip children.
- Add `border: 1px solid rgba(0,0,0,0.08)` plus shadow for card definition.
- Panel headings get `background: var(--eagle-bg)` for separation from body.
- Use `--eagle-shadow-md` for default cards, `--eagle-shadow-lg` on hover.
- External links (`a[target="_blank"]`) use `::after { content: ' ↗' }` for clarity.

---

## 5. EagleApps (`eaen.bc.edu`) — Critical Rules

### Async Content

EagleApps uses Angular. Tables and panels appear **after** the page loads. The `eaen-tables.js` MutationObserver watches `.ui-view-container` (or `body`) and adds `.eagle-table` and `.eagle-styled` to discovered elements.

### Table Selectors (in `eaen-tables.js`)

- `table.ng-table`, `table.table-condensed`, `table.table-striped`
- `#studentRegistrationContextViewerTablePlanned`, `#studentRegistrationContextViewerTableRegistered`
- `#tabularCCRegistrationRequestItemSelector`

### Panel / Form Selectors

- `.panel.panel-default`, `.well`, `.alert`
- `.btn`, `.form-control`, `input[type="text"]`, `input[type="search"]`, `select`

### Adding New Styled Elements

1. Add the selector to the appropriate array in `eaen-tables.js` (`TABLE_SELECTORS` or `PANEL_SELECTORS`).
2. Add the class (e.g. `.eagle-table`) in the corresponding `mark*` function.
3. Add CSS under `body.eagle-eaen` targeting that class or the original selector.

### Visual Rules That Work

- Tables: `border-radius: var(--eagle-radius-sm)`, `overflow: hidden`, light border and shadow.
- Thead: `background: var(--eagle-bg)`, uppercase small caps for headers.
- Rows: Hover with `background: var(--eagle-primary-light)`.
- Facet filters: `.fs-header__active-filter` as pill-shaped chips (`border-radius: 100px`).
- Tabs: `body.eagle-eaen .nav-tabs` with bottom border and active state using primary color.

---

## 6. Login Page (`login.bc.edu`)

### DOM Structure

- `section.login` — Main card container
- `#mainLogo`, `#username`, `#password`, `.btn.custom`, `.alert.alert-info`, `.note`

### Layout Approach

- Body uses flexbox to center the login card vertically and horizontally.
- `.bg-image` is overridden with a subtle gradient background.
- `.global-header` is hidden (empty on login).

### Input / Button Rules

- Inputs: `height: 48px`, `border-radius: var(--eagle-radius-sm)`, focus ring with `var(--eagle-primary-light)`.
- Button: Full-width, `var(--eagle-primary)` background, hover shadow.
- Override inline styles on `.alert.alert-info` with `!important` if the page sets them.

---

## 7. Sidebar (`eagle-sidebar`)

### Class Prefix

All sidebar classes use `eagle-sidebar` or `eagle-sidebar__*`. The reset `.eagle-ext` applies only to the sidebar tree—do not expand it to page content.

### Active State

- Use Gold (`--eagle-accent`) for the active nav item.
- Class: `.eagle-sidebar__link--active`
- Background: `rgba(188,155,106,0.18)`, border-left: `3px solid var(--eagle-accent)`.
- Hover: slightly stronger background for visibility.

---

## 8. Rounded Corners and “Pop”

### Avoid Square Edges

- Apply `border-radius` to: cards, buttons, inputs, dropdowns, modals, alerts.
- Use `overflow: hidden` on card containers so child elements (headers, lists) don’t leak square corners.
- Input groups (`.input-group`) need radius on the first and last children.

### Depth and Contrast

- Add a light border (`1px solid rgba(0,0,0,0.06–0.08)`) in addition to shadow for definition.
- Use stronger shadows (`--eagle-shadow-md`, `--eagle-shadow-lg`) for cards that should “pop.”
- Headers inside cards: subtle background (`var(--eagle-bg)`) or border-bottom for separation.

---

## 9. Specificity and Overrides

- BC’s styles are loaded before our CSS. Use `!important` when necessary to override inline or high-specificity BC rules.
- Prefer `body.eagle-agora`, `body.eagle-eaen`, or `body.eagle-login` at the start of selectors for clear scoping.
- Avoid broad selectors like `input` or `.btn` without a body scope—they can affect unintended pages.

---

## 10. Z-Index and Emergency Banner

- BC’s emergency banner uses `z-index: 9999999`. Keep the sidebar at `--eagle-z-sidebar: 9990` so the banner remains on top.
- Do not add overlays or fixed elements with a z-index above `9990` unless they are clearly below the emergency banner.

---

## 11. Progress Tracking

- Update `progress.txt` at the start and end of each task.
- Format: `[PHASE X.Y] [STATUS] - Description`
- Add a session log line with date and brief summary.

---

## 12. File Reference

| File | Purpose |
|------|---------|
| `styles.css` | All design tokens and page-specific overrides |
| `sidebar.js` | Sidebar injection, `addPageScopeClass()`, nav items |
| `eaen-tables.js` | MutationObserver, `.eagle-table` / `.eagle-styled` marking |
| `manifest.json` | Content script matches; `eaen-tables.js` only on eaen |
| `context/` | HTML snapshots for selector verification |

---

## Quick Checklist for New Styles

1. Use design tokens (colors, radii, shadows) from `:root`.
2. Scope under `body.eagle-agora`, `body.eagle-eaen`, or `body.eagle-login`.
3. For eaen, add new selectors to `eaen-tables.js` if targeting async content.
4. Use `overflow: hidden` where rounded corners might clip.
5. Add light borders and appropriate shadows for depth.
6. Do not break `#all-services` jQuery click behavior.
7. Update `progress.txt` when the work is complete.
