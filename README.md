# 🐦 Twitter (X) Clone

A fully functional Twitter (X) clone built using HTML, CSS, JavaScript, and Bootstrap.

This project replicates the core UI and behavior of Twitter, including navigation, dynamic content rendering, and interactive components.

---

## 🚀 Features

- 🧭 Sidebar navigation (dashboard-style, no page reloads)
- 🏠 Home feed with tweet cards
- ✍️ Tweet composer (create posts)
- 🔍 Explore page (trending + search layout)
- 🔔 Notifications page
- 💬 Chat/Messages UI
- 🔖 Bookmarks
- 👤 Profile page
- ⭐ Premium section
- 📊 Trending section (right sidebar)
- 📌 Sticky header and search bar
- 🎯 Responsive layout (Bootstrap)

---

## 🧠 Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Bootstrap 5
- Bootstrap Icons

/project-root
│── index.html
│── style.css
│── script.js
│── /assets


---

## ⚙️ How It Works

This project uses a **Single Page Application (SPA) approach**:

- Sidebar items do not reload the page
- JavaScript dynamically switches content sections
- Each section acts like its own page

Example:
- Clicking "Explore" hides Home and shows Explore
- Clicking "Notifications" switches the view instantly

---

## 🧪 Challenges & Solutions

### 🔹 Git Branching Issue

**Problem:**
Initially committed all features (sidebar, main section, trending section) directly to the `main` branch instead of using feature branches.

Attempting to create branches like `dev/sidebar` resulted in:
cannot lock ref 'refs/heads/dev/sidebar': 'refs/heads/dev' exists


**Cause:**
Git does not allow a branch (`dev`) and nested branches (`dev/...`) to coexist because branch names are treated as full paths.

**Solution:**
- Adopted a proper branching strategy:
  - `main` → stable branch
  - `dev` → development branch
  - `feature/*` → feature branches
- Created feature branches from specific commits:
  - `feature/sidebar`
  - `feature/main-section`
  - `feature/trending`

**Result:**
A clean and scalable workflow aligned with real-world development practices.

---

## 📚 Key Learnings

- Implementing SPA-like navigation using Vanilla JavaScript
- Structuring scalable frontend layouts
- Managing UI state (active sections, navigation)
- Understanding Git branching strategies and workflows
- Debugging real-world development issues

---

## 🔮 Future Improvements

- Add backend (Node.js / Spring Boot)
- Store posts dynamically (database)
- Authentication system (login/signup)
- Real-time messaging
- Like / repost persistence
- API integration

---

## 👨‍💻 Author

**Lutendo Matshidze**

- GitHub: https://github.com/LutendoLumina
- LinkedIn: https://www.linkedin.com/in/lutendo-matshidze-8ba4822b7/

---

## 📌 Note

This project is for educational and portfolio purposes only.
---

## 📂 Project Structure
