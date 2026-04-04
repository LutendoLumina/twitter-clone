# 🐦 Twitter (X) Clone

A fully functional Twitter (X) clone built with HTML, CSS, JavaScript, and Bootstrap 5.
This project replicates the core UI and behaviour of Twitter/X — including navigation, dynamic content, dark mode, authentication, and interactive components — using a Single Page Application (SPA) approach with zero page reloads.

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🧭 Sidebar Navigation | Dashboard-style nav with active states & icon switching |
| 🏠 Home Feed | Tweet cards with like, retweet, bookmark interactions |
| ✍️ Tweet Composer | Inline + modal composer with draft saving |
| 🔍 Explore & Search | Trending topics, autocomplete, live search results |
| 🔔 Notifications | All / Mentions tabs |
| 💬 Chat / Messages | Messages UI layout |
| 🔖 Bookmarks | Save and view bookmarked tweets |
| 👤 Profile | User profile with stats and tabs |
| 🌙 Dark Mode | Full dark mode toggle with `localStorage` persistence |
| 🔐 Auth System | Login / Sign Up with session management |
| 📱 Responsive | Mobile, tablet, and desktop layouts |
| 🖼️ Image Upload | Image preview in composer before posting |

---

## 🧠 Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties (CSS variables) for theming
- **Vanilla JavaScript** — SPA routing, DOM manipulation, localStorage
- **Bootstrap 5** — grid, utilities, components
- **Bootstrap Icons** — icon library

---

## 📂 Project Structure

```
/project-root
├── index.html          # Main SPA shell
├── login.html          # Login / Sign Up page
├── logout.html         # Logout confirmation page
├── style.css           # Core styles + CSS variable theming
├── responsive.css      # Responsive / mobile overrides
├── login.css           # Login page styles
├── logout.css          # Logout page styles
├── auth.js             # Session guard — redirects unauthenticated users
├── login.js            # Login / Sign Up logic
├── sidebar.js          # Navigation, dark mode toggle, user binding
├── main.js             # Feed, tweet composer, modals, drafts, bookmarks
├── trends.js           # Search, explore, follow page, Grok, Chat, Profile
└── /assets             # Images, SVG icons
```

---

## ⚙️ How It Works

This project uses a **Single Page Application (SPA)** pattern:

- All sections (`home`, `explore`, `notifications`, etc.) live in `index.html` as hidden `<section>` elements
- JavaScript shows/hides sections on nav click — no page reloads
- `auth.js` runs on every page load and redirects to `login.html` if no valid session exists
- Dark mode is applied via a `data-theme="dark"` attribute on `<body>`, toggling CSS variables

```js
// Example — navigating sections
navigateTo('explore'); // hides all sections, shows #explore
```

---

## 🔐 Authentication Flow

1. User visits `index.html` → `auth.js` checks `localStorage` for a session
2. No session → redirected to `login.html`
3. User logs in / signs up → session saved to `localStorage`
4. Redirected back to `index.html`
5. Logout → session cleared → redirected to `login.html`

> Credentials are stored locally in `localStorage` for demo purposes only. A real app would use a backend with hashed passwords.

---

## 🧪 Challenges & Solutions

### 🔹 Git Branching Conflict

**Problem:** Committing directly to `main` then trying to create nested branches like `dev/sidebar` caused:
```
cannot lock ref 'refs/heads/dev/sidebar': 'refs/heads/dev' exists
```
**Cause:** Git treats branch names as file paths — a branch named `dev` and branches named `dev/*` cannot coexist.

**Solution:** Adopted a proper branching strategy from that point forward:
- `main` → stable, production-ready
- `dev` → integration branch
- `feature/sidebar`, `feature/main-section`, `feature/trending` → isolated feature work

---

### 🔹 Dark Mode Across Injected Styles

**Problem:** JS files (`main.js`, `trends.js`, `sidebar.js`) inject `<style>` blocks at runtime using hardcoded hex colours, bypassing CSS variables entirely.

**Solution:** Converted every injected style to use `var(--bg-primary)`, `var(--text-primary)` etc., so dark mode variables apply consistently everywhere including modals and popups.

---

### 🔹 SVG Icons Not Inverting in Dark Mode

**Problem:** Grok and Premium sidebar items use `<img>` tags for SVG icons. Unlike `<i>` icon tags, `color` CSS has no effect on them — they stayed black in dark mode.

**Solution:**
```css
[data-theme="dark"] .sidebar-item a img {
  filter: invert(1);
}
```

---

## 📚 Key Learnings

- Building SPA-style navigation with Vanilla JS and zero frameworks
- CSS custom properties (variables) as a theming system for dark mode
- Managing UI state — active sections, nav icons, session data
- Structuring JS across multiple files with shared globals (`navigateTo`, `auth`)
- Git branching strategy and real-world workflow practices
- Debugging layout issues across Bootstrap grid and custom CSS

---

## 🔮 Future Improvements

- [ ] Backend with Node.js or Spring Boot
- [ ] Database persistence for posts, likes, follows
- [ ] Secure authentication (hashed passwords, JWT)
- [ ] Real-time messaging (WebSockets)
- [ ] Like / repost / bookmark persistence
- [ ] REST API or GraphQL integration
- [ ] PWA support for mobile install

---

## 👨‍💻 Author

**Lutendo Matshidze**
- 🐙 GitHub: [LutendoLumina](https://github.com/LutendoLumina)
- 💼 LinkedIn: [lutendo-matshidze](https://www.linkedin.com/in/lutendo-matshidze-8ba4822b7/)

---

## 📌 Note

This project is for **educational and portfolio purposes only**.
It is not affiliated with X Corp. or Twitter in any way.
