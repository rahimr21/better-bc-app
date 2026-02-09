# BC EagleGlass

A Chrome extension that modernizes the Boston College Agora, EagleApps (`eaen.bc.edu`), and login (`login.bc.edu`) portals with a cleaner, SaaS-inspired UI.

## Features

- **Collapsible sidebar navigation** — Quick access to Dashboard, Services, Registration, Academics, Financials, and Student Life
- **Modernized Agora** — Card-based layout, updated typography, and refined styling for the My Services dashboard
- **EagleApps enhancements** — Improved tables, form controls, facet search panels, and data views
- **Login page refresh** — Centered card layout with updated inputs and styling
- **BC design tokens** — Maroon (#8A2432) and Gold (#BC9B6A) accents, consistent spacing and shadows

## Installation

1. Clone or download this repo
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked** and select this project folder

## Requirements

- Chrome (Manifest V3)
- BC credentials (extension only styles existing BC portals; you must be logged in separately)

## Project structure

| File | Purpose |
|------|---------|
| `manifest.json` | Extension config, permissions, content script registration |
| `sidebar.js` | Injects collapsible sidebar, nav items, body class detection |
| `eaen-tables.js` | MutationObserver for Angular-rendered EagleApps tables |
| `styles.css` | Design tokens, sidebar, Agora, EagleApps, and login styling |
| `progress.txt` | Development log and phase tracker |
| `PRD.md` | Product requirements and execution plan |

## Supported URLs

- `https://services.bc.edu/*` — Agora portal
- `https://eaen.bc.edu/*` — EagleApps (registration, courses, etc.)
- `https://login.bc.edu/*` — BC login page

## License

MIT (or your preferred license)
