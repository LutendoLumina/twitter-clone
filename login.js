const AUTH_USERS_KEY = "twitterCloneUsers";
const AUTH_SESSION_KEY = "twitterCloneSession";

let mode = "login";

const authTitle = document.getElementById("authTitle");
const loginToggle = document.getElementById("loginToggle");
const signupToggle = document.getElementById("signupToggle");
const authForm = document.getElementById("authForm");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const submitBtn = document.getElementById("submitBtn");
const helperText = document.getElementById("helperText");
const helperToggle = document.getElementById("helperToggle");
const messageBox = document.getElementById("messageBox");

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function setMode(nextMode) {
  mode = nextMode;
  const isLogin = mode === "login";

  loginToggle.classList.toggle("active", isLogin);
  signupToggle.classList.toggle("active", !isLogin);
  authTitle.textContent = isLogin ? "Sign in to X" : "Create your account";
  submitBtn.textContent = isLogin ? "Log in" : "Sign up";
  helperText.textContent = isLogin ? "Don't have an account?" : "Already have an account?";
  helperToggle.textContent = isLogin ? "Create one" : "Sign in";

  messageBox.className = "message-box";
  messageBox.textContent = "";
}

function showMessage(text, type) {
  messageBox.className = `message-box ${type}`;
  messageBox.textContent = text;
}

function createSession(email) {
  const username = email.split("@")[0] || "user";
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);
  localStorage.setItem(
    AUTH_SESSION_KEY,
    JSON.stringify({
      email,
      username,
      displayName,
      isAuthenticated: true,
      loggedInAt: Date.now()
    })
  );
}

function redirectToApp() {
  window.location.href = "index.html";
}

try {
  const session = JSON.parse(localStorage.getItem(AUTH_SESSION_KEY) || "null");
  if (session?.isAuthenticated) {
    redirectToApp();
  }
} catch (error) {
  // no-op
}

loginToggle.addEventListener("click", () => setMode("login"));
signupToggle.addEventListener("click", () => setMode("signup"));
helperToggle.addEventListener("click", () => setMode(mode === "login" ? "signup" : "login"));

authForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showMessage("Please enter both email and password.", "error");
    return;
  }

  const users = getUsers();

  if (mode === "signup") {
    if (users[email]) {
      showMessage("This email is already registered. Please log in.", "error");
      return;
    }

    users[email] = { password };
    saveUsers(users);
    createSession(email);
    showMessage("Account created. Redirecting...", "success");
    setTimeout(redirectToApp, 700);
    return;
  }

  const user = users[email];
  if (!user || user.password !== password) {
    showMessage("Invalid email or password.", "error");
    return;
  }

  createSession(email);
  // updateProfileUI();
  showMessage("Login successful. Redirecting...", "success");
  setTimeout(redirectToApp, 500);
});
