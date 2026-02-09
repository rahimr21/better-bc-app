/* ========================================
   BC EagleGlass — Sidebar Injection
   Phase 2.1: Collapsible sidebar overlay
   Phase 6: Dark mode with persistent theme
   ======================================== */

(function () {
  'use strict';

  /* ------ Theme: Block paint until theme applied (prevents flicker) ------ */
  const blockEl = document.createElement('style');
  blockEl.id = 'eagle-theme-block';
  blockEl.textContent = 'html{visibility:hidden !important}';
  document.documentElement.appendChild(blockEl);

  /* ------ Constants ------ */
  const SIDEBAR_ID = 'eagle-sidebar';
  const ICONS_URL =
    'https://fonts.googleapis.com/css2?family=Material+Icons+Round&display=swap';

  /* ------ Navigation items (real launcher routes from Agora portal) ------ */
  const NAV_ITEMS = [
    { icon: 'dashboard',    label: 'Dashboard',    href: 'https://services.bc.edu/commoncore/myservices.do' },
    { icon: 'layers',       label: 'Services',     href: 'https://services.bc.edu/commoncore/myservices.do' },
    { icon: 'event_note',   label: 'Registration', href: 'https://services.bc.edu/password/external/launcher/generic.do?id=eaPlanningRegistration' },
    { icon: 'school',       label: 'Academics',    href: 'https://services.bc.edu/password/external/launcher/generic.do?id=CurrentCoursesEA' },
    { icon: 'payments',     label: 'Financials',   href: 'https://services.bc.edu/password/external/launcher/generic.do?id=wwep' },
    { icon: 'groups',       label: 'Student Life',  href: 'https://services.bc.edu/commoncore/myservices.do' },
  ];

  /* ------ Helpers ------ */

  /** Inject the Material Icons Round font if not already present. */
  function ensureIconFont() {
    if (document.querySelector('link[href*="Material+Icons+Round"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = ICONS_URL;
    document.head.appendChild(link);
  }

  /** Inject the Inter font if not already present. */
  function ensureInterFont() {
    if (document.querySelector('link[href*="family=Inter"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
  }

  /** Create a single nav item element. */
  function createNavItem(item, isActive) {
    const a = document.createElement('a');
    a.href = item.href;
    a.className = 'eagle-sidebar__link' + (isActive ? ' eagle-sidebar__link--active' : '');
    a.title = item.label;

    const icon = document.createElement('span');
    icon.className = 'material-icons-round eagle-sidebar__icon';
    icon.textContent = item.icon;

    const label = document.createElement('span');
    label.className = 'eagle-sidebar__label';
    label.textContent = item.label;

    a.appendChild(icon);
    a.appendChild(label);
    return a;
  }

  /** Determine which nav item should be "active" based on current URL. */
  function getActiveIndex() {
    const host = window.location.hostname;
    const path = window.location.pathname + window.location.search;

    // EagleApps pages — detect sub-app from URL path
    if (host.includes('eaen.bc.edu')) {
      if (path.includes('student-registration') || path.includes('faceted-search')) return 2; // Registration
      if (path.includes('degree-audit') || path.includes('grades')) return 3; // Academics
      return 2; // Default eaen → Registration
    }

    // Services.bc.edu launcher links — detect from query params
    if (host.includes('services.bc.edu')) {
      if (path.includes('id=eaPlanningRegistration')) return 2;
      if (path.includes('id=CurrentCoursesEA') || path.includes('id=DegreeAudit')) return 3;
      if (path.includes('id=wwep') || path.includes('id=AllowableCharges') || path.includes('id=FinancialAid')) return 4;
      if (path.includes('myservices.do')) return 0; // Dashboard
      return 1; // Services (other launcher links)
    }

    if (host.includes('login.bc.edu')) return 0; // Dashboard
    return 0;
  }

  /** Add scoping class for each BC portal domain. */
  function addPageScopeClass() {
    const host = window.location.hostname;
    if (host.includes('services.bc.edu') && document.querySelector('#all-services, #content')) {
      document.body.classList.add('eagle-agora');
    }
    if (host.includes('eaen.bc.edu')) {
      document.body.classList.add('eagle-eaen');
    }
    if (host.includes('login.bc.edu')) {
      document.body.classList.add('eagle-login');
    }
  }

  /* ------ Build Sidebar ------ */

  function buildSidebar() {
    // Prevent duplicate injection
    if (document.getElementById(SIDEBAR_ID)) return;

    const sidebar = document.createElement('aside');
    sidebar.id = SIDEBAR_ID;
    sidebar.className = 'eagle-ext eagle-sidebar';

    /* --- Header (logo area) --- */
    const header = document.createElement('div');
    header.className = 'eagle-sidebar__header';

    const logoIcon = document.createElement('span');
    logoIcon.className = 'material-icons-round eagle-sidebar__logo-icon';
    logoIcon.textContent = 'auto_awesome';

    const logoText = document.createElement('span');
    logoText.className = 'eagle-sidebar__logo-text';
    logoText.textContent = 'EagleGlass';

    header.appendChild(logoIcon);
    header.appendChild(logoText);
    sidebar.appendChild(header);

    /* --- Navigation --- */
    const nav = document.createElement('nav');
    nav.className = 'eagle-sidebar__nav';

    const activeIdx = getActiveIndex();
    NAV_ITEMS.forEach((item, i) => {
      nav.appendChild(createNavItem(item, i === activeIdx));
    });

    sidebar.appendChild(nav);

    /* --- Footer (theme toggle placeholder) --- */
    const footer = document.createElement('div');
    footer.className = 'eagle-sidebar__footer';

    const themeBtn = document.createElement('button');
    themeBtn.className = 'eagle-sidebar__link eagle-sidebar__theme-btn';
    themeBtn.title = 'Toggle dark mode';
    themeBtn.type = 'button';

    const themeIcon = document.createElement('span');
    themeIcon.className = 'material-icons-round eagle-sidebar__icon';
    themeIcon.textContent = document.documentElement.classList.contains('eagle-dark') ? 'light_mode' : 'dark_mode';

    const themeLabel = document.createElement('span');
    themeLabel.className = 'eagle-sidebar__label';
    themeLabel.textContent = 'Theme';

    themeBtn.addEventListener('click', function () {
      const isDark = document.documentElement.classList.toggle('eagle-dark');
      const nextTheme = isDark ? 'dark' : 'light';
      chrome.storage.local.set({ eagleTheme: nextTheme });
      themeIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
    });

    themeBtn.appendChild(themeIcon);
    themeBtn.appendChild(themeLabel);
    footer.appendChild(themeBtn);
    sidebar.appendChild(footer);

    /* --- Inject into page --- */
    document.body.prepend(sidebar);

    /* --- Push page content to make room (via CSS class, not inline styles) --- */
    document.body.classList.add('eagle-has-sidebar');
  }

  /* ------ Init ------ */

  function doInit() {
    ensureIconFont();
    ensureInterFont();
    buildSidebar();
    addPageScopeClass();
  }

  function runInit() {
    if (document.body) {
      doInit();
    } else {
      document.addEventListener('DOMContentLoaded', doInit);
    }
  }

  chrome.storage.local.get(['eagleTheme'], function (r) {
    const theme = r.eagleTheme || 'light';
    if (theme === 'dark') {
      document.documentElement.classList.add('eagle-dark');
    }
    blockEl.remove();
    runInit();
  });
})();
