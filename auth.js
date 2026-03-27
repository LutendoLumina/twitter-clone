(() => {
  const AUTH_SESSION_KEY = "twitterCloneSession";

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(AUTH_SESSION_KEY) || "null");
    } catch (error) {
      return null;
    }
  }

  function requireAuth() {
    const session = getSession();
    if (!session?.isAuthenticated) {
      window.location.href = "login.html";
      return null;
    }
    return session;
  }

  function logout() {
    localStorage.removeItem(AUTH_SESSION_KEY);
  }

  window.auth = { getSession, requireAuth, logout };

  const page = (window.location.pathname.split("/").pop() || "").toLowerCase();
  if (page === "index.html" || page === "") {
    requireAuth();
  }
})();
