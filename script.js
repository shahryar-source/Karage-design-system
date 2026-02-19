// ─────────────────────────────────────────────
// KARAGE DESIGN SYSTEM — Script
// ─────────────────────────────────────────────

// ── Active nav on scroll ──
const sections = document.querySelectorAll('.ds-section');
const navItems = document.querySelectorAll('.nav-item[data-section]');
const breadcrumb = document.getElementById('breadcrumb');

const sectionNames = {
  colors: 'Colors',
  typography: 'Typography',
  spacing: 'Spacing Scale',
  radius: 'Border Radius',
  elevation: 'Elevation',
  buttons: 'Buttons & Actions',
  inputs: 'Input Fields',
  badges: 'Badges & Counters',
  alerts: 'Alerts',
  toast: 'Toast Notifications',
  pagination: 'Pagination',
  divider: 'Divider',
  indicators: 'Indicators',
  skeleton: 'Skeleton Loader',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(item => item.classList.remove('active'));
      const active = document.querySelector(`.nav-item[data-section="${id}"]`);
      if (active) {
        active.classList.add('active');
        breadcrumb.textContent = sectionNames[id] || id;
      }
    }
  });
}, { threshold: 0.2, rootMargin: '-60px 0px -40% 0px' });

sections.forEach(s => observer.observe(s));

// ── Copy code block ──
function copyBlock(btn) {
  const pre = btn.closest('.code-block').querySelector('code');
  navigator.clipboard.writeText(pre.textContent).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'Copied!';
    btn.style.background = 'rgba(182,241,116,0.35)';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 1800);
  });
}

// ── Copy all CSS variables ──
function copyCSS() {
  const allCSS = `/* ─── Karage Design System — CSS Variables ─── */

:root {
  /* ── Green - Primary ── */
  --color-green-50: #F5FFE1;
  --color-green-100: #EFFFCD;
  --color-green-200: #D3F6AD;
  --color-green-300: #B6F174;
  --color-green-400: #3F9444;
  --color-green-500: #134F1A;
  --color-green-600: #0D4213;
  --color-green-700: #07310B;

  /* ── Gray - Text ── */
  --color-gray-50: #F6F6F6;
  --color-gray-100: #EEEEEE;
  --color-gray-200: #E2E2E2;
  --color-gray-300: #CBCBCB;
  --color-gray-400: #AFAFAF;
  --color-gray-500: #757575;
  --color-gray-600: #545454;
  --color-gray-700: #333333;

  /* ── Base ── */
  --color-black: #141414;
  --color-white: #FFFFFF;

  /* ── Red - Alert ── */
  --color-red-50: #FEF3F2;
  --color-red-100: #FEE4E2;
  --color-red-200: #FECDCA;
  --color-red-300: #FDA29B;
  --color-red-400: #F97066;
  --color-red-500: #F04438;
  --color-red-600: #D92D20;
  --color-red-700: #B42318;

  /* ── Supportive ── */
  --color-orange: #FD693F;
  --color-cornflower: #7196FE;
  --color-zorba: #A49D93;
  --color-seance: #752A9F;
  --color-corn-harvest: #8E6A0C;
  --color-chambray: #1A3FBF;

  /* ── Radius ── */
  --radius-sm-4:   4px;
  --radius-sm-6:   6px;
  --radius-md-8:   8px;
  --radius-md-10:  10px;
  --radius-md-12:  12px;
  --radius-md-14:  14px;
  --radius-lg-16:  16px;
  --radius-lg-18:  18px;
  --radius-xl-20:  20px;
  --radius-xl-22:  22px;
  --radius-xxl-24: 24px;
  --radius-xxl-28: 28px;
  --radius-xxl-32: 32px;
  --radius-full:   9999px;

  /* ── Spacing ── */
  --spacing-xs-1:   1px;
  --spacing-xs-2:   2px;
  --spacing-sm-4:   4px;
  --spacing-sm-6:   6px;
  --spacing-sm-8:   8px;
  --spacing-sm-10:  10px;
  --spacing-sm-12:  12px;
  --spacing-md-14:  14px;
  --spacing-md-16:  16px;
  --spacing-md-20:  20px;
  --spacing-md-24:  24px;
  --spacing-lg-28:  28px;
  --spacing-lg-32:  32px;
  --spacing-lg-36:  36px;
  --spacing-lg-40:  40px;
  --spacing-lg-44:  44px;
  --spacing-lg-48:  48px;
  --spacing-xl-56:  56px;
  --spacing-xl-64:  64px;
  --spacing-xl-80:  80px;
  --spacing-xl-96:  96px;
  --spacing-xxl-112: 112px;
  --spacing-xxl-128: 128px;
  --spacing-xxl-144: 144px;
  --spacing-xxl-160: 160px;

  /* ── Elevation ── */
  --shadow-low:  0 1px 2px rgba(0,0,0,.05), 0 1px 3px rgba(0,0,0,.08);
  --shadow-mid:  0 4px 8px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.06);
  --shadow-high: 0 16px 40px rgba(0,0,0,.12), 0 8px 16px rgba(0,0,0,.08);
}`;
  navigator.clipboard.writeText(allCSS).then(() => {
    const btn = document.querySelector('.btn-copy-all');
    const orig = btn.textContent;
    btn.textContent = '✓ Copied!';
    setTimeout(() => { btn.textContent = orig; }, 2000);
  });
}

// ── Swatch click to copy hex ──
const tooltip = document.getElementById('swatchTooltip');

document.querySelectorAll('.swatch, .sup-swatch').forEach(swatch => {
  swatch.addEventListener('click', () => {
    const hex = swatch.dataset.hex || swatch.querySelector('.sup-hex')?.textContent;
    if (!hex) return;
    navigator.clipboard.writeText(hex);
    tooltip.textContent = `Copied ${hex}`;
    tooltip.style.opacity = '1';
    setTimeout(() => tooltip.style.opacity = '0', 1600);
  });

  swatch.addEventListener('mousemove', (e) => {
    tooltip.style.left = (e.clientX + 14) + 'px';
    tooltip.style.top  = (e.clientY - 30) + 'px';
  });
});

// ── Toast ──
function showToast(type, icon, message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `k-toast k-toast-${type}`;
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ── Mobile menu ──
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Close sidebar on mobile nav click
navItems.forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      sidebar.classList.remove('open');
    }
  });
});

// ── Alert close ──
document.querySelectorAll('.alert-close').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.k-alert').style.display = 'none';
  });
});
