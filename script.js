// ─── PAGE NAVIGATION ───
function goTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  const navEl = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (navEl) navEl.classList.add('active');

  if (page === 'colors') {
    const activeTab = document.querySelector('.ptab.active');
    if (activeTab) syncTab(activeTab.dataset.tab);
  }

  window.scrollTo(0, 0);
  if (window.innerWidth <= 860) document.getElementById('sidebar').classList.remove('open');
}

// ─── NAV CLICKS ───
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const page = item.dataset.page;
    if (page) goTo(page);
  });
});

// ─── HAMBURGER ───
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

function openA11y() {
  document.getElementById('a11yDrawer').classList.add('open');
  document.getElementById('a11yOverlay').classList.add('open');
  document.querySelector('.main').style.overflow = 'hidden';
}
function closeA11y() {
  document.getElementById('a11yDrawer').classList.remove('open');
  document.getElementById('a11yOverlay').classList.remove('open');
  document.querySelector('.main').style.overflow = 'auto';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeA11y(); });


function syncTab(tab) {
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.dataset.tab === tab);
  });
}

document.querySelectorAll('.ptab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    syncTab(btn.dataset.tab);
  });
});

// ─── COPY CODE ───
function copyBlock(btn) {
  const code = btn.closest('.code-block').querySelector('code');
  if (!code) return;
  navigator.clipboard.writeText(code.textContent.trim()).then(() => {
    showToast('Copied to clipboard!');
    const orig = btn.textContent;
    btn.textContent = '✓ Done';
    setTimeout(() => btn.textContent = orig, 1800);
  });
}

// ─── COPY SWATCH ───
function showToast(msg) {
  const toast = document.getElementById('copy-toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}

document.querySelectorAll('.swatch, .sup-swatch').forEach(el => {
  el.addEventListener('click', () => {
    const hex = el.dataset.hex;
    if (!hex) return;
    navigator.clipboard.writeText(hex).then(() => showToast('Copied ' + hex));
  });
});

// ─── CLOSE SIDEBAR ON OUTSIDE CLICK ───
document.addEventListener('click', (e) => {
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  if (window.innerWidth <= 860 && sidebar.classList.contains('open')) {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  }
});
