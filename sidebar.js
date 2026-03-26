// ═══════════════════════════════════════════════════════════════════════════════
//  SIDEBAR.JS — Navigation, Profile popup, More popup
// ═══════════════════════════════════════════════════════════════════════════════

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
    background: #fff; border: 1px solid #e6ecf0;
    border-radius: 16px; min-width: 280px;
    z-index: 600; box-shadow: 0 4px 24px rgba(0,0,0,0.12);
    overflow: hidden;
  }
  .profile-popup.hidden { display: none; }
  .profile-popup-item {
    padding: 16px 20px; color: #0f1419;
    font-size: 1rem; font-weight: 500;
    cursor: pointer; transition: background .15s;
  }
  .profile-popup-item:hover { background: #f7f9f9; }

  /* More popup */
  .more-popup {
    position: fixed; bottom: 128px; left: 88px;
    background: #fff; border: 1px solid #e6ecf0;
    border-radius: 16px; min-width: 280px;
    z-index: 600; box-shadow: 0 4px 24px rgba(0,0,0,0.12);
    overflow: hidden;
  }
  .more-popup.hidden { display: none; }
  .more-popup-item {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 20px; color: #0f1419;
    font-size: 1rem; font-weight: 500;
    cursor: pointer; transition: background .15s;
  }
  .more-popup-item i { font-size: 1.2rem; }
  .more-popup-item:hover { background: #f7f9f9; }
  .more-popup-divider { border-top: 1px solid #e6ecf0; }
`;
document.head.appendChild(sidebarStyles);


// ─── DOM REFS ─────────────────────────────────────────────────────────────────
const morePopup       = document.getElementById('morePopup');
const profilePopup    = document.getElementById('profilePopup');
const profileCard     = document.querySelector('.profile-card');
const moreSidebarItem = document.querySelector('.sidebar-link[data-section="more"]')?.closest('.sidebar-item');
const sidebarLinks    = document.querySelectorAll('.sidebar-link');
const contentSections = document.querySelectorAll('.content-section');


// ─── NAVIGATE TO SECTION (global helper used by other files) ──────────────────
function navigateTo(section) {
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active-nav'));
  const link = document.querySelector(`.sidebar-link[data-section="${section}"]`);
  if (link) {
    link.closest('.sidebar-item').classList.add('active-nav');
    updateSidebarIcons(section);
  }
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


// ─── PROFILE FOOTER POPUP ─────────────────────────────────────────────────────
profileCard.addEventListener('click', e => {
  e.preventDefault();
  profilePopup.classList.toggle('hidden');
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  profilePopup.classList.add('hidden');
  alert('Logged out of @LuthandoPrecio3');
});

document.getElementById('addAccountBtn').addEventListener('click', () => {
  profilePopup.classList.add('hidden');
  alert('Add account flow would open here.');
});

// Close both popups on outside click
document.addEventListener('click', e => {
  if (!profileCard.contains(e.target) && !profilePopup.contains(e.target)) {
    profilePopup.classList.add('hidden');
  }
  if (morePopup && !morePopup.contains(e.target) && !moreSidebarItem?.contains(e.target)) {
    morePopup.classList.add('hidden');
  }
});