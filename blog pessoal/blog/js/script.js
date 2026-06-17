/* ═══════════════════════════════════════════════
   BLOG VIKING — Script Principal
   ᛊᚲᚱᛁᛈᛏ
   ═══════════════════════════════════════════════ */

// ─── DARK MODE ───────────────────────────────────
const THEME_KEY  = 'marcus-theme';
const FONT_KEY   = 'marcus-font-size';
const BASE_FS    = 18;
const FS_STEP    = 2;
const FS_MIN     = 14;
const FS_MAX     = 24;

function applyTheme(mode) {
  document.body.classList.remove('dark-mode', 'light-mode');
  if (mode !== 'default') document.body.classList.add(mode + '-mode');
  localStorage.setItem(THEME_KEY, mode);

  const btn = document.getElementById('btn-theme');
  if (!btn) return;
  if (mode === 'light') {
    btn.textContent = 'Escuro';
    btn.title = 'Modo Escuro';
  } else {
    btn.textContent = 'Claro';
    btn.title = 'Modo Claro';
  }
}

function toggleTheme() {
  const current = localStorage.getItem(THEME_KEY) || 'default';
  applyTheme(current === 'light' ? 'default' : 'light');
  showToast(
    document.body.classList.contains('light-mode')
      ? 'Modo Claro Ativo' : 'Modo Escuro Ativo'
  );
}

// ─── FONT SIZE ───────────────────────────────────
function applyFontSize(size) {
  const clamped = Math.min(FS_MAX, Math.max(FS_MIN, size));
  document.documentElement.style.setProperty('--fs-base', clamped + 'px');
  localStorage.setItem(FONT_KEY, clamped);
}

function increaseFontSize() {
  const cur = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--fs-base') || BASE_FS);
  applyFontSize(cur + FS_STEP);
  showToast('Fonte +');
}

function decreaseFontSize() {
  const cur = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--fs-base') || BASE_FS);
  applyFontSize(cur - FS_STEP);
  showToast('Fonte −');
}

// ─── ACTIVE NAV ──────────────────────────────────
function markActiveLink() {
  const links = document.querySelectorAll('.nav-links a');
  const path  = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ─── MOBILE NAV ──────────────────────────────────
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });

  // fecha ao clicar em link
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.textContent = '☰';
    });
  });
}

// ─── TOAST ───────────────────────────────────────
let toastTimer = null;
function showToast(msg) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ─── FORM VALIDATION ─────────────────────────────
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Nome
    const nameInput = form.querySelector('#field-name');
    const nameErr   = form.querySelector('#err-name');
    if (!nameInput || nameInput.value.trim().length < 2) {
      valid = false;
      nameInput && nameInput.classList.add('error');
      nameErr  && nameErr.classList.add('show');
    } else {
      nameInput.classList.remove('error');
      nameErr && nameErr.classList.remove('show');
    }

    // Email
    const emailInput = form.querySelector('#field-email');
    const emailErr   = form.querySelector('#err-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
      valid = false;
      emailInput && emailInput.classList.add('error');
      emailErr   && emailErr.classList.add('show');
    } else {
      emailInput.classList.remove('error');
      emailErr && emailErr.classList.remove('show');
    }

    // Mensagem
    const msgInput = form.querySelector('#field-msg');
    const msgErr   = form.querySelector('#err-msg');
    if (!msgInput || msgInput.value.trim().length < 10) {
      valid = false;
      msgInput && msgInput.classList.add('error');
      msgErr   && msgErr.classList.add('show');
    } else {
      msgInput.classList.remove('error');
      msgErr && msgErr.classList.remove('show');
    }

    if (valid) {
      form.style.display = 'none';
      const success = document.getElementById('form-success');
      if (success) success.classList.add('show');
      showToast('Mensagem enviada!');
    }
  });

  // Remove erro ao digitar
  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('error');
      const errId = el.id.replace('field-', 'err-');
      const err = document.getElementById(errId);
      if (err) err.classList.remove('show');
    });
  });
}

// ─── INIT ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Restaura tema salvo
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) applyTheme(savedTheme);

  // Restaura tamanho de fonte
  const savedFs = localStorage.getItem(FONT_KEY);
  if (savedFs) applyFontSize(parseInt(savedFs));

  // Bindings
  const btnTheme = document.getElementById('btn-theme');
  if (btnTheme) btnTheme.addEventListener('click', toggleTheme);

  const btnFontUp = document.getElementById('btn-font-up');
  if (btnFontUp) btnFontUp.addEventListener('click', increaseFontSize);

  const btnFontDown = document.getElementById('btn-font-down');
  if (btnFontDown) btnFontDown.addEventListener('click', decreaseFontSize);

  markActiveLink();
  initMobileNav();
  initContactForm();
});
