# Project: BC EagleGlass (Chrome Extension)
**Goal:** Modernize Boston College Agora, EagleApps (`eaen.bc.edu`), and login (`login.bc.edu`) portals with a SaaS-inspired UI.

## 1. Design & Performance
- **Vibe:** Card-based, high white space, modern sans-serif (Inter/Geist).
- **Colors:** BC Maroon (#8A2432) / Gold (#BC9B6A) as subtle accents only.
- **Speed:** 60FPS UI. No blurs, no heavy JS for layout. Use CSS Grid/Flexbox.

## 2. Progress Tracking System (CRITICAL)
- **Log File:** `progress.txt` must be updated at the start and end of every task.
- **Format:** Use `[PHASE X.Y] [STATUS] - Description` format.
- **Persistence:** If the session resets, the first action must be reading `progress.txt` and `PRD.md`.

## 3. Master Execution Plan

### Phase 1: Infrastructure
- [ ] 1.1: Initialize `manifest.json` (V3) and permissions.
- [ ] 1.2: Define CSS variables in `styles.css`.
- [ ] 1.3: Create `progress.txt` tracker.

### Phase 2: The Global Wrapper
- [ ] 2.1: Implement Sidebar injection script (`sidebar.js`).
- [ ] 2.2: Style Sidebar with modern icons and hover states.

### Phase 3: Agora Portal Redesign (`services.bc.edu`)
- **Selectors:** `main#content`, `#all-services`, `.panel.panel-default`, `.panel-heading`, `.panel-body ul li a`
- **Note:** Preserve existing jQuery click handlers on `#all-services li:not(.disabled)`.
- [ ] 3.1: Transform "My Services" links into modern Cards.
- [ ] 3.2: Implement responsive grid layout for portal dashboard.

### Phase 4: EagleApps Dynamic Styling (`eaen.bc.edu`, incl. Facet Search)
- **Observer target:** `.ui-view-container` or `ui-view` (Angular async rendering).
- **Table selectors:** `table.ng-table`, `table.table-condensed`, `table.table-striped`, `#studentRegistrationContextViewerTablePlanned`, `#studentRegistrationContextViewerTableRegistered`, `#tabularCCRegistrationRequestItemSelector`
- [ ] 4.1: Implement `MutationObserver` for async registration tables.
- [ ] 4.2: Apply modern "Data Table" styles to course lists (Student Registration + Facet Search).

### Phase 5: Polish & Performance
- [ ] 5.1: Final FOUC (Flash of Unstyled Content) prevention.
- [ ] 5.2: Minify assets and performance audit.