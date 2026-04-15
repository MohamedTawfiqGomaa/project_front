/**
 * Shared logic for Medical Appointment System
 */

// --- Particle System Logic ---
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const icons = [
        '<path d="M12 5v14M5 12h14"/>', // Plus
        '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>', // Heart
        '<rect x="2" y="7" width="20" height="10" rx="5" ry="5"/>', // Pill
        '<path d="M4.5 16.5c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0"/>' // DNA Wave
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
            </svg>
        `;

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
            createParticle();
        }, (duration + delay) * 1000);
    }

    // Initialize particles
    for(let i = 0; i < 15; i++) {
        setTimeout(createParticle, i * 300);
    }
}

// --- MediModal System ---
const MediModal = {
    overlay: null,
    
    init() {
        if (this.overlay) return;
        
        const modalHTML = `
            <div id="mediModalOverlay" class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-icon" id="modalIcon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                        </div>
                        <h2 class="modal-title" id="modalTitle">Confirm Action</h2>
                    </div>
                    <div class="modal-body" id="modalBody">
                        Are you sure you want to proceed?
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline" id="modalCancelBtn">إلغاء</button>
                        <button class="btn btn-primary" id="modalConfirmBtn">تأكيد</button>
                    </div>
                </div>
            </div>
        `;
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
        confirmBtn.className = 'btn btn-primary';

        this.overlay.classList.add('active');

        const close = () => {
            this.overlay.classList.remove('active');
            confirmBtn.onclick = null;
            cancelBtn.onclick = null;
        };

        confirmBtn.onclick = () => {
            onConfirm();
            close();
        };

        cancelBtn.onclick = close;
        this.overlay.onclick = (e) => { if(e.target === this.overlay) close(); };
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
                cancelBtn.style.display = 'block';
                confirmBtn.textContent = 'تأكيد';
            }, 300);
        };

        confirmBtn.onclick = close;
        this.overlay.onclick = (e) => { if(e.target === this.overlay) close(); };
    }
};

// --- State Management ---
const AppStore = {
  get currentUser() {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
  },
  set currentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  },
  get appointments() {
    return JSON.parse(localStorage.getItem('appointments')) || [];
  },
  set appointments(apps) {
    localStorage.setItem('appointments', JSON.stringify(apps));
  },
  logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../pages/login.html';
  }
};

// --- Navbar Injection ---
function injectNavbar() {
  const navbarHTML = `
    <nav class="navbar">
      <div class="container">
        <a href="../pages/home.html" class="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          MediBook
        </a>
        
        <button class="mobile-toggle" id="mobileMenuBtn">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>

        <ul class="nav-links" id="navLinks">
          <li><a href="../pages/home.html" class="nav-link" id="nav-home">Doctors</a></li>
          <li><a href="../pages/my-appointments.html" class="nav-link" id="nav-appointments">My Bookings</a></li>
          <li><button onclick="AppStore.logout()" class="btn btn-outline" style="padding: 0.5rem 1rem; width: auto;">Logout</button></li>
        </ul>
      </div>
    </nav>
  `;
  document.body.insertAdjacentHTML('afterbegin', navbarHTML);
  
  // Mobile toggle logic
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.onclick = () => {
        navLinks.classList.toggle('active');
        menuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
            : '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    };
  }

  // Set active link
  const path = window.location.pathname;
  if (path.includes('home.html')) document.getElementById('nav-home')?.classList.add('active');
  if (path.includes('my-appointments.html')) document.getElementById('nav-appointments')?.classList.add('active');
}

// --- Auth Guard ---
function checkAuth() {
  const isLoginPage = window.location.pathname.includes('login.html');
  if (!AppStore.currentUser && !isLoginPage) {
    window.location.href = '../pages/login.html';
  }
}

// --- Notifications ---
function showNotification(message, type = 'primary') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div style="background: white; padding: 1rem 2rem; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border-left: 4px solid var(--${type}); position: fixed; bottom: 2rem; right: 2rem; z-index: 2000; animation: slideIn 0.3s ease-out;">
      ${message}
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    if (!window.location.pathname.includes('login.html') && !window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
        injectNavbar();
    }
    checkAuth();
    initParticles();
    MediModal.init();
});

// Add slideIn animation style dynamically if not in CSS
const style = document.createElement('style');
style.innerHTML = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;
document.head.appendChild(style);

