/* ========================================
   BC EagleGlass — EagleApps Table Styling
   Phase 4.1: MutationObserver for async
   Angular-rendered tables (eaen.bc.edu)
   ======================================== */

(function () {
  'use strict';

  /* ------ Constants ------ */
  const EAGLE_TABLE_CLASS = 'eagle-table';
  const EAGLE_STYLED_CLASS = 'eagle-styled';

  /** Selectors for tables we want to modernize. */
  const TABLE_SELECTORS = [
    'table.ng-table',
    'table.table-condensed',
    'table.table-striped',
    '#studentRegistrationContextViewerTablePlanned',
    '#studentRegistrationContextViewerTableRegistered',
    '#tabularCCRegistrationRequestItemSelector',
  ].join(', ');

  /** Selectors for general EagleApps elements to modernize. */
  const PANEL_SELECTORS = [
    '.panel.panel-default',
    '.well',
    '.alert',
  ].join(', ');

  /* ------ Core Styling Logic ------ */

  /** Mark discovered tables with the eagle-table class. */
  function markTables(root) {
    const tables = (root || document).querySelectorAll(TABLE_SELECTORS);
    tables.forEach(function (table) {
      if (!table.classList.contains(EAGLE_TABLE_CLASS)) {
        table.classList.add(EAGLE_TABLE_CLASS);
      }
    });
  }

  /** Mark panels, wells, and alerts for modern styling. */
  function markPanels(root) {
    const panels = (root || document).querySelectorAll(PANEL_SELECTORS);
    panels.forEach(function (panel) {
      if (!panel.classList.contains(EAGLE_STYLED_CLASS)) {
        panel.classList.add(EAGLE_STYLED_CLASS);
      }
    });
  }

  /** Mark form controls and buttons for modern styling. */
  function markFormControls(root) {
    const controls = (root || document).querySelectorAll(
      '.btn, .form-control, input[type="text"], input[type="search"], select'
    );
    controls.forEach(function (el) {
      if (!el.classList.contains(EAGLE_STYLED_CLASS)) {
        el.classList.add(EAGLE_STYLED_CLASS);
      }
    });
  }

  /** Run all marking passes. */
  function stylePass(root) {
    markTables(root);
    markPanels(root);
    markFormControls(root);
  }

  /* ------ Debounced Observer ------ */

  let rafPending = false;

  function scheduleStylePass() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(function () {
      rafPending = false;
      stylePass(document);
    });
  }

  /** Set up a MutationObserver on the primary content container. */
  function attachObserver() {
    // EagleApps renders content inside .ui-view-container or <ui-view>
    // We observe document.body as a fallback since the container may not
    // exist yet when the script runs.
    const target = document.querySelector('.ui-view-container') || document.body;
    if (!target) return;

    const observer = new MutationObserver(function (mutations) {
      // Only schedule work if nodes were actually added
      for (let i = 0; i < mutations.length; i++) {
        if (mutations[i].addedNodes.length > 0) {
          scheduleStylePass();
          return;
        }
      }
    });

    observer.observe(target, {
      childList: true,
      subtree: true,
    });

    // Initial pass for already-rendered content
    stylePass(document);
  }

  /* ------ Init ------ */

  function init() {
    attachObserver();
  }

  // Script may run at document_start; wait for body
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
