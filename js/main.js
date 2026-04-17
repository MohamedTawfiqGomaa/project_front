/**
 * Medi Queue — منطق مشترك (عربي، RTL، أدوار، تخزين محلي)
 */

const MQ_KEYS = {
  currentUser: 'mq_currentUser',
  appointments: 'mq_appointments',
  doctors: 'mq_doctors',
  clinics: 'mq_clinics',
  users: 'mq_users',
  seeded: 'mq_seeded',
  dark: 'mq_darkMode',
};

function pathIncludes(segment) {
  return window.location.pathname.includes(segment);
}

function isAuthPage() {
  return pathIncludes('login.html') || pathIncludes('register.html');
}

function isPatientPage() {
  return (
    pathIncludes('home.html') ||
    pathIncludes('doctor-profile.html') ||
    pathIncludes('booking.html') ||
    pathIncludes('my-appointments.html') ||
    pathIncludes('track.html')
  );
}

function isDoctorPage() {
  return pathIncludes('doctor-dashboard.html');
}

function isAdminPage() {
  return pathIncludes('admin-dashboard.html');
}

function redirectForRole(user) {
  if (!user) return '../pages/login.html';
  if (user.role === 'doctor') return '../pages/doctor-dashboard.html';
  if (user.role === 'admin') return '../pages/admin-dashboard.html';
  return '../pages/home.html';
}

function seedStorage() {
  if (localStorage.getItem(MQ_KEYS.seeded)) return;
  localStorage.setItem(MQ_KEYS.clinics, JSON.stringify(clinicsData));
  localStorage.setItem(MQ_KEYS.doctors, JSON.stringify(doctorsData));
  const existing = JSON.parse(localStorage.getItem(MQ_KEYS.users) || '[]');
  const merged = [...seedAccounts.map((a) => ({ ...a })), ...existing.filter((u) => !seedAccounts.some((s) => s.email === u.email))];
  localStorage.setItem(MQ_KEYS.users, JSON.stringify(merged));
  localStorage.setItem(MQ_KEYS.appointments, localStorage.getItem(MQ_KEYS.appointments) || '[]');
  localStorage.setItem(MQ_KEYS.seeded, '1');
}

const AppStore = {
  get currentUser() {
    try {
      return JSON.parse(localStorage.getItem(MQ_KEYS.currentUser)) || null;
    } catch {
      return null;
    }
  },
  set currentUser(user) {
    if (user) localStorage.setItem(MQ_KEYS.currentUser, JSON.stringify(user));
    else localStorage.removeItem(MQ_KEYS.currentUser);
  },
  get appointments() {
    try {
      return JSON.parse(localStorage.getItem(MQ_KEYS.appointments)) || [];
    } catch {
      return [];
    }
  },
  set appointments(apps) {
    localStorage.setItem(MQ_KEYS.appointments, JSON.stringify(apps));
  },
  get users() {
    try {
      return JSON.parse(localStorage.getItem(MQ_KEYS.users)) || [];
    } catch {
      return [];
    }
  },
  set users(list) {
    localStorage.setItem(MQ_KEYS.users, JSON.stringify(list));
  },
  get clinics() {
    try {
      const raw = localStorage.getItem(MQ_KEYS.clinics);
      return raw ? JSON.parse(raw) : clinicsData;
    } catch {
      return clinicsData;
    }
  },
  set clinics(list) {
    localStorage.setItem(MQ_KEYS.clinics, JSON.stringify(list));
  },
  getDoctors() {
    try {
      const raw = localStorage.getItem(MQ_KEYS.doctors);
      return raw ? JSON.parse(raw) : doctorsData;
    } catch {
      return doctorsData;
    }
  },
  setDoctors(list) {
    localStorage.setItem(MQ_KEYS.doctors, JSON.stringify(list));
  },
  get darkMode() {
    return localStorage.getItem(MQ_KEYS.dark) === '1';
  },
  set darkMode(on) {
    if (on) localStorage.setItem(MQ_KEYS.dark, '1');
    else localStorage.removeItem(MQ_KEYS.dark);
    document.documentElement.classList.toggle('dark', !!on);
  },
  logout() {
    AppStore.currentUser = null;
    window.location.href = '../pages/login.html';
  },
};

function getDoctorForUser(user) {
  if (!user || user.role !== 'doctor') return null;
  return AppStore.getDoctors().find((d) => d.id === user.doctorId) || null;
}

function initTheme() {
  document.documentElement.classList.toggle('dark', AppStore.darkMode);
}

function toggleDarkMode() {
  AppStore.darkMode = !AppStore.darkMode;
}

// --- Particles ---
function initParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;

  const icons = [
    '<path d="M12 5v14M5 12h14"/>',
    '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    '<rect x="2" y="7" width="20" height="10" rx="5" ry="5"/>',
    '<path d="M4.5 16.5c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0"/>',
  ];

  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 30 + 15;
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 10;
    const icon = icons[Math.floor(Math.random() * icons.length)];
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `-${delay}s`;
    particle.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${icon}
      </svg>`;
    container.appendChild(particle);
    setTimeout(() => {
      particle.remove();
      createParticle();
    }, (duration + delay) * 1000);
  }
  for (let i = 0; i < 15; i++) {
    setTimeout(createParticle, i * 300);
  }
}

// --- Modal ---
const MediModal = {
  overlay: null,

  init() {
    if (this.overlay) return;
    const modalHTML = `
      <div id="mediModalOverlay" class="modal-overlay" dir="rtl">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-icon" id="modalIcon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            </div>
            <h2 class="modal-title" id="modalTitle">تأكيد</h2>
          </div>
          <div class="modal-body" id="modalBody">هل تريد المتابعة؟</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="modalCancelBtn">إلغاء</button>
            <button type="button" class="btn btn-primary" id="modalConfirmBtn">تأكيد</button>
          </div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.overlay = document.getElementById('mediModalOverlay');
  },

  confirm(title, message, onConfirm) {
    this.init();
    const titleEl = document.getElementById('modalTitle');
    const bodyEl = document.getElementById('modalBody');
    const confirmBtn = document.getElementById('modalConfirmBtn');
    const cancelBtn = document.getElementById('modalCancelBtn');
    const iconContainer = document.getElementById('modalIcon');
    titleEl.textContent = title;
    bodyEl.textContent = message;
    iconContainer.style.background = '#fee2e2';
    iconContainer.style.color = '#ef4444';
    cancelBtn.style.display = '';
    confirmBtn.textContent = 'تأكيد';
    confirmBtn.className = 'btn btn-primary';
    this.overlay.classList.add('active');

    const close = () => {
      this.overlay.classList.remove('active');
      confirmBtn.onclick = null;
      cancelBtn.onclick = null;
      this.overlay.onclick = null;
    };

    confirmBtn.onclick = () => {
      onConfirm();
      close();
    };
    cancelBtn.onclick = close;
    this.overlay.onclick = (e) => {
      if (e.target === this.overlay) close();
    };
  },

  alert(title, message) {
    this.init();
    const titleEl = document.getElementById('modalTitle');
    const bodyEl = document.getElementById('modalBody');
    const confirmBtn = document.getElementById('modalConfirmBtn');
    const cancelBtn = document.getElementById('modalCancelBtn');
    const iconContainer = document.getElementById('modalIcon');
    titleEl.textContent = title;
    bodyEl.textContent = message;
    iconContainer.style.background = '#dcfce7';
    iconContainer.style.color = '#10b981';
    confirmBtn.textContent = 'حسناً';
    cancelBtn.style.display = 'none';
    this.overlay.classList.add('active');

    const close = () => {
      this.overlay.classList.remove('active');
      setTimeout(() => {
        cancelBtn.style.display = '';
        confirmBtn.textContent = 'تأكيد';
      }, 300);
      confirmBtn.onclick = null;
      this.overlay.onclick = null;
    };
    confirmBtn.onclick = close;
    this.overlay.onclick = (e) => {
      if (e.target === this.overlay) close();
    };
  },
};

function showNotification(message, type = 'primary') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('dir', 'rtl');
  toast.innerHTML = `
    <div class="toast-inner" data-tone="${type}">
      ${message}
    </div>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 400);
  }, 4200);
}

function injectPatientChrome() {
  const user = AppStore.currentUser;
  const name = user?.name || 'مستخدم';

  const nav = `
    <nav class="navbar">
      <div class="container navbar-inner">
        <a href="../pages/home.html" class="logo">
          <span class="logo-mark" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </span>
          <span>Medi Queue</span>
        </a>

        <button type="button" class="mobile-toggle" id="mobileMenuBtn" aria-label="القائمة">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>

        <ul class="nav-links" id="navLinks">
          <li><a href="../pages/home.html" class="nav-link" id="nav-home">الأطباء</a></li>
          <li><a href="../pages/my-appointments.html" class="nav-link" id="nav-appointments">مواعيدي</a></li>
          <li class="nav-user"><span class="nav-greet">مرحباً، ${name}</span></li>
          <li>
            <button type="button" class="btn btn-ghost" id="themeTogglePatient" title="الوضع الليلي">🌙</button>
          </li>
          <li><button type="button" onclick="AppStore.logout()" class="btn btn-outline btn-sm">تسجيل الخروج</button></li>
        </ul>
      </div>
    </nav>`;
  document.body.insertAdjacentHTML('afterbegin', nav);

  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const open = navLinks.classList.contains('active');
      menuBtn.innerHTML = open
        ? '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });
  }

  const path = window.location.pathname;
  if (path.includes('home.html')) document.getElementById('nav-home')?.classList.add('active');
  if (path.includes('my-appointments.html')) document.getElementById('nav-appointments')?.classList.add('active');

  document.getElementById('themeTogglePatient')?.addEventListener('click', () => {
    toggleDarkMode();
    syncThemeButtons();
  });
  syncThemeButtons();
}

function syncThemeButtons() {
  const dark = AppStore.darkMode;
  document.querySelectorAll('#themeTogglePatient, #themeToggleDash').forEach((btn) => {
    if (!btn) return;
    btn.textContent = dark ? '☀️' : '🌙';
    btn.title = dark ? 'الوضع الفاتح' : 'الوضع الليلي';
  });
}

/**
 * @param {'doctor'|'admin'} role
 * @param {{ active?: string }} opts
 */
function injectDashboardShell(role, opts = {}) {
  const user = AppStore.currentUser;
  const title = role === 'doctor' ? 'لوحة الطبيب' : 'لوحة المدير';
  const links =
    role === 'doctor'
      ? `
        <a href="../pages/doctor-dashboard.html#overview" class="side-link ${opts.active === 'overview' ? 'active' : ''}">نظرة عامة</a>
        <a href="../pages/doctor-dashboard.html#queue" class="side-link ${opts.active === 'queue' ? 'active' : ''}">الطابور</a>
      `
      : `
        <a href="../pages/admin-dashboard.html" class="side-link ${opts.active === 'users' ? 'active' : ''}" data-link="users">المستخدمون</a>
        <a href="../pages/admin-dashboard.html#doctors" class="side-link ${opts.active === 'doctors' ? 'active' : ''}" data-link="doctors">الأطباء</a>
        <a href="../pages/admin-dashboard.html#clinics" class="side-link ${opts.active === 'clinics' ? 'active' : ''}" data-link="clinics">العيادات</a>
        <a href="../pages/admin-dashboard.html#bookings" class="side-link ${opts.active === 'bookings' ? 'active' : ''}" data-link="bookings">الحجوزات</a>
      `;

  const shell = `
    <div class="app-shell">
      <aside class="sidebar" id="mqSidebar">
        <div class="sidebar-brand">
          <span class="logo-mark"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></span>
          <div>
            <div class="sidebar-title">Medi Queue</div>
            <div class="sidebar-sub">${title}</div>
          </div>
        </div>
        <nav class="side-nav">${links}</nav>
        <div class="sidebar-footer">
          <button type="button" class="btn btn-ghost btn-block" id="themeToggleDash">🌙</button>
          <button type="button" class="btn btn-outline btn-block" onclick="AppStore.logout()">تسجيل الخروج</button>
        </div>
      </aside>
      <div class="shell-main">
        <header class="topbar">
          <button type="button" class="sidebar-toggle" id="sidebarToggle" aria-label="إظهار القائمة">☰</button>
          <div class="topbar-text">
            <h1 class="topbar-title" id="dashPageTitle">—</h1>
            <p class="topbar-sub">${user?.name || ''}</p>
          </div>
        </header>
        <main class="dash-content" id="dashMainSlot"></main>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('afterbegin', shell);

  const sidebar = document.getElementById('mqSidebar');
  document.getElementById('sidebarToggle')?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
  });
  document.getElementById('themeToggleDash')?.addEventListener('click', () => {
    toggleDarkMode();
    syncThemeButtons();
  });
  syncThemeButtons();

  const originalMain = document.querySelector('main.main-content, main.dash-page-main');
  const slot = document.getElementById('dashMainSlot');
  if (originalMain && slot) {
    while (originalMain.firstChild) slot.appendChild(originalMain.firstChild);
    originalMain.remove();
  }
}

function checkAuthAndRole() {
  if (isAuthPage()) return;

  const user = AppStore.currentUser;
  if (!user) {
    window.location.href = '../pages/login.html';
    return;
  }

  if (user.role === 'patient') {
    if (isDoctorPage() || isAdminPage()) {
      window.location.href = '../pages/home.html';
      return;
    }
    return;
  }

  if (user.role === 'doctor') {
    if (isPatientPage() || isAdminPage()) {
      window.location.href = '../pages/doctor-dashboard.html';
      return;
    }
    return;
  }

  if (user.role === 'admin') {
    if (isPatientPage() || isDoctorPage()) {
      window.location.href = '../pages/admin-dashboard.html';
      return;
    }
  }
}

function injectChromeByPage() {
  if (isAuthPage()) return;
  const user = AppStore.currentUser;
  if (!user) return;

  if (user.role === 'patient' && isPatientPage()) {
    injectPatientChrome();
    return;
  }
  if (user.role === 'doctor' && isDoctorPage()) {
    injectDashboardShell('doctor', { active: 'dash' });
    return;
  }
  if (user.role === 'admin' && isAdminPage()) {
    injectDashboardShell('admin', { active: 'users' });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  seedStorage();
  initTheme();
  checkAuthAndRole();
  injectChromeByPage();
  initParticles();
  MediModal.init();
});

window.formatDoctorPrice = function formatDoctorPrice(d) {
  return `${d.price} ${d.currency || 'ر.س'}`;
};

/** عرض حالة الحجز */
window.appointmentStatusLabel = function appointmentStatusLabel(code) {
  const m = {
    pending: 'قيد الانتظار',
    confirmed: 'تم التأكيد',
    completed: 'مكتمل',
    cancelled: 'ملغي',
  };
  return m[code] || code;
};

/** مراحل الطابور في صفحة المتابعة */
window.queuePhaseLabel = function queuePhaseLabel(phase) {
  const m = {
    waiting: 'في الانتظار',
    examining: 'جاري الكشف',
    your_turn: 'دورك الآن',
    done: 'انتهى',
  };
  return m[phase] || phase;
};
