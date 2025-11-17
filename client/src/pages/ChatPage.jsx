import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { fetchSessions, fetchSession, createSession } from "../utils/api";

export default function ChatPage({
  sessions,
  reloadSessions,
  sidebarCollapsed,
  setSidebarCollapsed,
  onNewChat,
}) {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [activeSession, setActiveSession] = useState(null);
  const [allSessions, setAllSessions] = useState(sessions || []);

  useEffect(() => {
    // load sessions list for sidebar
    loadSessions();
  }, []);

  useEffect(() => {
    // when route sessionId changes, load that session
    if (sessionId) loadSession(sessionId);
  }, [sessionId]);

  async function loadSessions() {
    try {
      const data = await fetchSessions();
      setAllSessions(data);
      if (typeof reloadSessions === "function") reloadSessions();
    } catch (err) {
      console.error(err);
    }
  }

  async function loadSession(id) {
    try {
      const s = await fetchSession(id);
      setActiveSession(s);
      // refresh sidebar list
      await loadSessions();
    } catch (err) {
      console.error("Failed to load session", err);
    }
  }

  async function handleNewChat() {
    try {
      const res = await createSession();
      const newId = res.sessionId;
      await loadSessions();
      navigate(`/chat/${newId}`);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row h-[calc(100vh-64px)]">
      <Sidebar
        sessions={allSessions}
        activeId={sessionId}
        onSelect={(id) => navigate(`/chat/${id}`)}
        onNew={() => handleNewChat()}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        className="sm:static fixed z-20 top-0 left-0 h-full sm:h-auto w-full sm:w-auto bg-white dark:bg-gray-900 sm:bg-transparent sm:dark:bg-transparent transition-all duration-300"
      />
      <div className="flex-1 bg-white dark:bg-gray-800 min-h-0 flex flex-col">
        <ChatWindow
          session={activeSession}
          onSend={async (sessionId, text) => {
            await loadSession(sessionId);
            await loadSessions();
          }}
          onRename={async (id, title) => {
            await loadSessions();
            await loadSession(id);
          }}
        />
      </div>
    </div>
  );
}
