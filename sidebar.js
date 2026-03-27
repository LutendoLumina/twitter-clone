// ─── INJECT SIDEBAR HTML (popups) ─────────────────────────────────────────────
document.body.insertAdjacentHTML('beforeend', `

  <!-- MORE POPUP -->
  <div id="morePopup" class="more-popup hidden">
    <div class="more-popup-item"><i class="bi bi-list-ul"></i> Lists</div>
    <div class="more-popup-item"><i class="bi bi-people"></i> Communities</div>
    <div class="more-popup-item"><i class="bi bi-rocket-takeoff"></i> Creator Studio</div>
    <div class="more-popup-item"><i class="bi bi-lightning"></i> Business</div>
    <div class="more-popup-item"><i class="bi bi-megaphone"></i> Ads</div>
    <div class="more-popup-item"><i class="bi bi-mic"></i> Create your Space</div>
    <div class="more-popup-item more-popup-divider"><i class="bi bi-gear"></i> Settings and privacy</div>
  </div>

  <!-- PROFILE FOOTER POPUP -->
  <div id="profilePopup" class="profile-popup hidden">
    <div class="profile-popup-item" id="addAccountBtn">Add an existing account</div>
    <div class="profile-popup-item" id="logoutBtn">Log out @LuthandoPrecio3</div>
  </div>

`);

// ─── SIDEBAR STYLES ───────────────────────────────────────────────────────────
const sidebarStyles = document.createElement('style');
sidebarStyles.textContent = `
  .hidden { display: none !important; }

  /* Profile popup */
  .profile-popup {
    position: fixed; bottom: 72px; left: 88px;
    background: var(--bg-primary); border: 1px solid var(--border-color);
    border-radius: 16px; min-width: 280px;
    z-index: 600; box-shadow: 0 4px 24px rgba(0,0,0,0.25);
    overflow: hidden;
  }
  .profile-popup.hidden { display: none; }
  .profile-popup-item {
    padding: 16px 20px; color: var(--text-primary);
    font-size: 1rem; font-weight: 500;
    cursor: pointer; transition: background .15s;
  }
  .profile-popup-item:hover { background: var(--bg-hover); }

  /* More popup */
  .more-popup {
    position: fixed; bottom: 128px; left: 88px;
    background: var(--bg-primary); border: 1px solid var(--border-color);
    border-radius: 16px; min-width: 280px;
    z-index: 600; box-shadow: 0 4px 24px rgba(0,0,0,0.25);
    overflow: hidden;
  }
  .more-popup.hidden { display: none; }
  .more-popup-item {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 20px; color: var(--text-primary);
    font-size: 1rem; font-weight: 500;
    cursor: pointer; transition: background .15s;
  }
  .more-popup-item i { font-size: 1.2rem; color: var(--text-primary); }
  .more-popup-item:hover { background: var(--bg-hover); }
  .more-popup-divider { border-top: 1px solid var(--border-color); }
`;
document.head.appendChild(sidebarStyles);


// ─── DOM REFS ─────────────────────────────────────────────────────────────────
const morePopup       = document.getElementById('morePopup');
const profilePopup    = document.getElementById('profilePopup');
const profileCard     = document.querySelector('.profile-card');
const moreSidebarItem = document.querySelector('.sidebar-link[data-section="more"]')?.closest('.sidebar-item');
const sidebarLinks    = document.querySelectorAll('.sidebar-link');
const contentSections = document.querySelectorAll('.content-section');
const mobileNavLinks  = document.querySelectorAll('.mobile-nav-link');
const darkModeToggle  = document.getElementById('darkModeToggle');
const darkModeIcon    = document.getElementById('darkModeIcon');
const THEME_KEY       = 'twitterCloneTheme';
const sidebarAvatar   = document.getElementById('sidebarAvatar');
const mobileTopbarAvatar = document.getElementById('mobileTopbarAvatar');
const composerAvatar  = document.getElementById('composerAvatar');
const profileBigAvatar = document.getElementById('profileBigAvatar');
const sidebarProfileName = document.getElementById('sidebarProfileName');
const sidebarProfileHandle = document.getElementById('sidebarProfileHandle');
const profileDisplayName = document.getElementById('profileDisplayName');
const profileAtHandle = document.getElementById('profileAtHandle');
const profileHeaderName = document.getElementById('profileHeaderName');


// ─── NAVIGATE TO SECTION (global helper used by other files) ──────────────────
function navigateTo(section) {
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active-nav'));
  const link = document.querySelector(`.sidebar-link[data-section="${section}"]`);
  if (link) {
    link.closest('.sidebar-item').classList.add('active-nav');
    updateSidebarIcons(section);
  }
  updateMobileNav(section);
  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active-section'));
  const target = document.getElementById(section);
  if (target) target.classList.add('active-section');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── UPDATE SIDEBAR ICONS ─────────────────────────────────────────────────────
function updateSidebarIcons(activeSection) {
  const iconMap = {
    home:          { i: 'bi-house-door',  a: 'bi-house-door-fill' },
    notifications: { i: 'bi-bell',        a: 'bi-bell-fill' },
    bookmarks:     { i: 'bi-bookmark',    a: 'bi-bookmark-fill' },
    profile:       { i: 'bi-person',      a: 'bi-person-fill' },
    chat:          { i: 'bi-envelope',    a: 'bi-envelope-fill' },
  };
  sidebarLinks.forEach(link => {
    const s   = link.dataset.section;
    const map = iconMap[s];
    if (!map) return;
    const icon = link.querySelector('i');
    if (!icon) return;
    icon.classList.toggle(map.i, s !== activeSection);
    icon.classList.toggle(map.a, s === activeSection);
  });
}

function updateMobileNav(activeSection) {
  const iconMap = {
    home:          { i: 'bi-house-door',  a: 'bi-house-door-fill' },
    notifications: { i: 'bi-bell',        a: 'bi-bell-fill' },
    explore:       { i: 'bi-search',      a: 'bi-search' },
    chat:          { i: 'bi-envelope',    a: 'bi-envelope-fill' },
  };

  mobileNavLinks.forEach(link => {
    const section = link.dataset.section;
    const icon = link.querySelector('i');
    const map = iconMap[section];
    if (link.dataset.action === 'toggle-theme') {
      link.classList.remove('active');
      return;
    }
    const isActive = section === activeSection;
    link.classList.toggle('active', isActive);
    if (!icon || !map) return;
    // Some icons (e.g. search) don't have a filled variant.
    if (map.i === map.a) {
      icon.classList.add(map.i);
      return;
    }
    icon.classList.toggle(map.i, !isActive);
    icon.classList.toggle(map.a, isActive);
  });
}


// ─── SIDEBAR NAV CLICK ────────────────────────────────────────────────────────
sidebarLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetSection = this.dataset.section;

    // "More" opens popup — never navigates
    if (targetSection === 'more') {
      morePopup.classList.toggle('hidden');
      return;
    }

    morePopup.classList.add('hidden');

    const clickedItem = this.closest('.sidebar-item');
    document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active-nav'));
    clickedItem.classList.add('active-nav');
    updateSidebarIcons(targetSection);

    contentSections.forEach(s => s.classList.remove('active-section'));
    const target = document.getElementById(targetSection);
    if (target) target.classList.add('active-section');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

mobileNavLinks.forEach(link => {
  link.addEventListener('click', function () {
    if (this.dataset.action === 'toggle-theme') {
      toggleTheme();
      return;
    }
    const targetSection = this.dataset.section;
    if (!targetSection) return;
    navigateTo(targetSection);
  });
});


// ─── PROFILE FOOTER POPUP ─────────────────────────────────────────────────────
profileCard.addEventListener('click', e => {
  e.preventDefault();
  profilePopup.classList.toggle('hidden');
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  profilePopup.classList.add('hidden');
  window.location.href = 'logout.html';
});

document.getElementById('addAccountBtn').addEventListener('click', () => {
  profilePopup.classList.add('hidden');
  alert('Add account flow would open here.');
});

// ─── DARK MODE TOGGLE ──────────────────────────────────────────────────────────
function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  if (darkModeIcon) {
    darkModeIcon.classList.toggle('bi-moon', !isDark);
    darkModeIcon.classList.toggle('bi-sun', isDark);
  }
  document.querySelectorAll('.mobile-theme-toggle i').forEach(icon => {
    icon.classList.toggle('bi-moon', !isDark);
    icon.classList.toggle('bi-sun', isDark);
  });
}

function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  localStorage.setItem(THEME_KEY, nextTheme);
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'dark' || savedTheme === 'light') {
    applyTheme(savedTheme);
    return;
  }
  applyTheme('light');
}

if (darkModeToggle) {
  darkModeToggle.addEventListener('click', e => {
    e.preventDefault();
    toggleTheme();
  });
}

initTheme();

// ─── LOGGED-IN USER BINDING ───────────────────────────────────────────────────
function initLoggedInUser() {
  const session = window.auth?.getSession?.();
  if (!session?.isAuthenticated) return;

  const username = session.username || (session.email?.split('@')[0]) || 'user';
  const displayName = session.displayName || (username.charAt(0).toUpperCase() + username.slice(1));
  const handle = `@${username}`;
  const initial = displayName.charAt(0).toUpperCase();

  [sidebarAvatar, mobileTopbarAvatar, composerAvatar, profileBigAvatar].forEach(el => {
    if (el) el.textContent = initial;
  });
  if (sidebarProfileName) sidebarProfileName.textContent = displayName;
  if (sidebarProfileHandle) sidebarProfileHandle.textContent = handle;
  if (profileAtHandle) profileAtHandle.textContent = handle;
  if (profileHeaderName) profileHeaderName.textContent = displayName;
  if (profileDisplayName) {
    const badge = profileDisplayName.querySelector('.profile-verify-badge');
    profileDisplayName.textContent = displayName;
    if (badge) profileDisplayName.appendChild(badge);
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.textContent = `Log out ${handle}`;
}

initLoggedInUser();

// Close both popups on outside click
document.addEventListener('click', e => {
  if (!profileCard.contains(e.target) && !profilePopup.contains(e.target)) {
    profilePopup.classList.add('hidden');
  }
  if (morePopup && !morePopup.contains(e.target) && !moreSidebarItem?.contains(e.target)) {
    morePopup.classList.add('hidden');
  }
});