import { useEffect, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { postMessage, fetchSession } from "../utils/api";

export default function ChatWindow({ session, onSend }) {
  const [currentSession, setCurrentSession] = useState(session);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentSession(session);
  }, [session]);

  if (!currentSession) {
    return (
      <div className="p-6 text-gray-600 dark:text-gray-300">
        Select or create a chat to begin.
      </div>
    );
  }

  const handleSend = async (text) => {
    if (!text) return;
    setLoading(true);
    try {
      // call API to post message and receive assistant reply
      await postMessage(currentSession.sessionId, text);
      // refetch session to get updated messages
      const updated = await fetchSession(currentSession.sessionId);
      setCurrentSession(updated);
      if (typeof onSend === "function") onSend(currentSession.sessionId, text);
    } catch (err) {
      console.error("Send failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <header className="p-3 sm:p-4 border-b flex items-center justify-between bg-white dark:bg-gray-800 sticky top-0 z-10">
        <div>
          <h2 className="text-base sm:text-lg font-semibold truncate">
            {currentSession.title}
          </h2>
          <div className="text-xs text-gray-500">
            {new Date(currentSession.updatedAt).toLocaleString()}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-2 sm:p-4">
        <MessageList messages={currentSession.messages || []} />
      </main>

      <div className="p-2 sm:p-4 bg-white dark:bg-gray-800 sticky bottom-0 z-10">
        <MessageInput onSend={(text) => handleSend(text)} disabled={loading} />
      </div>
    </div>
  );
}
