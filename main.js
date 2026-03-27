// ─── INJECT MODAL HTML ────────────────────────────────────────────────────────
document.body.insertAdjacentHTML(
  "beforeend",
  `

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
          <div id="modalImagePreview" class="composer-image-preview d-none"></div>
          <input id="modalImageInput" type="file" accept="image/*" class="d-none">
          <div class="modal-everyone-reply">
            <i class="bi bi-globe2"></i>
            <span>Everyone can reply</span>
          </div>
        </div>
      </div>
      <div class="post-modal-footer">
        <div class="modal-icons">
          <button id="modalImageTrigger" type="button" class="modal-icon-btn" aria-label="Add image">
            <i class="bi bi-image" title="Add image"></i>
          </button>
          <i class="bi bi-filetype-gif" title="Add GIF"></i>
          <img src="assets/icons/grok.svg" alt="Grok" class="modal-grok-icon" width="20" height="20" title="Grok">
          <i class="bi bi-list-ul" title="Poll"></i>
          <i class="bi bi-emoji-smile" title="Emoji"></i>
          <i class="bi bi-calendar-event" title="Schedule"></i>
          <i class="bi bi-geo-alt" title="Location"></i>
          <i class="bi bi-flag" title="Safety"></i>
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

`,
);

// ─── MODAL STYLES ─────────────────────────────────────────────────────────────
const mainStyles = document.createElement("style");
mainStyles.textContent = `
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
    display: flex; align-items: flex-start; justify-content: center;
    padding-top: 48px;
  }
  .modal-overlay.hidden { display: none; }

  /* Post modal */
  .post-modal {
    background: var(--bg-primary); color: var(--text-primary);
    border-radius: 16px; width: 600px; max-width: 95vw;
    padding: 0 0 12px; display: flex; flex-direction: column;
    box-shadow: 0 4px 24px rgba(0,0,0,0.3);
  }
  .post-modal-topbar {
    display: flex; align-items: center;
    justify-content: space-between; padding: 14px 18px 6px;
  }
  .modal-close-btn {
    background: none; border: none; color: var(--text-primary);
    font-size: 1.15rem; cursor: pointer; padding: 7px 9px;
    border-radius: 50%; transition: background .2s;
  }
  .modal-close-btn:hover { background: var(--bg-hover); }
  .modal-drafts-btn {
    background: none; border: none;
    color: var(--blue); font-weight: 700; font-size: 1rem; cursor: pointer;
  }
  .modal-drafts-btn:hover { text-decoration: underline; }
  .post-modal-body { display: flex; gap: 12px; padding: 10px 18px 6px; }
  .modal-avatar {
    width: 42px; height: 42px; border-radius: 50%;
    background: var(--green-avatar); color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 1.15rem; flex-shrink: 0;
  }
  .modal-composer-right { flex: 1; display: flex; flex-direction: column; gap: 10px; }
  .modal-composer-right textarea {
    background: transparent; border: none; outline: none;
    color: var(--text-primary); font-size: 1.25rem; resize: none;
    width: 100%; min-height: 100px; font-family: 'Roboto', sans-serif;
  }
  .modal-composer-right textarea::placeholder { color: var(--text-secondary); }
  .modal-everyone-reply {
    display: flex; align-items: center; gap: 6px;
    color: var(--blue); font-size: 0.92rem; font-weight: 600;
    padding-bottom: 12px; border-bottom: 1px solid var(--border-color);
  }
  .post-modal-footer {
    display: flex; align-items: center;
    justify-content: space-between; padding: 12px 18px 4px;
    border-top: 1px solid var(--border-color);
  }
  .modal-icons { display: flex; gap: 16px; color: var(--blue); font-size: 1.15rem; }
  .modal-icons i, .modal-icons img, .modal-icon-btn { cursor: pointer; transition: filter .15s, transform .15s, opacity .15s; }
  .modal-icons i:hover, .modal-icons img:hover, .modal-icon-btn:hover { filter: brightness(1.2); transform: translateY(-1px); opacity: 1; }
  .modal-icon-btn {
    border: none; background: none; color: var(--blue);
    padding: 0; line-height: 1; display: inline-flex;
    align-items: center; justify-content: center;
    cursor: pointer;
  }
  .modal-post-btn { font-size: 0.95rem !important; }
  .modal-post-btn:disabled { opacity: .45; cursor: not-allowed; }

  /* Save / Discard */
  .save-discard-modal {
    background: var(--bg-primary); color: var(--text-primary); border-radius: 16px;
    width: 360px; max-width: 95vw; padding: 28px 24px 20px;
    display: flex; flex-direction: column; gap: 10px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.3);
  }
  .save-discard-modal h3 { font-size: 1.35rem; font-weight: 800; margin: 0; color: var(--text-primary); }
  .save-discard-modal p  { font-size: 0.95rem; color: var(--text-secondary); margin: 0 0 8px; }
  .sd-btn {
    width: 100%; padding: 14px; border-radius: 999px;
    font-size: 1rem; font-weight: 700; cursor: pointer; border: none;
    transition: opacity .15s;
  }
  .sd-btn:hover { opacity: .85; }
  .sd-save    { background: var(--text-primary); color: var(--bg-primary); }
  .sd-discard { background: transparent; color: var(--text-primary); border: 1px solid var(--border-color); }

  /* Drafts panel */
  .drafts-panel {
    background: var(--bg-primary); color: var(--text-primary); border-radius: 16px;
    width: 600px; max-width: 95vw; min-height: 440px;
    display: flex; flex-direction: column; overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.3);
  }
  .drafts-topbar { display: flex; align-items: center; gap: 20px; padding: 14px 18px; border-bottom: 1px solid var(--border-color); }
  .drafts-back-btn {
    background: none; border: none; color: var(--text-primary);
    font-size: 1.15rem; cursor: pointer; padding: 7px 9px;
    border-radius: 50%; transition: background .2s;
  }
  .drafts-back-btn:hover { background: var(--bg-hover); }
  .drafts-title { font-size: 1.15rem; font-weight: 800; color: var(--text-primary); }
  .drafts-tabs { display: flex; border-bottom: 1px solid var(--border-color); }
  .drafts-tab {
    flex: 1; text-align: center; padding: 14px 0;
    font-weight: 500; color: var(--text-secondary); cursor: pointer;
    position: relative; transition: color .15s;
  }
  .drafts-tab.active { color: var(--text-primary); font-weight: 700; }
  .drafts-tab.active::after {
    content: ''; position: absolute; bottom: 0; left: 25%; width: 50%;
    height: 3px; background: var(--blue); border-radius: 4px;
  }
  .drafts-list { flex: 1; }
  .drafts-empty { padding: 48px 24px; }
  .drafts-empty h2 { font-size: 1.6rem; font-weight: 800; margin-bottom: 8px; color: var(--text-primary); }
  .drafts-empty p  { font-size: 0.95rem; color: var(--text-secondary); margin: 0; }
  .draft-item {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: 16px 20px; border-bottom: 1px solid var(--border-color);
    transition: background .15s; cursor: pointer;
  }
  .draft-item:hover { background: var(--bg-secondary); }
  .draft-item-text { font-size: 1rem; color: var(--text-primary); }
  .draft-item-meta { font-size: 0.82rem; color: var(--text-secondary); margin-top: 4px; }
  .draft-delete-btn {
    background: none; border: 1px solid var(--border-color); color: var(--text-primary);
    border-radius: 999px; padding: 4px 14px; font-size: 0.82rem;
    cursor: pointer; transition: background .15s; flex-shrink: 0;
  }
  .draft-delete-btn:hover { background: var(--bg-secondary); }

  /* Page styles injected by main.js */
  .notif-header { padding: 0 !important; }
  .notif-header-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 14px 20px 4px; font-size: 1.15rem; font-weight: 800; color: var(--text-primary);
  }
  .notif-settings-btn {
    background: none; border: none; font-size: 1.15rem;
    color: var(--blue); cursor: pointer; padding: 6px; border-radius: 50%;
    transition: background .2s;
  }
  .notif-settings-btn:hover { background: var(--bg-hover); }
  .notif-tabs { display: flex; border-bottom: 1px solid var(--border-color); }
  .notif-tab {
    flex: 1; text-align: center; padding: 14px 0;
    font-weight: 500; color: var(--text-secondary); cursor: pointer;
    position: relative; transition: color .15s;
  }
  .notif-tab.active { color: var(--text-primary); font-weight: 700; }
  .notif-tab.active::after {
    content: ''; position: absolute; bottom: 0; left: 25%; width: 50%;
    height: 3px; background: var(--blue); border-radius: 4px;
  }
  .notif-empty { padding: 48px 32px; }
  .notif-empty h2 { font-size: 1.8rem; font-weight: 800; margin-bottom: 8px; color: var(--text-primary); }
  .notif-empty p  { color: var(--text-secondary); font-size: 0.97rem; }

  .profile-content-tabs {
    display: flex; border-bottom: 1px solid var(--border-color);
    overflow-x: auto; scrollbar-width: none;
  }
  .profile-content-tabs::-webkit-scrollbar { display: none; }
  .profile-tab {
    flex-shrink: 0; padding: 14px 18px;
    font-size: 0.92rem; font-weight: 500; color: var(--text-secondary);
    cursor: pointer; position: relative; transition: color .15s;
  }
  .profile-tab.active { color: var(--text-primary); font-weight: 700; }
  .profile-tab.active::after {
    content: ''; position: absolute; bottom: 0; left: 10%; width: 80%;
    height: 3px; background: var(--blue); border-radius: 4px;
  }
`;
document.head.appendChild(mainStyles);

// ─── STATE ────────────────────────────────────────────────────────────────────
let drafts = [];
let pendingAction = null;

function getLoggedInUser() {
  const session = window.auth?.getSession?.() || null;
  const username =
    session?.username || session?.email?.split("@")[0] || "lumina";
  const displayName =
    session?.displayName ||
    username.charAt(0).toUpperCase() + username.slice(1);
  return {
    displayName,
    handle: `@${username}`,
    initial: displayName.charAt(0).toUpperCase(),
  };
}

// ─── DOM REFS ─────────────────────────────────────────────────────────────────
const postModalOverlay = document.getElementById("postModalOverlay");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalDraftsBtn = document.getElementById("modalDraftsBtn");
const modalTweetInput = document.getElementById("modalTweetInput");
const modalPostBtn = document.getElementById("modalPostBtn");
const modalImageTrigger = document.getElementById("modalImageTrigger");
const modalImageInput = document.getElementById("modalImageInput");
const modalImagePreview = document.getElementById("modalImagePreview");
const saveDiscardOverlay = document.getElementById("saveDiscardOverlay");
const sdSaveBtn = document.getElementById("sdSaveBtn");
const sdDiscardBtn = document.getElementById("sdDiscardBtn");
const draftsOverlay = document.getElementById("draftsOverlay");
const draftsBackBtn = document.getElementById("draftsBackBtn");
const draftsList = document.getElementById("draftsList");
const draftsEmpty = document.getElementById("draftsEmpty");
const mobileComposeBtn = document.getElementById("mobileComposeBtn");
let modalSelectedImage = "";

// ─── POST MODAL ───────────────────────────────────────────────────────────────
document
  .querySelector(".post-button button")
  .addEventListener("click", openPostModal);
mobileComposeBtn?.addEventListener("click", openPostModal);

function openPostModal() {
  const user = getLoggedInUser();
  const modalAvatar = document.querySelector(".modal-avatar");
  if (modalAvatar) modalAvatar.textContent = user.initial;
  postModalOverlay.classList.remove("hidden");
  setTimeout(() => modalTweetInput.focus(), 80);
}

function updateModalPostButtonState() {
  const hasText = modalTweetInput.value.trim().length > 0;
  const hasImage = Boolean(modalSelectedImage);
  const canPost = hasText || hasImage;
  modalPostBtn.disabled = !canPost;
  modalPostBtn.className = `modal-post-btn btn ${canPost ? "btn-dark" : "btn-secondary"} rounded-pill px-4 fw-bold`;
}

function renderModalImagePreview(imageUrl) {
  if (!modalImagePreview) return;
  if (!imageUrl) {
    modalImagePreview.innerHTML = "";
    modalImagePreview.classList.add("d-none");
    return;
  }

  modalImagePreview.classList.remove("d-none");
  modalImagePreview.innerHTML = `
    <img src="${imageUrl}" alt="Selected image preview">
    <button type="button" class="composer-remove-image-btn" aria-label="Remove selected image">
      <i class="bi bi-x-lg"></i>
    </button>
  `;

  modalImagePreview
    .querySelector(".composer-remove-image-btn")
    ?.addEventListener("click", () => {
      modalSelectedImage = "";
      if (modalImageInput) modalImageInput.value = "";
      renderModalImagePreview("");
      updateModalPostButtonState();
    });
}

function closePostModal() {
  postModalOverlay.classList.add("hidden");
  modalTweetInput.value = "";
  modalTweetInput.style.height = "";
  modalSelectedImage = "";
  if (modalImageInput) modalImageInput.value = "";
  renderModalImagePreview("");
  updateModalPostButtonState();
}

modalCloseBtn.addEventListener("click", () => {
  if (modalTweetInput.value.trim() || modalSelectedImage) {
    pendingAction = "close";
    showSaveDiscard();
  } else closePostModal();
});

postModalOverlay.addEventListener("click", (e) => {
  if (e.target !== postModalOverlay) return;
  if (modalTweetInput.value.trim() || modalSelectedImage) {
    pendingAction = "close";
    showSaveDiscard();
  } else closePostModal();
});

modalDraftsBtn.addEventListener("click", () => {
  if (modalTweetInput.value.trim() || modalSelectedImage) {
    pendingAction = "drafts";
    showSaveDiscard();
  } else {
    postModalOverlay.classList.add("hidden");
    openDraftsPanel();
  }
});

modalTweetInput.addEventListener("input", function () {
  updateModalPostButtonState();
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});

modalImageTrigger?.addEventListener("click", () => {
  modalImageInput?.click();
});

modalImageInput?.addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    modalSelectedImage = event.target?.result || "";
    renderModalImagePreview(modalSelectedImage);
    updateModalPostButtonState();
  };
  reader.readAsDataURL(file);
});

modalPostBtn.addEventListener("click", () => {
  const text = modalTweetInput.value.trim();
  if (!text && !modalSelectedImage) return;

  const user = getLoggedInUser();

  const newPost = createTweetCard(
    user.displayName,
    user.handle,
    user.initial,
    text,
    modalSelectedImage,
  );

  // Add to HOME
  document.querySelector(".tweet-feed").prepend(newPost);

  // Add to PROFILE
  const profileFeed = document.getElementById("profileFeed");
  const profileEmpty = document.getElementById("profileEmpty");

  if (profileFeed) {
    profileFeed.prepend(newPost.cloneNode(true)); // 🔥 clone so it doesn't move
    if (profileEmpty) profileEmpty.style.display = "none";
  }

  closePostModal();
});

// ─── SAVE / DISCARD ───────────────────────────────────────────────────────────
function showSaveDiscard() {
  saveDiscardOverlay.classList.remove("hidden");
}
function hideSaveDiscard() {
  saveDiscardOverlay.classList.add("hidden");
}

sdSaveBtn.addEventListener("click", () => {
  saveDraft(modalTweetInput.value.trim());
  hideSaveDiscard();
  closePostModal();
  if (pendingAction === "drafts") openDraftsPanel();
  pendingAction = null;
});

sdDiscardBtn.addEventListener("click", () => {
  hideSaveDiscard();
  closePostModal();
  pendingAction = null;
});

saveDiscardOverlay.addEventListener("click", (e) => {
  if (e.target === saveDiscardOverlay) hideSaveDiscard();
});

// ─── DRAFTS ───────────────────────────────────────────────────────────────────
function saveDraft(text) {
  drafts.unshift({ id: Date.now(), text, savedAt: new Date() });
}

function openDraftsPanel() {
  renderDrafts();
  draftsOverlay.classList.remove("hidden");
}
function closeDraftsPanel() {
  draftsOverlay.classList.add("hidden");
}

draftsBackBtn.addEventListener("click", () => {
  closeDraftsPanel();
  openPostModal();
});

document.querySelectorAll(".drafts-tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    document
      .querySelectorAll(".drafts-tab")
      .forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
  });
});

draftsOverlay.addEventListener("click", (e) => {
  if (e.target === draftsOverlay) closeDraftsPanel();
});

function renderDrafts() {
  draftsList.querySelectorAll(".draft-item").forEach((el) => el.remove());
  if (drafts.length === 0) {
    draftsEmpty.style.display = "block";
    return;
  }
  draftsEmpty.style.display = "none";

  drafts.forEach((draft) => {
    const el = document.createElement("div");
    el.className = "draft-item";
    el.innerHTML = `
      <div style="flex:1;min-width:0;">
        <div class="draft-item-text">${escapeHTML(draft.text)}</div>
        <div class="draft-item-meta">${formatDraftTime(draft.savedAt)}</div>
      </div>
      <button class="draft-delete-btn ms-3">Delete</button>
    `;
    el.querySelector(".draft-item-text").addEventListener("click", () => {
      modalTweetInput.value = draft.text;
      modalTweetInput.dispatchEvent(new Event("input"));
      drafts = drafts.filter((d) => d.id !== draft.id);
      closeDraftsPanel();
      openPostModal();
    });
    el.querySelector(".draft-delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      drafts = drafts.filter((d) => d.id !== draft.id);
      el.remove();
      if (drafts.length === 0) draftsEmpty.style.display = "block";
    });
    draftsList.appendChild(el);
  });
}

function formatDraftTime(date) {
  const diff = Math.floor((Date.now() - date) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString();
}

// ─── FEED TABS ────────────────────────────────────────────────────────────────
document.querySelectorAll(".feed-tabs .tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    document
      .querySelectorAll(".feed-tabs .tab")
      .forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
  });
});

// ─── INLINE COMPOSER ─────────────────────────────────────────────────────────
const inlineTweetInput = document.querySelector(".composer-input");
const inlineTweetBtn = document.getElementById("tweetBtn");
const tweetFeed = document.querySelector(".tweet-feed");
const inlineImageTrigger = document.getElementById("inlineImageTrigger");
const inlineImageInput = document.getElementById("inlineImageInput");
const inlineImagePreview = document.getElementById("inlineImagePreview");

let inlineSelectedImage = "";

function updateInlinePostButtonState() {
  const hasText = inlineTweetInput.value.trim().length > 0;
  const hasImage = Boolean(inlineSelectedImage);
  const canPost = hasText || hasImage;
  inlineTweetBtn.disabled = !canPost;
  inlineTweetBtn.classList.toggle("btn-dark", canPost);
  inlineTweetBtn.classList.toggle("btn-secondary", !canPost);
}

function renderInlineImagePreview(imageUrl) {
  if (!inlineImagePreview) return;
  if (!imageUrl) {
    inlineImagePreview.innerHTML = "";
    inlineImagePreview.classList.add("d-none");
    return;
  }

  inlineImagePreview.classList.remove("d-none");
  inlineImagePreview.innerHTML = `
    <img src="${imageUrl}" alt="Selected image preview">
    <button type="button" class="composer-remove-image-btn" aria-label="Remove selected image">
      <i class="bi bi-x-lg"></i>
    </button>
  `;

  inlineImagePreview
    .querySelector(".composer-remove-image-btn")
    ?.addEventListener("click", () => {
      inlineSelectedImage = "";
      if (inlineImageInput) inlineImageInput.value = "";
      renderInlineImagePreview("");
      updateInlinePostButtonState();
    });
}

inlineTweetInput.addEventListener("input", function () {
  updateInlinePostButtonState();
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});

inlineImageTrigger?.addEventListener("click", () => {
  inlineImageInput?.click();
});

inlineImageInput?.addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    inlineSelectedImage = event.target?.result || "";
    renderInlineImagePreview(inlineSelectedImage);
    updateInlinePostButtonState();
  };
  reader.readAsDataURL(file);
});

function updatePostCount() {
  const profileFeed = document.getElementById("profileFeed");
  const showPostsLink = document.querySelector(".show-posts a");

  if (!profileFeed || !showPostsLink) return;

  const postCount = profileFeed.children.length; // number of tweets inside the feed
  showPostsLink.textContent = `Show ${postCount} post${postCount === 1 ? "" : "s"}`;
}

inlineTweetBtn.addEventListener("click", () => {
  const text = inlineTweetInput.value.trim();
  if (!text && !inlineSelectedImage) return;

  const user = getLoggedInUser();
  const newTweet = createTweetCard(
    user.displayName,
    user.handle,
    user.initial,
    text,
    inlineSelectedImage
  );

  // Add to main feed
  tweetFeed.prepend(newTweet);

  // Add to profile feed
  const profileFeed = document.getElementById("profileFeed");
  const profileEmpty = document.getElementById("profileEmpty");
  if (profileFeed) {
    newTweetClone = newTweet.cloneNode(true); // create a separate copy
    profileFeed.prepend(newTweetClone);
    // Hide "No posts yet" message
    if (profileEmpty) profileEmpty.style.display = "none";
  }

  // Reset composer
  inlineTweetInput.value = "";
  inlineTweetInput.style.height = "";
  inlineSelectedImage = "";
  if (inlineImageInput) inlineImageInput.value = "";
  renderInlineImagePreview("");
  updateInlinePostButtonState();

  updatePostCount();
});
inlineTweetBtn.disabled = true;

// ─── TWEET CARD FACTORY ───────────────────────────────────────────────────────
function createTweetCard(name, handle, initial, text, imageUrl = "") {
  const card = document.createElement("div");
  card.className = "tweet-card";
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
          <i class="bi bi-three-dots tweet-top-icon" title="More"></i>
        </div>
      </div>
      <div class="tweet-text">${escapeHTML(text)}</div>
      ${imageUrl ? `<div class="tweet-media"><img src="${imageUrl}" alt="Tweet image"></div>` : ""}
      <div class="tweet-actions">
        <div class="tweet-action" data-action="reply" title="Reply">
          <i class="bi bi-chat"></i><span>0</span>
        </div>
        <div class="tweet-action" data-action="retweet" title="Repost">
          <i class="bi bi-repeat"></i><span>0</span>
        </div>
        <div class="tweet-action" data-action="like" title="Like">
          <i class="bi bi-heart"></i><span>0</span>
        </div>
        <div class="tweet-action" data-action="views" title="Views">
          <i class="bi bi-bar-chart"></i><span>1</span>
        </div>
        <div class="tweet-action-group-right">
          <i class="bi bi-bookmark tweet-top-icon" data-action="bookmark" title="Bookmark"></i>
          <i class="bi bi-box-arrow-up tweet-top-icon" title="Share"></i>
        </div>
      </div>
    </div>
  `;
  wireUpTweetActions(card);
  setTimeout(initInteractionTooltips, 0);
  return card;
}

function initInteractionTooltips() {
  const titleMap = [
    ["#inlineImageTrigger", "Add image"],
    [".composer-icons .bi-filetype-gif", "Add GIF"],
    ['.composer-icons img[alt="Grok"]', "Grok"],
    [".composer-icons .bi-list-ul", "Poll"],
    [".composer-icons .bi-emoji-smile", "Emoji"],
    [".composer-icons .bi-calendar-event", "Schedule"],
    [".composer-icons .bi-geo-alt", "Location"],
    [".composer-icons .bi-flag", "Safety"],
    ["#modalImageTrigger", "Add image"],
    [".modal-icons .bi-filetype-gif", "Add GIF"],
    [".modal-icons .modal-grok-icon", "Grok"],
    [".modal-icons .bi-list-ul", "Poll"],
    [".modal-icons .bi-emoji-smile", "Emoji"],
    [".modal-icons .bi-calendar-event", "Schedule"],
    [".modal-icons .bi-geo-alt", "Location"],
    [".modal-icons .bi-flag", "Safety"],
    ['.tweet-actions [data-action="reply"]', "Reply"],
    ['.tweet-actions [data-action="retweet"]', "Repost"],
    ['.tweet-actions [data-action="like"]', "Like"],
    ['.tweet-actions [data-action="views"]', "Views"],
    ['.tweet-actions [data-action="bookmark"]', "Bookmark"],
    [".tweet-actions .bi-box-arrow-up", "Share"],
    [".tweet-top-icons .bi-three-dots", "More"],
    [".tweet-top-grok-icon", "Grok"],
  ];

  titleMap.forEach(([selector, title]) => {
    document.querySelectorAll(selector).forEach((el) => {
      if (!el.getAttribute("title")) el.setAttribute("title", title);
      el.setAttribute("data-bs-toggle", "tooltip");
      el.setAttribute("data-bs-placement", "top");
    });
  });

  if (window.bootstrap?.Tooltip) {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
      if (!window.bootstrap.Tooltip.getInstance(el)) {
        new window.bootstrap.Tooltip(el);
      }
    });
  }
}

initInteractionTooltips();

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
}

// ─── TWEET ACTIONS ────────────────────────────────────────────────────────────
document.querySelectorAll(".tweet-card").forEach(wireUpTweetActions);

function wireUpTweetActions(card) {
  // Like
  const likeAction = card.querySelector('[data-action="like"]');
  if (likeAction) {
    likeAction.addEventListener("click", function () {
      const icon = this.querySelector("i");
      const count = this.querySelector("span");
      const liked = icon.classList.contains("bi-heart-fill");
      icon.classList.toggle("bi-heart", liked);
      icon.classList.toggle("bi-heart-fill", !liked);
      icon.style.color = liked ? "" : "#f91880";
      this.style.color = liked ? "" : "#f91880";
      count.textContent = formatCount(
        parseCount(count.textContent) + (liked ? -1 : 1),
      );
    });
  }

  // Retweet
  const retweetAction = card.querySelector('[data-action="retweet"]');
  if (retweetAction) {
    retweetAction.addEventListener("click", function () {
      const icon = this.querySelector("i");
      const count = this.querySelector("span");
      const active = this.classList.contains("retweeted");
      this.classList.toggle("retweeted", !active);
      icon.style.color = active ? "" : "#00ba7c";
      this.style.color = active ? "" : "#00ba7c";
      count.textContent = formatCount(
        parseCount(count.textContent) + (active ? -1 : 1),
      );
    });
  }

  // Bookmark → saves/removes from Bookmarks section
  const bookmarkBtn = card.querySelector('[data-action="bookmark"]');
  if (bookmarkBtn) {
    bookmarkBtn.addEventListener("click", function () {
      const saved = this.classList.contains("bi-bookmark-fill");
      const feed = document.getElementById("bookmarksFeed");
      const empty = document.getElementById("bookmarksEmpty");
      const tweetCard = this.closest(".tweet-card");

      this.classList.toggle("bi-bookmark", saved);
      this.classList.toggle("bi-bookmark-fill", !saved);
      this.style.color = saved ? "" : "#1d9bf0";

      if (!saved) {
        const clone = tweetCard.cloneNode(true);
        clone.dataset.bookmarkId = tweetCard.dataset.bookmarkId || Date.now();
        tweetCard.dataset.bookmarkId = clone.dataset.bookmarkId;
        wireUpTweetActions(clone);
        const cloneBookmark = clone.querySelector('[data-action="bookmark"]');
        if (cloneBookmark) {
          cloneBookmark.classList.replace("bi-bookmark", "bi-bookmark-fill");
          cloneBookmark.style.color = "#1d9bf0";
        }
        if (feed) {
          feed.prepend(clone);
          if (empty) empty.style.display = "none";
        }
      } else {
        const id = tweetCard.dataset.bookmarkId;
        const existing = feed?.querySelector(`[data-bookmark-id="${id}"]`);
        if (existing) existing.remove();
        if (feed?.children.length === 0 && empty) empty.style.display = "block";
        delete tweetCard.dataset.bookmarkId;
      }
    });
  }
}

function parseCount(str) {
  str = str.trim();
  if (str.endsWith("K")) return Math.round(parseFloat(str) * 1000);
  if (str.endsWith("M")) return Math.round(parseFloat(str) * 1_000_000);
  return parseInt(str) || 0;
}

function formatCount(n) {
  if (n >= 1_000_000)
    return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

// ─── FOLLOW BUTTONS (delegated) ───────────────────────────────────────────────
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".follow-btn");
  if (!btn) return;
  const following = btn.textContent.trim() === "Following";
  btn.textContent = following ? "Follow" : "Following";
  btn.style.backgroundColor = following ? "" : "transparent";
  btn.style.color = following ? "" : "#0f1419";
  btn.style.border = following ? "" : "1px solid #cfd9de";
});

// ─── NOTIFICATIONS TABS ───────────────────────────────────────────────────────
document.querySelectorAll(".notif-tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    document
      .querySelectorAll(".notif-tab")
      .forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
    const which = this.dataset.notif;
    document
      .getElementById("notifAllEmpty")
      ?.classList.toggle("hidden", which !== "all");
    document
      .getElementById("notifMentionsEmpty")
      ?.classList.toggle("hidden", which !== "mentions");
  });
});

// ─── PROFILE TABS ─────────────────────────────────────────────────────────────
document.querySelectorAll(".profile-tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    document
      .querySelectorAll(".profile-tab")
      .forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
  });
});

// ─── SHOW POSTS BANNER ────────────────────────────────────────────────────────
const showPostsBanner = document.querySelector(".show-posts");
if (showPostsBanner) {
  showPostsBanner.addEventListener("click", (e) => {
    e.preventDefault();
    showPostsBanner.style.display = "none";
  });
}
