import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ChatPage from "./pages/ChatPage";
import {
  fetchSessions as apiFetchSessions,
  createSession as apiCreateSession,
} from "./utils/api";
import ThemeToggle from "./components/ThemeToggle";

/**
 * Top-level App: holds global UI state (sessions list, theme, sidebar collapsed).
 * For simplicity we fetch sessions on mount and pass handlers down via props.
 */

export default function App() {
  const [sessions, setSessions] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    loadSessions();
  }, []);

  async function loadSessions() {
    try {
      const data = await apiFetchSessions();
      setSessions(data);
    } catch (err) {
      console.error("Failed to fetch sessions", err);
    }
  }

  async function handleNewChat(navigate) {
    try {
      const res = await apiCreateSession();
      // api returns { sessionId }
      const sessionId = res.sessionId;
      // reload sessions and navigate to new session
      await loadSessions();
      if (navigate) navigate(`/chat/${sessionId}`);
    } catch (err) {
      console.error("Failed to create session", err);
    }
  }

  return (
    <div className="app-container flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row items-center justify-between p-3 border-b bg-white dark:bg-gray-800 gap-2 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="sm:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              title="Open sidebar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-lg font-semibold">AI Chat App</h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle
              theme={theme}
              onToggle={() =>
                setTheme((prev) => (prev === "dark" ? "light" : "dark"))
              }
            />
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <Landing onNewChat={(navigate) => handleNewChat(navigate)} />
            }
          />
          <Route
            path="/chat/:sessionId"
            element={
              <ChatPage
                sessions={sessions}
                reloadSessions={loadSessions}
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={setSidebarCollapsed}
                onNewChat={() => handleNewChat()}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
