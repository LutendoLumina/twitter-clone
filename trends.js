// ─── INJECT STYLES ────────────────────────────────────────────────────────────
const trendsStyles = document.createElement('style');
trendsStyles.textContent = `
  /* ── Search dropdown ── */
  .search-box { position: relative; }
  .search-box input:focus { border-color: var(--blue) !important; outline: none; }
  .search-dropdown {
    position: absolute; top: calc(100% - 2px); left: 0; right: 0;
    background: var(--bg-primary); border: 1px solid var(--border-color); border-top: none;
    border-radius: 0 0 16px 16px;
    box-shadow: 0 6px 20px rgba(0,0,0,.2); z-index: 400;
    max-height: 400px; overflow-y: auto;
  }
  .search-dropdown.hidden { display: none; }
  .search-recent-header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 14px 18px 6px; font-weight: 800; font-size: 1.05rem; color: var(--text-primary);
  }
  .search-clear-all {
    color: var(--blue); font-size: 0.9rem; font-weight: 500;
    cursor: pointer; background: none; border: none;
  }
  .search-clear-all:hover { text-decoration: underline; }
  .search-suggestion {
    display: flex; align-items: center; gap: 14px;
    padding: 10px 18px; cursor: pointer; transition: background .15s;
  }
  .search-suggestion:hover { background: var(--bg-hover); }
  .search-suggestion-icon {
    width: 38px; height: 38px; border-radius: 50%;
    background: var(--bg-input); display: flex; align-items: center; justify-content: center;
    color: var(--text-secondary); font-size: 1rem; flex-shrink: 0;
  }
  .search-suggestion-name { font-weight: 700; font-size: 0.97rem; color: var(--text-primary); }
  .search-suggestion-sub  { font-size: 0.85rem; color: var(--text-secondary); }
  .search-suggestion-remove {
    margin-left: auto; background: none; border: none;
    color: var(--text-secondary); font-size: 1rem; cursor: pointer; padding: 4px 8px;
    border-radius: 50%; flex-shrink: 0; transition: background .15s;
  }
  .search-suggestion-remove:hover { background: var(--bg-hover); }
  .search-empty-hint { padding: 16px 18px; color: var(--text-secondary); font-size: 0.95rem; }

  /* ── News dismiss popup ── */
  .news-dismiss-popup {
    position: absolute; right: 0; top: 32px;
    background: var(--bg-primary); border: 1px solid var(--border-color);
    border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,.2);
    z-index: 300; min-width: 200px; overflow: hidden;
  }
  .news-dismiss-popup.hidden { display: none; }
  .news-dismiss-item {
    padding: 14px 18px; font-size: 0.97rem; color: var(--text-primary);
    cursor: pointer; transition: background .15s;
  }
  .news-dismiss-item:hover { background: var(--bg-hover); }
  .card-header-row { position: relative; cursor: pointer; }

  /* ── Trend dots popup ── */
  .trend-dots-popup {
    position: absolute; right: 0; top: 28px;
    background: var(--bg-primary); border: 1px solid var(--border-color);
    border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,.2);
    z-index: 300; min-width: 260px; overflow: hidden;
  }
  .trend-dots-popup.hidden { display: none; }
  .trend-dots-item {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 18px; font-size: 0.97rem; color: var(--text-primary);
    cursor: pointer; transition: background .15s; font-weight: 500;
  }
  .trend-dots-item:hover { background: var(--bg-hover); }
  .trend-dots-item i { color: var(--text-secondary); font-size: 1.1rem; }
  .trend-item { position: relative; }
  .trend-item .bi-three-dots { cursor: pointer; }

  /* ── Explore page ── */
  .explore-header { padding: 0 !important; }
  .explore-search-row {
    display: flex; align-items: center; gap: 10px; padding: 8px 16px 6px;
  }
  .explore-search-wrap { flex: 1; position: relative; }
  .explore-search-icon {
    position: absolute; left: 14px; top: 50%;
    transform: translateY(-50%); color: var(--text-secondary);
  }
  .explore-search-input {
    width: 100%; height: 42px; border: 1px solid var(--border-color);
    border-radius: 999px; padding: 0 16px 0 40px;
    font-size: 1rem; outline: none; background: var(--bg-input); color: var(--text-primary);
    transition: border-color .2s, background .2s;
  }
  .explore-search-input:focus { background: var(--search-focus-bg); border-color: var(--blue); }
  .explore-settings-btn {
    background: none; border: none; font-size: 1.3rem;
    color: var(--blue); cursor: pointer; padding: 6px;
    border-radius: 50%; transition: background .2s;
  }
  .explore-settings-btn:hover { background: var(--bg-hover); }
  .explore-tabs {
    display: flex; border-bottom: 1px solid var(--border-color);
    overflow-x: auto; scrollbar-width: none;
  }
  .explore-tabs::-webkit-scrollbar { display: none; }
  .explore-tab {
    flex-shrink: 0; padding: 14px 18px;
    font-size: 0.95rem; font-weight: 500; color: var(--text-secondary);
    cursor: pointer; position: relative; transition: color .15s; white-space: nowrap;
  }
  .explore-tab.active { color: var(--text-primary); font-weight: 700; }
  .explore-tab.active::after {
    content: ''; position: absolute; bottom: 0; left: 15%; width: 70%;
    height: 3px; background: var(--blue); border-radius: 4px;
  }
  .explore-promoted {
    background:
      linear-gradient(to top, rgba(0,0,0,.65) 0%, rgba(0,0,0,.25) 100%),
      url('assets/d23.jpg') center/cover no-repeat;
    color: #fff;
    border-bottom: 1px solid var(--border-color);
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
    font-size: 1.15rem; font-weight: 800; color: var(--text-primary);
    padding: 14px 16px 4px; border-top: 1px solid var(--border-color);
    background: var(--bg-primary);
  }
  .explore-news-item {
    padding: 12px 16px; border-bottom: 1px solid var(--border-color);
    cursor: pointer; transition: background .15s; background: var(--bg-primary);
  }
  .explore-news-item:hover { background: var(--bg-hover); }
  .explore-news-item h4 { font-size: 0.97rem; font-weight: 600; margin-bottom: 6px; color: var(--text-primary); }
  .explore-trend-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 12px 16px; border-bottom: 1px solid var(--border-color);
    cursor: pointer; transition: background .15s; background: var(--bg-primary);
  }
  .explore-trend-item:hover { background: var(--bg-hover); }
  .explore-trend-meta  { font-size: 0.82rem; color: var(--text-secondary); }
  .explore-trend-name  { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 2px 0; }
  .explore-trend-count { font-size: 0.82rem; color: var(--text-secondary); }
  .explore-trend-dots {
    background: none; border: none; color: var(--text-secondary);
    font-size: 1rem; cursor: pointer; padding: 6px;
    border-radius: 50%; transition: background .15s;
  }
  .explore-trend-dots:hover { background: var(--bg-hover); color: var(--blue); }

  /* ── Follow page ── */
  .follow-page-header { padding: 0 !important; }
  .follow-header-row {
    display: flex; align-items: center; justify-content: space-between; padding: 12px 16px;
  }
  .follow-header-row span { font-size: 1.15rem; font-weight: 800; color: var(--text-primary); }
  .follow-back-btn, .follow-settings-btn {
    background: none; border: none; font-size: 1.15rem;
    color: var(--text-primary); cursor: pointer; padding: 7px;
    border-radius: 50%; transition: background .2s;
  }
  .follow-back-btn:hover, .follow-settings-btn:hover { background: var(--bg-hover); }
  .follow-settings-btn { color: var(--blue); }
  .follow-page-tabs { display: flex; border-bottom: 1px solid var(--border-color); }
  .follow-page-tab {
    flex: 1; text-align: center; padding: 14px 0;
    font-weight: 500; color: var(--text-secondary); cursor: pointer;
    position: relative; transition: color .15s;
  }
  .follow-page-tab.active { color: var(--text-primary); font-weight: 700; }
  .follow-page-tab.active::after {
    content: ''; position: absolute; bottom: 0; left: 20%; width: 60%;
    height: 3px; background: var(--blue); border-radius: 4px;
  }
  .follow-page-section-title { font-size: 1.05rem; font-weight: 800; color: var(--text-primary); padding: 14px 16px 6px; }
  .follow-page-item {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 12px 16px; border-bottom: 1px solid var(--border-color); transition: background .15s;
    background: var(--bg-primary);
  }
  .follow-page-item:hover { background: var(--bg-hover); }
  .follow-page-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
  .follow-page-info { flex: 1; min-width: 0; }
  .follow-page-name {
    font-weight: 700; font-size: 0.97rem; color: var(--text-primary);
    display: flex; align-items: center; gap: 4px; flex-wrap: wrap;
  }
  .follow-page-handle { color: var(--text-secondary); font-size: 0.9rem; margin: 1px 0 4px; }
  .follow-page-bio { font-size: 0.9rem; color: var(--text-primary); }
  .follow-page-btn { flex-shrink: 0; align-self: center; }

  /* ── Chat page ── */
  .chat-welcome { display: flex; align-items: center; justify-content: center; min-height: 80vh; }
  .chat-welcome-content { max-width: 360px; padding: 24px; }
  .chat-welcome-content h2 { font-size: 1.8rem; font-weight: 800; margin-bottom: 24px; color: var(--text-primary); }
  .chat-feature { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 20px; }
  .chat-feature > i { font-size: 1.4rem; color: var(--text-primary); flex-shrink: 0; margin-top: 2px; }
  .chat-feature-title { font-weight: 700; font-size: 0.97rem; margin-bottom: 3px; color: var(--text-primary); }
  .chat-feature-desc  { font-size: 0.9rem; color: var(--text-secondary); }
  .chat-passcode-btn {
    display: block; width: 100%; margin-top: 28px;
    background: var(--text-primary); color: var(--bg-primary); border: none;
    border-radius: 999px; padding: 14px; font-size: 1rem; font-weight: 700;
    cursor: pointer; transition: opacity .15s;
  }
  .chat-passcode-btn:hover { opacity: .85; }

  /* ── Grok page ── */
  #grok.active-section { display: flex; flex-direction: column; min-height: 100vh; position: relative; background: var(--bg-primary); }
  .grok-topbar {
    display: flex; justify-content: flex-end; gap: 12px;
    padding: 14px 20px; border-bottom: 1px solid var(--border-color);
  }
  .grok-topbar-btn {
    background: none; border: none; color: var(--text-secondary); font-size: 0.9rem;
    cursor: pointer; display: flex; align-items: center; gap: 6px;
    padding: 6px 10px; border-radius: 999px; transition: background .15s;
  }
  .grok-topbar-btn:hover { background: var(--bg-hover); }
  .grok-body {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center; padding: 40px 24px; gap: 24px;
  }
  .grok-logo { display: flex; align-items: center; gap: 10px; font-size: 1.8rem; font-weight: 800; color: var(--text-primary); }
  .grok-input-wrap {
    width: 100%; max-width: 560px; display: flex; align-items: center; gap: 10px;
    border: 1.5px solid var(--border-color); border-radius: 999px;
    background: var(--bg-primary);
    padding: 8px 14px; transition: border-color .2s;
  }
  .grok-input-wrap:focus-within { border-color: var(--blue); }
  .grok-attach-btn { background: none; border: none; color: var(--text-secondary); font-size: 1.1rem; cursor: pointer; padding: 4px; flex-shrink: 0; }
  .grok-input { flex: 1; border: none; outline: none; font-size: 1rem; font-family: 'Roboto', sans-serif; color: var(--text-primary); background: transparent; }
  .grok-input::placeholder { color: var(--text-secondary); }
  .grok-input-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
  .grok-auto { font-size: 0.85rem; color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; gap: 3px; }
  .grok-mic-btn {
    background: var(--text-primary); color: var(--bg-primary); border: none; border-radius: 50%;
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer;
  }
  .grok-chips { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
  .grok-chip {
    background: none; border: 1px solid var(--border-color); border-radius: 999px;
    padding: 8px 16px; font-size: 0.9rem; cursor: pointer; color: var(--text-primary);
    display: flex; align-items: center; gap: 6px; transition: background .15s;
  }
  .grok-chip:hover { background: var(--bg-hover); }
  .grok-explore-banner {
    position: sticky; bottom: 20px; margin: 0 20px 20px;
    background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 16px;
    padding: 14px 18px; display: flex; align-items: center;
    justify-content: space-between; box-shadow: 0 2px 12px rgba(0,0,0,.15);
  }
  .grok-explore-left { display: flex; align-items: center; gap: 12px; }
  .grok-explore-title { font-weight: 700; font-size: 0.97rem; color: var(--text-primary); }
  .grok-explore-sub   { font-size: 0.82rem; color: var(--text-secondary); }
  .grok-explore-btn {
    background: var(--text-primary); color: var(--bg-primary); border: none;
    border-radius: 999px; padding: 8px 18px; font-weight: 700; cursor: pointer; transition: opacity .15s;
  }
  .grok-explore-btn:hover { opacity: .85; }

  /* ── Bookmarks page ── */
  .bookmarks-header { padding: 0 !important; }
  .bookmarks-header-row { display: flex; align-items: center; gap: 14px; padding: 12px 16px 8px; }
  .bookmarks-header-row span { font-size: 1.15rem; font-weight: 800; flex: 1; color: var(--text-primary); }
  .bookmarks-search-wrap {
    display: flex; align-items: center; gap: 10px;
    margin: 8px 16px 12px; background: var(--bg-input); border-radius: 999px; padding: 8px 16px;
  }
  .bookmarks-search-wrap i { color: var(--text-secondary); }
  .bookmarks-search-input { border: none; background: transparent; outline: none; font-size: 1rem; color: var(--text-primary); flex: 1; }
  .bookmarks-search-input::placeholder { color: var(--text-secondary); }
  .bookmarks-empty { padding: 48px 24px; }
  .bookmarks-empty h2 { font-size: 1.8rem; font-weight: 800; margin-bottom: 8px; color: var(--text-primary); }
  .bookmarks-empty p  { color: var(--text-secondary); font-size: 0.97rem; max-width: 280px; }

  /* ── Profile page ── */
  .profile-header { padding: 0 !important; }
  .profile-header-row { display: flex; align-items: center; gap: 14px; padding: 12px 16px; }
  .profile-banner { width: 100%; height: 130px; background: var(--border-color); }
  .profile-info-section { padding: 12px 16px 0; }
  .profile-avatar-row {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-top: -48px; margin-bottom: 10px;
  }
  .profile-big-avatar {
    width: 80px; height: 80px; border-radius: 50%;
    background: var(--green-avatar); color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 2.2rem; font-weight: 700; border: 4px solid var(--bg-primary);
  }
  .profile-edit-btn {
    background: none; border: 1.5px solid var(--border-color); border-radius: 999px;
    padding: 7px 16px; font-weight: 700; font-size: 0.92rem; color: var(--text-primary);
    cursor: pointer; transition: background .15s; margin-top: 8px;
  }
  .profile-edit-btn:hover { background: var(--bg-hover); }
  .profile-name-block { padding-bottom: 12px; }
  .profile-display-name {
    font-size: 1.15rem; font-weight: 800; color: var(--text-primary);
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  }
  .profile-verify-badge {
    background: none; border: 1px solid var(--border-color); border-radius: 999px;
    padding: 3px 10px; font-size: 0.82rem; cursor: pointer; color: var(--text-primary);
    display: flex; align-items: center; gap: 4px;
  }
  .profile-at-handle { color: var(--text-secondary); font-size: 0.95rem; margin: 2px 0 8px; }
  .profile-joined { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
  .profile-stats { display: flex; gap: 16px; font-size: 0.92rem; color: var(--text-secondary); }
  .profile-stats span strong { color: var(--text-primary); }
  .profile-empty { padding: 48px 24px; }
  .profile-empty h3 { font-size: 1.5rem; font-weight: 800; margin-bottom: 6px; color: var(--text-primary); }
  .profile-empty p  { color: var(--text-secondary); }

  /* ── More page ── */
  .more-list { padding: 8px 0; }
  .more-item {
    display: flex; align-items: center; gap: 16px;
    padding: 14px 24px; font-size: 1.05rem; font-weight: 500;
    cursor: pointer; transition: background .15s; color: var(--text-primary);
  }
  .more-item i { font-size: 1.25rem; color: var(--text-secondary); }
  .more-item:hover { background: var(--bg-hover); }
  .more-item-divider { border-top: 1px solid var(--border-color); margin-top: 6px; padding-top: 18px; }
`;
document.head.appendChild(trendsStyles);


// ─── SEARCH BOX — RECENTS + AUTOCOMPLETE ─────────────────────────────────────
const searchBox   = document.querySelector('.search-box');
const searchInput = searchBox.querySelector('input');

const SEARCH_PEOPLE = [
  { name: 'Disney D23',       handle: '@DisneyD23',      verified: true,  gold: true  },
  { name: 'TEMS',             handle: '@temsbaby',       verified: true              },
  { name: 'ErykahBadoula',    handle: '@fatbellybella',  verified: true              },
  { name: 'Temi Ajibade',     handle: '@TemiOtedola',    verified: true              },
  { name: 'THOMAS OLIVEIRA',  handle: '@Temperrr',       verified: true              },
  { name: 'tempo.co',         handle: '@tempodotco',     verified: true              },
  { name: 'TemptressXclusive',handle: '@temptress119',   verified: false             },
  { name: 'Taylor Swift',     handle: '@taylorswift13',  verified: true              },
  { name: 'Lil Baby',         handle: '@whamcbfw4',      verified: true              },
  { name: 'Carter Efe',       handle: '@carter_efe',     verified: true              },
  { name: 'Ayra Starr',       handle: '@ayrastarr',      verified: true              },
  { name: 'Amanda du-Pont',   handle: '@AmandaDupont',   verified: true              },
];

const KEYWORD_SUGGESTIONS = [
  'temblor', 'temblor valencia', 'temblo', 'trending SA', 'taylor swift',
  'south africa', 'soccer', 'amapiano', 'load shedding', 'eskom',
];

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
    if (recentSearches.length === 0) {
      searchDropdown.innerHTML = '<div class="search-empty-hint">Try searching for people, lists, or keywords</div>';
      return;
    }
    const header = document.createElement('div');
    header.className = 'search-recent-header';
    header.innerHTML = `<span>Recent</span><button class="search-clear-all">Clear all</button>`;
    header.querySelector('.search-clear-all').addEventListener('click', e => {
      e.stopPropagation(); recentSearches = []; renderSearchDropdown('');
    });
    searchDropdown.appendChild(header);
    recentSearches.forEach((r, idx) => searchDropdown.appendChild(buildSuggestionEl(r, true, idx)));
    return;
  }

  // Keyword suggestions
  KEYWORD_SUGGESTIONS.filter(k => k.startsWith(q)).slice(0, 3).forEach(kw => {
    const el = document.createElement('div');
    el.className = 'search-suggestion';
    el.innerHTML = `
      <div class="search-suggestion-icon"><i class="bi bi-search"></i></div>
      <div><div class="search-suggestion-name">${boldMatch(kw, q)}</div></div>`;
    el.addEventListener('click', () => handleSearch(kw));
    searchDropdown.appendChild(el);
  });

  // People matches
  SEARCH_PEOPLE
    .filter(p => p.name.toLowerCase().includes(q) || p.handle.toLowerCase().includes(q))
    .slice(0, 5)
    .forEach(p => searchDropdown.appendChild(buildSuggestionEl({ type: 'person', ...p }, false, -1)));

  if (searchDropdown.children.length === 0) {
    searchDropdown.innerHTML = `<div class="search-empty-hint">No results for "<strong>${q}</strong>"</div>`;
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
      e.stopPropagation(); recentSearches.splice(idx, 1); renderSearchDropdown('');
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
  // 1. Fill the input and close dropdown
  searchInput.value = term;
  searchDropdown.classList.add('hidden');
  searchInput.blur();

  // 2. Save to recent searches
  const existing = recentSearches.find(r => r.name.toLowerCase() === term.toLowerCase());
  if (!existing) {
    const person = SEARCH_PEOPLE.find(p => p.name.toLowerCase() === term.toLowerCase());
    recentSearches.unshift(person ? { type: 'person', ...person } : { type: 'keyword', name: term, handle: '' });
    if (recentSearches.length > 5) recentSearches.pop();
  }

  // 3. Navigate to Explore and show search results
  navigateTo('explore');

  // Small delay so the explore section is visible before we inject results
  setTimeout(() => {
    showSearchResults(term);
  }, 50);
}

function showSearchResults(term) {
  const exploreSection = document.getElementById('explore');
  if (!exploreSection) return;

  const q = term.trim().toLowerCase();

  // Match people
  const peopleMatches = SEARCH_PEOPLE.filter(p =>
    p.name.toLowerCase().includes(q) || p.handle.toLowerCase().includes(q)
  );

  // Build results HTML
  const badge = (p) => p.verified
    ? `<i class="bi bi-patch-check-fill" style="color:${p.gold ? '#f4a926' : '#1d9bf0'};font-size:.85rem;margin-left:4px;"></i>`
    : '';

  const peopleHTML = peopleMatches.length > 0
    ? peopleMatches.map(p => `
        <div class="follow-page-item">
          <div class="follow-page-avatar" style="width:48px;height:48px;border-radius:50%;background:var(--green-avatar);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.2rem;flex-shrink:0;">
            ${p.name.charAt(0).toUpperCase()}
          </div>
          <div class="follow-page-info">
            <div class="follow-page-name">${p.name}${badge(p)}</div>
            <div class="follow-page-handle">${p.handle}</div>
          </div>
          <button class="btn follow-btn follow-page-btn">Follow</button>
        </div>`).join('')
    : `<div style="padding:32px 20px;color:var(--text-secondary);font-size:0.97rem;">No people found for "<strong style="color:var(--text-primary);">${term}</strong>"</div>`;

  // Inject a search results block at the top of the explore section, replacing any previous results
  let resultsBlock = exploreSection.querySelector('.search-results-block');
  if (!resultsBlock) {
    resultsBlock = document.createElement('div');
    resultsBlock.className = 'search-results-block';
    // Insert right after the explore header
    const header = exploreSection.querySelector('.page-header, .explore-header');
    if (header) {
      header.insertAdjacentElement('afterend', resultsBlock);
    } else {
      exploreSection.prepend(resultsBlock);
    }
  }

  resultsBlock.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;padding:14px 16px 6px;border-bottom:1px solid var(--border-color);">
      <button onclick="clearSearchResults()" style="background:none;border:none;cursor:pointer;color:var(--text-primary);font-size:1.1rem;padding:6px;border-radius:50%;" title="Back">
        <i class="bi bi-arrow-left"></i>
      </button>
      <span style="font-size:1.1rem;font-weight:700;color:var(--text-primary);">Results for "<em>${term}</em>"</span>
    </div>
    <div style="padding:10px 16px 4px;font-size:0.85rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.05em;">People</div>
    ${peopleHTML}
    <div style="padding:14px 16px 4px;font-size:0.85rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.05em;border-top:1px solid var(--border-color);">Trending related to "${term}"</div>
    ${KEYWORD_SUGGESTIONS.filter(k => k.includes(q)).map(k => `
      <div class="explore-trend-item" onclick="handleSearch('${k}')">
        <div class="explore-trend-left">
          <div class="explore-trend-meta">Trending</div>
          <div class="explore-trend-name">${k}</div>
        </div>
        <button class="explore-trend-dots"><i class="bi bi-three-dots"></i></button>
      </div>`).join('') || `<div style="padding:16px;color:var(--text-secondary);font-size:0.95rem;">No trending topics match.</div>`}
  `;

  // Scroll to top of explore section
  exploreSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearSearchResults() {
  const resultsBlock = document.querySelector('#explore .search-results-block');
  if (resultsBlock) resultsBlock.remove();
  searchInput.value = '';
}

searchInput.addEventListener('focus',  () => { renderSearchDropdown(searchInput.value); searchDropdown.classList.remove('hidden'); });
searchInput.addEventListener('input',  () => { renderSearchDropdown(searchInput.value); searchDropdown.classList.remove('hidden'); });
searchInput.addEventListener('blur',   () => { setTimeout(() => searchDropdown.classList.add('hidden'), 180); });
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') { searchDropdown.classList.add('hidden'); searchInput.blur(); }
  if (e.key === 'Enter') {
    const term = searchInput.value.trim();
    if (term) handleSearch(term);
  }
});

// ─── SUBSCRIBE BUTTON ──────────────────────────────────────────
document.getElementById('subscribeBtn').addEventListener('click', () => {
  window.open('https://x.com/i/premium_sign_up', '_blank');
});



// ─── TODAY'S NEWS — ✕ DISMISS POPUP ──────────────────────────────────────────
const newsCardX   = document.querySelector('.card-header-row .bi-x-lg');
const newsCardRow = newsCardX?.closest('.card-header-row');
const newsCard    = newsCardX?.closest('.sidebar-card');

if (newsCardRow) {
  const dismissPopup = document.createElement('div');
  dismissPopup.className = 'news-dismiss-popup hidden';
  dismissPopup.innerHTML = `
    <div class="news-dismiss-item">Dismiss for a day</div>
    <div class="news-dismiss-item">Dismiss for a week</div>
    <div class="news-dismiss-item">Not interested</div>
  `;
  newsCardRow.appendChild(dismissPopup);

  newsCardX.addEventListener('click', e => { e.stopPropagation(); dismissPopup.classList.toggle('hidden'); });
  dismissPopup.querySelectorAll('.news-dismiss-item').forEach(item => {
    item.addEventListener('click', () => { newsCard.style.display = 'none'; dismissPopup.classList.add('hidden'); });
  });
  document.addEventListener('click', e => { if (!newsCardRow.contains(e.target)) dismissPopup.classList.add('hidden'); });
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
    if (activeTrendPopup && activeTrendPopup !== popup) activeTrendPopup.classList.add('hidden');
    popup.classList.toggle('hidden');
    activeTrendPopup = popup.classList.contains('hidden') ? null : popup;
  });
  popup.querySelectorAll('.trend-dots-item').forEach(item => {
    item.addEventListener('click', () => { popup.classList.add('hidden'); activeTrendPopup = null; });
  });
});

document.addEventListener('click', () => {
  if (activeTrendPopup) { activeTrendPopup.classList.add('hidden'); activeTrendPopup = null; }
});


// ─── SHOW MORE LINKS ──────────────────────────────────────────────────────────
document.querySelector('.happenings-card .show-more-link')?.addEventListener('click', e => {
  e.preventDefault(); navigateTo('explore');
});

document.querySelector('.follow-card .show-more-link')?.addEventListener('click', e => {
  e.preventDefault(); navigateTo('follow');
});


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
