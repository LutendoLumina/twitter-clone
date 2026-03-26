// ═══════════════════════════════════════════════════════════════════════════════
//  TWITTER CLONE — script.js
// ═══════════════════════════════════════════════════════════════════════════════

// ─── INJECT MODALS INTO DOM ────────────────────────────────────────────────────
document.body.insertAdjacentHTML('beforeend', `

  <!-- POST MODAL OVERLAY -->
  <div id="postModalOverlay" class="modal-overlay hidden">
    <div class="post-modal">
      <div class="post-modal-topbar">
        <button class="modal-close-btn" id="modalCloseBtn">
          <i class="bi bi-x-lg"></i>
        </button>
        <button class="modal-drafts-btn" id="modalDraftsBtn">Drafts</button>
      </div>
      <div class="post-modal-body">
        <div class="modal-avatar">L</div>
        <div class="modal-composer-right">
          <textarea id="modalTweetInput" placeholder="What's happening?" rows="4"></textarea>
          <div class="modal-everyone-reply">
            <i class="bi bi-globe2"></i>
            <span>Everyone can reply</span>
          </div>
        </div>
      </div>
      <div class="post-modal-footer">
        <div class="modal-icons">
          <i class="bi bi-image"></i>
          <i class="bi bi-filetype-gif"></i>
          <i class="bi bi-slash-circle"></i>
          <i class="bi bi-list-ul"></i>
          <i class="bi bi-emoji-smile"></i>
          <i class="bi bi-calendar-event"></i>
          <i class="bi bi-geo-alt"></i>
          <i class="bi bi-flag"></i>
        </div>
        <button class="modal-post-btn btn btn-secondary rounded-pill px-4 fw-bold" id="modalPostBtn" disabled>Post</button>
      </div>
    </div>
  </div>

  <!-- SAVE / DISCARD MODAL -->
  <div id="saveDiscardOverlay" class="modal-overlay hidden">
    <div class="save-discard-modal">
      <h3>Save post?</h3>
      <p>You can save this to send later from your drafts.</p>
      <button class="sd-btn sd-save" id="sdSaveBtn">Save</button>
      <button class="sd-btn sd-discard" id="sdDiscardBtn">Discard</button>
    </div>
  </div>

  <!-- DRAFTS PANEL -->
  <div id="draftsOverlay" class="modal-overlay hidden">
    <div class="drafts-panel">
      <div class="drafts-topbar">
        <button class="drafts-back-btn" id="draftsBackBtn">
          <i class="bi bi-arrow-left"></i>
        </button>
        <span class="drafts-title">Drafts</span>
      </div>
      <div class="drafts-tabs">
        <div class="drafts-tab active">Unsent posts</div>
        <div class="drafts-tab">Scheduled</div>
      </div>
      <div id="draftsList" class="drafts-list">
        <div class="drafts-empty" id="draftsEmpty">
          <h2>Hold that thought</h2>
          <p>Not ready to post just yet? Save it to your drafts or schedule it for later.</p>
        </div>
      </div>
    </div>
  </div>

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

// ─── INJECT MODAL STYLES ───────────────────────────────────────────────────────
const modalStyles = document.createElement('style');
modalStyles.textContent = `
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 1000;
    display: flex; align-items: flex-start; justify-content: center;
    padding-top: 48px;
  }
  .modal-overlay.hidden { display: none; }

  /* Post modal */
  .post-modal {
    background: #fff; color: #0f1419;
    border-radius: 16px;
    width: 600px; max-width: 95vw;
    padding: 0 0 12px;
    display: flex; flex-direction: column;
    box-shadow: 0 4px 24px rgba(0,0,0,0.15);
  }
  .post-modal-topbar {
    display: flex; align-items: center;
    justify-content: space-between;
    padding: 14px 18px 6px;
  }
  .modal-close-btn {
    background: none; border: none; color: #0f1419;
    font-size: 1.15rem; cursor: pointer; padding: 7px 9px;
    border-radius: 50%; transition: background .2s;
  }
  .modal-close-btn:hover { background: #e7e7e7; }
  .modal-drafts-btn {
    background: none; border: none;
    color: #1d9bf0; font-weight: 700; font-size: 1rem; cursor: pointer;
  }
  .modal-drafts-btn:hover { text-decoration: underline; }

  .post-modal-body {
    display: flex; gap: 12px;
    padding: 10px 18px 6px;
  }
  .modal-avatar {
    width: 42px; height: 42px; border-radius: 50%;
    background: #7cb342; color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 1.15rem; flex-shrink: 0;
  }
  .modal-composer-right { flex: 1; display: flex; flex-direction: column; gap: 10px; }
  .modal-composer-right textarea {
    background: transparent; border: none; outline: none;
    color: #0f1419; font-size: 1.25rem; resize: none;
    width: 100%; min-height: 100px;
    font-family: 'Inter', sans-serif;
  }
  .modal-composer-right textarea::placeholder { color: #536471; }
  .modal-everyone-reply {
    display: flex; align-items: center; gap: 6px;
    color: #1d9bf0; font-size: 0.92rem; font-weight: 600;
    padding-bottom: 12px;
    border-bottom: 1px solid #e6ecf0;
  }
  .post-modal-footer {
    display: flex; align-items: center;
    justify-content: space-between;
    padding: 12px 18px 4px;
  }
  .modal-icons { display: flex; gap: 16px; color: #1d9bf0; font-size: 1.15rem; }
  .modal-icons i { cursor: pointer; transition: opacity .15s; }
  .modal-icons i:hover { opacity: .7; }
  .modal-post-btn { font-size: 0.95rem !important; }
  .modal-post-btn:disabled { opacity: .45; cursor: not-allowed; }

  /* Save / Discard */
  .save-discard-modal {
    background: #fff; color: #0f1419;
    border-radius: 16px;
    width: 360px; max-width: 95vw;
    padding: 28px 24px 20px;
    display: flex; flex-direction: column; gap: 10px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.15);
  }
  .save-discard-modal h3 { font-size: 1.35rem; font-weight: 800; margin: 0; }
  .save-discard-modal p  { font-size: 0.95rem; color: #536471; margin: 0 0 8px; }
  .sd-btn {
    width: 100%; padding: 14px; border-radius: 999px;
    font-size: 1rem; font-weight: 700; cursor: pointer; border: none;
    transition: opacity .15s;
  }
  .sd-btn:hover { opacity: .85; }
  .sd-save    { background: #0f1419; color: #fff; }
  .sd-discard { background: transparent; color: #0f1419; border: 1px solid #cfd9de; }

  /* Drafts panel */
  .drafts-panel {
    background: #fff; color: #0f1419;
    border-radius: 16px;
    width: 600px; max-width: 95vw;
    min-height: 440px;
    display: flex; flex-direction: column;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.15);
  }
  .drafts-topbar {
    display: flex; align-items: center; gap: 20px;
    padding: 14px 18px;
  }
  .drafts-back-btn {
    background: none; border: none; color: #0f1419;
    font-size: 1.15rem; cursor: pointer; padding: 7px 9px;
    border-radius: 50%; transition: background .2s;
  }
  .drafts-back-btn:hover { background: #e7e7e7; }
  .drafts-title { font-size: 1.15rem; font-weight: 800; color: #0f1419; }
  .drafts-tabs {
    display: flex; border-bottom: 1px solid #e6ecf0;
  }
  .drafts-tab {
    flex: 1; text-align: center; padding: 14px 0;
    font-weight: 500; color: #536471; cursor: pointer;
    position: relative; transition: color .15s;
  }
  .drafts-tab.active { color: #0f1419; font-weight: 700; }
  .drafts-tab.active::after {
    content: ''; position: absolute; bottom: 0; left: 25%; width: 50%;
    height: 3px; background: #1d9bf0; border-radius: 4px;
  }
  .drafts-list { flex: 1; }
  .drafts-empty { padding: 48px 24px; }
  .drafts-empty h2 { font-size: 1.6rem; font-weight: 800; margin-bottom: 8px; color: #0f1419; }
  .drafts-empty p  { font-size: 0.95rem; color: #536471; margin: 0; }

  .draft-item {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: 16px 20px; border-bottom: 1px solid #e6ecf0;
    transition: background .15s; cursor: pointer;
  }
  .draft-item:hover { background: #f7f9f9; }
  .draft-item-text { font-size: 1rem; color: #0f1419; }
  .draft-item-meta { font-size: 0.82rem; color: #536471; margin-top: 4px; }
  .draft-delete-btn {
    background: none; border: 1px solid #cfd9de; color: #0f1419;
    border-radius: 999px; padding: 4px 14px; font-size: 0.82rem;
    cursor: pointer; transition: background .15s; flex-shrink: 0;
  }
  .draft-delete-btn:hover { background: #f7f9f9; }

  /* Profile popup */
  .profile-popup {
    position: fixed; bottom: 72px; left: 88px;
    background: #fff;
    border: 1px solid #e6ecf0;
    border-radius: 16px;
    min-width: 280px;
    z-index: 600;
    box-shadow: 0 4px 24px rgba(0,0,0,0.12);
    overflow: hidden;
  }
  .profile-popup.hidden { display: none; }
  .profile-popup-item {
    padding: 16px 20px;
    color: #0f1419; font-size: 1rem; font-weight: 500;
    cursor: pointer; transition: background .15s;
  }
  .profile-popup-item:hover { background: #f7f9f9; }

  /* More popup */
  .more-popup {
    position: fixed; bottom: 128px; left: 88px;
    background: #fff;
    border: 1px solid #e6ecf0;
    border-radius: 16px;
    min-width: 280px;
    z-index: 600;
    box-shadow: 0 4px 24px rgba(0,0,0,0.12);
    overflow: hidden;
  }
  .more-popup.hidden { display: none; }
  .more-popup-item {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 20px;
    color: #0f1419; font-size: 1rem; font-weight: 500;
    cursor: pointer; transition: background .15s;
  }
  .more-popup-item i { font-size: 1.2rem; }
  .more-popup-item:hover { background: #f7f9f9; }
  .more-popup-divider { border-top: 1px solid #e6ecf0; }
`;
document.head.appendChild(modalStyles);


// ─── STATE ─────────────────────────────────────────────────────────────────────
let drafts        = [];
let pendingAction = null; // 'close' | 'drafts'


// ─── DOM REFS ──────────────────────────────────────────────────────────────────
const postModalOverlay   = document.getElementById('postModalOverlay');
const modalCloseBtn      = document.getElementById('modalCloseBtn');
const modalDraftsBtn     = document.getElementById('modalDraftsBtn');
const modalTweetInput    = document.getElementById('modalTweetInput');
const modalPostBtn       = document.getElementById('modalPostBtn');

const saveDiscardOverlay = document.getElementById('saveDiscardOverlay');
const sdSaveBtn          = document.getElementById('sdSaveBtn');
const sdDiscardBtn       = document.getElementById('sdDiscardBtn');

const draftsOverlay      = document.getElementById('draftsOverlay');
const draftsBackBtn      = document.getElementById('draftsBackBtn');
const draftsList         = document.getElementById('draftsList');
const draftsEmpty        = document.getElementById('draftsEmpty');

const profilePopup       = document.getElementById('profilePopup');
const profileCard        = document.querySelector('.profile-card');
const morePopup          = document.getElementById('morePopup');
const moreSidebarItem    = document.querySelector('.sidebar-link[data-section="more"]')?.closest('.sidebar-item');


// ─── POST MODAL — OPEN / CLOSE ────────────────────────────────────────────────
document.querySelector('.post-button button').addEventListener('click', openPostModal);

function openPostModal() {
  postModalOverlay.classList.remove('hidden');
  setTimeout(() => modalTweetInput.focus(), 80);
}

function closePostModal() {
  postModalOverlay.classList.add('hidden');
  modalTweetInput.value = '';
  modalTweetInput.style.height = '';
  modalPostBtn.disabled = true;
  modalPostBtn.className = 'modal-post-btn btn btn-secondary rounded-pill px-4 fw-bold';
}

// ✕ button
modalCloseBtn.addEventListener('click', () => {
  if (modalTweetInput.value.trim()) {
    pendingAction = 'close';
    showSaveDiscard();
  } else {
    closePostModal();
  }
});

// Click backdrop
postModalOverlay.addEventListener('click', e => {
  if (e.target !== postModalOverlay) return;
  if (modalTweetInput.value.trim()) {
    pendingAction = 'close';
    showSaveDiscard();
  } else {
    closePostModal();
  }
});

// Drafts button
modalDraftsBtn.addEventListener('click', () => {
  if (modalTweetInput.value.trim()) {
    pendingAction = 'drafts';
    showSaveDiscard();
  } else {
    postModalOverlay.classList.add('hidden');
    openDraftsPanel();
  }
});

// Textarea reactive
modalTweetInput.addEventListener('input', function () {
  const hasText = this.value.trim().length > 0;
  modalPostBtn.disabled = !hasText;
  modalPostBtn.className = `modal-post-btn btn ${hasText ? 'btn-dark' : 'btn-secondary'} rounded-pill px-4 fw-bold`;
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
});

// Post from modal
modalPostBtn.addEventListener('click', () => {
  const text = modalTweetInput.value.trim();
  if (!text) return;
  document.querySelector('.tweet-feed').prepend(createTweetCard('Lumina', '@LuthandoPrecio3', 'L', text));
  closePostModal();
});


// ─── SAVE / DISCARD ────────────────────────────────────────────────────────────
function showSaveDiscard() {
  saveDiscardOverlay.classList.remove('hidden');
}
function hideSaveDiscard() {
  saveDiscardOverlay.classList.add('hidden');
}

sdSaveBtn.addEventListener('click', () => {
  saveDraft(modalTweetInput.value.trim());
  hideSaveDiscard();
  closePostModal();
  if (pendingAction === 'drafts') openDraftsPanel();
  pendingAction = null;
});

sdDiscardBtn.addEventListener('click', () => {
  hideSaveDiscard();
  closePostModal();
  pendingAction = null;
});

saveDiscardOverlay.addEventListener('click', e => {
  if (e.target === saveDiscardOverlay) hideSaveDiscard();
});


// ─── DRAFTS ────────────────────────────────────────────────────────────────────
function saveDraft(text) {
  drafts.unshift({ id: Date.now(), text, savedAt: new Date() });
}

function openDraftsPanel() {
  renderDrafts();
  draftsOverlay.classList.remove('hidden');
}

function closeDraftsPanel() {
  draftsOverlay.classList.add('hidden');
}

// ← back arrow → reopen post modal
draftsBackBtn.addEventListener('click', () => {
  closeDraftsPanel();
  openPostModal();
});

// Drafts tabs (Unsent / Scheduled)
document.querySelectorAll('.drafts-tab').forEach(tab => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.drafts-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});

draftsOverlay.addEventListener('click', e => {
  if (e.target === draftsOverlay) closeDraftsPanel();
});

function renderDrafts() {
  draftsList.querySelectorAll('.draft-item').forEach(el => el.remove());

  if (drafts.length === 0) {
    draftsEmpty.style.display = 'block';
    return;
  }
  draftsEmpty.style.display = 'none';

  drafts.forEach(draft => {
    const el = document.createElement('div');
    el.className = 'draft-item';
    el.innerHTML = `
      <div style="flex:1;min-width:0;">
        <div class="draft-item-text">${escapeHTML(draft.text)}</div>
        <div class="draft-item-meta">${formatDraftTime(draft.savedAt)}</div>
      </div>
      <button class="draft-delete-btn ms-3">Delete</button>
    `;

    // Click text → load back into modal
    el.querySelector('.draft-item-text').addEventListener('click', () => {
      modalTweetInput.value = draft.text;
      modalTweetInput.dispatchEvent(new Event('input'));
      drafts = drafts.filter(d => d.id !== draft.id);
      closeDraftsPanel();
      openPostModal();
    });

    // Delete
    el.querySelector('.draft-delete-btn').addEventListener('click', e => {
      e.stopPropagation();
      drafts = drafts.filter(d => d.id !== draft.id);
      el.remove();
      if (drafts.length === 0) draftsEmpty.style.display = 'block';
    });

    draftsList.appendChild(el);
  });
}

function formatDraftTime(date) {
  const diff = Math.floor((Date.now() - date) / 1000);
  if (diff < 60)    return 'Just now';
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString();
}


// ─── PROFILE FOOTER POPUP ─────────────────────────────────────────────────────
profileCard.addEventListener('click', e => {
  e.preventDefault();
  profilePopup.classList.toggle('hidden');
});

document.addEventListener('click', e => {
  if (!profileCard.contains(e.target) && !profilePopup.contains(e.target)) {
    profilePopup.classList.add('hidden');
  }
  // Close More popup when clicking outside it and outside its sidebar trigger
  if (morePopup && !morePopup.contains(e.target) && !moreSidebarItem?.contains(e.target)) {
    morePopup.classList.add('hidden');
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  profilePopup.classList.add('hidden');
  alert('Logged out of @LuthandoPrecio3');
});

document.getElementById('addAccountBtn').addEventListener('click', () => {
  profilePopup.classList.add('hidden');
  alert('Add account flow would open here.');
});


// ═══════════════════════════════════════════════════════════════════════════════
//  EXISTING FUNCTIONALITY
// ═══════════════════════════════════════════════════════════════════════════════

// ─── SIDEBAR NAVIGATION ───────────────────────────────────────────────────────
const sidebarLinks    = document.querySelectorAll('.sidebar-link');
const contentSections = document.querySelectorAll('.content-section');

sidebarLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetSection = this.dataset.section;

    // "More" opens a popup — never navigates
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


// ─── FEED TABS ────────────────────────────────────────────────────────────────
document.querySelectorAll('.feed-tabs .tab').forEach(tab => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.feed-tabs .tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});


// ─── INLINE COMPOSER ─────────────────────────────────────────────────────────
const inlineTweetInput = document.querySelector('.composer-input');
const inlineTweetBtn   = document.getElementById('tweetBtn');
const tweetFeed        = document.querySelector('.tweet-feed');

inlineTweetInput.addEventListener('input', function () {
  const hasText = this.value.trim().length > 0;
  inlineTweetBtn.disabled = !hasText;
  inlineTweetBtn.classList.toggle('btn-dark', hasText);
  inlineTweetBtn.classList.toggle('btn-secondary', !hasText);
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
});

inlineTweetBtn.addEventListener('click', () => {
  const text = inlineTweetInput.value.trim();
  if (!text) return;
  tweetFeed.prepend(createTweetCard('Lumina', '@LuthandoPrecio3', 'L', text));
  inlineTweetInput.value = '';
  inlineTweetInput.style.height = '';
  inlineTweetBtn.disabled = true;
  inlineTweetBtn.classList.replace('btn-dark', 'btn-secondary');
});

inlineTweetBtn.disabled = true;


// ─── TWEET CARD FACTORY ───────────────────────────────────────────────────────
function createTweetCard(name, handle, initial, text) {
  const card = document.createElement('div');
  card.className = 'tweet-card';
  card.innerHTML = `
    <div class="tweet-left">
      <div class="tweet-avatar d-flex align-items-center justify-content-center fw-bold"
           style="background:#7cb342;color:#fff;width:48px;height:48px;border-radius:50%;font-size:1.2rem;">
        ${initial}
      </div>
    </div>
    <div class="tweet-right">
      <div class="tweet-top-row">
        <div class="tweet-user-info">
          <span class="tweet-name">${name}</span>
          <span class="tweet-handle">${handle}</span>
          <span class="tweet-dot">·</span>
          <span class="tweet-time">Just now</span>
        </div>
        <div class="tweet-top-icons">
          <i class="bi bi-three-dots tweet-top-icon"></i>
        </div>
      </div>
      <div class="tweet-text">${escapeHTML(text)}</div>
      <div class="tweet-actions">
        <div class="tweet-action" data-action="reply">
          <i class="bi bi-chat"></i><span>0</span>
        </div>
        <div class="tweet-action" data-action="retweet">
          <i class="bi bi-repeat"></i><span>0</span>
        </div>
        <div class="tweet-action" data-action="like">
          <i class="bi bi-heart"></i><span>0</span>
        </div>
        <div class="tweet-action" data-action="views">
          <i class="bi bi-bar-chart"></i><span>1</span>
        </div>
        <div class="tweet-action-group-right">
          <i class="bi bi-bookmark tweet-top-icon" data-action="bookmark"></i>
          <i class="bi bi-box-arrow-up tweet-top-icon"></i>
        </div>
      </div>
    </div>
  `;
  wireUpTweetActions(card);
  return card;
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
}


// ─── TWEET ACTIONS ────────────────────────────────────────────────────────────
document.querySelectorAll('.tweet-card').forEach(wireUpTweetActions);

function wireUpTweetActions(card) {
  const likeAction = card.querySelector('[data-action="like"]');
  if (likeAction) {
    likeAction.addEventListener('click', function () {
      const icon  = this.querySelector('i');
      const count = this.querySelector('span');
      const liked = icon.classList.contains('bi-heart-fill');
      icon.classList.toggle('bi-heart', liked);
      icon.classList.toggle('bi-heart-fill', !liked);
      icon.style.color  = liked ? '' : '#f91880';
      this.style.color  = liked ? '' : '#f91880';
      count.textContent = formatCount(parseCount(count.textContent) + (liked ? -1 : 1));
    });
  }

  const retweetAction = card.querySelector('[data-action="retweet"]');
  if (retweetAction) {
    retweetAction.addEventListener('click', function () {
      const icon   = this.querySelector('i');
      const count  = this.querySelector('span');
      const active = this.classList.contains('retweeted');
      this.classList.toggle('retweeted', !active);
      icon.style.color  = active ? '' : '#00ba7c';
      this.style.color  = active ? '' : '#00ba7c';
      count.textContent = formatCount(parseCount(count.textContent) + (active ? -1 : 1));
    });
  }

  const bookmarkBtn = card.querySelector('[data-action="bookmark"]');
  if (bookmarkBtn) {
    bookmarkBtn.addEventListener('click', function () {
      const saved = this.classList.contains('bi-bookmark-fill');
      this.classList.toggle('bi-bookmark', saved);
      this.classList.toggle('bi-bookmark-fill', !saved);
      this.style.color = saved ? '' : '#1d9bf0';

      const feed  = document.getElementById('bookmarksFeed');
      const empty = document.getElementById('bookmarksEmpty');
      const tweetCard = this.closest('.tweet-card');

      if (!saved) {
        // Save: clone card into bookmarks feed
        const clone = tweetCard.cloneNode(true);
        clone.dataset.bookmarkId = tweetCard.dataset.bookmarkId || Date.now();
        tweetCard.dataset.bookmarkId = clone.dataset.bookmarkId;
        wireUpTweetActions(clone);
        // Sync the bookmark icon state on the clone
        const cloneBookmark = clone.querySelector('[data-action="bookmark"]');
        if (cloneBookmark) {
          cloneBookmark.classList.remove('bi-bookmark');
          cloneBookmark.classList.add('bi-bookmark-fill');
          cloneBookmark.style.color = '#1d9bf0';
        }
        feed.prepend(clone);
        if (empty) empty.style.display = 'none';
      } else {
        // Remove: find matching clone in bookmarks feed and remove it
        const id = tweetCard.dataset.bookmarkId;
        const existing = feed.querySelector(`[data-bookmark-id="${id}"]`);
        if (existing) existing.remove();
        if (feed.children.length === 0 && empty) empty.style.display = 'block';
        delete tweetCard.dataset.bookmarkId;
      }
    });
  }
}

function parseCount(str) {
  str = str.trim();
  if (str.endsWith('K')) return Math.round(parseFloat(str) * 1000);
  if (str.endsWith('M')) return Math.round(parseFloat(str) * 1_000_000);
  return parseInt(str) || 0;
}

function formatCount(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000)      return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}


// ─── FOLLOW BUTTONS (delegated — covers sidebar + follow page) ────────────────
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.follow-btn');
  if (!btn) return;
  const following = btn.textContent.trim() === 'Following';
  btn.textContent = following ? 'Follow' : 'Following';
  btn.style.backgroundColor = following ? '' : 'transparent';
  btn.style.color  = following ? '' : '#0f1419';
  btn.style.border = following ? '' : '1px solid #cfd9de';
});

// ─── navigateTo helper (used by Follow page back button) ──────────────────────
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


// ═══════════════════════════════════════════════════════════════════════════════
//  RIGHT SIDEBAR INTERACTIVITY
// ═══════════════════════════════════════════════════════════════════════════════

// ─── INJECT RIGHT-SIDEBAR STYLES ──────────────────────────────────────────────
const rsStyles = document.createElement('style');
rsStyles.textContent = `
  /* Search dropdown */
  .search-dropdown {
    position: absolute; top: 100%; left: 0; right: 0;
    background: #fff; border: 1px solid #e6ecf0;
    border-radius: 0 0 16px 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,.1);
    z-index: 200; padding: 14px 18px;
    color: #536471; font-size: 0.97rem;
  }
  .search-dropdown.hidden { display: none; }
  .search-box { position: relative; }
  .search-box input:focus {
    border-color: #1d9bf0 !important;
    border-radius: 999px 999px 0 0 !important;
  }

  /* News dismiss popup */
  .news-dismiss-popup {
    position: absolute; right: 0; top: 32px;
    background: #fff; border: 1px solid #e6ecf0;
    border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,.1);
    z-index: 300; min-width: 200px; overflow: hidden;
  }
  .news-dismiss-popup.hidden { display: none; }
  .news-dismiss-item {
    padding: 14px 18px; font-size: 0.97rem; color: #0f1419;
    cursor: pointer; transition: background .15s;
  }
  .news-dismiss-item:hover { background: #f7f9f9; }
  .card-header-row { position: relative; cursor: pointer; }

  /* Trend dots popup */
  .trend-dots-popup {
    position: absolute; right: 0; top: 28px;
    background: #fff; border: 1px solid #e6ecf0;
    border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,.1);
    z-index: 300; min-width: 260px; overflow: hidden;
  }
  .trend-dots-popup.hidden { display: none; }
  .trend-dots-item {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 18px; font-size: 0.97rem; color: #0f1419;
    cursor: pointer; transition: background .15s; font-weight: 500;
  }
  .trend-dots-item:hover { background: #f7f9f9; }
  .trend-dots-item i { color: #536471; font-size: 1.1rem; }
  .trend-item { position: relative; }
  .trend-item .bi-three-dots { cursor: pointer; }

  /* Explore page styles */
  .explore-header { padding: 0 !important; }
  .explore-search-row {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 16px 6px;
  }
  .explore-search-wrap {
    flex: 1; position: relative;
  }
  .explore-search-icon {
    position: absolute; left: 14px; top: 50%;
    transform: translateY(-50%); color: #536471;
  }
  .explore-search-input {
    width: 100%; height: 42px; border: 1px solid #cfd9de;
    border-radius: 999px; padding: 0 16px 0 40px;
    font-size: 1rem; outline: none; background: #eff3f4;
    transition: border-color .2s, background .2s;
  }
  .explore-search-input:focus {
    background: #fff; border-color: #1d9bf0;
  }
  .explore-settings-btn {
    background: none; border: none; font-size: 1.3rem;
    color: #1d9bf0; cursor: pointer; padding: 6px;
    border-radius: 50%; transition: background .2s;
  }
  .explore-settings-btn:hover { background: #e8f5fe; }
  .explore-tabs {
    display: flex; border-bottom: 1px solid #e6ecf0;
    overflow-x: auto; scrollbar-width: none;
  }
  .explore-tabs::-webkit-scrollbar { display: none; }
  .explore-tab {
    flex-shrink: 0; padding: 14px 18px;
    font-size: 0.95rem; font-weight: 500; color: #536471;
    cursor: pointer; position: relative; transition: color .15s;
    white-space: nowrap;
  }
  .explore-tab.active { color: #0f1419; font-weight: 700; }
  .explore-tab.active::after {
    content: ''; position: absolute; bottom: 0; left: 15%; width: 70%;
    height: 3px; background: #1d9bf0; border-radius: 4px;
  }
  .explore-promoted {
    background: #1d2226; color: #fff;
    border-bottom: 1px solid #e6ecf0;
    position: relative; min-height: 180px;
    display: flex; align-items: flex-end;
  }
  .explore-promoted-inner {
    width: 100%; padding: 16px;
    background: linear-gradient(to top, rgba(0,0,0,.8) 0%, transparent 100%);
  }
  .explore-promoted-dots {
    position: absolute; top: 12px; right: 12px;
    background: rgba(0,0,0,.6); border: none; color: #fff;
    width: 34px; height: 34px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 1rem;
  }
  .explore-promoted-tag { font-size: 1.35rem; font-weight: 800; }
  .explore-promoted-sub { font-size: 0.9rem; opacity: .85; margin: 2px 0 6px; }
  .explore-promoted-by { font-size: 0.8rem; opacity: .7; display: flex; align-items: center; gap: 6px; }
  .explore-section-title {
    font-size: 1.15rem; font-weight: 800; color: #0f1419;
    padding: 14px 16px 4px; border-top: 1px solid #e6ecf0;
  }
  .explore-news-item {
    padding: 12px 16px; border-bottom: 1px solid #e6ecf0;
    cursor: pointer; transition: background .15s;
  }
  .explore-news-item:hover { background: #f7f9f9; }
  .explore-news-item h4 {
    font-size: 0.97rem; font-weight: 600; margin-bottom: 6px; color: #0f1419;
  }
  .explore-trend-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 12px 16px; border-bottom: 1px solid #e6ecf0;
    cursor: pointer; transition: background .15s;
  }
  .explore-trend-item:hover { background: #f7f9f9; }
  .explore-trend-meta { font-size: 0.82rem; color: #536471; }
  .explore-trend-name { font-size: 1rem; font-weight: 700; color: #0f1419; margin: 2px 0; }
  .explore-trend-count { font-size: 0.82rem; color: #536471; }
  .explore-trend-dots {
    background: none; border: none; color: #536471;
    font-size: 1rem; cursor: pointer; padding: 6px;
    border-radius: 50%; transition: background .15s;
  }
  .explore-trend-dots:hover { background: #e8f5fe; color: #1d9bf0; }

  /* Follow page styles */
  .follow-page-header { padding: 0 !important; }
  .follow-header-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 16px;
  }
  .follow-header-row span { font-size: 1.15rem; font-weight: 800; }
  .follow-back-btn, .follow-settings-btn {
    background: none; border: none; font-size: 1.15rem;
    color: #0f1419; cursor: pointer; padding: 7px;
    border-radius: 50%; transition: background .2s;
  }
  .follow-back-btn:hover, .follow-settings-btn:hover { background: #e7e7e7; }
  .follow-settings-btn { color: #1d9bf0; }
  .follow-page-tabs {
    display: flex; border-bottom: 1px solid #e6ecf0;
  }
  .follow-page-tab {
    flex: 1; text-align: center; padding: 14px 0;
    font-weight: 500; color: #536471; cursor: pointer;
    position: relative; transition: color .15s;
  }
  .follow-page-tab.active { color: #0f1419; font-weight: 700; }
  .follow-page-tab.active::after {
    content: ''; position: absolute; bottom: 0; left: 20%; width: 60%;
    height: 3px; background: #1d9bf0; border-radius: 4px;
  }
  .follow-page-section-title {
    font-size: 1.05rem; font-weight: 800; color: #0f1419;
    padding: 14px 16px 6px;
  }
  .follow-page-item {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 12px 16px; border-bottom: 1px solid #e6ecf0;
    transition: background .15s;
  }
  .follow-page-item:hover { background: #f7f9f9; }
  .follow-page-avatar {
    width: 48px; height: 48px; border-radius: 50%; object-fit: cover; flex-shrink: 0;
  }
  .follow-page-info { flex: 1; min-width: 0; }
  .follow-page-name {
    font-weight: 700; font-size: 0.97rem; color: #0f1419;
    display: flex; align-items: center; gap: 4px; flex-wrap: wrap;
  }
  .follow-page-handle { color: #536471; font-size: 0.9rem; margin: 1px 0 4px; }
  .follow-page-bio { font-size: 0.9rem; color: #0f1419; }
  .follow-page-btn { flex-shrink: 0; align-self: center; }
`;
document.head.appendChild(rsStyles);


// ─── NEW PAGE STYLES ──────────────────────────────────────────────────────────
const pageStyles = document.createElement('style');
pageStyles.textContent = `
  .hidden { display: none !important; }

  /* ── Search dropdown ── */
  .search-box { position: relative; }
  .search-box input:focus { border-color: #1d9bf0 !important; outline: none; }
  .search-dropdown {
    position: absolute; top: calc(100% - 2px); left: 0; right: 0;
    background: #fff; border: 1px solid #e6ecf0; border-top: none;
    border-radius: 0 0 16px 16px;
    box-shadow: 0 6px 20px rgba(0,0,0,.1); z-index: 400;
    max-height: 400px; overflow-y: auto;
  }
  .search-recent-header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 14px 18px 6px; font-weight: 800; font-size: 1.05rem; color: #0f1419;
  }
  .search-clear-all {
    color: #1d9bf0; font-size: 0.9rem; font-weight: 500; cursor: pointer; background: none; border: none;
  }
  .search-clear-all:hover { text-decoration: underline; }
  .search-suggestion {
    display: flex; align-items: center; gap: 14px;
    padding: 10px 18px; cursor: pointer; transition: background .15s;
  }
  .search-suggestion:hover { background: #f7f9f9; }
  .search-suggestion-icon {
    width: 38px; height: 38px; border-radius: 50%;
    background: #eff3f4; display: flex; align-items: center; justify-content: center;
    color: #536471; font-size: 1rem; flex-shrink: 0;
  }
  .search-suggestion-icon img {
    width: 38px; height: 38px; border-radius: 50%; object-fit: cover;
  }
  .search-suggestion-name { font-weight: 700; font-size: 0.97rem; color: #0f1419; }
  .search-suggestion-sub  { font-size: 0.85rem; color: #536471; }
  .search-suggestion-remove {
    margin-left: auto; background: none; border: none;
    color: #536471; font-size: 1rem; cursor: pointer; padding: 4px 8px;
    border-radius: 50%; flex-shrink: 0; transition: background .15s;
  }
  .search-suggestion-remove:hover { background: #e7e7e7; }
  .search-empty-hint {
    padding: 16px 18px; color: #536471; font-size: 0.95rem;
  }

  /* ── Notifications ── */
  .notif-header { padding: 0 !important; }
  .notif-header-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 14px 20px 4px;
    font-size: 1.15rem; font-weight: 800;
  }
  .notif-settings-btn {
    background: none; border: none; font-size: 1.15rem;
    color: #1d9bf0; cursor: pointer; padding: 6px; border-radius: 50%;
    transition: background .2s;
  }
  .notif-settings-btn:hover { background: #e8f5fe; }
  .notif-tabs { display: flex; border-bottom: 1px solid #e6ecf0; }
  .notif-tab {
    flex: 1; text-align: center; padding: 14px 0;
    font-weight: 500; color: #536471; cursor: pointer;
    position: relative; transition: color .15s;
  }
  .notif-tab.active { color: #0f1419; font-weight: 700; }
  .notif-tab.active::after {
    content: ''; position: absolute; bottom: 0; left: 25%; width: 50%;
    height: 3px; background: #1d9bf0; border-radius: 4px;
  }
  .notif-empty {
    padding: 48px 32px;
  }
  .notif-empty h2 { font-size: 1.8rem; font-weight: 800; margin-bottom: 8px; }
  .notif-empty p  { color: #536471; font-size: 0.97rem; }

  /* ── Chat ── */
  .chat-welcome {
    display: flex; align-items: center; justify-content: center;
    min-height: 80vh;
  }
  .chat-welcome-content { max-width: 360px; padding: 24px; }
  .chat-welcome-content h2 { font-size: 1.8rem; font-weight: 800; margin-bottom: 24px; }
  .chat-feature {
    display: flex; gap: 16px; align-items: flex-start; margin-bottom: 20px;
  }
  .chat-feature > i { font-size: 1.4rem; color: #0f1419; flex-shrink: 0; margin-top: 2px; }
  .chat-feature-title { font-weight: 700; font-size: 0.97rem; margin-bottom: 3px; }
  .chat-feature-desc  { font-size: 0.9rem; color: #536471; }
  .chat-passcode-btn {
    display: block; width: 100%; margin-top: 28px;
    background: #0f1419; color: #fff; border: none;
    border-radius: 999px; padding: 14px; font-size: 1rem; font-weight: 700;
    cursor: pointer; transition: opacity .15s;
  }
  .chat-passcode-btn:hover { opacity: .85; }

  /* ── Grok ── */
  #grok.active-section { display: flex; flex-direction: column; min-height: 100vh; position: relative; }
  .grok-topbar {
    display: flex; justify-content: flex-end; gap: 12px;
    padding: 14px 20px; border-bottom: 1px solid #eff3f4;
  }
  .grok-topbar-btn {
    background: none; border: none; color: #536471; font-size: 0.9rem;
    cursor: pointer; display: flex; align-items: center; gap: 6px;
    padding: 6px 10px; border-radius: 999px; transition: background .15s;
  }
  .grok-topbar-btn:hover { background: #eff3f4; }
  .grok-body {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    justify-content: center; padding: 40px 24px; gap: 24px;
  }
  .grok-logo {
    display: flex; align-items: center; gap: 10px;
    font-size: 1.8rem; font-weight: 800;
  }
  .grok-input-wrap {
    width: 100%; max-width: 560px;
    display: flex; align-items: center; gap: 10px;
    border: 1.5px solid #cfd9de; border-radius: 999px;
    padding: 8px 14px; transition: border-color .2s;
  }
  .grok-input-wrap:focus-within { border-color: #1d9bf0; }
  .grok-attach-btn, .grok-mic-btn {
    background: none; border: none; color: #536471; font-size: 1.1rem;
    cursor: pointer; padding: 4px; flex-shrink: 0;
  }
  .grok-input {
    flex: 1; border: none; outline: none; font-size: 1rem;
    font-family: 'Inter', sans-serif; color: #0f1419;
  }
  .grok-input::placeholder { color: #536471; }
  .grok-input-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
  .grok-auto {
    font-size: 0.85rem; color: #536471; cursor: pointer;
    display: flex; align-items: center; gap: 3px;
  }
  .grok-mic-btn {
    background: #0f1419; color: #fff; border-radius: 50%;
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
  }
  .grok-chips { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
  .grok-chip {
    background: none; border: 1px solid #cfd9de; border-radius: 999px;
    padding: 8px 16px; font-size: 0.9rem; cursor: pointer; color: #0f1419;
    display: flex; align-items: center; gap: 6px; transition: background .15s;
  }
  .grok-chip:hover { background: #eff3f4; }
  .grok-explore-banner {
    position: sticky; bottom: 20px; margin: 0 20px 20px;
    background: #fff; border: 1px solid #e6ecf0; border-radius: 16px;
    padding: 14px 18px; display: flex; align-items: center;
    justify-content: space-between; box-shadow: 0 2px 12px rgba(0,0,0,.08);
  }
  .grok-explore-left { display: flex; align-items: center; gap: 12px; }
  .grok-explore-title { font-weight: 700; font-size: 0.97rem; }
  .grok-explore-sub   { font-size: 0.82rem; color: #536471; }
  .grok-explore-btn {
    background: #0f1419; color: #fff; border: none;
    border-radius: 999px; padding: 8px 18px; font-weight: 700; cursor: pointer;
    transition: opacity .15s;
  }
  .grok-explore-btn:hover { opacity: .85; }

  /* ── Bookmarks ── */
  .bookmarks-header { padding: 0 !important; }
  .bookmarks-header-row {
    display: flex; align-items: center; gap: 14px; padding: 12px 16px 8px;
  }
  .bookmarks-header-row span { font-size: 1.15rem; font-weight: 800; flex: 1; }
  .bookmarks-search-wrap {
    display: flex; align-items: center; gap: 10px;
    margin: 8px 16px 12px;
    background: #eff3f4; border-radius: 999px; padding: 8px 16px;
  }
  .bookmarks-search-wrap i { color: #536471; }
  .bookmarks-search-input {
    border: none; background: transparent; outline: none;
    font-size: 1rem; color: #0f1419; flex: 1;
  }
  .bookmarks-search-input::placeholder { color: #536471; }
  .bookmarks-empty { padding: 48px 24px; }
  .bookmarks-empty h2 { font-size: 1.8rem; font-weight: 800; margin-bottom: 8px; }
  .bookmarks-empty p  { color: #536471; font-size: 0.97rem; max-width: 280px; }

  /* ── Profile ── */
  .profile-header { padding: 0 !important; }
  .profile-header-row {
    display: flex; align-items: center; gap: 14px; padding: 12px 16px;
  }
  .profile-banner {
    width: 100%; height: 130px; background: #cfd9de;
  }
  .profile-info-section { padding: 12px 16px 0; }
  .profile-avatar-row {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-top: -48px; margin-bottom: 10px;
  }
  .profile-big-avatar {
    width: 80px; height: 80px; border-radius: 50%;
    background: #7cb342; color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 2.2rem; font-weight: 700;
    border: 4px solid #fff;
  }
  .profile-edit-btn {
    background: none; border: 1.5px solid #cfd9de; border-radius: 999px;
    padding: 7px 16px; font-weight: 700; font-size: 0.92rem; cursor: pointer;
    transition: background .15s; margin-top: 8px;
  }
  .profile-edit-btn:hover { background: #eff3f4; }
  .profile-name-block { padding-bottom: 12px; }
  .profile-display-name {
    font-size: 1.15rem; font-weight: 800; color: #0f1419;
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  }
  .profile-verify-badge {
    background: none; border: 1px solid #cfd9de; border-radius: 999px;
    padding: 3px 10px; font-size: 0.82rem; cursor: pointer; color: #0f1419;
    display: flex; align-items: center; gap: 4px;
  }
  .profile-at-handle { color: #536471; font-size: 0.95rem; margin: 2px 0 8px; }
  .profile-joined { color: #536471; font-size: 0.9rem; margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
  .profile-stats { display: flex; gap: 16px; font-size: 0.92rem; color: #536471; }
  .profile-stats span strong { color: #0f1419; }
  .profile-content-tabs {
    display: flex; border-bottom: 1px solid #e6ecf0; overflow-x: auto; scrollbar-width: none;
  }
  .profile-content-tabs::-webkit-scrollbar { display: none; }
  .profile-tab {
    flex-shrink: 0; padding: 14px 18px;
    font-size: 0.92rem; font-weight: 500; color: #536471;
    cursor: pointer; position: relative; transition: color .15s;
  }
  .profile-tab.active { color: #0f1419; font-weight: 700; }
  .profile-tab.active::after {
    content: ''; position: absolute; bottom: 0; left: 10%; width: 80%;
    height: 3px; background: #1d9bf0; border-radius: 4px;
  }
  .profile-empty { padding: 48px 24px; }
  .profile-empty h3 { font-size: 1.5rem; font-weight: 800; margin-bottom: 6px; }
  .profile-empty p  { color: #536471; }

  /* ── More ── */
  .more-list { padding: 8px 0; }
  .more-item {
    display: flex; align-items: center; gap: 16px;
    padding: 14px 24px; font-size: 1.05rem; font-weight: 500;
    cursor: pointer; transition: background .15s; color: #0f1419;
  }
  .more-item i { font-size: 1.25rem; color: #536471; }
  .more-item:hover { background: #f7f9f9; }
  .more-item-divider { border-top: 1px solid #e6ecf0; margin-top: 6px; padding-top: 18px; }
`;
document.head.appendChild(pageStyles);


// ─── FULL SEARCH WITH RECENTS + AUTOCOMPLETE ──────────────────────────────────
const searchBox   = document.querySelector('.search-box');
const searchInput = searchBox.querySelector('input');

// Seed data — people & keyword suggestions
const SEARCH_PEOPLE = [
  { name: 'Disney D23',      handle: '@DisneyD23',       verified: true,  gold: true },
  { name: 'TEMS',            handle: '@temsbaby',        verified: true  },
  { name: 'ErykahBadoula',   handle: '@fatbellybella',   verified: true  },
  { name: 'Temi Ajibade',    handle: '@TemiOtedola',     verified: true  },
  { name: 'THOMAS OLIVEIRA', handle: '@Temperrr',        verified: true  },
  { name: 'tempo.co',        handle: '@tempodotco',      verified: true  },
  { name: 'TemptressXclusive',handle: '@temptress119',   verified: false },
  { name: 'Taylor Swift',    handle: '@taylorswift13',   verified: true  },
  { name: 'Lil Baby',        handle: '@whamcbfw4',       verified: true  },
  { name: 'Carter Efe',      handle: '@carter_efe',      verified: true  },
  { name: 'Ayra Starr',      handle: '@ayrastarr',       verified: true  },
  { name: 'Amanda du-Pont',  handle: '@AmandaDupont',    verified: true  },
];

const KEYWORD_SUGGESTIONS = [
  'temblor', 'temblor valencia', 'temblo', 'trending SA', 'taylor swift',
  'south africa', 'soccer', 'amapiano', 'load shedding', 'eskom',
];

// Recent searches stored in memory
let recentSearches = [
  { type: 'person', name: 'Disney D23',    handle: '@DisneyD23',    verified: true, gold: true },
  { type: 'person', name: 'TEMS',          handle: '@temsbaby',     verified: true },
  { type: 'person', name: 'ErykahBadoula', handle: '@fatbellybella',verified: true },
];

const searchDropdown = document.createElement('div');
searchDropdown.className = 'search-dropdown hidden';
searchBox.appendChild(searchDropdown);

function renderSearchDropdown(query) {
  searchDropdown.innerHTML = '';
  const q = query.trim().toLowerCase();

  if (!q) {
    // Show recents
    if (recentSearches.length === 0) {
      searchDropdown.innerHTML = '<div class="search-empty-hint">Try searching for people, lists, or keywords</div>';
      return;
    }
    const header = document.createElement('div');
    header.className = 'search-recent-header';
    header.innerHTML = `<span>Recent</span><button class="search-clear-all">Clear all</button>`;
    header.querySelector('.search-clear-all').addEventListener('click', e => {
      e.stopPropagation();
      recentSearches = [];
      renderSearchDropdown('');
    });
    searchDropdown.appendChild(header);

    recentSearches.forEach((r, idx) => {
      const el = buildSuggestionEl(r, true, idx);
      searchDropdown.appendChild(el);
    });
    return;
  }

  // Keyword suggestions
  const kwMatches = KEYWORD_SUGGESTIONS.filter(k => k.startsWith(q)).slice(0, 3);
  kwMatches.forEach(kw => {
    const el = document.createElement('div');
    el.className = 'search-suggestion';
    el.innerHTML = `
      <div class="search-suggestion-icon"><i class="bi bi-search"></i></div>
      <div>
        <div class="search-suggestion-name">${boldMatch(kw, q)}</div>
      </div>`;
    el.addEventListener('click', () => handleSearch(kw));
    searchDropdown.appendChild(el);
  });

  // People matches
  const peopleMatches = SEARCH_PEOPLE.filter(p =>
    p.name.toLowerCase().includes(q) || p.handle.toLowerCase().includes(q)
  ).slice(0, 5);

  peopleMatches.forEach(p => {
    const el = buildSuggestionEl({ type: 'person', ...p }, false, -1);
    searchDropdown.appendChild(el);
  });

  if (kwMatches.length === 0 && peopleMatches.length === 0) {
    searchDropdown.innerHTML = `<div class="search-empty-hint">No results for "<strong>${escapeHTML(query)}</strong>"</div>`;
  }
}

function buildSuggestionEl(r, showRemove, idx) {
  const el = document.createElement('div');
  el.className = 'search-suggestion';
  const badge = r.verified
    ? `<i class="bi bi-patch-check-fill" style="color:${r.gold ? '#f4a926' : '#1d9bf0'};font-size:.85rem"></i>`
    : '';
  el.innerHTML = `
    <div class="search-suggestion-icon"><i class="bi bi-person"></i></div>
    <div style="flex:1;min-width:0">
      <div class="search-suggestion-name">${r.name} ${badge}</div>
      <div class="search-suggestion-sub">${r.handle}</div>
    </div>
    ${showRemove ? `<button class="search-suggestion-remove" data-idx="${idx}"><i class="bi bi-x-lg"></i></button>` : ''}
  `;
  if (showRemove) {
    el.querySelector('.search-suggestion-remove').addEventListener('click', e => {
      e.stopPropagation();
      recentSearches.splice(idx, 1);
      renderSearchDropdown('');
    });
  }
  el.addEventListener('click', e => {
    if (e.target.closest('.search-suggestion-remove')) return;
    handleSearch(r.name);
  });
  return el;
}

function boldMatch(text, query) {
  const i = text.toLowerCase().indexOf(query);
  if (i < 0) return text;
  return text.slice(0, i) + '<strong>' + text.slice(i, i + query.length) + '</strong>' + text.slice(i + query.length);
}

function handleSearch(term) {
  searchInput.value = term;
  searchDropdown.classList.add('hidden');
  // Add to recents (avoid dupes)
  const existing = recentSearches.find(r => r.name.toLowerCase() === term.toLowerCase());
  if (!existing) {
    const person = SEARCH_PEOPLE.find(p => p.name.toLowerCase() === term.toLowerCase());
    if (person) recentSearches.unshift({ type: 'person', ...person });
    else recentSearches.unshift({ type: 'keyword', name: term, handle: '' });
    if (recentSearches.length > 5) recentSearches.pop();
  }
}

searchInput.addEventListener('focus', () => {
  renderSearchDropdown(searchInput.value);
  searchDropdown.classList.remove('hidden');
});
searchInput.addEventListener('input', () => {
  renderSearchDropdown(searchInput.value);
  searchDropdown.classList.remove('hidden');
});
searchInput.addEventListener('blur', () => {
  setTimeout(() => searchDropdown.classList.add('hidden'), 180);
});
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') { searchDropdown.classList.add('hidden'); searchInput.blur(); }
});


// ─── NOTIFICATIONS TABS ───────────────────────────────────────────────────────
document.querySelectorAll('.notif-tab').forEach(tab => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.notif-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    const which = this.dataset.notif;
    document.getElementById('notifAllEmpty').classList.toggle('hidden', which !== 'all');
    document.getElementById('notifMentionsEmpty').classList.toggle('hidden', which !== 'mentions');
  });
});


// ─── PROFILE TABS ─────────────────────────────────────────────────────────────
document.querySelectorAll('.profile-tab').forEach(tab => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});


// ─── TODAY'S NEWS — ✕ DISMISS POPUP ──────────────────────────────────────────
const newsCardX    = document.querySelector('.card-header-row .bi-x-lg');
const newsCardRow  = newsCardX?.closest('.card-header-row');
const newsCard     = newsCardX?.closest('.sidebar-card');

if (newsCardRow) {
  const dismissPopup = document.createElement('div');
  dismissPopup.className = 'news-dismiss-popup hidden';
  dismissPopup.innerHTML = `
    <div class="news-dismiss-item">Dismiss for a day</div>
    <div class="news-dismiss-item">Dismiss for a week</div>
    <div class="news-dismiss-item">Not interested</div>
  `;
  newsCardRow.appendChild(dismissPopup);

  newsCardX.addEventListener('click', e => {
    e.stopPropagation();
    dismissPopup.classList.toggle('hidden');
  });

  dismissPopup.querySelectorAll('.news-dismiss-item').forEach(item => {
    item.addEventListener('click', () => {
      newsCard.style.display = 'none';
      dismissPopup.classList.add('hidden');
    });
  });

  document.addEventListener('click', e => {
    if (!newsCardRow.contains(e.target)) dismissPopup.classList.add('hidden');
  });
}


// ─── TREND ITEM — THREE-DOTS POPUP ────────────────────────────────────────────
const TREND_OPTIONS = [
  { icon: 'bi-emoji-frown', label: 'The associated content is not relevant' },
  { icon: 'bi-emoji-frown', label: 'This trend is spam' },
  { icon: 'bi-emoji-frown', label: 'This trend is abusive or harmful' },
  { icon: 'bi-emoji-frown', label: 'Not interested in this' },
  { icon: 'bi-emoji-frown', label: 'This trend is a duplicate' },
  { icon: 'bi-emoji-frown', label: 'This trend is harmful or spammy' },
];

let activeTrendPopup = null;

document.querySelectorAll('.trend-item .bi-three-dots').forEach(dotsIcon => {
  const trendItem = dotsIcon.closest('.trend-item');

  const popup = document.createElement('div');
  popup.className = 'trend-dots-popup hidden';
  popup.innerHTML = TREND_OPTIONS.map(o =>
    `<div class="trend-dots-item"><i class="bi ${o.icon}"></i>${o.label}</div>`
  ).join('') + `<div class="trend-dots-item" style="font-weight:700;border-top:1px solid #e6ecf0;">Don't want to see this ad</div>`;

  trendItem.appendChild(popup);

  dotsIcon.addEventListener('click', e => {
    e.stopPropagation();
    // close any other open popup
    if (activeTrendPopup && activeTrendPopup !== popup) activeTrendPopup.classList.add('hidden');
    popup.classList.toggle('hidden');
    activeTrendPopup = popup.classList.contains('hidden') ? null : popup;
  });

  popup.querySelectorAll('.trend-dots-item').forEach(item => {
    item.addEventListener('click', () => {
      popup.classList.add('hidden');
      activeTrendPopup = null;
    });
  });
});

document.addEventListener('click', () => {
  if (activeTrendPopup) {
    activeTrendPopup.classList.add('hidden');
    activeTrendPopup = null;
  }
});


// ─── WHAT'S HAPPENING — SHOW MORE → EXPLORE ───────────────────────────────────
const happeningsCard = document.querySelector('.happenings-card');
if (happeningsCard) {
  const showMoreLink = happeningsCard.querySelector('.show-more-link');
  if (showMoreLink) {
    showMoreLink.addEventListener('click', e => {
      e.preventDefault();
      navigateTo('explore');
    });
  }
}


// ─── WHO TO FOLLOW — SHOW MORE → FOLLOW ───────────────────────────────────────
const followCard = document.querySelector('.follow-card');
if (followCard) {
  const showMoreLink = followCard.querySelector('.show-more-link');
  if (showMoreLink) {
    showMoreLink.addEventListener('click', e => {
      e.preventDefault();
      navigateTo('follow');
    });
  }
}


// ─── EXPLORE PAGE TABS ────────────────────────────────────────────────────────
document.querySelectorAll('.explore-tab').forEach(tab => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.explore-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});


// ─── FOLLOW PAGE TABS ─────────────────────────────────────────────────────────
document.querySelectorAll('.follow-page-tab').forEach(tab => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.follow-page-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});


// ─── SHOW POSTS BANNER ────────────────────────────────────────────────────────
const showPostsBanner = document.querySelector('.show-posts');
if (showPostsBanner) {
  showPostsBanner.addEventListener('click', e => {
    e.preventDefault();
    showPostsBanner.style.display = 'none';
  });
}