import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function MessageList({ messages }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="space-y-4">
      {messages && messages.length ? (
        messages.map((m) => <MessageBubble key={m.id} message={m} />)
      ) : (
        <div className="text-gray-500">No messages yet. Ask something!</div>
      )}
      <div ref={endRef} />
    </div>
  );
}
